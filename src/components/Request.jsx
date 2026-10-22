import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [loadingId, setLoadingId] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/recieved",
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {
      setLoadingId(requestId);

      await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(addRequests(requests.filter((req) => req._id !== requestId)));
    } catch (err) {
      console.error("Error reviewing request:", err);
      alert(err.response?.data?.message || "Could not update request");
    } finally {
      setLoadingId(null);
    }
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl mb-4">👋</div>
        <h1 className="text-2xl font-bold text-gray-800">
          No Pending Requests
        </h1>
        <p className="text-gray-500 mt-2">
          When someone is interested in connecting with you, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Connection Requests
          </h1>
          <p className="text-gray-500 mt-2">
            You have {requests.length} pending
            {requests.length === 1 ? " request" : " requests"}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req) => {
            const user = req.fromUserId;

            if (!user) return null;

            return (
              <div
                key={req._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />

                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        user.photoUrl ||
                        "https://placehold.co/128x128?text=Profile"
                      }
                      alt={`${user.firstName || "User"} ${user.lastName || ""}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://placehold.co/128x128?text=Profile";
                      }}
                      className="w-20 h-20 min-w-20 rounded-full object-cover object-center border-2 border-gray-200 bg-gray-100"
                    />

                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-semibold text-gray-800 break-words">
                        {user.firstName} {user.lastName}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Wants to connect with you
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-6 mt-5 break-words">
                    {user.about || "This user hasn't added a bio yet."}
                  </p>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                      Skills
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {user.skills?.length > 0 ? (
                        user.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-medium px-3 py-1.5 rounded-full"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">
                          No skills listed
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button
                      onClick={() => reviewRequest("rejected", req._id)}
                      disabled={loadingId === req._id}
                      className="rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold py-2.5 hover:bg-gray-100 disabled:opacity-50 transition"
                    >
                      {loadingId === req._id ? "Please wait..." : "Reject"}
                    </button>

                    <button
                      onClick={() => reviewRequest("accepted", req._id)}
                      disabled={loadingId === req._id}
                      className="rounded-xl bg-indigo-600 text-white font-semibold py-2.5 hover:bg-indigo-700 disabled:opacity-50 transition"
                    >
                      {loadingId === req._id ? "Please wait..." : "Accept"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Request;
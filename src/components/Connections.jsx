import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log("Connections data:", res.data);
      dispatch(addConnections(res.data.data)); // store the array of connections
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <h1 className="font-bold text-2xl mb-6 text-center">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {connections.map((conn) => (
          <div
            key={conn._id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition"
          >
            <img
              src={conn.photoUrl || "https://via.placeholder.com/80"}
              alt={`${conn.firstName} ${conn.lastName}`}
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {conn.firstName} {conn.lastName}
              </h2>
              <p className="text-gray-600 text-sm">{conn.about || "No bio available"}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {conn.skills && conn.skills.length > 0 ? (
                  conn.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">No skills listed</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      // ✅ Show success alert
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  // ✅ Auto-dismiss alerts after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex justify-center items-start gap-10 min-h-screen bg-base-200 p-10">
      {/* Edit Form */}
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Edit Profile</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile();
            }}
          >
            {/* First Name */}
            <div className="mt-4">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                value={firstName}
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            {/* Last Name */}
            <div className="mt-4">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                value={lastName}
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            {/* Age */}
            <div className="mt-4">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                value={age}
                placeholder="Enter your age"
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full"
                min="12"
                max="100"
              />
            </div>

            {/* Gender */}
            <div className="mt-4">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Photo URL */}
            <div className="mt-4">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                value={photoUrl}
                placeholder="Enter image URL"
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            {/* About */}
            <div className="mt-4">
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <textarea
                value={about}
                placeholder="Tell us about yourself"
                onChange={(e) => setAbout(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
            </div>

            <button className="btn btn-primary w-full mt-6" type="submit">
              Save Profile
            </button>

            {/* ✅ Alerts with auto-dismiss */}
            {success && (
              <div className="mt-4 alert alert-success shadow-lg">
                <span>{success}</span>
              </div>
            )}
            {error && (
              <div className="mt-4 alert alert-error shadow-lg">
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* UserCard next to form */}
      <UserCard
        user={{
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        }}
      />
    </div>
  );
};

export default EditProfile;

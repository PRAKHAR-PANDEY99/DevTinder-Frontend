import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants"; 

const Login = () => {
  const [emailID, setEmailID] = useState("harsh@gmail.com");
  const [password, setPassword] = useState("Harsh@123");
  const [error, setError] = useState("");   //  error state
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!emailID || !password) {
      setError("Email and password are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailID)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    console.log("Login clicked");
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailID, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      //  Different messages based on backend response
      if (err.response) {
        if (err.response.status === 401) {
          setError("Incorrect password. Please try again.");
        } else if (err.response.status === 404) {
          setError("User not found. Please sign up first.");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      } else {
        setError("Server error. Please try again later.");
      }
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Login</h2>
          {/*  Show error message */}
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={emailID}
                placeholder="Enter your email"
                onChange={(e) => setEmailID(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
            </div>

            <button className="btn btn-primary w-full mt-6" type="submit">
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            Don't have an account?
            <span className="text-primary cursor-pointer ml-1">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

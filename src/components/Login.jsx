
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!emailID || !password) {
      setError("Email and password are required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailID)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailID, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
      console.error(err);
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailID, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Signup failed. Please try again."
      );
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLoginForm) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setError("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          <p className="text-center text-base-content/60">
            {isLoginForm
              ? "Welcome back to DevTinder"
              : "Create your DevTinder account"}
          </p>

          {error && (
            <p className="text-error text-center mt-3">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            {!isLoginForm && (
              <>
                <div className="mt-4">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </>
            )}

            <div className="mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={emailID}
                onChange={(e) => setEmailID(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
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
                minLength={6}
                required
              />
            </div>

            <button
              className="btn btn-primary w-full mt-6"
              type="submit"
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-5">
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={toggleForm}
              className="text-primary font-semibold ml-2 hover:underline"
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
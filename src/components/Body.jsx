
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          BASE_URL + "/profile/view",
          { withCredentials: true }
        );

        dispatch(addUser(res.data.user || res.data));
      } catch (err) {
        console.log(
          "Profile error:",
          err.response?.status,
          err.response?.data
        );

        if (err.response?.status === 401 && location.pathname !== "/login") {
          navigate("/login");
        }
      }
    };

    if (!userData?._id) {
      fetchUser();
    }
  }, [dispatch, navigate, location.pathname, userData?._id]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;

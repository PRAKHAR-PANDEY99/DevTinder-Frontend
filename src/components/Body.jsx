import React, { useEffect } from 'react';
import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector  } from 'react-redux';
import { addUser } from '../utils/userSlice';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store ) => store.user);
const fetchUser = async () => {
  try {
    const res = await axios.get(BASE_URL + "/profile/view", {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.log("User is not logged in.");
      navigate("/login");   
    } else { 
      console.error("Error fetching user:", err);
    }
  }
};
 useEffect(() => {
  if(!userData || !userData.id) {
    fetchUser();
  }
  }, []);
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

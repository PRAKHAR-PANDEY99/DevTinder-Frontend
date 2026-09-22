import React from 'react';
import EditProfile from './EditProfile';   // <-- Import the component
import { useSelector } from 'react-redux';

const Profile = () => {
  const user=useSelector((store)=>store.user);
  console.log("Redux user:", user);

  return user && (
    <div>
        <EditProfile user={user}/>
      
    </div>
  )
}
export default Profile

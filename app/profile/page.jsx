"use client";
import React, { useEffect, useState } from 'react'
import StudentsProfile from './_components/StudentsProfile'
import { getUser } from '../_lib/api/user'
import TeachersProfile from './_components/TeachersProfile';
import Link from 'next/link';
import { useAuth } from '../_lib/AuthContext';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function Profile() {
    const [fullname, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const {user} = useAuth();
    console.log(user);

   
   if(error){
     return <div className='pt-24 pb-16 px-6 lg:px-24'>
        <p className='text-red-500'>{error}</p>
        <Link href="/">Login</Link>
     </div>
   }

  return (
      <div>
      {user?.role === "student" ? <StudentsProfile 
     fullname={user?.fullname} bio={user?.role}
      profilePic={user?.profilePic}  /> : <TeachersProfile
     fullname={user?.fullname} bio={user?.bio} role={user?.role} 
     profilePic={user?.profilePic}  />}
    </div>
  )
}

export default Profile

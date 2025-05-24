"use client";
import React, { useEffect, useState } from 'react'
import StudentsProfile from './_components/StudentsProfile'
import { getUser } from '../_lib/api/user'
import TeachersProfile from './_components/TeachersProfile';
import Link from 'next/link';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function Profile() {
    const [fullname, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
  async function getDetails() {
    try {
      const res = await getUser();
    if (!res) return; 
    setFullName(res.fullname);
    setRole(res.role);
    setProfilePic(res.profilePic);
    setBio(res.bio);
    } catch (error) {
      setError(err.message);
    }
  }

  getDetails();
}, []);
   
   if(error){
     return <div className='pt-24 pb-16 px-6 lg:px-24'>
        <p className='text-red-500'>{error}</p>
        <Link href="/">Login</Link>
     </div>
   }

  return (
      <div>
      {role === "student" ? <StudentsProfile 
     fullname={fullname} bio={bio} role={role}
      profilePic={profilePic} backendUrl={backendUrl} /> : <TeachersProfile
     fullname={fullname} bio={bio} role={role} 
     profilePic={profilePic} backendUrl={backendUrl} />}
    </div>
  )
}

export default Profile

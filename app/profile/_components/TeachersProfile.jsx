"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from "next/link";
import { getUserCreatedCourses } from '@/app/_lib/api/user';
import { calculateAverageRating } from '@/app/_utils/serviceFunctions';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
function TeachersProfile({ fullname, bio, role, profilePic, }) {
   
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
     useEffect(() => {
       const fetchCourses = async () => {
          try {
            const res = await getUserCreatedCourses() || [];
          console.log(res);
          setCourses(res);
          } catch (error) {
             setError(error.message);
          }
       }
       fetchCourses();
     }, [])

    const getProfilePhotoUrl = (profilePhoto) => {
  if (!profilePhoto) return "/placeholder.jpg";
  const cleanPath = profilePhoto.replace(/\\/g, "/").replace(/^\/+/, "");
  return profilePhoto.startsWith("http")
    ? profilePhoto
    : `${backendUrl}/${cleanPath}`;
};


const getCoverPhotoUrl = (coverPhoto) => {
    if (!coverPhoto) return "/placeholder.jpg";
    return coverPhoto.startsWith("http") ? coverPhoto : `${backendUrl}${coverPhoto}`;
  };
  
  if(error){
    return (
    <div>
      <p className='text-red-500'>{error}</p>
    </div>
    )
  }
  return (
    <div className="relative bg-white min-h-screen">
          <section className="bg-[hsl(198,93%,95%)] pt-24 pb-16 px-6 lg:px-24">
            <h2 className="text-black font-bold uppercase text-sm mb-2">{role}</h2>
            <h1 className="text-black font-bold capitalize text-3xl sm:text-4xl">{fullname}</h1>
          </section>
    
          <div className="px-6 lg:px-24 -mt-14">
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white shadow-md rounded-lg w-full max-w-[350px] p-6">
                {profilePic === "" ? <div className="w-40 h-40 sm:w-60 sm:h-60 
                            rounded-full bg-black mx-auto mb-6" /> : 
                            <div className="relative w-40 h-40 sm:w-60 sm:h-60 mx-auto mb-6">
                                <Image
                                    src={getProfilePhotoUrl(profilePic)}
                                    alt="Profile"
                                    fill
                                    className="rounded-full object-cover"
                                    loading="lazy"
                                />
                                </div>   
                            }
                 <Link href="/profile/edit" 
            >
              <button className="w-full m-auto p-[5px] bg-white
             text-themeBlue border-2 border-themeBlue py-2 rounded-md
              hover:bg-themeBlue cursor-pointer hover:text-white transition duration-200">
                Edit Your Profile
              </button>
            </Link>
              </div>
            </div>
          </div>
    
          <div className='mt-10 lg:mt-[-40px]'>
            {bio !== "" && <section className=" pb-12 px-6 lg:px-24">
        <h1 className="text-black mb-2 font-semibold text-xl">About Me</h1>
        <h2 className="text-black font-bold capitalize text-2xl sm:text-3xl max-w-md">{bio}</h2>
</section> }

  <section className=" pb-20 px-6 lg:px-24">
    <h1 className="text-black mb-6 font-semibold text-xl">Your Courses</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <Link href={`/edit-course/${course?._id}`} key={course._id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      <Image
        src={getCoverPhotoUrl(course.coverPhoto)}
        alt="React Logo"
        width={400}
        height={300}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold mb-1">{course.title}</h2>
        <span className="text-sm font-medium text-yellow-500">
          {calculateAverageRating(course.ratings) ? `${calculateAverageRating(course.ratings)} ⭐️` : "—"}
        </span>
      </div>
    </Link>
    ))}
</div>
          </section>
          </div>
        </div>
  )
}

export default TeachersProfile

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUser, getUserCreatedCourses,  getUserEnrolledCourses } from "@/app/_lib/api/user";
import { calculateAverageRating } from "@/app/_utils/serviceFunctions";
import Link from "next/link";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function UserCourses() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [isStudent, setIsStudent] = useState(true);

  const getCoverPhotoUrl = (coverPhoto) => {
    if (!coverPhoto) return "/placeholder.jpg";
    return coverPhoto.startsWith("http") ? coverPhoto : `${backendUrl}${coverPhoto}`;
  };

  useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsUserLoggedIn(false);
      setLoading(false);
      return;
    }

    const userData = await getUser();
    if(userData.role === "teacher"){
      setIsStudent(false);
    }

    if (!userData) {
      setIsUserLoggedIn(false);
      setLoading(false);
      return;
    }

    setIsUserLoggedIn(true);
    setUser(userData);

    const role = userData?.role;

    if (role === "student") {
      const data = await getUserEnrolledCourses();
      setCourses(data);
    } else {
      const data = await getUserCreatedCourses();
      setCourses(data);
    }

    setLoading(false);
  };

  fetchData();
}, []);


  if (!isUserLoggedIn || loading) return null;

  return (
    <div className="text-black pt-8 pb-16 px-6 lg:px-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Your Courses</h1>
      </div>

      {courses.length > 0 &&
      <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map(({ _id, title, coverPhoto, instructorId, ratings }) => (
              <Link href={isStudent ? `/course/${_id}` : `/edit-course/${_id}`}
                key={_id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <Image
                src={getCoverPhotoUrl(coverPhoto)}
                alt={title}
                width={500}
                height={300}
                className="w-full h-50 object-cover"
                loading="lazy"
                />
                <div className="px-4 py-2 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold mb-2">{title}</h2>
                  <p className="text-sm text-gray-600 mb-4 flex-1">
                    {user?.role === "student" &&  instructorId?.fullname}
                  </p>
                  <span className="text-sm font-medium text-yellow-500">
                    {calculateAverageRating(ratings) ? `${calculateAverageRating(ratings)} ⭐️` : "—"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {courses.length > 3 && (
            <div className="mt-8 text-center">
              <button className="px-6 py-2 bg-themeBlue text-white rounded-full hover:bg-blue-600 transition">
                See More
              </button>
            </div>
          )}
          </>
      }
    </div>
  );
}

export default UserCourses;

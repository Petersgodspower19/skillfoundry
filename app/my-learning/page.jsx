"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserEnrolledCourses } from "../_lib/api/user";
import { calculateAverageRating } from "../../app/_utils/serviceFunctions";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function MyLearning() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getUserEnrolledCourses();
        setCourses(res || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const getProfilePhotoUrl = (coverPhoto) => {
    if (!coverPhoto) return "/placeholder.jpg";
    const cleanPath = coverPhoto.replace(/\\/g, "/").replace(/^\/+/, "");
    return coverPhoto.startsWith("http")
      ? coverPhoto
      : `${backendUrl}/${cleanPath}`;
  };

  return (
    <>
    <div className="pt-24 pb-16 px-6 lg:px-24">
      <h2 className="text-2xl font-bold mb-8">My Learning</h2>
      {courses.length === 0 ? (
        <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <Link
              href={`/course/${course._id}`}
              key={course._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
            >
              <Image
                src={getProfilePhotoUrl(course.coverPhoto)}
                alt={course.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {course.instructorId?.fullname}
                </p>
                <span className="text-sm font-medium text-yellow-500">
                  {calculateAverageRating(course.ratings)
                    ? `${calculateAverageRating(course.ratings)} ⭐️`
                    : "—"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default MyLearning;

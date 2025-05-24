"use client";
import React, { useEffect, useState } from "react";
import OverView from "../_components/OverView";
import Reviews from "../_components/Reviews";
import { useParams } from "next/navigation";
import { getCourseDetail, markLessonAsWatched } from "@/app/_lib/api/course";
import { getUser } from "@/app/_lib/api/user";
import Image from "next/image";
import ReviewForm from "@/app/components/ReviewForm";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


function CourseDetails() {
  const [isReviews, setIsReviews] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const getCoverPhotoUrl = (coverPhoto) => {
    if (!coverPhoto) return '/placeholder.jpg'
    if (typeof coverPhoto === 'string') {
      return coverPhoto.startsWith('http')
        ? coverPhoto
        : `${backendUrl}${coverPhoto}`
    }
    if (typeof coverPhoto === 'object' && coverPhoto.src) {
      return coverPhoto.src
    }
    return '/placeholder.jpg'
  }

  
  const getEmbedUrl = (url) => {
  if (!url) return "";

  try {
    const yt = new URL(url);

    // Handle short links like https://youtu.be/VIDEO_ID
    if (yt.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${yt.pathname.slice(1)}`;
    }

    // Handle full links like https://www.youtube.com/watch?v=VIDEO_ID
    if (yt.hostname.includes("youtube.com") && yt.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${yt.searchParams.get("v")}`;
    }

    return url;
  } catch (e) {
    console.error("Invalid YouTube URL:", url);
    return "";
  }
};


const getAttachmentUrl = (filename) => {
  if (typeof filename !== "string") return ""; // or handle it differently
  return filename.startsWith("http")
    ? filename
    : `${backendUrl}/uploads/${filename}`;
};



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getUser();
        const courseData = await getCourseDetail(id);
        console.log(courseData);
        setUser(res);
        setCourse(courseData);

        if (courseData?.lessons && courseData.lessons.length > 0) {
          setCurrentVideoUrl(getEmbedUrl(courseData.lessons[0].videoUrl || ""));
        }

        if (res && Array.isArray(courseData?.students)) {
          const enrolled = courseData.students.some(
            (student) => student._id === res._id
          );
          setIsEnrolled(enrolled);
        }
      } catch (err) {
        setError("Failed to load course data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleWatchedToggle = async (index, lessonId) => {
  try {
    const updatedLessons = [...course.lessons];
    updatedLessons[index].watched = true;
    setCourse((prev) => ({ ...prev, lessons: updatedLessons }));
    await markLessonAsWatched(id, lessonId);
  } catch (error) {
    console.error("Error marking lesson as watched:", error);
  }
};


  const handleLessonClick = (videoUrl) => {
    setCurrentVideoUrl(getEmbedUrl(videoUrl));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f7fafd] font-sans">
      {loading ? (
        <div className="flex items-center justify-center w-full pt-20 text-gray-600 text-lg">
          Loading...
        </div>
      ) : error ? (
        <div className="flex items-center justify-center w-full pt-20 text-red-500 text-lg">
          {error}
        </div>
      ) : (
        <>
          <main className="flex-1 lg:w-4/5 mt-0 lg:mt-8 lg:p-10 p-0 flex flex-col gap-6 pt-[55vh] lg:pt-10">
            <div
              className="lg:relative fixed top-0 left-0 right-0 z-40 bg-[#f7fafd]"
              style={{ height: "55vh" }}
            >
              <div className="h-full rounded-none lg:rounded-lg overflow-hidden shadow-md bg-black">
          {currentVideoUrl ? (
            <iframe
              src={currentVideoUrl}
              title="Course Video"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : (
            <div className="w-full h-full relative">
            <Image
              src={getCoverPhotoUrl(course?.coverPhoto)}
              alt="Course Cover"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
          )}
        </div>
            </div>

            <section
              className="bg-white p-6 rounded-lg shadow-md overflow-auto"
              style={{ height: "fit-content" }}
            >
              <div className="flex mb-4 items-center gap-10 relative z-[10px]">
                <button
                  onClick={() => setIsReviews(false)}
                  className="relative flex flex-col outline-0 items-center text-lg font-medium text-gray-600 transition-all duration-200"
                >
                  Overview
                  <span
                    className={`mt-2 h-[3px] w-full rounded-full transition-all duration-300 ${
                      isReviews ? "bg-transparent" : "bg-gray-600"
                    }`}
                  ></span>
                </button>
                <button
                  onClick={() => setIsReviews(true)}
                  className="relative outline-0 flex flex-col items-center text-lg font-medium text-gray-600 transition-all duration-200"
                >
                  Reviews
                  <span
                    className={`mt-2 h-[3px] w-full rounded-full transition-all duration-300 ${
                      isReviews ? "bg-gray-600" : "bg-transparent"
                    }`}
                  ></span>
                </button>
              </div>

              
              {isReviews ? (
                <>
                <Reviews reviews={course?.ratings || []} />
                {isEnrolled && (
                  <ReviewForm
                    courseId={id}
                    onReviewSubmitted={async () => {
                      try {
                        const updated = await getCourseDetail(id);
                        setCourse(updated);
                      } catch (err) {
                        console.error("Error refreshing course after review", err);
                      }
                    }}
                  />
                )}

                </>
              ) : (
                <OverView
              isEnrolled={isEnrolled}
              rating={course?.ratings}
              ratings={course?.ratings?.length || 0}
              students={course?.students?.length}
              title={course?.title}
              description={course?.description}
              id={id}
              onEnrollSuccess={() => setIsEnrolled(true)} // NEW
            />

              )}
            </section>
          </main>

          {/* Sidebar */}
          <aside
            className="lg:w-1/5 lg:sticky w-full lg:mt-18 lg:h-fit lg:rounded-lg
            border-l border-gray-200 p-4 bg-white shadow-md overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Course Content
            </h2>
            <ul className="space-y-5 mt-8">
  {course?.lessons.map((item, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 text-gray-700"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.watched}
                    onChange={() => handleWatchedToggle(i, item._id)}
                    className="cursor-pointer"
                  />
                  <span
                    onClick={() => handleLessonClick(item.videoUrl)}
                    className="cursor-pointer hover:text-themeBlue"
                  >
                    {item.title || item}
                  </span>
                </div>

                {/* Download link if attachment exists */}
                {item.attachment && (
                  <a
                  href={getAttachmentUrl(item.attachment)}
                  download
                  className="text-sm text-blue-500 hover:underline ml-6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📎 Download Attachment
                </a>

                )}
              </li>
            ))}
          </ul>

          </aside>
        </>
      )}
    </div>
  );
}

export default CourseDetails;

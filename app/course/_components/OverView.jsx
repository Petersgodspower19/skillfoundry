import { enrollCourse } from '@/app/_lib/api/user';
import { calculateAverageRating } from '@/app/_utils/serviceFunctions';
import React from 'react';
import { toast } from 'react-toastify';

function OverView({ isEnrolled, rating, ratings, students, title, description, id, onEnrollSuccess }) {
  
  const handleEnroll = async (id) => {
    try {
      await enrollCourse(id);
      toast.success("Successfully enrolled in course");
      if (typeof onEnrollSuccess === "function") {
        onEnrollSuccess(); 
      }
    } catch (error) {
      toast.error(error.message || "Failed to enroll");
    }
  };

  return (
    <div>
      {!isEnrolled && (
        <div className="flex gap-4 mb-6">
          <button onClick={() => handleEnroll(id)}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
            Enroll Now
          </button>
        </div>
      )}

      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
        {title}
      </h1>
      <p className="text-gray-600 mb-4">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm mb-5 text-gray-600">
        <span className="text-yellow-500 text-base font-semibold">⭐ {calculateAverageRating(rating) || 4.7}</span>
        <span>{ratings || 0} ratings</span>
        <span>{students || 0} students</span>
      </div>
    </div>
  );
}

export default OverView;

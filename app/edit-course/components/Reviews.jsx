import { formatDate } from '@/app/_utils/serviceFunctions';
import React from 'react';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function Reviews({ ratings = [] }) {
    const getProfilePhotoUrl = (profilePhoto) => {
  if (!profilePhoto) return "/placeholder.jpg";
  const cleanPath = profilePhoto.replace(/\\/g, "/").replace(/^\/+/, "");
  return profilePhoto.startsWith("http")
    ? profilePhoto
    : `${backendUrl}/${cleanPath}`;
};
  if (ratings.length === 0) {
    return <p className="text-gray-600">No reviews yet.</p>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">Course Reviews</h3>

      {ratings.map((item) => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row items-start gap-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          
          <img
            src={getProfilePhotoUrl(item.studentId.profilePic)}
            alt={item.studentId.fullname}
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <p className="font-medium text-gray-900">{item.studentId.fullname}</p>

          
            <span className="text-yellow-500">⭐ {item.rating}</span>

            <p className="text-gray-700">{item.review}</p>
            <p className="text-xs text-gray-400 mt-1">
              {formatDate(item.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;

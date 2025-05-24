import Image from 'next/image';
import React from 'react';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function Reviews({ reviews }) {

  

     const getProfilePhotoUrl = (profilePhoto) => {
  if (!profilePhoto) return "/placeholder.jpg";
  const cleanPath = profilePhoto.replace(/\\/g, "/").replace(/^\/+/, "");
  return profilePhoto.startsWith("http")
    ? profilePhoto
    : `${backendUrl}/${cleanPath}`;
};

  return (
    <div className="space-y-4">
      {reviews.length < 1 ? (
        <p>No Reviews Yet</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="p-4 rounded-md shadow-sm bg-gray-50">
            <div className="flex justify-between mb-2">
              <div className='flex items-center gap-1.5'>
                <img
              src={getProfilePhotoUrl(review.studentId?.profilePic)}
              alt="profile picture"
              className="rounded-full object-cover w-8 h-8"
              />
                <h3 className="font-semibold text-gray-800">
                {review.studentId.fullname}
              </h3>
              </div>
              <span className="text-yellow-500">⭐ {review.rating}</span>
            </div>
            <p className="text-gray-700">{review.review}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Reviews;

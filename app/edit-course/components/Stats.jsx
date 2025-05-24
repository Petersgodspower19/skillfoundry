import React from 'react';

function Stats({ course }) {
  if (!course || Object.keys(course).length === 0) {
    return <p className="text-gray-600">Loading stats...</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">{course.title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Students Enrolled</p>
          <p className="text-3xl font-semibold text-gray-800">
            {course.students?.length || 0}
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Lessons</p>
          <p className="text-3xl font-semibold text-gray-800">
            {course.lessons?.length || 0}
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Reviews</p>
          <p className="text-3xl font-semibold text-gray-800">
            {course.ratings?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stats;

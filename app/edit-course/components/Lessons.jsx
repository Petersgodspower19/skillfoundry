import React, { useState } from 'react';
import EditLesson from './EditLesson'; 

function Lessons({ lessons, courseId }) {
  const [selectedLesson, setSelectedLesson] = useState(null);


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Course Lessons</h2>
      {lessons?.length === 0 && <p>No lessons added yet.</p>}
      <ul className="space-y-4">
        {lessons.map((lesson) => (
          <li key={lesson._id} className="p-4 bg-gray-100 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{lesson.title}</h3>
                {lesson.videoUrl && (
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    Watch Video
                  </a>
                )}
              </div>
              <button
                onClick={() => setSelectedLesson(lesson)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedLesson && (
        <EditLesson
          lesson={selectedLesson}
          courseId={courseId}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
}

export default Lessons;

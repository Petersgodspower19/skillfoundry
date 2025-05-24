import { editLesson } from '@/app/_lib/api/course';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Edit({ onClose, lesson, courseId }) {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [existingAttachments, setExistingAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title || '');
      setVideoUrl(lesson.videoUrl || '');
      setExistingAttachments(lesson.attachment || []);
    }
  }, [lesson]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(false);

  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('videoUrl', videoUrl);
    attachments.forEach((file) => {
      formData.append('attachments', file);
    });
    await editLesson(courseId, lesson._id, formData);
    toast.success('Lesson updated');
    onClose();
  } catch (err) {
    console.error(err);
    toast.error(err.message);
    setError(true);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 animate-fadeIn relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Lesson</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Update lesson title"
              required
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Update video URL"
              required
            />
          </div>

          {/* Existing Attachments */}
          {existingAttachments.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Attachments</label>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {existingAttachments.map((file, idx) => (
                  <li key={idx}>
                    <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {file.split('/').pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* New Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload New Attachments <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="file"
              multiple
              accept=".pdf,.jpeg,.jpg,.png"
              onChange={handleFileChange}
              className="w-full file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:border-0 hover:file:bg-blue-700 text-sm text-gray-600"
            />
            {attachments.length > 0 && (
              <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                {attachments.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Close Icon */}
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Edit;

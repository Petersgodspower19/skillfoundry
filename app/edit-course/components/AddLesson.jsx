import { addLesson } from '@/app/_lib/api/course';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function AddLesson({courseId}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const handleSubmit = async (e) => {
   try {
       e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('videoUrl', videoUrl);
    attachments.forEach((file) => {
      formData.append('attachments', file);
    });

    await addLesson(courseId, formData);
    toast.success("Lesson created Successfully. Reload page for changes to occur");
   } catch (error) {
      toast.error(error.message)
   }
  };

  return (
    <div className="max-w-3xl  bg-white p-4 ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📚 Add a New Lesson</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Lesson Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter lesson title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a brief description..."
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Video URL</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="youtube video url"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Attachments (PDF, JPEG, PNG) <span className="text-sm text-gray-500">(optional)</span>
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={handleFileChange}
            className="w-full text-gray-600 file:bg-themeBlue file:text-white file:rounded-md file:px-4 file:py-2 file:border-0 hover:file:bg-blue-400"
          />
          {attachments.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              {attachments.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-themeBlue hover:bg-blue-400 text-white font-medium px-6 py-2 rounded-md shadow transition-all duration-200"
          >
            Create Lesson
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLesson;

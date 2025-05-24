'use client'

import React, { useState } from 'react'
import { createCourse } from '../_lib/api/course'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CreateCourse() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [coverPhoto, setCoverPhoto] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !coverPhoto || !tag) {
      toast.error('Please fill in all fields')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('coverPhoto', coverPhoto)
    formData.append('tag', tag);
    

    try {
      setLoading(true)
      await createCourse(formData)
      toast.success('Course created successfully!')

      // Reset form
      setTitle('')
      setDescription('')
      setTag('')
      setCoverPhoto(null)
      e.target.reset()
    } catch (err) {
      console.error(err)
      toast.error('Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  return (
   
    <div className='pt-20 px-6 py-10 lg:px-24 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Create New Course</h1>

      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-xl shadow-lg space-y-6'
      >
        {/* Title */}
        <div>
          <label className='block text-gray-700 font-medium mb-2'>
            Course Title
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='e.g. Introduction to AI'
          />
        </div>

        {/* Description */}
        <div>
          <label className='block text-gray-700 font-medium mb-2'>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Brief overview of the course'
            rows={4}
          />
        </div>

        {/* Tags */}
        <div>
          <label className='block text-gray-700 font-medium mb-2'>
            Tag 
          </label>
          <input
            type='text'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='e.g. ai, machine learning, python'
          />
        </div>

        {/* Cover Photo */}
        <div>
          <label className='block text-gray-700 font-medium mb-2'>
            Cover Photo
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setCoverPhoto(e.target.files[0])}
            className='w-full text-gray-600'
          />
        </div>

        
        <button
          type='submit'
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${
            loading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-themeBlue hover:bg-blue-400'
          }`}
        >
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
   
  )
}

export default CreateCourse

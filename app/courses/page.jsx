'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCourses } from '../_lib/api/course'
import { groupByTag } from '../_utils/serviceFunctions'


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

function Courses() {
  const [courses, setCourses] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [groupedCourses, setGroupedCourses] = useState({})

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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsAuthenticated(false)
    }
    const fetchData = async () => {
  try {
    const courseData = await getAllCourses();
    setCourses(courseData);
    const grouped = groupByTag(courseData);
    setGroupedCourses(grouped);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}
fetchData();
  }, [])

 

  return (
      <section className='min-h-screen bg-gray-100 text-black pt-16 px-6 py-10 lg:px-24'>
      <h1 className='text-3xl font-bold mb-8'>All Courses</h1>

      {Object.entries(groupedCourses).map(([tag, taggedCourses]) => (
        <div key={tag} className='mb-10'>
          <h2 className='text-xl font-semibold mb-4 capitalize'>{tag}</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {taggedCourses.map((course) => (
              <Link
                href={isAuthenticated ? `/course/${course._id}` : '/login'}
                key={course._id}
                className='bg-white rounded-xl shadow-md overflow-hidden flex flex-col'
              >
                <Image
                  src={getCoverPhotoUrl(course.coverPhoto)}
                  alt={course.title}
                  width={500}
                  height={300}
                  className='w-full h-52 object-cover'
                  loading='lazy'
                />
                <div className='p-4 flex-1 flex flex-col'>
                  <h3 className='text-lg font-semibold mb-1'>{course.title}</h3>
                  <p className='text-sm text-gray-600 mb-3'>
                    {course.instructorId?.fullname || course.author || 'Instructor'}
                  </p>
                  <span className='text-sm font-medium text-yellow-500'>
                    {course.ratings?.length
                      ? `${(
                          course.ratings.reduce((sum, r) => sum + r.rating, 0) /
                          course.ratings.length
                        ).toFixed(1)} ⭐️`
                      : '—'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
      </section>
  )
}

export default Courses

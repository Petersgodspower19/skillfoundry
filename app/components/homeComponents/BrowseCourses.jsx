'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCourses } from '@/app/_lib/api/course'
import { getUser } from '@/app/_lib/api/user'
import { useAuth } from '@/app/_lib/AuthContext'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

function BrowseCourses() {
  const [courses, setCourses] = useState([])
  const [user, setUser] = useState([])
  const {isStudent, hasToken} = useAuth();

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
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses() || [];
        setCourses(data.slice(0, 3))
      } catch (err) {
        console.error('Failed to fetch courses:', err)
      }
    }
    fetchCourses()
  }, [])

  

  
  if (!isStudent) return null

  return (
    <section className='bg-[hsl(0,0%,97%)] text-black pt-8 pb-16 px-6 lg:px-24'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-6'>
        <h1 className='text-2xl font-semibold'>Browse Courses</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {courses.map((course) => (
          <Link
            href={hasToken ? `/course/${course._id}` : '/login'}
            key={course._id}
            className='bg-white rounded-xl shadow-lg overflow-hidden flex flex-col'
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
              <h2 className='text-lg font-semibold mb-2'>{course.title}</h2>
              <p className='text-sm text-gray-600 mb-4 flex-1'>
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

      {courses.length > 0 && (
        <div className='mt-8 text-center'>
          <Link href='/courses'>
            <button className='px-6 py-2 bg-themeBlue text-white rounded-full hover:bg-blue-600 transition'>
              See More
            </button>
          </Link>
        </div>
      )}
    </section>
  )
}

export default BrowseCourses

"use client";
import React, { useEffect, useState } from 'react';
import { searchCourse } from '../_lib/api/course';
import { calculateAverageRating } from '../_utils/serviceFunctions';
import Link from 'next/link';

function Search({ searchText, onSelectResult }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedText, setDebouncedText] = useState(searchText);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


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
    const handler = setTimeout(() => {
      setDebouncedText(searchText);
    }, 500); 

    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    if (debouncedText.trim()) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await searchCourse(debouncedText);
          setResults(data);
        } catch (err) {
          console.error("Search error:", err.message);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setResults([]);
    }
  }, [debouncedText]);

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-md p-4 mt-4 z-50">
      {loading ? (
        <p className="text-gray-500">Searching...</p>
      ) : results.length > 0 ? (
        <ul className="space-y-2">
          {results.map((course) => (
  <Link href={`/course/${course._id}`} key={course._id}>
    <a
      onClick={onSelectResult}
      className="flex items-start gap-4 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
    >
      <img
        src={getCoverPhotoUrl(course.coverPhoto)}
        alt={course.title}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm text-black">{course.title}</h3>
        <p className="text-xs text-gray-600">By {course.instructorId.fullname}</p>
        {course.ratings?.length > 0 ? (
          <p className="text-xs text-yellow-600">
            {calculateAverageRating(course.ratings)} ⭐
          </p>
        ) : (
          <p className="text-xs text-gray-400">No ratings yet</p>
        )}
      </div>
    </a>
  </Link>
))}

        </ul>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
}

export default Search;

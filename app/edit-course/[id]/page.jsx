'use client';
import React, { useEffect, useState } from 'react';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';
import Lessons from '../components/Lessons';
import AddLesson from '../components/AddLesson';
import { Menu } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getUser } from '@/app/_lib/api/user';
import { getCourseDetail } from '@/app/_lib/api/course';



function CourseDetails() {
  const [selectedKey, setSelectedKey] = useState('Stats');
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [course, setCourse] = useState([]);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {id} = useParams();

  const paths = [
  { name: 'Stats', component: <Stats />, key: 'Stats' },
  { name: 'Reviews', component: <Reviews />, key: 'Reviews' },
  { name: 'Lessons', component: <Lessons />, key: 'Lessons' },
  { name: 'Add Lesson', component: <AddLesson  courseId={id}/>, key: 'Add Lesson' },
];

  useEffect(() => {
      const fetchData = async () => {
         setLoading(true)
         try {
           const res = await getUser();
           const courseData = await getCourseDetail(id);
           console.log(courseData);
           setUser(res);
           setCourse(courseData); 
           
           if (courseData.instructorId?._id === res?._id) {
                setIsAuthenticated(true);
                }

         } catch (err) {
        setError("Failed to load course data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
      }
      fetchData();
  }, [])

  const activeComponent = () => {
  const current = paths.find((p) => p.key === selectedKey);
  if (!current) return null;

  if (current.key === 'Stats') {
    return <Stats course={course} />;
  }
  if (current.key === 'Reviews') {
    return <Reviews ratings={course.ratings} />;
  }
  if (current.key === 'Lessons') {
  return <Lessons lessons={course.lessons} courseId={id} />;
}

if(current.key === "Add Lessson"){
  return <AddLesson courseId={id} />
}


  return current.component;
};



  return (
    <div className="flex flex-col lg:flex-row h-screen pt-24 pb-16 px-6 lg:px-24 ">
      <aside className="bg-white border-r shadow-sm w-full rounded-l-[10px] lg:w-64 flex-shrink-0 z-20">
        <div className="lg:hidden p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-xl">📚 Course Menu</h2>
          <button onClick={() => setShowSidebar((prev) => !prev)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className={`lg:block ${showSidebar ? 'block' : 'hidden'} p-4 space-y-2`}>
          {paths.map((path) => (
            <button
              key={path.key}
              onClick={() => {
                setSelectedKey(path.key);
                setShowSidebar(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg transition
                 text-gray-700 hover:bg-blue-400 hover:text-white outline-0 font-medium ${
                selectedKey === path.key ? 'bg-themeBlue text-white' : ''
              }`}
            >
              {path.name}
            </button>
          ))}
        </nav>
      </aside>

      
      <main className="flex-1 overflow-y-auto p-3 lg:p-10 rounded-l-[10px] bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">📚 Course Overview</h1>
        <div className="bg-white shadow rounded-lg p-3 md:p-6 transition hover:shadow-md">
          {activeComponent()}
        </div>
      </main>

      
    </div>
  );
}

export default CourseDetails;

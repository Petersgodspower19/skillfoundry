import React from 'react'
import Hero from './components/homeComponents/Hero'
import Journey from './components/homeComponents/Journey'
import BrowseCourses from './components/homeComponents/BrowseCourses'
import UserCourses from './components/homeComponents/UserCourses'
import Testimonial from './components/homeComponents/Testimonial'

function Home() {
  return (
    <div>
      <Hero />
      <Journey />
      <BrowseCourses />
      <UserCourses />
      <Testimonial />
    </div>
  )
}

export default Home

import React from 'react'

function Journey() {
  const steps = [
    {
      number: '01',
      title: 'Register & Login',
      desc: 'Sign up as a student or teacher and access your dashboard.'
    },
    {
      number: '02',
      title: 'Search for Courses',
      desc: 'Browse our catalog and find the right courses for you.'
    },
    {
      number: '03',
      title: 'Learn & Engage',
      desc: 'Start learning, join discussions, and track your progress.'
    }
  ]

  return (
    <section className="text-black pt-5 pb-16 px-6 lg:px-24">
      {/* Heading */}
      <div className="max-w-xl text-start">
        <h1 className="text-2xl lg:text-3xl font-semibold leading-tight mb-4">
          Your Online Journey Made Easy
        </h1>
        <p className="text-lg mb-8 text-gray-800">
          Start your journey to mastering new skills with expert-led courses tailored for students and teachers.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map(({ number, title, desc }) => (
          <div key={number} className="flex flex-col items-start">
            {/* Circle Number */}
            <div className="bg-themeBlue text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="font-bold text-lg">{number}</span>
            </div>
            {/* Step Text */}
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Journey

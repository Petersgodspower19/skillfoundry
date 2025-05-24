import React from 'react'
import Testimonials from './Testimonials'

export default function Testimonial() {
  return (
    <section className="bg-[hsl(0,0%,97%)] py-16 px-6 lg:px-24">
      {/* Header */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
        {/* Text Block */}
        <div className="space-y-4">
          <h1 className="text-3xl lg:text-4xl font-semibold text-black">
            Client <span className="text-themeBlue">Testimonials</span>
          </h1>
          <h2 className="text-4xl lg:text-5xl font-bold text-black">
            Hear What Our <span className="text-themeBlue">Clients</span> Have to Say
          </h2>
          <p className="text-gray-800 opacity-80">
            Welcome to our testimonials section, where you can discover what our
            satisfied clients have to say about their learning journeys.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <h3 className="text-3xl font-bold text-black">2.7<span className="text-themeBlue">k</span></h3>
            <div className="h-6 w-px bg-gray-400" />
            <p className="text-sm text-gray-800 opacity-80">
              Real feedback from our valued clients
            </p>
          </div>
        </div>

        {/* Carousel */}
        <Testimonials />
      </div>
    </section>
  )
}

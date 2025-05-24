"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const testimonials = [
  {
    username: "john_doe23",
    text: "This platform has completely changed the way I manage my learning journey. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    occupation: "Project Manager",
  },
  {
    username: "sophia_writes",
    text: "Amazing experience! The community and support were incredibly helpful throughout my journey.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    occupation: "Business Analyst",
  },
  {
    username: "michael_trader",
    text: "I've seen significant improvements in my skills and confidence. The courses are top-notch!",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    occupation: "Financial Analyst",
  },
  {
    username: "emma_invests",
    text: "A fantastic platform for both beginners and pros. Love the simplicity and interactivity.",
    image: "https://randomuser.me/api/portraits/women/62.jpg",
    occupation: "Entrepreneur",
  },
];

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 1280, settings: { slidesToShow: 2 } }
    ],
  };

  return (
    <div className="w-full">
      <Slider {...settings} className="gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="px-2">
            <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col h-full">
              <p className="text-gray-700 mb-6 flex-1">“{t.text}”</p>
              <div className="flex items-center mt-auto">
                <img
                loading="lazy"
                  src={t.image}
                  alt={t.username}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{t.username}</h3>
                  <p className="text-sm text-themeBlue">{t.occupation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

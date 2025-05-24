'use client';
import React, { useEffect, useState } from 'react';
import hero from './assets/hero.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_lib/AuthContext';


function Hero() {
  const router = useRouter();
   const { hasToken, user } = useAuth();
  

  const handleClick = () => {
    router.push(hasToken ? '/profile' : '/login');
  };

  return (
    <section className="text-black pt-24 pb-16 px-6 lg:px-24 min-h-[90vh] flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-10">
      
      {user && (
      <div className="lg:absolute lg:top-20 lg:left-1/2 lg:transform lg:-translate-x-1/2 text-center text-sm sm:text-base md:text-lg font-medium text-gray-700 bg-gray-100 px-4 sm:px-6 py-2 rounded-full shadow mx-auto lg:mx-0 mt-4 lg:mt-0 w-fit">
        Welcome, {user.fullname} 👋
      </div>
    )}

      <div className="max-w-xl text-start lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-4">
          Empower Your Future<br />
          with <span className="text-themeBlue">SkillFoundry</span>
        </h1>
        <p className="text-lg mb-6 text-gray-800">
          Start your journey to mastering new skills with expert-led courses tailored for students and teachers.
        </p>
        <button
          onClick={handleClick}
          className="bg-themeBlue text-white font-semibold px-6 py-3 rounded-lg shadow-md
            transition"
        >
          {hasToken ? 'View My Learning' : 'Get Started'}
        </button>
      </div>

      <div className="w-full max-w-[500px] m-auto">
        <Image
          src={hero}
          alt="SkillFoundry Hero"
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
}

export default Hero;

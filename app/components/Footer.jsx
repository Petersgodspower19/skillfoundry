"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import Link from 'next/link';
import { useAuth } from '../_lib/AuthContext';

export default function Footer() {
  const {hasToken} = useAuth();
  const pathname = usePathname();
  const router = useRouter();


 const handleLogOut = () => {
  router.push("/");
  localStorage.removeItem("token");
window.dispatchEvent(new Event("token-change"));
};

  
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white py-12 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">SkillFoundry</h2>
          <p className="text-gray-400">
            Empowering learners and educators with industry‑ready courses. Join thousands of students and teachers growing their skills every day.
          </p>
          <div className="flex items-center space-x-4">
            {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="text-gray-400 hover:text-themeBlue transition"
                aria-label="social link"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          {hasToken ? <ul className="space-y-2">
           
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-themeBlue transition"
                >
                  Home
                </Link>
              </li>
               <li>
                <Link
                  href="/profile"
                  className="text-gray-400 hover:text-themeBlue transition"
                >
                  Profile
                </Link>
              </li>
              <li onClick={handleLogOut}
              className='text-gray-400 hover:text-themeBlue transition'>Log Out</li>
           
          </ul> : <ul className="space-y-2">
           
              <li>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-themeBlue transition"
                >
                  Login
                </Link>
              </li>
               <li>
                <Link
                  href="/register"
                  className="text-gray-400 hover:text-themeBlue transition"
                >
                  Register
                </Link>
              </li>
              
           
          </ul>}
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">
            123 Learning Lane
            <br />
            Knowledge City, ED 45678
          </p>
          <p className="mt-2 text-gray-400">Email: support@skillfoundry.com</p>
          <p className="mt-1 text-gray-400">Phone: +1 (234) 567-890</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} SkillFoundry. All rights reserved.
      </div>
    </footer>
  );
}

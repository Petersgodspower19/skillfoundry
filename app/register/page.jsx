"use client";
import React, { useState } from 'react'
import hero from "../login/assets/login-hero.svg"
import heroMobile from "../login/assets/login-hero-mobile.svg"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify"


function Register() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [role, setRole] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!fullname || !email || !password || !role) {
    setErrorMsg("All fields are required.");
    return;
  }
  setLoading(true);
  setErrorMsg("");

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullname, email, password, role })
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMsg(data?.message || "Something went wrong");
      toast.error(data?.message || "Sign Up Failed");
    } else {
      toast.success("You've successfully created an account with SkillFoundry");
      router.push('/login');
    }

  } catch (error) {
    setErrorMsg("Something went wrong. Try again.");
    toast.error("Sign Up Failed. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className='min-h-screen bg-white'>
      <header className='fixed top-0 left-0 w-full bg-white shadow-md z-10'>
        <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-center'>
          <h1 className='text-2xl font-bold text-gray-800'>SkillFoundry</h1>
        </div>
      </header>

      <main className='pt-28 lg:pt-36 flex flex-col lg:flex-row gap-8 items-center justify-center px-4'>
        <div className='w-full max-w-xs sm:max-w-sm md:max-w-md'>
          <Image src={hero} alt="Register visual" className='w-full hidden lg:block h-auto' />
          <Image src={heroMobile} alt="Register visual" className='w-full block lg:hidden h-auto' />
        </div>

        <form onSubmit={handleSubmit} className='w-full max-w-sm bg-gray-100 p-6 rounded-xl shadow-lg'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Create an Account</h2>

          {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

          <label className='block mb-1 text-sm font-medium text-gray-700'>Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            className='w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeBlue'
          />

          <label className='block mb-1 text-sm font-medium text-gray-700'>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className='w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeBlue'
          />

          <label className='block mb-1 text-sm font-medium text-gray-700'>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className='w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeBlue'
          />

          <label className='block mb-1 text-sm font-medium text-gray-700'>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeBlue'
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className='w-full bg-themeBlue text-white py-2 rounded-lg hover:bg-blue-400 transition duration-200'
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className='text-sm text-gray-600 mt-4 text-center'>
            Already have an account? <Link href="/login" className='text-themeBlue font-bold hover:underline'>Login</Link>
          </p>
        </form>
      </main>
    </div>
  )
}

export default Register;

'use client';
import React, { useState } from 'react';
import hero from "./assets/login-hero.svg";
import heroMobile from "./assets/login-hero-mobile.svg";
import Image from 'next/image';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg(''); 
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || 'Login failed');
        return;
      }
      console.log(data);
      if (data?.token) {
        localStorage.setItem("token", data?.token);
       window.dispatchEvent(new Event("token-change"));
        setLoading(false);
        router.push('/'); 
        toast.success("Logged in successfully");
      } else {
        setErrorMsg(data?.message || "Login failed. Please try again.");
        toast.error("Login Failed, try again");
        setLoading(false);
      }
    }  catch (error) {
  setErrorMsg("An error occurred. Please try again.");
  console.error("Login error:", error);
  toast.error(`Login Failed, ${error?.message || "Something went wrong"}`);
  setLoading(false);
}

  }

  return (
    <div className='min-h-screen bg-white'>
      <header className='fixed mb-16 top-0 left-0 w-full bg-white shadow-md z-10'>
        <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-center'>
          <h1 className='text-2xl font-bold text-gray-800'>SkillFoundry</h1>
        </div>
      </header>

      <main className='pt-28 lg:pt-36 flex flex-col lg:flex-row gap-8 items-center justify-center px-4'>
        <div className='w-full max-w-xs sm:max-w-sm md:max-w-md'>
          <Image src={hero} alt="Login visual" className='w-full hidden lg:block h-auto' />
          <Image src={heroMobile} alt="Login visual" className='w-full block lg:hidden h-auto' />
        </div>

        <form onSubmit={handleSubmit} className='w-full max-w-sm bg-gray-100 p-6 rounded-xl shadow-lg'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Login with Email</h2>

          <label className='block mb-2 text-sm font-medium text-gray-700'>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className='w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <label className='block mb-2 text-sm font-medium text-gray-700'>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className='w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <button
            type="submit"
            className='w-full bg-themeBlue text-white py-2 rounded-lg hover:bg-blue-400 transition duration-200'
          >
            {loading ? "Loggin In": "Login"}
          </button>

          {errorMsg && (
            <p className='text-red-600 text-sm mt-3 text-center'>{errorMsg}</p>
          )}

          <p className='text-sm text-gray-600 mt-4 text-center'>
            Don’t have an account? <Link href="/register" className='text-themeBlue font-semibold hover:underline'>Sign up</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;

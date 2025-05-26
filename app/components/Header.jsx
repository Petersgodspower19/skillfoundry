"use client";
import React, { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';
import { getUser } from '../_lib/api/user';
import Search from './Search';
import { useAuth } from '../_lib/AuthContext';



export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState([]);
  const pathname = usePathname();
  const router = useRouter();
  const { hasToken, isStudent } = useAuth();

  

// useEffect(() => {
//   const checkToken = () => {
//     const token = localStorage.getItem("token");
//     if(token){
//       setHasToken(true);
//     }
//   };
//   checkToken(); 

//   window.addEventListener("token-change", checkToken);
//   return () => window.removeEventListener("token-change", checkToken);
// }, []);




  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(open => !open);
  const toggleSearch = () => setSearchOpen(prev => !prev);

  if (pathname === '/login' || pathname === '/register') return null;

  const navLink = (label, url) => (
    <a
      onClick={() => {
        router.push(url);
      }}
      className="hover:text-gray-500 cursor-pointer transition-colors"
    >
      {label}
    </a>
  );

  const mobileNavLink = (label, url) => (
      <a
      onClick={() => {
        router.push(url);
        toggleMenu();
      }}
      className="hover:text-gray-500 cursor-pointer transition-colors"
    >
      {label}
    </a>
  ) 

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-60 transition-colors duration-300
          px-4 py-3 flex items-center justify-between 
          ${isScrolled ? 'shadow-lg bg-white text-gray-800' : 'bg-themeBlue text-white'}`}
        >

  
        <button onClick={toggleMenu} className="text-2xl lg:hidden">
          <HiMenu />
        </button>

       
        <div className="flex-1 mx-4">
          {!searchOpen ? (
  <Link href="/" className="text-xl font-bold">SkillFoundry</Link>
) : (
  <div className="relative">
    <input
      type="text"
      autoFocus
      placeholder="Search courses..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className={`w-full px-3 py-1 rounded-md text-black transition-all duration-300  ${
        isScrolled ? "" : "focus:ring-2 focus:ring-white focus:outline-none"
      }`}
    />
   <Search 
  searchText={searchText} 
  onSelectResult={() => {
    setSearchOpen(false); 
    setSearchText('');  
  }} 
/>

  </div>
)}
        </div>

        <nav className="hidden lg:flex gap-6">
          
          {hasToken ? (
  <>
    {navLink("Home", "/")}
    {isStudent && navLink("Courses", "/courses")}
    {isStudent && navLink("My-Learning", "/my-learning")}
    {!isStudent && navLink("Create Course", "/add-course")}
    <div className='flex items-center gap-2'>
      <Link href="/notifications"><IoIosNotifications  className='text-2xl'/></Link>
      <Link href="/profile"><CgProfile className='text-2xl'/></Link>
    </div>
  </>
) : (
  <>
    {navLink("Login", "/login")}
    {navLink("Register", "/register")}
  </>
)}

        </nav>

        {/* Search Button */}
        {hasToken  && <div className="ml-4 flex items-center">
          
            {searchOpen ? (
              <button onClick={toggleSearch}><HiX className="text-2xl cursor-pointer" /></button>
            ) : (
             <div className='flex items-center gap-2'>
              <Link href="/notifications"><IoIosNotifications className='md:hidden text-2xl' /></Link>
               {isStudent && <button onClick={toggleSearch}>
               <FiSearch className="text-xl cursor-pointer" />
               </button>}
             </div>
            )}
          
        </div>}
      </header>

      <aside className={`fixed top-0 left-0 h-full w-68 bg-white shadow-xl z-70 transform transition-transform duration-300
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-row-reverse items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={toggleMenu} className="text-2xl">
            <HiX />
          </button>
        </div>
        <nav className="flex flex-col gap-4 px-4 pt-6">
          {mobileNavLink("Home", "/")}
          {hasToken ? (
            <>
              {isStudent && mobileNavLink("Courses", "/courses")}
            {isStudent && mobileNavLink("My-Learning", "/my-learning")}
            {!isStudent && mobileNavLink("Create Course", "/add-course")}
              {mobileNavLink("Profile", "/profile")}
            </>
          ) : (
            <>
              {mobileNavLink("Login", "/login")}
              {mobileNavLink("Register", "/register")}
            </>
          )}
        </nav>
      </aside>

      {menuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-white/70 backdrop-blur-sm z-20"
        />
      )}
    </>
  );
}

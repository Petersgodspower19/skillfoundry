"use client";
import React, { useEffect, useState } from "react";
import EditProfilePicture from "../_components/EditProfilePicture";
import EditProfileInformation from "../_components/EditProfileInformation";
import EditPassword from "../_components/EditPassword";
import { getUser } from "../../_lib/api/user";
import Image from "next/image";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function Edit() {
  const [selectedKey, setSelectedKey] = useState("Profile Information");
  const [user, setUser] = useState({});

  const paths = [
    {
      name: "Profile Picture",
      component: <EditProfilePicture />,
      key: "Profile Picture",
    },
    {
      name: "Profile Information",
      component: <EditProfileInformation />,
      key: "Profile Information",
    },
    {
      name: "Privacy Settings",
      component: <EditPassword />,
      key: "Privacy Settings",
    },
  ];

  useEffect(() => {
    async function getDetails() {
      const res = await getUser();
      setUser(res);
    }
    getDetails();
  }, []);

  const getProfilePhotoUrl = (profilePhoto) => {
    if (!profilePhoto) return "/placeholder.jpg";
    return profilePhoto.startsWith("http")
      ? profilePhoto
      : `${backendUrl}/${profilePhoto.replace(/\\/g, "/")}`;
  };

  const selectedComponent = paths.find((opt) => opt.key === selectedKey)?.component;

  return (
    <div className="pt-24 pb-16 px-6 lg:px-24 bg-white ">
      <section className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
              <Image
                src={getProfilePhotoUrl(user?.profilePic)}
                alt="Profile"
                fill
                className="rounded-full object-cover"
                loading="lazy"
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">{user?.fullname}</h1>
            <p className="text-sm italic text-gray-500">{user?.bio}</p>
          </div>

          <nav className="flex flex-col gap-2">
            {paths.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelectedKey(opt.key)}
                className={`px-4 py-2 rounded-md text-left transition-colors duration-150 text-sm ${
                  selectedKey === opt.key
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {opt.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Display */}
        <main className="flex-1 bg-white 
        p-4 shadow-sm rounded-xl border border-gray-200 min-h-[300px]">
          {selectedComponent}
        </main>
      </section>
    </div>
  );
}

export default Edit;

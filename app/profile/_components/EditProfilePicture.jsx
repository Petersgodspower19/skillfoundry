"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getUser } from "../../_lib/api/user";
import { toast } from 'react-toastify';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function EditProfilePicture() {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading

  useEffect(() => {
    async function getDetails() {
      try {
        const res = await getUser();
        setUser(res);
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
    getDetails();
  }, []);

  const getProfilePhotoUrl = (profilePhoto) => {
    if (!profilePhoto) return "/placeholder.jpg";
    return profilePhoto.startsWith("http")
      ? profilePhoto
      : `${backendUrl}/${profilePhoto.replace(/\\/g, "/")}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
  if (!selectedFile) return;
  setIsUploading(true);

  try {
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token missing");

    const endpoint = user?.profilePic === ""
      ? `${backendUrl}/user/add-profilePicture`
      : `${backendUrl}/user/edit-profilePicture`;

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Upload failed");
    }

    const updatedUser = await getUser();
    setUser(updatedUser);
    setSelectedFile(null);
    setPreview(null);
    window.location.reload();
    toast.success("Profile picture updated successfully");
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error(error.message || "Something went wrong");
  } finally {
    setIsUploading(false);
  }
};


  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading profile photo...</div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10 px-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-1">
        Edit Profile Picture
      </h1>
      <p className="text-sm text-center text-gray-500 mb-6">
        Upload a clear photo of yourself
      </p>

      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-sm">
          <Image
            src={preview || getProfilePhotoUrl(user?.profilePic)}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="text-center">
        <label
          htmlFor="profilePic"
          className="cursor-pointer inline-block bg-themeBlue text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Choose New Photo
        </label>
        <input
          type="file"
          id="profilePic"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {selectedFile && (
          <p className="mt-3 text-sm text-gray-600">
            Selected: <span className="font-medium">{selectedFile.name}</span>
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={!selectedFile || isUploading}
          className={`mt-5 inline-block w-full py-2 px-4 rounded-md font-medium text-white transition ${
            selectedFile && !isUploading
              ? "bg-themeBlue hover:bg-themeBlue/90"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isUploading ? "Saving..." : "Save Photo"}
        </button>
      </div>
    </div>
  );
}

export default EditProfilePicture;

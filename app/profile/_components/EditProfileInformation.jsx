"use client";
import React, { useState, useEffect } from "react";
import { editUserDetails, getUser } from "../../_lib/api/user";
import { toast } from 'react-toastify';

function EditProfileInformation() {
  const [fullname, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // loading state

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUser();
        if (res) {
          setFullName(res.fullname || "");
          setBio(res.bio || "");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await editUserDetails({fullname, bio});
      toast.success("Profile Details Updated");
    } catch (error) {
        toast.error(error.message);
    }
    finally{
        setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-sm border border-gray-200 rounded-xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Edit Profile Info
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isSaving}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-themeBlue"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            disabled={isSaving}
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-themeBlue"
            placeholder="Tell us something about yourself"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className={`w-full py-2 px-4 rounded-md font-medium text-white transition ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-themeBlue hover:bg-themeBlue/90"
          }`}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default EditProfileInformation;

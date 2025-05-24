"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { editPassword } from "../../_lib/api/user";
import { toast } from "react-toastify";

function EditPassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmNewPassword) {
      return setError("New passwords do not match");
    }

    try {
      setLoading(true);
      const res = await editPassword(form);
      toast.success("Password updated successfully");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Failed to update password");
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow">
      <h1 className="text-2xl text-center font-bold mb-4">Edit Password</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Current Password", name: "currentPassword" },
          { label: "New Password", name: "newPassword" },
          { label: "Confirm New Password", name: "confirmNewPassword" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type="password"
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-themeBlue"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`text-white w-full px-4 py-2 rounded disabled:opacity-50 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-themeBlue hover:bg-themeBlue/90"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default EditPassword;

"use client";
import React, { useState, useEffect } from "react";
import { getUserNotifications, markAsRead } from "../_lib/api/user";
import { formatDate } from "../_utils/serviceFunctions";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getUserNotifications();
        setNotifications(res || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleRead = async (id) => {
     await markAsRead(id);
  }

  const getProfilePhotoUrl = (profilePhoto) => {
    if (!profilePhoto) return "/placeholder.jpg";
    const cleanPath = profilePhoto.replace(/\\/g, "/").replace(/^\/+/, "");
    return profilePhoto.startsWith("http")
      ? profilePhoto
      : `${backendUrl}/${cleanPath}`;
  };

  return (
    <div className="max-w-full  pt-24 pb-16 px-6 lg:px-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      </div>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`flex items-start gap-4 p-4 rounded-lg shadow  ${
                notif.isRead ? "bg-white" : "bg-blue-50"
              }`}
              onClick={() => handleRead(notif._id)}
            >
              <img
                src={getProfilePhotoUrl(notif.sender?.profilePic)}
                alt="Sender"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg">{notif.title}</h4>
                <p className="text-sm text-gray-700">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  From <span className="font-medium">{notif.sender?.fullname}</span> •{" "}
                  {formatDate((notif.createdAt))}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  
  );
}

export default Notifications;

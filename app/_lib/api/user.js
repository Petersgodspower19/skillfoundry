import axios from "axios";
import { jwtDecode } from "jwt-decode";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null; 
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("token");
      return null;
    }

    const res = await axios.get(`${backendUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; 
  }
}

export async function getUserCreatedCourses() {
    try {
       const token = localStorage.getItem("token");
       if (!token) return null;
       const decoded = jwtDecode(token);
       const userId = decoded?.id; 
       if (!userId) {
        throw new Error("User ID is missing or invalid.");
      }
       const res = await axios.get(`${backendUrl}/user/created`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
       });
       return res.data; 
    } catch (error) {
        console.error("Error fetching user:", error);
    return null;
    }
}

export async function getUserEnrolledCourses(){
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const res = await axios.get(`${backendUrl}/user/enrolled`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data; 
  } catch (error) {
    console.error("Error fetching enrolled courses:", error?.response?.data || error.message);
    return null;
  }
}


export async function editUserDetails(userdata) {
     try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token is missing. Please log in.");
    const res = await axios.patch(`${backendUrl}/user/edit`, userdata, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
   } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error occurred while updating details';
    console.error("Error updating user:", errorMessage);
  throw new Error(errorMessage);
   } 
}

export async function editPassword(userdata) {
   try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token is missing. Please log in.");
    const res = await axios.put(`${backendUrl}/user/edit-password`, userdata, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
   } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error occurred while updating details';
    console.error("Error updating user:", errorMessage);
  throw new Error(errorMessage);
}
}

export async function getUserNotifications() {
    try {
      const token = localStorage.getItem("token");
    if (!token) {
       throw new Error("Token is missing. Please log in.");
     }
     const res = await axios.get(`${backendUrl}/notifications/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
     });
     return res.data;
    } catch (error) {
       const errorMessage = error.response?.data?.message || 'Error occurred while fetching data';
    console.error("Error fetching notofications:", errorMessage);
  throw new Error(errorMessage);
    }
}

export const markAsRead = async (id) => {
    try {
        const res = await axios.patch(`${backendUrl}/notifications/${id}`);
    } catch (error) {
        console.error(error.response?.data?.message);
        throw new Error(error.response?.data?.message)
    }
}


export const enrollCourse = async (id) => {
    try {
      const token = localStorage.getItem("token");
    if (!token) {
       throw new Error("Token is missing. Please log in.");
     }
       const res = await axios.post(`${backendUrl}/user/enroll/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
       });
       return res.data;
    } catch (error) {
       console.error(error.response?.data?.message);
        throw new Error(error.response?.data?.message)
    }
}
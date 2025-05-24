import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getCourseDetail(id) {
     try {
        const res = await axios.get(`${backendUrl}/course/courses/${id}`);
        return res.data;
     } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error getting course details';
    console.error("Error fetching course", errorMessage);
    throw new Error(errorMessage);
     }
}

export async function markLessonAsWatched(courseId, lessonId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
    console.warn("Token missing - user not logged in");
    return;
  }
    const res = await axios.patch(
      `${backendUrl}/course/courses/${courseId}/${lessonId}/watched`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data; 
  } catch (error) {
    console.error("Failed to mark lesson as watched:", error);
    throw error; 
  }
}

export async function editLesson(courseId, lesssonId, data) {
   try {
     if (!token) {
    console.warn("Token missing - user not logged in");
    return;
  }
    const res = await axios.put(`${backendUrl}/course/courses/${courseId}/lessons/${lesssonId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
     return res.data;
   } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error while editing post';
    console.error("Post error:", errorMessage);
    throw new Error(errorMessage); 
   }
}


export async function addLesson(courseId, data) {
    try {
       if (!token) {
    console.warn("Token missing - user not logged in");
    return;
  }
    const res = await axios.post(`${backendUrl}/course/new-lesson/${courseId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
     return res.data;
    } catch (error) {
       const errorMessage = error.response?.data?.message || 'Error while adding lesson';
    console.error("Post error:", errorMessage);
    throw new Error(errorMessage); 
    }
}


export async function getAllCourses() {
  const token = localStorage.getItem("token");
   try {
     if (!token) {
    console.warn("Token missing - user not logged in");
    return;
  }
   } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error while getting courses';
    console.error("Post error:", errorMessage);
    throw new Error(errorMessage); 
   }
}

export async function createCourse(data) {
   try {
       const token = localStorage.getItem("token");
    if (!token) {
    console.warn("Token missing - user not logged in");
    return;
  }
    const res = await axios.post(`${backendUrl}/course/new-course`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
     return res.data;
   } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error while creating course';
    console.error("Post error:", errorMessage);
    throw new Error(errorMessage); 
   } 
}

export async function searchCourse(query) {
   try {
    const res = await axios.get(`${backendUrl}/course/search?query=${query}`); 
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error occurred while finding course';
      console.error("Error finding course:", errorMessage);
      throw new Error(errorMessage);
    }
}

export async function rateCourse(id, data) {
   try {
      const token = localStorage.getItem("token");
    if (!token) {
    console.warn("Token missing - user not logged in");
    return;
  }
    const res = await axios.post(`${backendUrl}/course/rate/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
   } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error occurred while creating review';
      console.error("Error creating review:", errorMessage);
      throw new Error(errorMessage);
   } 
}
export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return null;
  const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return (total / ratings.length).toFixed(1); 
};


export function formatDate(createdAt) {
    const createdDate = new Date(createdAt);
    
    if (isNaN(createdDate)) {
      return "just now";
    }
  
    const now = new Date();
    const diffInSeconds = Math.floor((now - createdDate) / 1000);
  
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
  
    if (diffInSeconds < minute) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < hour) {
      const minutes = Math.floor(diffInSeconds / minute);
      return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < day) {
      const hours = Math.floor(diffInSeconds / hour);
      return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < week) {
      const days = Math.floor(diffInSeconds / day);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 2 * week) {
      const weeks = Math.floor(diffInSeconds / week);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      const options = { day: "numeric", month: "short", year: "numeric" };
      return createdDate.toLocaleDateString("en-US", options);
    }
  }
  

export function groupByTag(courses) {
  return courses.reduce((acc, course) => {
    const tag = course.tag || "Others";
    if (!acc[tag]) {
      acc[tag] = [];
    }
    acc[tag].push(course);
    return acc;
  }, {});
}

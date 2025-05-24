SkillFoundry is a full-stack LMS where users can register as either students or instructors. Instructors can create and manage courses, upload lessons (video, PDF, etc.), and track student enrollment. Students can browse courses, enroll, watch content, take quizzes, and track progress.

🧠 Core Features
🔐 Authentication
User registration & login (student/instructor roles)

JWT-based authentication

Profile update and avatar upload

🎓 Course Management
Instructors can:

Create/edit/delete a course

Add lessons (videos, PDFs, quizzes)

View enrolled students

Students can:

Browse/search courses

Enroll in a course (free only, or include payment gateway like Stripe later)

Track progress per lesson

Leave reviews

📺 Lesson & Content
Video upload using services like Cloudinary or AWS

Markdown or rich-text editor for lesson descriptions

Quizzes with multiple-choice questions and scoring

📊 Dashboard
Instructor dashboard:

Course stats, student enrollment

Student dashboard:

Enrolled courses, progress bars

📈 Admin (optional advanced feature)
View total users, courses, reported content

Remove abusive users or content

🧩 Tech Stack
🔹 Frontend
React (with TypeScript)

Redux Toolkit for state management

Tailwind CSS

React Router or Next.js App Router

React Hook Form + Zod/Yup for validation

React Player or Mux for video display

🔹 Backend
Node.js + Express.js

MongoDB (with Mongoose)

Multer for file uploads

Cloudinary SDK

JWT + bcrypt for auth
# EduGenius - AI-Powered Course Management System

🚀 **Live Demo:** [EduGenius](https://edu-genius.vercel.app/)

---

## 📝 **Table of Contents**

1. [Introduction](#introduction)
2. [Features](#features)
   - [Student Features](#student-features)
   - [Instructor Features](#instructor-features)
   - [Administrator Features](#administrator-features)
   - [AI-Powered Features](#ai-powered-features)
   - [Advanced Features](#advanced-features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Workflow](#workflow)
8. [Contributing](#contributing)
9. [License](#license)

---

## 🌟 **Introduction**

**EduGenius** is an AI-powered course management system designed to enhance the learning experience for students, instructors, and administrators. The platform leverages artificial intelligence to provide personalized learning paths, automated feedback, and insightful analytics.

By offering seamless course creation, management, and progress tracking, EduGenius empowers educational institutions and individual instructors to deliver high-quality, personalized learning experiences.

---

## 🚀 **Features**

### 🎓 **Student Features**

- **Course Enrollment:** Browse and enroll in courses, view details, and check prerequisites.
- **Progress Tracking:** Visualize learning progress through charts and graphs.
- **Quizzes and Assignments:** Attempt quizzes, submit assignments, and view grades.
- **AI-Powered Recommendations:** Receive course and lesson suggestions based on interests and performance.
- **Adaptive Learning Paths:** Course content adapts according to progress and performance.
- **Discussion Forum:** Interact with peers and instructors through discussions.
- **Notifications:** Get notified about deadlines, new content, and updates.
- **Certificates:** Obtain certificates upon course completion.

---

### 🧑‍🏫 **Instructor Features**

- **Course Creation:** Build courses with modules, lessons, quizzes, and multimedia content.
- **Student Management:** Monitor progress and provide feedback.
- **Grading:** Grade quizzes and assignments efficiently.
- **AI-Powered Insights:** Analyze student performance and receive content recommendations.
- **Announcements:** Post updates and course announcements.

---

### 👨‍💼 **Administrator Features**

- **User Management:** Manage students, instructors, and administrators.
- **Course Management:** Approve or reject submitted courses.
- **Analytics:** Track platform performance and user behavior.
- **Promotions:** Set up and manage promotional campaigns.

---

### 🤖 **AI-Powered Features**

- **Personalized Recommendations:** AI-driven course suggestions tailored to individual learners.
- **Adaptive Learning Paths:** Dynamically adjust content based on student progress.
- **Automated Feedback:** Instant grading and feedback on quizzes and assignments.
- **Predictive Analytics:** Predict course completion rates and student performance.
- **AI-Powered Chatbot:** Assist students with course navigation and troubleshooting.

---

### 🏅 **Advanced Features**

- **Gamification:** Earn badges and points for progress, with leaderboards to foster competition.
- **Peer Learning:** Collaborate on group projects and review peer submissions.
- **Virtual Labs:** Access hands-on practice environments for coding and experiments.

---

## 🛠️ **Tech Stack**

### Frontend

- **Next.js**: Responsive and dynamic UI development.
- **Tailwind CSS**: Modern, utility-first CSS framework.

### Backend

- **Node.js** with **Express.js**: Backend server and APIs.
- **MongoDB**: NoSQL database management.
- **Mongoose**: Schema modeling and database interaction.

### AI Integration

- **DeepSeek API**: AI-powered recommendations, feedback, and insights.

### Payment Processing

- **Stripe**: Secure online payments.

### Authentication

- **JWT (JSON Web Tokens)**: Secure user authentication.

---

## 💻 **Installation**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/tariqul/EduGenius.git
   cd EduGenius
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the following:

   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   WEBHOOK_SECRET=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   MONGODB_DATABASE_URL=
   MONGODB_DATABASE_USERNAME=
   MONGODB_DATABASE_PASSWORD=
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

## 👥 **Contributors**

| Name          | Role               | Contributions                                     |
| ------------- | ------------------ | ------------------------------------------------- |
| Team Member 1 | Frontend Developer | Built the UI, integrated APIs                     |
| Team Member 2 | Backend Developer  | Designed the database, built APIs                 |
| Team Member 3 | AI/ML Engineer     | Integrated AI features (recommendations, chatbot) |
| Team Member 4 | Project Manager    | Managed timelines, coordinated tasks              |
| Team Member 5 | UI/UX Designer     | Designed the user interface and flow              |

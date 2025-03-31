# EduGenius - AI-Powered Course Management System

![EduGenius Logo](https://edu-genius.vercel.app)

**EduGenius** is a modern, scalable, AI-driven platform designed to revolutionize online education by providing personalized learning experiences, streamlined course management, and actionable insights for students, instructors, and administrators.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technical Stack](#technical-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Project Workflow](#project-workflow)
7. [Deployment](#deployment)
8. [Contributors](#contributors)
9. [Troubleshooting](#troubleshooting)
10. [Roadmap](#roadmap)
11. [License](#license)

---

## Project Overview

EduGenius aims to enhance the learning ecosystem by integrating **Artificial Intelligence** to deliver:

- **Personalized Learning Paths**: Adaptive content tailored to student performance.
- **Automated Feedback**: Instant grading and suggestions powered by AI.
- **Actionable Insights**: Analytics for instructors and administrators to optimize outcomes.

The platform supports three user roles: **Students**, **Instructors**, and **Administrators**, each with tailored functionalities to streamline education delivery.

---

## Features

### For Students

- **Course Enrollment**: Browse, enroll, and view course details.
- **Progress Tracking**: Visualize progress with charts.
- **Quizzes & Assignments**: Submit work and receive AI-driven feedback.
- **AI Recommendations**: Personalized course and lesson suggestions.
- **Adaptive Learning**: Dynamic content adjustments based on performance.
- **Discussion Forum**: Engage with peers and instructors.
- **Notifications**: Stay updated on deadlines and announcements.
- **Certificates**: Earn certificates upon completion.

### For Instructors

- **Course Creation**: Build courses with multimedia content.
- **Student Management**: Monitor progress and provide feedback.
- **Grading**: Evaluate assignments with AI insights.
- **AI Insights**: Identify student weaknesses and optimize content.
- **Announcements**: Communicate updates to students.

### For Administrators

- **User Management**: Oversee accounts and approvals.
- **Course Oversight**: Approve and monitor course quality.
- **Analytics**: Access platform-wide performance metrics.
- **AI Analytics**: Predict trends and suggest improvements.
- **Promotions**: Manage campaigns and discounts.

### AI-Powered Features

- Personalized recommendations and adaptive learning paths.
- Automated feedback and predictive analytics.
- AI chatbot for real-time student support.

### Advanced Features

- **Gamification**: Badges, points, and leaderboards.
- **Peer Learning**: Group projects and peer reviews.
- **Virtual Labs**: Hands-on practice environments.

---

## Technical Stack

### Frontend

- **Next.js**: v15.2.1 - React framework for SSR and static site generation.
- **Tailwind CSS**: v4 - Utility-first CSS with `tailwindcss-animate`.
- **React**: v19.0.0 - UI components with `react-dom`.
- **Framer Motion**: v12.5.0 - Animations.
- **Radix UI**: Accessible, unstyled components (e.g., dialogs, tooltips).
- **Next Themes**: v0.4.6 - Theme management.

### Backend

- **Node.js + Express.js**: Server-side logic (via Next.js API routes).
- **MongoDB**: Database with `mongoose` v8.12.1 for schema modeling.
- **Clerk**: v6.12.5 - Authentication and user management with `JWT`.

### AI Integration

- **TensorFlow.js**: v4.22.0 - On-device AI for recommendations and analytics.
- _(Note: DeepSeek API mentioned in SRS is not in `package.json`; confirm usage.)_

### Additional Tools

- **Stripe**: Payment processing (not in `package.json`; to be added if used).
- **Axios**: v1.8.4 - HTTP requests.
- **Zod**: v3.24.2 - Schema validation with `react-hook-form` v7.54.2.
- **Lucide React**: v0.479.0 - Icon library.
- **Swiper**: v11.2.5 - Carousel components.

### Dev Tools

- **ESLint**: v9 - Linting with `eslint-config-next` v15.2.1.
- **Prettier**: v3.5.3 - Code formatting with Tailwind plugin.
- **PostCSS**: v4 - CSS processing.

---

## Installation

### Prerequisites

- **Node.js**: v18.x or later
- **MongoDB**: Local or cloud instance (e.g., MongoDB Atlas)
- **npm**: v9.x or later
- **Git**: For version control

### Steps

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
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   MONGODB_DATABASE_URL=
   MONGODB_DATABASE_USERNAME=
   MONGODB_DATABASE_PASSWORD=
   ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

5. **Build for Production:**

   ```bash
   npm run build
   npm run start
   ```

---

## Usage

- **Students:** Sign up via Clerk, browse courses, and start learning.
- **Instructors:** Log in, create courses, and manage students.
- **Admins:** Access the admin dashboard to oversee platform operations.

Run `npm run lint` to check code quality before commits.

---

## Project Workflow

- **Course Creation:** Instructors design courses; admins approve.
- **Enrollment:** Students join courses and track progress.
- **Learning:** Students complete tasks with AI support; instructors grade.
- **Certification:** Students earn certificates upon completion.

---

## Deployment

### Local Deployment

- **Build and run:**

  ```bash
  npm run build
  npm run start
  ```

### Cloud Deployment (e.g., Vercel)

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard matching `.env.local`.

### Database

- Use MongoDB Atlas for a cloud-hosted database.
- Update `MONGODB_URI` in your environment variables.

---

## Contributors

| Name           | Role                 | Github                                                | Linkedin                                                      | Contributions                            |
| -------------- | -------------------- | ----------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------- |
| Tariqul Islam  | MERN Stack Developer | [github/tariqul420](https://github.com/tariqul420)    | [in/tariqul-420](https://www.linkedin.com/in/tariqul-420-t)   | Built the UI, integrated APIs            |
| Jahidul Islam  | MERN Stack Developer | [github/jahidul](https://github.com/jahidulkanchan)   | [in/jahidul](https://www.linkedin.com/in/jahidulislamkanchan) | Built the UI                             |
| Rashadul Islam | Full Stack Developer | [github/Rashad](https://github.com/Rashad-Stack)      | [in/rashadstack](https://www.linkedin.com/in/rashadstack)     | Integrated AI features (recommendations) |
| Md.Munna       | MERN Stack Developer | [github/munna-khan](https://github.com/md-munna-khan) | [in/munna-mia](https://www.linkedin.com/in/munna-mia)         | Built the UI                             |

---

## Troubleshooting

- MongoDB Connection Error: Verify `MONGODB_URI` and network access.
- Clerk Auth Issues: Check Clerk keys in `.env.local`.
- Build Fails: Run npm run lint and fix errors; ensure dependencies match `package.json`.

---

## Roadmap

[] Phase 1: Core features (enrollment, course creation, AI recommendations).
[] Phase 2: Advanced features (gamification, virtual labs).
[] Phase 3: Scalability improvements and mobile app integration.

## License

This project is licensed under the .

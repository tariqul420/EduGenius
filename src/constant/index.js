import {
  BookOpenCheck,
  BookOpenText,
  BookText,
  LayoutDashboard,
  Medal,
  UsersRound,
} from "lucide-react";

export const instructors = [
  {
    title: "Dashboard",
    url: "/instructor",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    url: "/instructor/courses",
    icon: BookText,
  },
  {
    title: "Students",
    url: "/instructor/students",
    icon: UsersRound,
  },
  {
    title: "Certificates",
    url: "/instructor/certificates",
    icon: Medal,
  },
  {
    title: "Quiz & Assignment",
    url: "/instructor/quiz-assignment",
    icon: BookOpenCheck,
  },
  {
    title: "My Blogs",
    url: "/instructor/my-blogs",
    icon: BookOpenText,
  },
];

export const students = [
  {
    title: "Dashboard",
    url: "/student",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    url: "/student/courses",
    icon: BookText,
  },
  {
    title: "Certificates",
    url: "/student/certificates",
    icon: Medal,
  },
  {
    title: "Quiz & Assignment",
    url: "/student/quiz-assignment",
    icon: BookOpenCheck,
  },
];

export const admins = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: BookText,
  },
  {
    title: "Instructors",
    url: "/admin/instructors",
    icon: UsersRound,
  },
  {
    title: "Students",
    url: "/admin/students",
    icon: UsersRound,
  },
  {
    title: "Certificates",
    url: "/admin/certificates",
    icon: Medal,
  },
  {
    title: "Quiz & Assignment",
    url: "/admin/quiz-assignment",
    icon: BookOpenCheck,
  },
];

import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function AboutUsPage() {
    return (
      <main className="dark:to-dark-bg dark:from-dark-bg dark:text-light-bg border-t bg-gradient-to-r py-5 px-2 md:px-5 text-black md:py-10">
       <Link href='/'>
         <button className="border-green m-2 bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-4 py-2.5 text-white duration-200 md:px-6">
              <ArrowLeft /> Back To Home
            </button>
       </Link>
        <h1 className="text-3xl font-bold mb-6 text-main">About EduGenius</h1>
  
        <p className="mb-4 text-lg ">
          Welcome to <span className="font-semibold">EduGenius</span> – your smart companion for learning and growth!
          We are a passionate team of educators, developers, and lifelong learners dedicated to transforming education
          through technology.
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-3">🎯 Our Mission</h2>
        <p className=" mb-5">
          To make quality education accessible, affordable, and effective for learners around the globe by offering
          interactive and industry-relevant courses.
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-3">🚀 What We Offer</h2>
        <ul className="list-disc list-inside space-y-2 ">
          <li>Expert-led courses in programming, business, design, and more</li>
          <li>Personalized learning experience through AI recommendations</li>
          <li>Flexible and self-paced learning paths</li>
          <li>Certificates to validate your achievements</li>
        </ul>
  
        <h2 className="text-2xl font-semibold mt-8 mb-3">👨‍💻 Who We Are</h2>
        <p className="">
          Founded in 2025, EduGenius started as a small startup with a big vision — to reshape the way people learn
          online. Today, we’re proud to serve thousands of learners and continue innovating in the ed-tech space.
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-3">📍 Our Location</h2>
        <p className="">
          Based in Dhaka, Bangladesh, we work with educators and mentors from all over the world.
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-3">🤝 Join Our Journey</h2>
        <p className=" mb-10">
          Whether you are a student, teacher, or institution – EduGenius welcomes you to be a part of the future of learning.
        </p>
  
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EduGenius. All rights reserved.
        </p>
      </main>
    );
  }
 
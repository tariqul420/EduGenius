import React from "react";

import BecomeInstructor from "@/components/home/BecomeInstructor";
import CourseSubjects from "@/components/home/CourseSubjects";
import TopInstructors from "@/components/home/TopInstructors";
import TotalCourse from "@/components/home/TotalCourse";
import OurAchieve from "@/components/shared/OurAchieve";
import Testimonial from "@/components/shared/Testimonial";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <TopInstructors />
      <BecomeInstructor />
      <TotalCourse />
      <CourseSubjects />

      <OurAchieve />
      <Testimonial />
    </div>
  );
}

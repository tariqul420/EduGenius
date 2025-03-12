import React from "react";
import BecomeInstructor from "./components/BecomeInstructor";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-center text-green">
        Welcome to our Edu Genius Website
      </h1>
      <p className="text-2xl text-center">
        AI-Powered Course Management System
      </p>

      <BecomeInstructor></BecomeInstructor>
    </div>
  );
}

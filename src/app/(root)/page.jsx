import BecomeInstructor from "../components/BecomeInstructor";
import TopInstructors from "../components/TopInstructors";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-center text-green">
        Welcome to our Edu Genius Website
      </h1>
      <p className="text-2xl text-center">
        AI-Powered Course Management System
      </p>
      <TopInstructors />

      <BecomeInstructor />
    </div>
  );
}

import BecomeInstructor from "../components/BecomeInstructor";
import CategoryCards from "../components/CategoryCards";
import TopInstructors from "../components/TopInstructors";

export default function Home() {
  return (
    <div className="flex flex-col">
      <TopInstructors />
      <CategoryCards />
      <BecomeInstructor />
    </div>
  );
}

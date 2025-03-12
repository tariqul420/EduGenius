import InstructorCard from "@/app/components/shared/InstructorCard";
import { instructors } from "@/constant";

export default function Instructors() {
  return (
    <section>
      <div className="container lg:px-4 lg:max-w-6xl mx-auto py-8">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-xl font-bold">Our All Instructor</h1>
          <p className="text-gray-500 text-sm font-medium">
            Showing 5 Of 9 Results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {instructors.map((instructor, idx) => (
            <InstructorCard key={idx} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}

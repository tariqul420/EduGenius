import { getInstructorBySlug } from "@/lib/actions/instructor.action";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);

  if (!instructor) {
    return {
      title: "Instructor Not Found",
      description: "Instructor not found",
    };
  }

  return {
    title: `${instructor?.instructorId?.firstName} ${instructor?.instructorId?.lastName} | Meet our instructors`,
    description: `Learn more about ${instructor?.instructorId?.firstName} ${instructor?.instructorId?.lastName}, ${instructor?.title || ""}`,
  };
}

export default function Layout({ children }) {
  return <main>{children}</main>;
}

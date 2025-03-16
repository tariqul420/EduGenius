import { instructors } from "@/constant";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const instructor = instructors.find((inst) => inst.slug === slug);

  if (!instructor) {
    return {
      title: "Instructor Not Found",
      description: "Instructor not found",
    };
  }

  return {
    title: `${instructor.name} | Meet our instructors`,
    description: `Learn more about ${instructor.name}, ${instructor.title}`,
  };
}

export default function Layout({ children }) {
  return <main>{children}</main>;
}

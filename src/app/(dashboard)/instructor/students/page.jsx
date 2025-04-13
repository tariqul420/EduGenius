import { auth } from "@clerk/nextjs/server";

export default async function Student() {
  // const { pageSize, pageIndex } = await searchParams;

  const { sessionClaims } = await auth();
  const instructor = sessionClaims?.userId;
  // if (!instructor) {
  //   throw new Error("User not authenticated");
  // }

  // const students = await getStudentsByInstructorCoursesId(instructor);

  // console.log(students, "students");

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2">ffff</div>
    </section>
  );
}

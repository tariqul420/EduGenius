import InstructorTab from "@/components/shared/InstructorTab";
import Rating from "@/components/shared/Rating";
import { getInstructorBySlug } from "@/lib/actions/instructor.action";
import { BookOpenText, UsersRound } from "lucide-react";
import Image from "next/image";

export default async function Instructor({ params }) {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);

  return (
    <section>
      <div className="container mx-auto py-8 max-sm:px-4 lg:max-w-6xl">
        <div className="dark flex w-full flex-wrap bg-white shadow-lg dark:bg-black">
          <Image
            src={instructor?.profilePicture}
            alt={instructor.firstName}
            width={400}
            height={400}
          />
          <div className="space-y-2 p-4">
            <h2 className="text-3xl font-bold">
              {instructor.firstName} {instructor.lastName}
            </h2>
            <p className="text-sm text-gray-500">{instructor?.title || ""}</p>

            <div className="mt-2">
              <Rating />

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex w-fit items-start justify-between gap-3 bg-primary-100 px-8 py-3">
                  <UsersRound
                    strokeWidth={1}
                    size={30}
                    className="text-primary text-2xl"
                  />
                  <div>
                    <p className="text-lg font-bold">1000</p>
                    <p className="text-sm text-gray-500">Students</p>
                  </div>
                </div>

                <div className="flex w-fit items-start justify-between gap-3 bg-primary-100 px-8 py-3">
                  <BookOpenText
                    strokeWidth={1}
                    size={30}
                    className="text-primary text-2xl"
                  />
                  <div>
                    <p className="text-lg font-bold">1000</p>
                    <p className="text-sm text-gray-500">Course</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                <div className="border-r border-gray-200 pr-4">
                  <p className="text-lg font-bold">1000</p>
                  <p className="text-sm text-gray-500">Following</p>
                </div>

                <div>
                  <p className="text-lg font-bold">1000</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InstructorTab />
      </div>
    </section>
  );
}

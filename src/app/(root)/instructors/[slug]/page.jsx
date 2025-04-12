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
      <div className="container mx-auto py-10 px-4 lg:max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-black rounded-2xl shadow-md overflow-hidden">
          {/* Profile Picture */}
          <div className="flex justify-center items-center p-6 bg-gray-50 dark:bg-neutral-900">
            <Image
              src={instructor?.profilePicture}
              alt={`${instructor.firstName} ${instructor.lastName}`}
              width={300}
              height={300}
              className="rounded-xl object-cover"
            />
          </div>

          {/* Instructor Info */}
          <div className="col-span-2 p-6 space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {instructor.firstName} {instructor.lastName}
              </h2>
              <p className="text-sm text-gray-500">{instructor?.title || "Instructor"}</p>
            </div>

            <Rating />

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-main-100 flex items-center gap-4 p-4 rounded-xl">
                <UsersRound size={28} strokeWidth={1} className="text-main" />
                <div>
                  <p className="text-lg font-semibold">{instructor?.studentsCount || 230}</p>
                  <p className="text-sm text-gray-500">Students</p>
                </div>
              </div>

              <div className="bg-main-100 flex items-center gap-4 p-4 rounded-xl">
                <BookOpenText size={28} strokeWidth={1} className="text-main" />
                <div>
                  <p className="text-lg font-semibold">{instructor?.coursesCount || 20}</p>
                  <p className="text-sm text-gray-500">Courses</p>
                </div>
              </div>

              <div className="bg-main-100 flex items-center gap-4 p-4 rounded-xl">
                <UsersRound size={28} strokeWidth={1} className="text-main" />
                <div>
                  <p className="text-lg font-semibold">{instructor?.followers || 3440}</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
              </div>
            </div>

            {/* Social Stats */}
            <div className="flex gap-6 pt-4 border-t border-gray-200 dark:border-gray-800 mt-6">
              <div>
                <p className="text-lg font-semibold">{instructor?.following || 3550}</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{instructor?.followers || 3340}</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-10">
          <InstructorTab />
        </div>
      </div>
    </section>
  );
}

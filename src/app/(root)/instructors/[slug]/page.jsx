import AvgRating from "@/components/shared/AvgRating";
import InstructorTab from "@/components/shared/InstructorTab";
import { getInstructorBySlug } from "@/lib/actions/instructor.action";
import {
  BookOpenText,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  UsersRound,
} from "lucide-react";
import Image from "next/image";

export default async function Instructor({ params }) {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);

  const { instructorId, social, students, courses, avgRating, profession } =
    instructor || {};

  return (
    <section>
      <div className="container mx-auto px-4 py-10 lg:max-w-6xl">
        <div className="grid w-fit grid-cols-1 gap-4 overflow-hidden rounded-2xl bg-white shadow-md lg:grid-cols-3 dark:bg-black">
          {/* Profile Picture */}
          <div className="dark:bg-dark-bg w-fit bg-gray-50 p-2.5">
            <Image
              src={instructorId?.profilePicture}
              alt={`${instructorId?.firstName} ${instructorId?.lastName}`}
              width={250}
              height={250}
              className="rounded-xl object-cover"
            />
          </div>
          {/* instructorId? Info */}
          <div className="space-y-4 lg:col-span-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {instructorId?.firstName} {instructorId?.lastName}
              </h2>
              <p className="text-sm">{profession || "Instructor"}</p>
            </div>

            <AvgRating avgRating={avgRating} />
            {/* Statistics */}
            <div className="flex gap-4">
              <div className="bg-light-bg dark:bg-dark-bg flex w-fit items-center gap-4 rounded-md border px-4 py-1 text-center shadow md:text-left dark:border-t-[3px] dark:border-b-0">
                <UsersRound
                  size={40}
                  strokeWidth={1.5}
                  className="bg-light-bg text-dark-main dark:from-dark-hover dark:to-dark-bg rounded p-2 shadow dark:bg-gradient-to-b"
                />
                <div>
                  <p className="text-lg font-semibold">
                    {students?.length || 0}
                  </p>
                  <p className="text-sm text-gray-500">Students</p>
                </div>
              </div>

              <div className="bg-light-bg dark:bg-dark-bg flex w-fit items-center gap-4 rounded-md border px-4 py-1 text-center shadow md:text-left dark:border-t-[3px] dark:border-b-0">
                <BookOpenText
                  size={40}
                  strokeWidth={1.5}
                  className="bg-light-bg text-dark-main dark:from-dark-hover dark:to-dark-bg rounded p-2 shadow dark:bg-gradient-to-b"
                />
                <div>
                  <p className="text-lg font-semibold">{courses.length || 0}</p>
                  <p className="text-sm text-gray-500">Courses</p>
                </div>
              </div>
            </div>

            {/* Social Stats */}
            {social && (
              <div className="mt-4 flex items-center gap-2.5 border-t pt-6">
                {social?.linkedin && (
                  <a
                    href={social?.linkedin}
                    className="icon bg-light-bg text-dark-main dark:from-dark-hover dark:to-dark-bg rounded p-1.5 shadow dark:bg-gradient-to-b"
                    target="_blank"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {social?.twitter && (
                  <a
                    href={social?.twitter}
                    className="icon bg-light-bg text-dark-main dark:from-dark-hover dark:to-dark-bg rounded p-1.5 shadow dark:bg-gradient-to-b"
                    target="_blank"
                  >
                    <Twitter size={18} />
                  </a>
                )}
                {social?.facebook && (
                  <a
                    href={social?.facebook}
                    className="icon bg-light-bg text-dark-main dark:from-dark-hover dark:to-dark-bg rounded p-1.5 shadow dark:bg-gradient-to-b"
                    target="_blank"
                  >
                    <Facebook size={18} />
                  </a>
                )}
                {social?.instagram && (
                  <a
                    href={social?.instagram}
                    className="icon bg-light-bg text-dark-main dark:from-dark-hover dark:to-dark-bg rounded p-1.5 shadow dark:bg-gradient-to-b"
                    target="_blank"
                  >
                    <Instagram size={18} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Tabs Section */}
        <div className="mt-10">
          <InstructorTab instructor={instructor} />
        </div>
      </div>
    </section>
  );
}

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function InstructorCard({ instructor }) {
  const { instructorId, social } = instructor || {};

  return (
    <div className="dark:bg-dark-bg flex cursor-pointer flex-col justify-around gap-2.5 rounded-lg px-2.5 py-2 shadow-md transition-all duration-300 hover:-translate-y-2 sm:flex-row md:gap-7 md:px-5 dark:border dark:border-t-[3px] dark:border-b-0 dark:shadow-none">
      <Image
        src={instructorId?.profilePicture}
        alt={instructorId?.firstName}
        width={150}
        height={100}
        className="mx-auto h-fit max-w-[350px] rounded-lg object-cover max-sm:w-full"
      />
      <div className="flex flex-wrap justify-between gap-4 sm:block">
        <div>
          <h2 className="text-xl font-semibold">
            {instructorId?.firstName} {instructorId?.lastName}
          </h2>
          <p>{instructorId?.profession || "Instructor"}</p>
        </div>
        {social && (
          <div className="mt-2 flex items-center gap-2.5">
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button className="bg-main hover:bg-dark-main mt-4 rounded px-4 py-1.5 text-white">
            <Link href={`/instructors/${instructorId?.slug}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

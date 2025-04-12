import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function InstructorCard({ instructor }) {
  return (
    <div className="dark:bg-dark-bg flex cursor-pointer justify-around gap-7 rounded-lg px-5 py-2 shadow-md transition-all duration-300 hover:-translate-y-4 dark:border dark:border-t-[3px] dark:border-b-0 dark:shadow-none">
      <Image
        src={instructor.profilePicture}
        alt={instructor.firstName}
        width={150}
        height={100}
        className="rounded-lg object-cover h-fit max-sm:w-full"
      />
      <div className="">
        <div>
          <h2 className="mt-4 text-xl font-semibold">
            {instructor.firstName} {instructor.lastName}
          </h2>
          <p className="text-gray-600">{instructor?.title}</p>
        </div>
        <div className="mt-4 flex items-center gap-2.5">
          <span className="icon bg-light-bg text-dark-main dark:from-dark-hover dark:to-dark-bg rounded p-1.5 shadow dark:bg-gradient-to-b">
            <Linkedin size={18} />
          </span>
          <span className="icon bg-light-bg text-dark-main dark:from-dark-hover dark:to-dark-bg rounded p-1.5 shadow dark:bg-gradient-to-b">
            <Twitter size={18} />
          </span>
          <span className="icon bg-light-bg text-dark-main dark:from-dark-hover dark:to-dark-bg rounded p-1.5 shadow dark:bg-gradient-to-b">
            <Facebook size={18} />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button className="bg-main hover:bg-dark-main mt-4 rounded px-4 py-1.5 text-white dark:hover:text-black">
            <Link href={`/instructors/${instructor?.slug}`}>Details</Link>
          </Button>
          {/* {instructor?.social && (
            <div className="flex items-center justify-center space-x-4">
              {instructor?.social?.facebook && (
                <a href={instructor.social.facebook}>
                  <Facebook
                    size={18}
                    className="text-main cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  />
                </a>
              )}
              {instructor?.social?.twitter && (
                <a href={instructor.social.twitter}>
                  <Twitter
                    size={18}
                    className="text-main cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  />
                </a>
              )}
              {instructor?.social?.linkedin && (
                <a href={instructor.social.linkedin}>
                  <Linkedin
                    size={18}
                    className="text-main cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  />
                </a>
              )}
              {instructor?.social?.instagram && (
                <a href={instructor.social.instagram}>
                  <Instagram
                    size={18}
                    className="text-main cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  />
                </a>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

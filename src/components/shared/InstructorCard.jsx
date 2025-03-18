import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function InstructorCard({ instructor }) {
  return (
    <div className="flex cursor-pointer flex-wrap gap-4 rounded-lg p-4 shadow-md transition-all duration-300 hover:-translate-y-4">
      <Image
        src={instructor.profilePicture}
        alt={instructor.firstName}
        width={180}
        height={139}
        className="rounded-lg max-sm:w-full"
      />
      <div className="flex-1">
        <div>
          <h2 className="mt-4 text-xl font-semibold">
            {instructor.firstName} {instructor.lastName}
          </h2>
          <p className="text-gray-600">{instructor?.title}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button className="bg-green mt-4 rounded px-4 py-2 text-white">
            <Link href={`/instructors/${instructor?.slug}`}>Details</Link>
          </Button>
          {instructor?.social && (
            <div className="flex items-center justify-center space-x-4">
              {instructor?.social?.facebook && (
                <a href={instructor.social.facebook}>
                  <Facebook
                    size={18}
                    className="text-green cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  />
                </a>
              )}
              {instructor?.social?.twitter && (
                <a href={instructor.social.twitter}>
                  <Twitter
                    size={18}
                    className="text-green cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  />
                </a>
              )}
              {instructor?.social?.linkedin && (
                <a href={instructor.social.linkedin}>
                  <Linkedin
                    size={18}
                    className="text-green cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  />
                </a>
              )}
              {instructor?.social?.instagram && (
                <a href={instructor.social.instagram}>
                  <Instagram
                    size={18}
                    className="text-green cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

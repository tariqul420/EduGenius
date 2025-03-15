import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function InstructorCard({ instructor }) {
  return (
    <div className="shadow-md flex gap-4 hover:-translate-y-4 cursor-pointer transition-all duration-300 p-4 rounded-lg flex-wrap">
      <Image
        src={instructor.image}
        width={180}
        height={139}
        alt={instructor.name}
        className="rounded-lg max-sm:w-full"
      />
      <div className="flex-1">
        <div>
          <h2 className="text-xl font-semibold mt-4">{instructor.name}</h2>
          <p className="text-gray-600">{instructor.title}</p>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Button className="bg-green text-white py-2 px-4 rounded mt-4">
            Details
          </Button>

          <div className="flex justify-center items-center space-x-4">
            <a href={instructor.social.facebook}>
              <Facebook
                size={18}
                className="text-green hover:-translate-y-1 cursor-pointer transition-all duration-300"
              />
            </a>
            <a href={instructor.social.twitter}>
              <Twitter
                size={18}
                className="text-green hover:-translate-y-1 cursor-pointer transition-all duration-300"
              />
            </a>
            <a href={instructor.social.linkedin}>
              <Linkedin
                size={18}
                className="text-green hover:-translate-y-1 cursor-pointer transition-all duration-300"
              />
            </a>
            <a href={instructor.social.instagram}>
              <Instagram
                size={18}
                className="text-green hover:-translate-y-1 cursor-pointer transition-all duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

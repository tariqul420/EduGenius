import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
} from "react-icons/ti";

export default function InstructorCard({ instructor }) {
  return (
    <div className="shadow-md flex gap-4">
      <Image
        src={instructor.image}
        width={180}
        height={139}
        alt={instructor.name}
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold mt-4">{instructor.name}</h2>
        <p className="text-gray-600">{instructor.title}</p>
        <div className="flex justify-between items-center">
          <button className="bg-green text-white py-2 px-4 rounded mt-4">
            Details
          </button>

          <div className="flex justify-center items-center space-x-4 px-4">
            <a href={instructor.social.facebook}>
              <TiSocialFacebook className="text-2xl text-green" />
            </a>
            <a href={instructor.social.twitter}>
              <TiSocialTwitter className="text-2xl text-green" />
            </a>
            <a href={instructor.social.linkedin}>
              <TiSocialLinkedin className="text-2xl text-green" />
            </a>
            <a href={instructor.social.instagram}>
              <TiSocialInstagram className="text-2xl text-green" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

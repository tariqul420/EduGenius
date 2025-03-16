import { ArrowRight, Calendar, MessageCircleMore, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function InsightsCard({ insights }) {
  const { title, image, name, date, desc, commentNum } = insights;

  return (
    <Link
      href={`/demo/1`}
      className="bg-white dark:bg-black-light rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-300 hover:-translate-y-2">
      <div className="course-image relative">
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <p className="bg-green rounded w-fit flex items-center gap-1.5 text-white absolute left-4 -bottom-3 px-3 py-1 text-sm">
          <Calendar size={16} /> {date}
        </p>
      </div>
      <div className="course-content mt-1 p-4">
        <h3 className="text-xl font-semibold">{title?.slice(0, 30)} ...</h3>
        <p>{desc?.slice(0, 95)} ...</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-3">
            <p className="text-base flex items-center gap-1">
              <MessageCircleMore size={20} /> {commentNum}
            </p>
            <p>|</p>
            <p className="text-base flex items-center gap-1">
              <User size={20} /> {name}
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-green flex gap-1 text-lg cursor-pointer">
              Read More <ArrowRight />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default InsightsCard;

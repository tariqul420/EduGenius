import { ArrowRight, Calendar, MessageCircleMore, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

function InsightsCard({ insights }) {
  const { slug, title, thumbnail, content, comment, user, createdAt } = insights || {};

  // Format the date using date-fns
  const formattedDate = createdAt ? format(new Date(createdAt), "MMMM dd, yyyy") : "";

  return (
    <div className="bg-white dark:bg-black-light rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      {/* Thumbnail Section */}
      <div className="course-image relative flex-shrink-0">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        {/* Date Badge */}
        <p className="bg-green rounded w-fit flex items-center gap-1.5 text-white absolute left-4 -bottom-3 px-3 py-1 text-sm">
          <Calendar size={16} /> {formattedDate}
        </p>
      </div>

      {/* Content Section */}
      <div className="course-content p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{title?.slice(0, 30)} ...</h3>

        {/* Content Preview */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
          {content?.slice(0, 95)} ...
        </p>

        {/* Footer Section */}
        <div className="flex justify-between items-center mt-auto">
          {/* Comments and Author */}
          <div className="flex items-center gap-3">
            <p className="text-base flex items-center gap-1">
              <MessageCircleMore size={20} /> {comment}
            </p>
            <p>|</p>
            <p className="text-base flex items-center gap-1">
              <User size={20} /> {user?.firstName} {user?.lastName}
            </p>
          </div>

          {/* Read More Button */}
          <Link href={`/blog/${slug}`} className="text-green flex gap-1 text-lg cursor-pointer">
            Read More <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InsightsCard;

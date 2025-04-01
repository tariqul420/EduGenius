import { format } from "date-fns";
import { ArrowRight, Calendar, MessageCircleMore, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function InsightsCard({ insights }) {
  const { slug, title, thumbnail, content, commentCount, user, createdAt } =
    insights || {};

  // Format the date using date-fns
  const formattedDate = createdAt
    ? format(new Date(createdAt), "MMMM dd, yyyy")
    : "";

  return (
    <div className="dark:bg-black-light dark:bg-dark-bg flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
      {/* Thumbnail Section */}
      <div className="course-image relative flex-shrink-0">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={200}
          className="h-48 w-full object-cover"
        />
        {/* Date Badge */}
        <p className="bg-main absolute -bottom-3 left-4 flex w-fit items-center gap-1.5 rounded px-3 py-1 text-sm text-white">
          <Calendar size={16} /> {formattedDate}
        </p>
      </div>

      {/* Content Section */}
      <div className="course-content flex flex-grow flex-col p-4">
        {/* Title */}
        <h3 className="mb-2 text-xl font-semibold">
          {title?.slice(0, 30)} ...
        </h3>

        {/* Content Preview */}
        <p className="dark:text-medium-bg mb-4 flex-grow text-gray-600">
          {content?.slice(0, 95)} ...
        </p>

        {/* Footer Section */}
        <div className="mt-auto flex items-center justify-between">
          {/* Comments and Author */}
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1 text-base">
              <MessageCircleMore size={20} /> {commentCount}
            </p>
            <p>|</p>
            <p className="flex items-center gap-1 text-base">
              <User size={20} /> {user?.firstName} {user?.lastName}
            </p>
          </div>

          {/* Read More Button */}
          <Link
            href={`/blogs/${slug}`}
            className="text-main dark:text-dark-btn flex cursor-pointer gap-1 text-lg"
          >
            Read More <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InsightsCard;

import { format } from "date-fns";
import { Calendar, ChevronsRight, MessageCircleMore, User } from "lucide-react";
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
    <div className="dark:bg-black-light dark:bg-dark-theme flex w-full flex-col overflow-hidden rounded-lg border bg-white shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:border-gray-800">
      {/* Thumbnail Section */}
      <div className="relative h-48 flex-shrink-0">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={192}
          className="h-full w-full object-cover"
        />
        {/* Date Badge */}
        <p className="bg-gradient-to-r from-dark-btn/80 to-main absolute -bottom-3 left-4 flex w-fit items-center gap-1.5 rounded px-3 py-1 text-sm text-white shadow">
          <Calendar size={16} /> {formattedDate}
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-4">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title.length > 33
            ? `${title?.slice(0, 30)}...`
            : title?.slice(0, 33)}
        </h3>

        {/* Content Preview */}
        <p className="dark:text-medium-bg mb-4 line-clamp-3 text-sm text-gray-600">
          {content.length > 105
            ? `${content?.slice(0, 108)}...`
            : content?.slice(0, 110)}
        </p>

        {/* Footer Section */}
        <div className="flex items-center justify-between">
          {/* Comments and Author */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <MessageCircleMore size={16} /> {commentCount}
            </span>
            <span className="mx-2">|</span>
            <span className="flex items-center gap-1">
              <User size={16} /> {user?.firstName} {user?.lastName}
            </span>
          </div>

          {/* Read More Button */}
          <Link
            href={`/blogs/${slug}`}
            className="text-main flex items-center gap-0.5 text-xs font-medium sm:text-sm hover:underline"
          >
            Read More <ChevronsRight className="text-dark-btn/90" size={18} />
          </Link>
          {/* <div className="text-main flex items-center gap-0.5 text-xs font-medium sm:text-sm">
            Explore
            <ChevronsRight className="text-dark-btn/90" size={18} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default InsightsCard;

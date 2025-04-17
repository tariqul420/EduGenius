import { format } from "date-fns";
import Image from "next/image";

export default function ReviewCard({ review }) {
  const studentReviewDate = format(
    new Date(review?.createdAt),
    "MMMM dd, yyyy",
  );

  return (
    <div className="group mx-auto w-full max-w-3xl py-2">
      <div className="flex items-start gap-3 sm:gap-4">
        <Image
          src={review?.student?.profilePicture}
          alt={`${review?.student?.firstName} ${review?.student?.lastName}`}
          width={40}
          height={40}
          className="flex-shrink-0 rounded-full sm:h-12 sm:w-12"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-dark-bg dark:text-light-bg truncate text-sm font-semibold sm:text-base">
              {review.student?.firstName} {review?.student?.lastName}
            </h4>
            <span className="text-dark-bg dark:text-light-bg text-xs">•</span>
            <p className="text-dark-bg dark:text-medium-bg text-xs sm:text-sm">
              {studentReviewDate}
            </p>
            <p className="text-sm">
              {review?.createdAt !== review?.updatedAt && "(edited)"}
            </p>
          </div>
          <p className="dark:text-light-bg mt-1 text-sm break-words text-gray-700 sm:text-base">
            {review?.review}
          </p>
        </div>
      </div>
    </div>
  );
}

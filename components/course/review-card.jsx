import { format } from "date-fns";
import Image from "next/image";

import AvgRating from "../shared/avg-rating";
import TextSeeMore from "../shared/text-see-more";

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
            <p className="text-dark-bg dark:text-medium-bg text-xs sm:text-sm">
              | {studentReviewDate} |
            </p>
            <p className="text-sm">
              {review?.createdAt !== review?.updatedAt && "(edited) |"}
            </p>
            <AvgRating className="-mt-4" avgRating={review?.rating} />
          </div>
          <TextSeeMore description={review?.review} />
        </div>
      </div>
    </div>
  );
}

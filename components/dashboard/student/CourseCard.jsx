import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ReviewModal } from "./ReviewModal";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getReview } from "@/lib/actions/review.action";

export default async function CourseCard({ course }) {
  const { thumbnail, title, instructor, progress, _id, slug } = course || {};

  let review = null;
  try {
    const reviewData = await getReview({ course: _id });
    if (reviewData) review = reviewData;
  } catch (error) {
    console.error("Failed to fetch review:", error);
  }

  return (
    <Card className="flex h-full min-h-[300px] flex-col gap-2 px-2 py-2.5">
      {/* Optional height */}
      <Link
        href={`${`courses/${slug}`}`}
        className="group relative flex h-full w-full"
      >
        <CardHeader className="relative w-full rounded-lg px-2.5">
          <Image
            src={thumbnail}
            alt={title}
            width={400}
            height={200}
            blurDataURL={thumbnail}
            className="h-full min-h-[170px] w-full rounded-md border object-cover"
            placeholder="blur"
            loading="lazy"
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="bg-gradient-to-l shadow-2xl from-dark-main to-dark-btn/90">
              <Play className="m-1 h-8 w-8 rounded-full text-white shadow-md" />
            </div>
          </div>
        </CardHeader>
      </Link>
      <CardContent className="flex flex-1 flex-col px-2.5">
        <div>
          <CardTitle className="mb-1.5 text-lg font-semibold">
            {title}
          </CardTitle>
          <p>{instructor?.name}</p>
        </div>

        <div className="bottom-part mt-auto flex flex-col">
          <Progress value={progress || 0} className="mt-2 h-[2px]" />
          <div className="mt-2.5 flex items-center justify-between text-sm">
            <p>{progress || 0}% Complete</p>
            <ReviewModal course={_id} review={review} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getReview } from "@/lib/actions/review.action";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReviewModal } from "./ReviewModal";

export default async function CourseCard({ course }) {
  const { thumbnail, title, instructor, progress, _id } = course || {};

  let review = null;
  try {
    const reviewData = await getReview({ course: _id });
    if (reviewData) review = reviewData;
  } catch (error) {
    console.error("Failed to fetch review:", error);
  }

  return (
    <Card className="flex h-full min-h-[300px] gap-2 py-2.5 px-2 flex-col">
      {" "}
      {/* Optional height */}
      <Link href={"#"}>
        <CardHeader className="relative w-full px-2.5 rounded-lg">
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
            <Play className="bg-main h-12 w-12 rounded-full text-white shadow-md" />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="flex flex-1 px-2.5 flex-col">
        <div>
          <CardTitle className="text-lg font-semibold mb-1.5">{title}</CardTitle>
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

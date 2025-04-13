import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RatingModal } from "./RatingModal";

export default function CourseCard({ course }) {
  const { thumbnail, title, instructor, progress } = course || {};
  return (
    <Card
      className={`group dark:bg-dark-bg rounded-md border shadow transition-all duration-300 hover:-translate-y-2`}
    >
      <Link href={"#"}>
        <CardHeader className={`relative h-[200px] w-full rounded-lg`}>
          <Image
            src={thumbnail}
            alt={title}
            width={400}
            height={200}
            blurDataURL={thumbnail}
            className={`h-full w-full rounded-md object-cover`}
            placeholder="blur"
            loading="lazy"
            sizes={"100vw"}
          />

          {/* Play Icon */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          >
            <Play className="bg-main h-12 w-12 rounded-full p-3 text-white shadow-md" />
          </div>
        </CardHeader>
      </Link>

      {/* Course Content */}
      <CardContent className={`flex w-full flex-grow flex-col`}>
        <CardTitle className="flex-grow text-lg font-semibold">
          {title}
        </CardTitle>
        <p>{instructor?.name}</p>
        <div className="mt-1">
          <Progress value={progress || 0} className="mt-2 h-[2px]" />

          <div className="mt-1 flex items-center justify-between text-sm">
            <p>{progress || 0}% Complete</p>
            <RatingModal />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

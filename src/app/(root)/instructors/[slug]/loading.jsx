import { BookOpenText, UsersRound } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export default function InstructorSkeleton() {
  return (
    <section>
      <div className="container mx-auto py-8 max-sm:px-4 lg:max-w-6xl">
        <div className="dark flex w-full flex-wrap bg-white shadow-lg dark:bg-black">
          {/* Profile Picture Skeleton */}
          <Skeleton className="h-[400px] w-full md:w-[400px]" />

          {/* Info Section Skeleton */}
          <div className="flex-1 space-y-4 p-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />

            <div className="space-y-4">
              {/* Rating Skeleton */}
              <Skeleton className="h-6 w-32" />

              {/* Stats Boxes Skeleton */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-main-100 flex w-fit items-start justify-between gap-3 px-8 py-3">
                  <UsersRound strokeWidth={1} size={30} className="text-main" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <div className="bg-main-100 flex w-fit items-start justify-between gap-3 px-8 py-3">
                  <BookOpenText
                    strokeWidth={1}
                    size={30}
                    className="text-main"
                  />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>

              {/* Following/Followers Skeleton */}
              <div className="flex gap-4">
                <div className="space-y-2 border-r border-gray-200 pr-4">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Tab Skeleton */}
        <div className="mt-8 space-y-4">
          {/* Tab Navigation Skeleton */}
          <div className="flex gap-4">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-24" />
            ))}
          </div>

          {/* Tab Content Skeleton */}
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </section>
  );
}

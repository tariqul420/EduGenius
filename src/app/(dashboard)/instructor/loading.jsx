/* eslint-disable no-shadow */
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* SectionCards Skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>

          {/* ChartAreaInteractive Skeleton */}
          <Skeleton className="h-72 w-full rounded-2xl" />

          {/* DataTable Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-md" />{" "}
            {/* Table Header/Filter */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-4">
                {[...Array(5)].map((_, j) => (
                  <Skeleton key={j} className="h-10 rounded-md" />
                ))}
              </div>
            ))}
            {/* Pagination Skeleton */}
            <div className="flex justify-end gap-2">
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

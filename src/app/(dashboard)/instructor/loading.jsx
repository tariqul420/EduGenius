/* eslint-disable no-shadow */
// app/(dashboard)/home/loading.jsx

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* SectionCards skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>

          {/* ChartAreaInteractive skeleton */}
          <Skeleton className="h-80 w-full rounded-lg" />

          {/* DataTable skeleton */}
          <div className="space-y-4">
            {/* Search bar skeleton */}
            <div className="flex gap-4">
              <Skeleton className="h-10 w-full max-w-md" />
              <Skeleton className="h-10 w-24" />
            </div>

            {/* Table header skeleton */}
            <div className="flex w-full gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-10 flex-1" />
              ))}
            </div>

            {/* Table rows skeleton */}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex w-full gap-4 pt-4">
                {[...Array(6)].map((_, j) => (
                  <Skeleton key={j} className="h-12 flex-1" />
                ))}
              </div>
            ))}

            {/* Pagination skeleton */}
            <div className="flex justify-end gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

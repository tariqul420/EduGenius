/* eslint-disable no-shadow */
// app/(dashboard)/assignment/loading.jsx

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        {/* Search bar skeleton */}
        <div className="mb-4 flex gap-4">
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
        <div className="mt-4 flex justify-end gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </section>
  );
}

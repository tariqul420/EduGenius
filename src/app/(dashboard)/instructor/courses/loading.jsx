/* eslint-disable no-shadow */
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-4 px-4 lg:px-6">
        {/* Optional: Filter/Search Header Skeleton */}
        <Skeleton className="h-10 w-full max-w-sm rounded-md" />

        {/* Table Headers */}
        <div className="hidden grid-cols-5 gap-4 md:grid">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 rounded-md" />
          ))}
        </div>

        {/* Table Rows */}
        <div className="space-y-4">
          {[...Array(6)].map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5"
            >
              {[...Array(5)].map((_, colIdx) => (
                <Skeleton key={colIdx} className="h-10 rounded-md" />
              ))}
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-end gap-2 pt-4">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </section>
  );
}

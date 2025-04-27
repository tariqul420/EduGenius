/* eslint-disable no-shadow */
// app/(dashboard)/instructor/my-blogs/loading.jsx

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="@container/main mx-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
      {/* BlogForm skeleton */}
      <section className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-full md:w-48" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <div className="flex justify-end gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </section>

      {/* DataTable skeleton */}
      <section className="mt-4 space-y-4">
        {/* Search bar skeleton */}
        <div className="flex gap-4">
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-10 w-24" />
        </div>

        {/* Table header skeleton */}
        <div className="flex w-full gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 flex-1" />
          ))}
        </div>

        {/* Table rows skeleton */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex w-full gap-4 pt-4">
            {[...Array(5)].map((_, j) => (
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
      </section>
    </div>
  );
}

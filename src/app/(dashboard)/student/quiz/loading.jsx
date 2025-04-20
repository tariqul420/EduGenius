// app/student/quiz/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        {/* Page Header Skeleton */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="mt-2 h-7 w-16" />
              <Skeleton className="mt-1 h-3 w-full" />
            </div>
          ))}
        </div>

        {/* Data Table Skeleton */}
        <div className="space-y-4">
          {/* Table Controls */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Table Header */}
          <div className="flex w-full items-center justify-between p-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Table Rows */}
          <div className="space-y-4 p-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex w-full items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

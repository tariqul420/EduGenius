// app/student/certificate/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="@container/main flex flex-1 flex-col gap-2 px-4 py-6 lg:px-6">
      {/* Table Controls Skeleton */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-full sm:w-[300px]" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid w-full grid-cols-12 gap-4 border-b p-4">
        <Skeleton className="col-span-3 h-4" />
        <Skeleton className="col-span-2 h-4" />
        <Skeleton className="col-span-2 h-4" />
        <Skeleton className="col-span-3 h-4" />
        <Skeleton className="col-span-2 h-4" />
      </div>

      {/* Table Rows - 6 rows for better loading experience */}
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid w-full grid-cols-12 gap-4 border-b p-4">
            <Skeleton className="col-span-3 h-4" />
            <Skeleton className="col-span-2 h-4" />
            <Skeleton className="col-span-2 h-4" />
            <Skeleton className="col-span-3 h-4" />
            <Skeleton className="col-span-2 h-4" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-between">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    </section>
  );
}

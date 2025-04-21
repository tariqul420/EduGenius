import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        {/* Header Area with Search, Add, and Column Selector */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-4 sm:flex-row sm:items-center sm:gap-2">
            <Skeleton className="h-8 w-32 rounded-md" /> {/* Column selector */}
            <Skeleton className="h-8 w-32 rounded-md" />{" "}
            {/* Possibly Add button */}
            <Skeleton className="h-8 w-[200px] rounded-md" />{" "}
            {/* Search field */}
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="mt-4 overflow-hidden rounded-lg border">
          <div className="w-full overflow-auto">
            {/* Table Header */}
            <div className="bg-muted grid grid-cols-4 gap-4 px-4 py-3">
              <Skeleton className="h-4 w-6" /> {/* Drag handle */}
              <Skeleton className="h-4 w-20" /> {/* Name */}
              <Skeleton className="h-4 w-28" /> {/* Email */}
              <Skeleton className="h-4 w-16" /> {/* Status/Action */}
            </div>

            {/* Table Rows */}
            <div className="space-y-3 px-4 py-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="grid grid-cols-4 items-center gap-4">
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-6 w-24" /> {/* Showing X of Y */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}

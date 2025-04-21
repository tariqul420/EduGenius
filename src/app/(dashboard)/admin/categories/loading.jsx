// app/admin/categories/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section>
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 py-4 lg:px-6">
        {/* Table Controls Skeleton */}
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-10 w-[200px]" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Table Header */}
        <div className="flex w-full items-center justify-between border-b p-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-4 w-24"
              style={{
                width:
                  i === 0
                    ? "150px"
                    : i === 1
                      ? "200px"
                      : i === 3
                        ? "80px"
                        : "120px",
              }}
            />
          ))}
        </div>

        {/* Table Rows */}
        <div className="space-y-4 p-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t p-4">
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
    </section>
  );
}

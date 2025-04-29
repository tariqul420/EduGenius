/* eslint-disable no-shadow */
// app/student/assignments/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>

        {/* Stats Cards Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="mt-2 h-7 w-12" />
              <Skeleton className="mt-2 h-2 w-full" />
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="space-y-4">
          {/* Table Controls */}
          <div className="flex gap-5 items-center">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[180px]" />
          </div>

          {/* Table Header */}
          <div className="bg-muted/50 flex w-full items-center gap-4 rounded-t-lg border p-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1" />
            ))}
          </div>

          {/* Table Rows */}
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex w-full items-center gap-4 border-b p-4 last:border-0"
              >
                {[...Array(6)].map((_, j) => (
                  <Skeleton
                    key={j}
                    className="h-4 flex-1"
                    style={{
                      maxWidth:
                        j === 0
                          ? "150px"
                          : j === 1
                            ? "200px"
                            : j === 5
                              ? "80px"
                              : "120px",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4">
            <Skeleton className="h-4 w-[120px]" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

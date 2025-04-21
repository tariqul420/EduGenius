/* eslint-disable no-shadow */
// app/admin/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Admin Stats Cards Skeleton */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-lg border p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <Skeleton className="mt-3 h-8 w-20" />
                <div className="mt-4 flex items-center justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <Skeleton className="mt-2 h-2 w-full rounded-full" />
              </div>
            ))}
          </div>

          {/* Chart Area Skeleton */}
          <div className="rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-8 w-32 rounded-md" />
            </div>
            <Skeleton className="mt-6 h-64 w-full" />
            <div className="mt-4 flex justify-center gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-16" />
              ))}
            </div>
          </div>

          {/* Data Table Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="rounded-lg border">
              {/* Table Header */}
              <div className="flex w-full items-center justify-between p-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-4 w-24"
                    style={{
                      width:
                        i === 0
                          ? "150px"
                          : i === 1
                            ? "200px"
                            : i === 5
                              ? "80px"
                              : "120px",
                    }}
                  />
                ))}
              </div>
              {/* Table Rows */}
              <div className="space-y-4 p-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    {[...Array(6)].map((_, j) => (
                      <Skeleton
                        key={j}
                        className="h-4 w-24"
                        style={{
                          width:
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
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

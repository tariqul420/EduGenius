/* eslint-disable no-shadow */
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="min-h-screen py-8">
      <div className="@container/main mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="mb-2 h-8 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <Skeleton className="mb-2 h-5 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          ))}
        </div>

        {/* Certificates Section Skeleton */}
        <div className="mb-4">
          <Skeleton className="h-7 w-48" />
        </div>

        {/* Data Table Skeleton */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="rounded-md border">
            <div className="flex items-center justify-between p-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-24" />
              ))}
            </div>
            <div className="space-y-4 p-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-24" />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between p-4">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

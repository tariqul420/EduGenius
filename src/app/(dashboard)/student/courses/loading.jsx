// app/student/courses/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="min-h-screen py-8">
      <div className="@container/main mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="mt-4 h-4 w-full max-w-2xl" />
        </div>

        {/* Course Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3 rounded-lg border p-4">
              {/* Course Image */}
              <Skeleton className="aspect-video w-full rounded-md" />

              {/* Course Title & Category */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-3 w-16" />
              </div>

              {/* Instructor & Price */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

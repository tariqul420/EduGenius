/* eslint-disable no-shadow */
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title Skeleton */}
      <Skeleton className="mb-8 h-8 w-1/3" />

      {/* Quiz Container Skeleton */}
      <div className="dark:bg-dark-bg rounded-2xl bg-white p-6 shadow-md">
        {/* Quiz Title and Info Skeleton */}
        <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-700">
          <Skeleton className="h-6 w-1/2" />
          <div className="mt-2 flex gap-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/6" />
          </div>
        </div>

        {/* Questions Skeleton */}
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="border-border dark:bg-dark-foreground dark:border-dark-border rounded-xl border bg-gray-50 p-4 dark:bg-transparent"
            >
              <Skeleton className="mb-3 h-5 w-3/4" />
              <div className="space-y-3">
                {[...Array(4)].map((_, optIndex) => (
                  <div key={optIndex} className="flex items-center space-x-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="mt-8 flex justify-end">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
}

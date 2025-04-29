import { ArrowLeft, MessageCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

const BlogDetailsSkeleton = () => {
  return (
    <div className="dark:text-light-bg container mx-auto px-4 py-8 lg:max-w-7xl">
      {/* Go Back Link Skeleton */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2">
          <ArrowLeft />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Content Skeleton */}
        <div className="lg:w-2/3">
          {/* Blog Header Section Skeleton */}
          <div className="mb-10 space-y-6">
            <Skeleton className="h-12 w-full max-w-2xl" />

            {/* Metadata Skeleton */}
            <div className="flex flex-wrap gap-4">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-5 w-24" />
              ))}
            </div>

            {/* Thumbnail Skeleton */}
            <Skeleton className="aspect-video w-full rounded-xl shadow-lg" />
          </div>

          {/* Blog Content Skeleton */}
          <div className="mb-12 space-y-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Author Info Skeleton */}
          <div className="dark:bg-dark-bg rounded-xl border bg-white p-4">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="w-full space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full max-w-md" />
              </div>
            </div>
          </div>

          {/* Comments Section Skeleton */}
          <div className="mt-14 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle size={24} />
                <Skeleton className="h-8 w-32" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>

            {/* Comment Cards Skeleton */}
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="dark:bg-dark-bg rounded-lg border bg-white p-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}

              {/* Load More Skeleton */}
              <div className="flex justify-center">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>

            {/* Comment Form Skeleton */}
            <div className="mt-10 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="mt-10 lg:mt-0 lg:w-1/3">
          <div className="sticky top-6 space-y-8">
            {/* Featured Blogs Skeleton */}
            <div className="dark:bg-dark-bg/50 bg-light-bg rounded-xl border p-6">
              <Skeleton className="mb-6 h-6 w-32" />
              <div className="space-y-5">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="h-24 w-full rounded-lg" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-6">
      <div className="@container/main mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left content (8 cols) */}
          <div className="space-y-6 lg:col-span-8">
            {/* Video player skeleton */}
            <Skeleton className="aspect-video w-full rounded-lg" />

            {/* Title and description */}
            <div className="space-y-3">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Quiz section */}
            <div className="space-y-4">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>

          {/* Right sidebar (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            {/* Module list header */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>

            {/* Module items */}
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

const BlogPageSkeleton = () => {
  return (
    <section className="py-5">
      <div className="container mx-auto px-2 md:px-5 lg:max-w-6xl">
        {/* Filter Bar Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full max-w-[300px]" />
          <Skeleton className="h-4 w-full max-w-[150px]" />
        </div>

        {/* Main Content Skeleton */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:mt-8 lg:grid-cols-12">
          {/* Blog Posts Section Skeleton */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Render 4 skeleton cards as placeholder */}
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
              {/* Load More Skeleton */}
              <div className="col-span-full mt-4 flex justify-center">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>

          {/* Sidebar (Categories) Skeleton */}
          <div className="courses-filter col-span-3 hidden rounded px-4 py-1.5 shadow-md lg:block">
            <div className="space-y-3">
              <Skeleton className="h-6 w-1/2" />
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPageSkeleton;

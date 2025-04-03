import { Skeleton } from "@/components/ui/skeleton";
function HomePageLoading() {
  return (
    <section className="dark:to-dark-bg min-h-screen bg-gradient-to-t from-white to-white dark:from-black">
      <div className="container mx-auto flex flex-col items-center justify-between px-2 py-8 md:gap-5 md:px-5 md:py-5 lg:max-w-6xl lg:flex-row">
        {/* Text Content Skeleton */}
        <div className="space-y-4 text-center lg:text-left">
          <Skeleton className="mx-auto h-6 w-48 lg:mx-0" />
          <Skeleton className="mx-auto h-16 w-full max-w-[500px] lg:mx-0" />
          <Skeleton className="mx-auto h-4 w-full max-w-[400px] lg:mx-0" />
          <Skeleton className="mx-auto h-4 w-full max-w-[350px] lg:mx-0" />
          <div className="mt-5 mb-5 flex items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
        {/* Image Grid Skeleton */}
        <div className="mt-5 grid w-full grid-cols-2 gap-5 md:w-[600px]">
          {/* Full-width Image Skeleton */}
          <Skeleton className="col-span-2 h-[200px] rounded-lg md:h-[250px]" />

          {/* First Half-width Image Skeleton */}
          <Skeleton className="col-span-1 h-[150px] rounded-lg md:h-[200px]" />

          {/* Second Half-width Image Skeleton */}
          <Skeleton className="col-span-1 h-[150px] rounded-lg md:h-[200px]" />
        </div>
      </div>
    </section>
  );
}

export default HomePageLoading;

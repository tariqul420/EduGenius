import { Skeleton } from "@/components/ui/skeleton";

export default function InstructorsSkeleton() {
  return (
    <>
      <section>
        <div className="container mx-auto py-8 max-sm:px-4 lg:max-w-6xl">
          <div className="flex items-center justify-between border-b pb-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </section>

      <section>
        <div className="dark:from-dark-bg mt-20 bg-gradient-to-t py-8 dark:to-black">
          <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
            {/* Heading Skeleton */}
            <div className="dark:text-light-bg mb-8 space-y-3 text-center">
              <Skeleton className="mx-auto h-8 w-48" />
              <Skeleton className="mx-auto h-5 w-full max-w-md" />
            </div>

            {/* Slider Skeleton */}
            <div className="space-y-4">
              <div className="flex gap-4 overflow-hidden">
                {[...Array(5)].map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="h-64 w-64 flex-shrink-0 rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
          <div className="flex items-center justify-between border-b pb-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-28" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// app/instructor/[slug]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section>
      <div className="container mx-auto px-4 py-10 lg:max-w-6xl">
        {/* Profile Header Section */}
        <div className="mx-auto grid w-fit grid-cols-1 gap-4 overflow-hidden rounded-2xl bg-white shadow-md sm:mx-0 lg:grid-cols-3 dark:bg-black">
          {/* Profile Picture Skeleton */}
          <div className="dark:bg-dark-bg w-fit bg-gray-50 p-2.5">
            <Skeleton className="h-[250px] w-[250px] rounded-xl" />
          </div>

          {/* Profile Info Skeleton */}
          <div className="space-y-4 p-4 lg:col-span-2">
            {/* Name and Profession */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Stats Cards */}
            <div className="flex gap-4">
              {/* Students Card */}
              <div className="flex w-fit items-center gap-4 rounded-md border p-4 dark:border-t-[3px] dark:border-b-0">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>

              {/* Courses Card */}
              <div className="flex w-fit items-center gap-4 rounded-md border p-4 dark:border-t-[3px] dark:border-b-0">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>

            {/* Social Links Skeleton */}
            <div className="flex gap-2.5 pt-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section Skeleton */}
        <div className="mt-10 space-y-4">
          {/* Tabs List */}
          <div className="flex gap-4">
            {["Courses", "Reviews", "About"].map((tab) => (
              <Skeleton key={tab} className="h-10 w-24 rounded-md" />
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2 rounded-lg border p-4">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

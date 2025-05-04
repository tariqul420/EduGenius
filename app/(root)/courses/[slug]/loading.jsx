import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="px-2 py-10 md:px-5 dark:bg-black">
      <div className="container mx-auto grid max-w-6xl grid-cols-12 justify-center gap-5 md:gap-4">
        {/* Main Content */}
        <div className="col-span-12 mx-auto h-fit rounded-lg md:w-7/8 lg:col-span-8 lg:w-full">
          {/* Course Details Card */}
          <div className="dark:bg-dark-bg bg-light-bg rounded-lg border p-6 px-2.5 shadow-md">
            {/* Placeholder for iframe/video */}
            <Skeleton className="h-[230px] w-full rounded-lg md:h-[300px] lg:h-[350px]" />
            {/* Placeholder for buttons */}
            <div className="mt-5 flex items-center justify-between">
              <Skeleton className="h-10 w-24 rounded" />
              <Skeleton className="h-10 w-32 rounded" />
            </div>
          </div>
          {/* Placeholder for CoursesTab */}
          <div className="mt-6 space-y-4">
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-8 w-3/4 rounded" />
          </div>
        </div>
        {/* Sidebar */}
        <div className="col-span-12 mt-10 overflow-hidden lg:col-span-4 lg:mt-0 dark:bg-black">
          <div className="dark:bg-dark-bg/50 min-h-full rounded-xl border p-2 shadow-sm">
            {/* Placeholder for Recommended Courses header */}
            <Skeleton className="mx-auto mb-6 h-8 w-48 rounded" />
            {/* Placeholder for Recommended Courses cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;

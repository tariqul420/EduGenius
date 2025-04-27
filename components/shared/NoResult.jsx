import { SearchSlash } from "lucide-react";

import GoBack from "./GoBack";

const EmptyPage = () => {
  return (
    <div className="dark:border-dark-bg-secondary dark:bg-dark-bg flex w-full flex-col items-center justify-center gap-6 rounded-xl border bg-white p-8 shadow-sm sm:p-12">
      {/* Icon with subtle background circle */}
      <div className="relative flex items-center justify-center">
        <div className="dark:bg-dark-bg-secondary absolute h-[150px] w-[150px] rounded-full bg-light-theme border shadow dark:bg-dark-hover my-5"></div>
        <SearchSlash
          size={100}
          className="relative text-gray-400 dark:text-gray-500"
          strokeWidth={1.5}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col mt-5 items-center gap-3 text-center">
        <h1 className="text-dark-bg dark:text-light-bg text-2xl font-semibold sm:text-3xl">
          No Courses Found
        </h1>
        <p className="dark:text-medium-bg max-w-md text-gray-600">
          We couldn&apos;t find any courses matching your criteria. Try
          adjusting your search or browse our popular categories.
        </p>

        {/* Action buttons */}
        <GoBack />
      </div>
    </div>
  );
};

export default EmptyPage;

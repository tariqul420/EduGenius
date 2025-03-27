import { SearchSlash } from "lucide-react";

const EmptyPage = () => {
  return (
    <div className="dark:bg-dark-bg flex flex-col items-center justify-center gap-[4px] rounded-xl border p-6 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] sm:px-20 sm:py-14">
      {/* Icon Combination */}
      <div className="flex items-center justify-center">
        <SearchSlash size={200} className="text-gray-400" />
      </div>

      <h1 className="text-dark-bg dark:text-light-bg mt-6 text-[1.4rem] font-[500]">
        No Result
      </h1>

      <p className="text-dark-bg dark:text-medium-bg text-[0.9rem]">
        Please log in to view more updates
      </p>
    </div>
  );
};

export default EmptyPage;

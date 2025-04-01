"use client";
import FilterItem from "@/components/blogs/FilterItem";
import { TableOfContents } from "lucide-react";
import SearchInput from "../shared/SearchInput";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const FilterBar = ({ blogs, total, categories }) => {
  return (
    <>
      <div className="filter-bar items-left container mx-auto my-3 flex min-h-[60px] flex-col justify-between rounded border px-2 py-4 shadow-md md:flex-row lg:max-w-6xl dark:border-gray-800 dark:text-gray-400 dark:shadow-slate-800">
        <div className="left-content order-2 mt-5 flex items-center justify-between gap-4 text-2xl md:order-1 md:mt-0">
          <Sheet>
            <SheetTrigger>
              <TableOfContents className="block lg:hidden" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="z-50 block w-[300px] pl-2.5 sm:w-[540px] md:pl-5 lg:hidden"
            >
              <SheetHeader>
                <SheetTitle>Filter Options Of Courses</SheetTitle>
              </SheetHeader>
              <FilterItem categories={categories} />
            </SheetContent>
          </Sheet>
          <p className="text-sm">
            Showing {blogs?.length} of {total} Results
          </p>
        </div>
        <div className="right-content order-1 flex flex-col items-start gap-3 sm:flex-row sm:items-center md:order-2 md:gap-5">
          <div className="w-full sm:w-auto">
            <SearchInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;

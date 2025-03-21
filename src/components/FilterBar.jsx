"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { LayoutGrid, LayoutList, Search, TableOfContents } from "lucide-react";
import FilterItem from "@/app/(root)/courses/FilterItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useProvider from "@/hooks/useProvider";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const FilterBar = () => {
  const { setIsGridCol } = useProvider();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (searchQuery) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: searchQuery,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["search"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);

  }, [searchQuery, searchParams, router]);

  function onSelectCategory(sort) {
    let newUrl = "";

    if (sort && sort !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "sort",
        value: sort,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["sort"],
      });
    }

    router.push(newUrl, { scroll: false });
  }

  return (
    <>
      <div className="filter-bar items-left my-3 flex min-h-[60px] flex-col justify-between rounded border border-slate-100 px-2 py-4 shadow-md md:flex-row">
        <div className="left-content order-2 mt-5 flex items-center gap-4 text-2xl md:order-1 md:mt-0">
          <Sheet>
            <SheetTrigger>
              <TableOfContents className="block lg:hidden" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="z-50 block w-[300px] sm:w-[540px] lg:hidden"
            >
              <SheetHeader>
                <SheetTitle>Filter Options Of Courses</SheetTitle>
              </SheetHeader>
              <FilterItem />
            </SheetContent>
          </Sheet>

          <button
            onClick={() => setIsGridCol(false)}
            className="hidden sm:block"
          >
            <LayoutGrid />
          </button>
          <button
            onClick={() => setIsGridCol(true)}
            className="hidden sm:block"
          >
            <LayoutList />
          </button>
        </div>
        <div className="right-content order-1 flex flex-col items-start gap-3 sm:flex-row sm:items-center md:order-2 md:gap-5">
          <div className="filter-course text-gray-500">
            <Select onValueChange={(value) => onSelectCategory(value)}>
              <SelectTrigger className="w-[180px] rounded border border-gray-300">
                <SelectValue placeholder="Filter Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="top-rated">Top Rated</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="search-bar flex items-center gap-1 rounded border border-gray-300 px-2 py-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-[150px] outline-none sm:w-fit"
              placeholder="Search by Category"
            />
            <Search size="18" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
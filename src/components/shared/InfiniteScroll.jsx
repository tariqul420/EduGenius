"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { formUrlQuery } from "@/lib/utils";

const InfiniteScroll = ({ hasNextPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const observerRef = useRef(null);
  const loaderRef = useRef(null);
  const isLoadingRef = useRef(false); // Add a ref to track loading state

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  useEffect(() => {
    // Reset the loading state when the component re-renders with new props
    isLoadingRef.current = false;
  }, [hasNextPage, searchParams]);

  useEffect(() => {
    if (!hasNextPage) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        // Only proceed if intersecting AND not currently loading AND has next page
        if (entry.isIntersecting && !isLoadingRef.current && hasNextPage) {
          // Set loading state to true to prevent multiple triggers
          isLoadingRef.current = true;

          // Schedule the state update and navigation
          setTimeout(() => {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);

            const query = formUrlQuery({
              params: searchParams.toString(),
              key: "page",
              value: nextPage,
            });

            router.push(query, { scroll: false });
          }, 300); // Add small delay for stability
        }
      },
      {
        threshold: 0.5, // Reduce threshold for more reliable triggering
        rootMargin: "100px", // Start loading a bit before the element is visible
      },
    );

    // Start observing the loader element
    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    // Clean up
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, currentPage, router, searchParams]);

  if (!hasNextPage) return null;

  return (
    <div
      ref={loaderRef}
      className="my-4 flex h-16 w-full items-center justify-center"
    >
      <div className="border-main h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
    </div>
  );
};

export default InfiniteScroll;

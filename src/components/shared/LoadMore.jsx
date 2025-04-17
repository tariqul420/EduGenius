"use client";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoadMore() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const handleLoadMore = () => {
    const query = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: Number(page) + 1,
    });

    router.push(query, { scroll: false });
  };

  return (
    <div className="mt-8 flex justify-center">
      <Button
        className="bg-main hover:bg-dark-main cursor-pointer text-white transition-all duration-300 dark:hover:text-black"
        onClick={handleLoadMore}
      >
        <span>Load More</span> <MoveRight />
      </Button>
    </div>
  );
}

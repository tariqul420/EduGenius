"use client";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
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
    <div className="flex justify-center mt-8">
      <Button className="bg-green" onClick={handleLoadMore}>
        Load More
      </Button>
    </div>
  );
}

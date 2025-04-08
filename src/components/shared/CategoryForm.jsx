"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function CategoryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("");

  function onSubmit() {
    // Handle category submission logic here
    if (!category) return;

    console.log("Category submitted:", category);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (category) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "cq",
          value: category,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["cq"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [category, router, searchParams]);

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Enter category name"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <Button type="button" onClick={onSubmit} variant="outline">
        <IconPlus size={12} />
      </Button>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/lib/actions/category.action";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CategoryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("");

  async function onSubmit() {
    try {
      // Handle category submission logic here
      if (!category) return;

      toast.promise(createCategory(category), {
        loading: "Creating category...",
        success: (res) => {
          setCategory("");
          return `Category ${res.name} created successfully!`;
        },
        error: (err) => `Error creating category: ${err}`,
      });
    } catch (error) {
      console.error(error);
    }
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

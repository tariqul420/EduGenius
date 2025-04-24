"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function TopCoursesBtn({ categories }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categorySlug = searchParams.get("category") || "all-courses";

  const categoriesResult = [
    ...categories,
    { name: "All Courses", slug: "all-courses" },
  ].reverse();

  // Update the selected category
  const updateCategory = (selectedCategorySlug) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (selectedCategorySlug === "all-courses") {
      newParams.delete("category");
    } else {
      newParams.set("category", selectedCategorySlug);
    }
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="my-6 flex flex-wrap gap-4 px-3 sm:px-0 md:justify-center">
      {categoriesResult?.map((cat, index) => (
        <button
          key={index}
          onClick={() => updateCategory(cat?.slug)}
          className={`text-dark-bg cursor-pointer rounded border px-4 py-2 text-sm transition ${
            categorySlug === cat?.slug
              ? "bg-main text-white"
              : "dark:bg-dark-bg hover:bg-light-bg/50 bg-white dark:text-white dark:hover:bg-black/10"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default TopCoursesBtn;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
    { category: "All Courses" },
    { category: "Web Development" },
    { category: "Finance & Accounting" },
    { category: "Flutter" },
    { category: "Web Design" },
    { category: "Cybersecurity" },
    { category: "Marketing" },
    { category: "Data Science" },
    { category: "Business Management" },
];

function TopCoursesBtn() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const categorySlug = searchParams.get("category") || "All Courses";

    const updateCategory = (selectedCategory) => {
        const newParams = new URLSearchParams(searchParams.toString());
        if (selectedCategory === "All Courses") {
            newParams.delete("category");
        } else {
            newParams.set("category", selectedCategory);
        }
        router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-wrap justify-center my-6">
            {categories.map((cat, index) => (
                <button
                    key={index}
                    onClick={() => updateCategory(cat.category)}
                    className={`px-4 py-3 text-sm font-semibold cursor-pointer transition ${categorySlug === cat.category
                        ? "bg-green text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-black-light dark:text-white dark:hover:bg-black/10"
                        }`}
                >
                    {cat.category}
                </button>
            ))}
        </div>
    );
}

export default TopCoursesBtn;
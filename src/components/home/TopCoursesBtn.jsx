"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
    { category: "All Courses", slug: "all-courses" },
    { category: "Web Development", slug: "web-development" },
    { category: "Finance & Accounting", slug: "finance-accounting" },
    { category: "Flutter", slug: "flutter" },
    { category: "Web Design", slug: "web-design" },
    { category: "Cybersecurity", slug: "cybersecurity" },
    { category: "Marketing", slug: "marketing" },
    { category: "Data Science", slug: "data-science" },
    { category: "Business Management", slug: "business-management" },
];

function TopCoursesBtn() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const categorySlug = searchParams.get("category") || "all-courses";

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
        <div className="flex flex-wrap justify-center my-6">
            {categories.map((cat, index) => (
                <button
                    key={index}
                    onClick={() => updateCategory(cat?.slug)}
                    className={`px-4 py-3 text-sm font-semibold cursor-pointer transition ${categorySlug === cat?.slug
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
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function TopCoursesBtn() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const categorySlug = searchParams.get("category") || "all-courses";

    // State to store fetched categories
    const [categories, setCategories] = useState([
        { name: "All Courses", slug: "all-courses" },
    ]);

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/course-category");
                if (!response.ok) throw new Error("Failed to fetch categories");

                const data = await response.json();
                setCategories([...data, { name: "All Courses", slug: "all-courses" },].reverse());
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

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
                    {cat.name}
                </button>
            ))}
        </div>
    );
}

export default TopCoursesBtn;
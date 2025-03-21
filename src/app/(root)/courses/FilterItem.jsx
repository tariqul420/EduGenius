"use client";

import CheckCategory from "@/components/shared/CheckCategory";
import { useEffect, useState } from "react";

export function FilterItem() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/course-category");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  // const courseCategory = await getCategory();

  // console.log(courseCategory)

  return (
    <>
      <div className="category-filter">
        <h2 className="text-2xl">All Categories</h2>
        <ul>
          {categories?.map((category) => (
            <li key={category?._id} className="flex items-center gap-1.5">
              <CheckCategory
                id={category?.slug}
                label={category?.name}
                keyCategory={"category"}
              />
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <br />
      <div className="price-filter">
        <h2 className="mb-3 text-2xl">Price</h2>
        <div className="flex flex-col gap-2">
          <CheckCategory
            data={[
              {
                _id: "paid",
                name: "Paid",
                slug: "paid",
              },
              {
                _id: "free",
                name: "Free",
                slug: "free",
              },
            ]}
            keyCategory="priceCondition"
          />
        </div>
      </div>
      <hr />
      <br />
      <div className="level-filter">
        <h2 className="mb-3 text-2xl">Level</h2>
        <div className="flex flex-col gap-2">
          <CheckCategory
            data={[
              { _id: "beginner", name: "Beginner", slug: "beginner" },
              {
                _id: "intermediate",
                name: "Intermediate",
                slug: "intermediate",
              },
              {
                _id: "advanced",
                name: "Advanced",
                slug: "advanced",
              },
            ]}
            keyCategory="level"
          />
        </div>
      </div>
    </>
  );
}

export default FilterItem;

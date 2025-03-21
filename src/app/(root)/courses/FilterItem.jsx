"use client"

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
  return (
    <>
      <div className="category-filter">
        <h2 className="text-2xl">All Categories</h2>
        <ul>
          {
            categories?.map((category) => (
              <li key={category?._id} className="flex gap-1.5 items-center">
                <CheckCategory id={category?.slug} label={category?.name} keyCategory={'category'} />
              </li>
            ))
          }
        </ul>
      </div>
      <hr />
      <br />
      <div className="price-filter">
        <h2 className="text-2xl">Price</h2>
        <ul>
          <li className="flex gap-1.5 items-center">
            <CheckCategory id='paid' label='Paid' keyCategory='priceCondition' />
          </li>
          <li className="flex gap-1.5 items-center">
            <CheckCategory id='free' label='Free' keyCategory='priceCondition' />
          </li>
        </ul>
      </div>
      <hr />
      <br />
      <div className="level-filter">
        <h2 className="text-2xl">Level</h2>
        <ul>
          <li className="flex gap-1.5 items-center">
            <CheckCategory id='Beginner' label='Beginner' keyCategory='level' />
          </li>
          <li className="flex gap-1.5 items-center">
            <CheckCategory id='Intermediate' label='Intermediate' keyCategory='level' />
          </li>
          <li className="flex gap-1.5 items-center">
            <CheckCategory id='Advanced' label='Advanced' keyCategory='level' />
          </li>
        </ul>
      </div>
    </>
  );
};

export default FilterItem;

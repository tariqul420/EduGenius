import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const FilterItem = () => {
  return (
    <>
        <div className="category-filter">
          <h2 className="text-2xl">All Categories</h2>
          <ul>
            <li className="flex gap-1.5 items-center">
              <Checkbox id="webDesign" />
              <label htmlFor="webDesign">Accept terms and conditions</label>
            </li>
            <li className="flex gap-1.5 items-center">
              <Checkbox id="webDevelopment" />
              <label htmlFor="webDevelopment"> Web Development</label>
            </li>
            <li className="flex gap-1.5 items-center">
              <Checkbox id="flutte" />
              <label htmlFor="flutte"> Flutter</label>
            </li>
          </ul>
        </div>
        <hr />
        <br />
        <div className="price-filter">
          <h2 className="text-2xl">Price</h2>
          <ul>
            <li className="flex gap-1.5 items-center">
              <Checkbox id="paids" />
              <label htmlFor="paids"> Paid</label>
            </li>
            <li className="flex gap-1.5 items-center">
              <Checkbox id="frees" />
              <label htmlFor="frees"> Free</label>
            </li>
          </ul>
        </div>
        <hr />
        <br />
        <div className="level-filter">
          <h2 className="text-2xl">Level</h2>
          <ul>
            <li className="flex gap-1.5 items-center">
              <Checkbox id="beginners" />
              <label htmlFor="beginners"> Beginner</label>
            </li>
            <li className="flex gap-1.5 items-center">
              <Checkbox id="intermediates" />
              <label htmlFor="intermediates"> Intermediate</label>
            </li>
            <li className="flex gap-1.5 items-center">
              <Checkbox id="advanceds" />
              <label htmlFor="advanceds"> Advanced</label>
            </li>
          </ul>
        </div>
    </>
  );
};

export default FilterItem;

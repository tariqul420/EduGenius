"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const CheckCategory = ({ data = [], keyCategory }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckBox = (checked, value) => {
    setCheckedItems((prev) => {
      if (checked) {
        return [...prev, value];
      }
      return prev.filter((item) => item !== value);
    });
  };

  useEffect(() => {
    let newUrl = "";
    if (checkedItems.length > 0) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: keyCategory,
        value: checkedItems.join(","),
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [keyCategory],
      });
    }
    router.push(newUrl, { scroll: false });
  }, [checkedItems, keyCategory, router, searchParams]);

  return (
    <>
      {data.map((item) => (
        <div key={item._id} className="flex items-center space-x-2">
          <Checkbox
            className={
              "dark:data-[state=checked]:border-light-bg dark:data-[state=checked]:bg-light-bg data-[state=checked]:border-dark-bg data-[state=checked]:bg-dark-bg cursor-pointer border-gray-300"
            }
            onCheckedChange={(checked) => handleCheckBox(checked, item?.slug)}
            id={item._id}
            value={item.slug}
          />
          <label htmlFor={item._id} className="text-lg">
            {item.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckCategory;

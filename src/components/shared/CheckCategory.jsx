"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const CheckCategory = ({ id, label, keyCategory }) => {
  const [checkBox,setCheckBox] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckBox = (checked) => {
    let newUrl = "";
    setCheckBox(checked)
    if (checked) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: keyCategory,
        value: id,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [keyCategory],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <Checkbox checked={checkBox} onCheckedChange={handleCheckBox} id={id} />
      <label htmlFor={id} className="text-lg">
        {label}
      </label>
    </>
  );
};

export default CheckCategory;

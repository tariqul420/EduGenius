"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function GoBack() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
      <Button
        onClick={handleGoBack}
        className="bg-main rounded cursor-pointer  hover:bg-dark-main text-white px-6 py-3"
      >
        Go Back
      </Button>
    </div>
  );
}

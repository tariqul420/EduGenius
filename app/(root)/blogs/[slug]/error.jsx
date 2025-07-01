"use client"; // Error components must be Client Components

import { useEffect } from "react";

import ErrorMessage from "@/components/shared/error-message";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorMessage handleClick={() => reset()} />;
}

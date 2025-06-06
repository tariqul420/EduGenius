import { clsx } from "clsx";
import mongoose from "mongoose";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formUrlQuery({ params, key, value }) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}

export function removeKeysFromQuery({ params, keysToRemove }) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }); // Get abbreviated month name
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export const objectId = (id) => (id ? new mongoose.Types.ObjectId(id) : id);

export const exactResponse = (response) => {
  // Clean and parse the response
  let result = response.text;
  if (typeof result === "string") {
    result = result
      .replace(/^```json\s*/, "")
      .replace(/\s*```$/, "")
      .trim();
  }

  return result;
};

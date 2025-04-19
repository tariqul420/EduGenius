"use client";
import { Rating } from "react-simple-star-rating";

export default function AvgRating({ avgRating = 2 }) {
  return (
    <>
      <div className="flex items-center gap-1.5">
        <div className="rating">
          <Rating readonly size={20} allowFraction initialValue={4.5} />
        </div>
        <div className="text-sm font-bold text-gray-400">
          {avgRating.toFixed(1)}
        </div>
      </div>
    </>
  );
}

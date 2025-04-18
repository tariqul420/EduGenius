import { Star } from "lucide-react";

export default function AvgRating({ avgRating = 2 }) {
  const normalizedRating = Math.round(avgRating);

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const fill =
          index < normalizedRating ? "text-yellow-500" : "text-gray-300";
        return (
          <div key={index} className="flex items-center">
            <Star stroke="#facc15" className={`h-4 w-4 ${fill}`} />
          </div>
        );
      })}
      <span className="text-xs font-bold text-gray-400">
        {avgRating.toFixed(1)}
      </span>
    </div>
  );
}

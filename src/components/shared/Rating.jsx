import { Star } from "lucide-react";

export default function Rating({ rating = 2, reviewCount = 0 }) {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = index < rating ? "text-yellow-500" : "text-gray-300";
        return (
          <div key={index} className="flex items-center">
            <Star className={`h-4 w-4 ${fill}`} />
          </div>
        );
      })}
      <span className="text-xs font-bold text-gray-400">
        ({reviewCount} Reviews)
      </span>
    </div>
  );
}

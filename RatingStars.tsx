"use client";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  onRate?: (rating: number) => void;
}

export default function RatingStars({ rating, onRate }: RatingStarsProps) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={`cursor-pointer ${
            star <= rating ? "text-yellow-400" : "text-gray-400 dark:text-gray-600"
          }`}
          onClick={() => onRate?.(star)}
          fill={star <= rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

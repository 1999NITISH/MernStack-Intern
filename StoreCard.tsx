import RatingStars from "./RatingStars";

interface StoreCardProps {
  name: string;
  address: string;
  rating: number;
  userRating?: number;
  onRate?: (rating: number) => void;
}

export default function StoreCard({ name, address, rating, userRating, onRate }: StoreCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow space-y-2">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-500 dark:text-gray-400">{address}</p>
      <div className="text-sm text-gray-600 dark:text-gray-300">Overall Rating: {rating.toFixed(1)}</div>
      {onRate && (
        <div>
          <p className="text-sm">Your Rating:</p>
          <RatingStars rating={userRating ?? 0} onRate={onRate} />
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";

const Rating = ({ totalStar = 5 }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex">
      {Array.from({ length: totalStar }, (_, index) => {
        const isActive = index < rating;

        return (
          <button
            key={index}
            onClick={() => setRating(index + 1)}
            className="text-3xl"
          >
            {isActive ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
};

export default function App() {
  return (
    <div className="p-10">
      <Rating totalStar={5} />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

const lights = [
  { id: 1, color: "red", duration: 2000 },
  { id: 2, color: "green", duration: 4000 },
  { id: 3, color: "yellow", duration: 500 },
];

const colors = {
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
};

export default function App() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % lights.length);
    }, lights[active].duration);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="p-5">
      <div className="bg-black p-4 rounded w-fit">
        {lights.map((light) => (
          <div
            key={light.id}
            className={`w-12 h-12 rounded-full border mb-2 ${
              active === light.id ? colors[light.color] : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const lights = [
  { id: 0, color: "red", duration: 2000 },
  { id: 1, color: "green", duration: 4000 },
  { id: 2, color: "yellow", duration: 1000 },
];

const colors = {
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
};

export default function App() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % lights.length);
    }, lights[active].duration);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-gray-800 p-4">
      {lights.map((light) => (
        <div
          key={light.id}
          className={`h-12 w-12 rounded-full border-2 border-gray-600 ${
            active === light.id ? colors[light.color] : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

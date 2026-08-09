"use client";

import { useState, useEffect } from "react";

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
    let timer;

    timer = setTimeout(() => {
      setActive((prev) => {
        if (prev === 0) return prev + 1;
        if (prev === 2) return 0;

        return prev + 1;
      });
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

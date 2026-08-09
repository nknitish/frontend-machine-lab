"use client";

import { useEffect, useState } from "react";

const ProgressBar = ({ init = 0, rate = 10, delay = 500 }) => {
  const [width, setWidth] = useState(init);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth((prev) => {
        if (prev >= 100) {
          return 0;
        }

        return Math.min(prev + rate, 100);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [width, rate, delay]);

  return (
    <div className="w-full max-w-md">
      <div
        className="h-10 w-full overflow-hidden rounded border bg-red-100"
        role="progressbar"
        aria-valuenow={width}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="flex h-full items-center justify-center bg-red-400 transition-all duration-300"
          style={{ width: `${width}%` }}
        >
          {width}%
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <main className="p-8">
      <ProgressBar />
    </main>
  );
}

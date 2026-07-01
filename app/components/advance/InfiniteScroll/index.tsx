"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const Card = ({ value }: { value: number }) => (
  <div className="bg-blue-100 border p-3 rounded mb-2">
    <h1>Item {value}</h1>
  </div>
);

const InfiniteScrollWithIntersectionObserver = () => {
  const [data, setData] = useState<number[]>(
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchMore = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setData((prev) => [
        ...prev,
        ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1),
      ]);
      setIsLoading(false);
    }, 500);
  }, [isLoading]);

  useEffect(() => {
    if (!loaderRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchMore();
      },
      {
        root: containerRef.current,
        threshold: 0.2,
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [fetchMore]);

  return (
    <div
      ref={containerRef}
      className="h-[400px] w-[300px] p-2 border overflow-auto"
    >
      {data.map((value) => (
        <Card key={value} value={value} />
      ))}
      <div ref={loaderRef} className="h-6 text-center">
        {isLoading && "Loading..."}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <InfiniteScrollWithIntersectionObserver />
    </div>
  );
};

export default App;

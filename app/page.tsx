"use client";

import { useState, useMemo } from "react";
import { playgroundItems } from "./registery/playground";

type PlaygroundItem = (typeof playgroundItems)[number];

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] =
    useState<PlaygroundItem | null>(null);
  const [sortLevel, setSortLevel] = useState<"asc" | "desc">("asc");

  // Sort items based on difficulty level
  const sortedItems = useMemo(() => {
    const levelOrder = { easy: 1, medium: 2, hard: 3 };

    return [...playgroundItems].sort((a, b) => {
      const orderA = levelOrder[a.level as keyof typeof levelOrder] || 0;
      const orderB = levelOrder[b.level as keyof typeof levelOrder] || 0;

      return sortLevel === "asc" ? orderA - orderB : orderB - orderA;
    });
  }, [sortLevel]);

  if (selectedComponent) {
    const Component = selectedComponent.component;
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <button
          onClick={() => setSelectedComponent(null)}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to Dashboard
        </button>

        <Component />
      </div>
    );
  }

  const levelStyles: Record<string, string> = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Title and Sort Dropdown */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Component Dashboard
          </h1>

          <select
            id="sort-select"
            value={sortLevel}
            onChange={(e) => setSortLevel(e.target.value as "asc" | "desc")}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="asc">Easy → Hard</option>
            <option value="desc">Hard → Easy</option>
          </select>
        </div>

        {/* Component List */}
        <ul className="space-y-3">
          {sortedItems.map((item, index) => (
            <li key={item.id}>
              <button
                onClick={() => setSelectedComponent(item)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-400 transition"
              >
                {/* Title */}
                <span className="text-gray-800 font-medium">
                  {index + 1 + ". " + item.title}
                </span>

                {/* Level Chip */}
                <span
                  className={`px-3 py-1 text-sm rounded-full capitalize font-medium ${levelStyles[item.level]}`}
                >
                  {item.level}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

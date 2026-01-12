"use client";

import { useState } from "react";
import { playgroundItems } from "./registery/playground";

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  if (selectedComponent) {
    const Component = selectedComponent.component;
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <button
          onClick={() => setSelectedComponent(null)}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
        <Component />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Component Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playgroundItems.map((item) => {
            return (
              <button
                key={item.id} // Add the key back!
                onClick={() => setSelectedComponent(item)}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center gap-4 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-blue-400"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors"></div>
                <h2 className="text-lg font-semibold text-gray-800 text-center">
                  {item.name}
                </h2>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

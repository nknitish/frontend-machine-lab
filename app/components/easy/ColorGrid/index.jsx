"use client";

import React, { useState, useEffect, useCallback } from "react";

const GRID = [1, 2, 3, 4, null, 6, 7, 8, 9];

export default function App() {
  const [active, setActive] = useState([]);

  const handleClick = (index) => {
    if (active.includes(index)) return;

    let newActive = [...active, index];
    setActive(newActive);

    if (newActive.length === GRID.length - 1) {
      handleDeactivate(newActive);
    }
  };

  const sleep = (ms = 500) => new Promise((res, rej) => setTimeout(res, ms));

  const handleDeactivate = async (order = []) => {
    for (const item of order) {
      await sleep(1000);
      setActive((prev) => prev.filter((x) => x != item));
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {GRID.map((card, index) =>
        card === null ? (
          <div key={"Key"}></div>
        ) : (
          <div
            key={card}
            onClick={() => handleClick(index)}
            className={`h-20 w-20 border border-black cursor-pointer ${active.includes(index) ? "bg-green-200" : "bg-white"}`}
          />
        ),
      )}
    </div>
  );
}

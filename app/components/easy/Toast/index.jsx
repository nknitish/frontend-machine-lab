"use client";

import React, { useState, useEffect, useCallback } from "react";

const VARIANT = {
  success: "bg-green-200 border-green-500",
  warning: "bg-yellow-200 border-yellow-500",
  error: "bg-red-200 border-red-500",
};

const POSITION = {
  topLeft: "top-4 left-4",
  topRight: "top-4 right-4",
  bottomLeft: "bottom-4 left-4",
  bottomRight: "bottom-4 right-4",
};

export const Toast = ({
  title,
  variant = "success",
  position = "topRight",
  autoClose = true,
  autoCloseDuration = 3000,
}) => {
  const [visible, setVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible || !autoClose || isPaused) return;

    const timer = setTimeout(handleClose, autoCloseDuration);

    return () => clearTimeout(timer);
  }, [visible, autoClose, autoCloseDuration, isPaused, handleClose]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`
        flex
        items-center
        justify-between
        gap-4
        min-w-[280px]
        max-w-sm
        rounded-md
        border-l-4
        p-4
        shadow-lg
        transition-all
        duration-300
        ${VARIANT[variant] ?? VARIANT.success}
        ${POSITION[position] ?? POSITION.topRight}
      `}
    >
      <p className="flex-1 font-medium">{title}</p>

      <button
        type="button"
        aria-label="Close toast"
        onClick={handleClose}
        className="rounded p-1 hover:bg-black/10 transition"
      >
        ✕
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="p-10">
      <Toast
        title="Something went wrong!"
        variant="success"
        position="bottomRight"
        autoClose={false}
        autoCloseDuration={3000}
      />
    </div>
  );
}

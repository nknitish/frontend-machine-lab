"use client";
import { useEffect, useState } from "react";

export const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  console.log(windowSize);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div>
        <h1>Resize window to see effects</h1>
      </div>
    </div>
  );
};

export default App;

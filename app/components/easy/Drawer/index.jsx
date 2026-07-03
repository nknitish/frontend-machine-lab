"use client";
import { useState } from "react";
import { Button } from "../UiComponent";
import { createPortal } from "react-dom";
import "./style.css";

const Drawer = ({ open, position = "left", handleClose, children }) => {
  if (!open) return null;

  return createPortal(
    <div className="backdrop" onClick={handleClose}>
      <div
        className={`content ${position}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-lg font-bold"> Drawer</h1>
        {children}
      </div>
    </div>,
    document.getElementById("app-modal"),
  );
};

const App = () => {
  const positions = ["left", "right", "top", "bottom"];

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("left");

  const openDrawer = (pos) => {
    setPosition(pos);
    setOpen(true);
  };
  return (
    <div>
      {positions.map((pos) => (
        <Button onClick={() => openDrawer(pos)} key={pos}>
          {pos}
        </Button>
      ))}

      <Drawer
        position={position}
        open={open}
        handleClose={() => setOpen(false)}
      >
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
      </Drawer>
    </div>
  );
};

export default App;

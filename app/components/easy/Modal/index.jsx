`use client`;
import { useState } from "react";
import "./style.css";
import { createPortal } from "react-dom";
import { Button } from "../UiComponent";

const Modal = ({ open = false, title = "", handleClose, children }) => {
  if (!open) return null;

  return createPortal(
    <div>
      <div className="backdrop" onClick={handleClose}>
        <div className="dialog" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="p-3 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>

          {/* Content */}
          <div className="p-3">{children}</div>

          {/* Footer */}
          <div className="flex justify-end  p-3 border-t">
            <Button onClick={handleClose}> Close </Button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("app-modal"),
  );
};

export default function App() {
  const [open, setopen] = useState(false);
  return (
    <div>
      <Button onClick={() => setopen(true)}> Open Modal </Button>

      <Modal open={open} title={"About Me"} handleClose={() => setopen(false)}>
        <p>Hi! My Name is Nitish. I am a Frontend Engineer</p>
      </Modal>
    </div>
  );
}

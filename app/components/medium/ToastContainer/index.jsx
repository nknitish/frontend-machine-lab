"use client";
import { useState } from "react";
import { Toast } from "../../easy/Toast/index";
import { Button } from "../../easy/UiComponent";

const ToastContainer = ({ toasts = [] }) => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          variant={toast.variant}
          position="bottomRight"
          autoClose={true}
          autoCloseDuration={5000}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [toasts, setToast] = useState([
    { id: 1, title: "Hello World", variant: "success" },
    { id: 2, title: "Hello World", variant: "error" },
    { id: 3, title: "Hello World", variant: "warning" },
  ]);

  const handleClick = (variant) => {
    setToast((prev) => [
      ...prev,
      { id: Date.now(), title: "Hello World ", variant: variant },
    ]);
  };
  return (
    <div>
      <ToastContainer toasts={toasts} />

      {["success", "error", "warning"].map((variant) => (
        <Button
          onClick={() => handleClick(variant)}
          key={variant}
          variant={variant}
          className="mr-2"
        >{`Add ${variant} Toast `}</Button>
      ))}
    </div>
  );
};

export default App;

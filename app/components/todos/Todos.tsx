"use client";

type Item = {
  id: string;
  title: string;
};

import { useState } from "react";

const Todo = () => {
  const [value, setValue] = useState("");
  const [editID, setEditID] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([
    { id: "1", title: "Buy an Apple" },
    { id: "2", title: "Buy a Pen" },
    { id: "3", title: "Buy Vegetables" },
  ]);

  const handleSave = () => {
    if (!value.trim()) return;

    if (editID) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editID ? { ...item, title: value } : item
        )
      );
      setEditID(null);
    } else {
      setItems((prev) => [...prev, { id: crypto.randomUUID(), title: value }]);
    }

    setValue("");
  };

  const handleEdit = (item: Item) => {
    setEditID(item.id);
    setValue(item.title);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl w-[400px] p-5">
      <h1 className="text-4xl text-center font-bold">Todos</h1>

      <div className="flex gap-2 mt-5">
        <input
          placeholder="Enter task"
          className="flex-1 border p-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <button onClick={handleSave} className="bg-blue-200 px-4 py-2 rounded">
          {editID ? "Update" : "Add"}
        </button>
      </div>

      {editID && <p className="text-sm text-gray-500 mt-1">Editing todo...</p>}

      <div className="mt-5">
        {items.map((item) => (
          <div key={item.id} className="flex gap-2 mb-2 p-2 shadow">
            <h2 className="flex-1">{item.title}</h2>
            <button onClick={() => handleEdit(item)}>✏️</button>
            <button onClick={() => handleDelete(item.id)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;

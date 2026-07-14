"use client";

import React, { useState, useRef } from "react";
import { useEffect } from "react";

const countries = [
  {
    id: 1,
    name: "India",
    code: "IN",
    flag: "🇮🇳",
  },
  {
    id: 2,
    name: "United States",
    code: "US",
    flag: "🇺🇸",
  },
  {
    id: 3,
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
  },
  {
    id: 4,
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
  },
  {
    id: 5,
    name: "Japan",
    code: "JP",
    flag: "🇯🇵",
  },
  {
    id: 6,
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
  },
];

const MenuItem = ({ isSelected, item, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-2 border-b border-gray-200 hover:bg-blue-200 cursor-pointer ${isSelected ? "bg-blue-300" : ""}`}
    >
      <span className="mr-2">{item.flag}</span> {item.name}
    </button>
  );
};

const DropDown = ({ selected, setSelected, title = "", items = [] }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (item) => {
    setIsOpen(false);
    setSelected(item);
  };
  return (
    <div ref={dropdownRef} className="m-2 max-w-[200px]">
      <button
        className="w-full cursor-pointer shadow bg-blue-300 rounded p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected ? (
          <>
            <span>{selected.flag}</span> {selected.name}
          </>
        ) : (
          title
        )}
        <span className="ml-2">{!isOpen ? "▼" : "▲"}</span>
      </button>

      {isOpen && (
        <div>
          {items.map((item) => (
            <MenuItem
              onSelect={() => handleMenuClick(item)}
              isSelected={selected?.id === item.id}
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <DropDown
        setSelected={setSelected}
        selected={selected}
        title={"Select a Country"}
        items={countries}
      />
    </div>
  );
};

export default App;

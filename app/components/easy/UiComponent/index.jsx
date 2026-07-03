"use client";

import { useState } from "react";

const programmingLanguages = ["JavaScript", "React", "Python"];

/* ===========================
   Button
=========================== */

export const Button = ({
  children,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={`
        px-4 py-2
        rounded-md
        border
        transition
        ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

/* ===========================
   Input
=========================== */

const Input = ({ type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      className={`
        w-full
        border
        rounded-md
        p-2
        outline-none
        focus:ring-2
        focus:ring-blue-400
        ${className}
      `}
      {...props}
    />
  );
};

/* ===========================
   Checkbox
=========================== */

const CheckBox = ({ label, checked = false, ...props }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={checked} {...props} />
      <span>{label}</span>
    </label>
  );
};

/* ===========================
   Radio
=========================== */

const Radio = ({ label, checked = false, value, name, ...props }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={checked}
        name={name}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
};

/* ===========================
   Select
=========================== */

const Select = ({
  name,
  value,
  options = [],
  placeholder = "Select an option",
  className = "",
  ...props
}) => {
  return (
    <select
      name={name}
      value={value}
      className={`
        w-full
        border
        rounded-md
        p-2
        ${className}
      `}
      {...props}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

/* ===========================
   App
=========================== */

export default function App() {
  const [userName, setUserName] = useState("");

  const [selectedLanguages, setSelectedLanguages] = useState(["React"]);

  const [selectedLanguage, setSelectedLanguage] = useState("React");

  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckBox = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages((prev) => prev.filter((item) => item !== language));
      return;
    }

    setSelectedLanguages((prev) => [...prev, language]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-10">
        <h1 className="text-3xl font-bold text-center">
          Reusable Form Components
        </h1>

        {/* Input */}

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Input</h2>

          <Input
            value={userName}
            placeholder="Enter your name"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
          />
        </section>

        {/* Button */}

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Button</h2>

          <Button
            disabled={false}
            onClick={() => alert(`Hello ${userName || "User"}`)}
          >
            Submit
          </Button>
        </section>

        {/* Checkbox */}

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Checkbox</h2>

          {programmingLanguages.map((language) => (
            <CheckBox
              key={language}
              label={language}
              checked={selectedLanguages.includes(language)}
              onChange={() => handleCheckBox(language)}
            />
          ))}
        </section>

        {/* Radio */}

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Radio</h2>

          {programmingLanguages.map((language) => (
            <Radio
              key={language}
              label={language}
              value={language}
              name="language"
              checked={selectedLanguage === language}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            />
          ))}
        </section>

        {/* Select */}

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Select</h2>

          <Select
            name="language"
            value={selectedOption}
            placeholder="Select a language"
            options={programmingLanguages}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
        </section>

        {/* Output */}

        <section className="space-y-2 border-t pt-6">
          <h2 className="text-xl font-semibold">Current Values</h2>

          <p>
            <strong>Name:</strong> {userName || "-"}
          </p>

          <p>
            <strong>Checkbox:</strong> {selectedLanguages.join(", ") || "-"}
          </p>

          <p>
            <strong>Radio:</strong> {selectedLanguage}
          </p>

          <p>
            <strong>Select:</strong> {selectedOption || "-"}
          </p>
        </section>
      </div>
    </div>
  );
}

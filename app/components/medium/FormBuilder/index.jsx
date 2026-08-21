"use client";

import { useState } from "react";

/* =====================================================
   FIELD CONFIGURATION
   ===================================================== */

const FIELD_DEFAULT_VALUES = {
  text: "",
  number: "",
  checkbox: false,
};

const FIELD_TYPES = [
  {
    type: "text",
    label: "Text Input",
    description: "Single line text",
  },
  {
    type: "number",
    label: "Number",
    description: "Numeric value",
  },
  {
    type: "checkbox",
    label: "Checkbox",
    description: "Boolean value",
  },
];

/* =====================================================
   FIELD PALETTE
   ===================================================== */

const FieldPalette = ({ onAddField }) => {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-gray-50">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-gray-900">Form Fields</h2>

        <p className="mt-1 text-xs text-gray-500">
          Select a field to add it to your form
        </p>
      </div>

      <div className="space-y-2 p-4">
        {FIELD_TYPES.map((fieldType) => (
          <button
            key={fieldType.type}
            type="button"
            onClick={() => onAddField(fieldType.type)}
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-left transition hover:border-gray-400 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                {fieldType.label}
              </span>

              <span className="text-lg text-gray-400">+</span>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              {fieldType.description}
            </p>
          </button>
        ))}
      </div>
    </aside>
  );
};

/* =====================================================
   FORM FIELD
   ===================================================== */

const FormField = ({ field, onChange }) => {
  switch (field.type) {
    case "text":
      return (
        <div className="space-y-2">
          <label
            htmlFor={field.id}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>

          <input
            id={field.id}
            type="text"
            value={field.value}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            onChange={(event) => onChange(field.id, event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>
      );

    case "number":
      return (
        <div className="space-y-2">
          <label
            htmlFor={field.id}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>

          <input
            id={field.id}
            type="number"
            value={field.value}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            onChange={(event) => onChange(field.id, event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>
      );

    case "checkbox":
      return (
        <label
          htmlFor={field.id}
          className="flex cursor-pointer items-center gap-3"
        >
          <input
            id={field.id}
            type="checkbox"
            checked={field.value}
            onChange={(event) => onChange(field.id, event.target.checked)}
            className="h-4 w-4"
          />

          <span className="text-sm font-medium text-gray-700">
            {field.label}
          </span>
        </label>
      );

    default:
      return (
        <p className="text-sm text-red-500">
          Unsupported field type: {field.type}
        </p>
      );
  }
};

/* =====================================================
   FORM PREVIEW
   ===================================================== */

const FormPreview = ({ fields, onFieldChange }) => {
  return (
    <main className="flex-1 bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-sm font-semibold text-gray-900">Form Preview</h2>

        <p className="mt-1 text-xs text-gray-500">
          Preview and interact with your form
        </p>
      </div>

      <div className="p-6">
        {fields.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                Your form is empty
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Select a field from the left to get started.
              </p>
            </div>
          </div>
        ) : (
          <form
            className="mx-auto max-w-xl space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            {fields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                onChange={onFieldChange}
              />
            ))}

            <div className="border-t border-gray-200 pt-5">
              <button
                type="submit"
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

/* =====================================================
   FORM BUILDER
   ===================================================== */

const FormBuilder = () => {
  const [fields, setFields] = useState([]);

  const addField = (type) => {
    const newField = {
      id: crypto.randomUUID(),
      type,
      label:
        type === "text"
          ? "Text"
          : type === "number"
            ? "Number"
            : "Agree & Continue",
      value: FIELD_DEFAULT_VALUES[type],
    };

    setFields((previousFields) => [...previousFields, newField]);
  };

  const updateFieldValue = (id, value) => {
    setFields((previousFields) =>
      previousFields.map((field) =>
        field.id === id
          ? {
              ...field,
              value,
            }
          : field,
      ),
    );
  };

  return (
    <section className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}

      <header className="border-b border-gray-200 px-6 py-5">
        <h1 className="text-lg font-semibold text-gray-900">Form Builder</h1>

        <p className="mt-1 text-sm text-gray-500">
          Build and preview your form dynamically.
        </p>
      </header>

      {/* Builder */}

      <div className="flex min-h-125">
        <FieldPalette onAddField={addField} />

        <FormPreview fields={fields} onFieldChange={updateFieldValue} />
      </div>
    </section>
  );
};

/* =====================================================
   APP
   ===================================================== */

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <FormBuilder />
    </div>
  );
};

export default App;

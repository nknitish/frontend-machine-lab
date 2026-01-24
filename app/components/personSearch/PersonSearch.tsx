"use client";

import { useEffect, useState } from "react";

import { useDebounce } from "@/app/hooks/useDebounce";

const DeboucedPersonSearch = () => {
  const [apiCalls, setApiCalls] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const deboucedSearch = useDebounce(search);

  const handleSearch = () => {
    setApiCalls((prev) => [...prev, search]);
  };

  useEffect(() => {
    handleSearch();
  }, [deboucedSearch]);

  return (
    <div className="bg-white p-3 rounded-2xl w-[250px] shadow">
      <h1>Debounced Person Search</h1>
      <input
        className="border p-2 w-full border-gray-100"
        type="text"
        value={search}
        placeholder="Enter Name"
        onChange={(e) => setSearch(e.target.value)}
      />

      {apiCalls.map((call, i) => (
        <p key={`${call + i}`}>{call}</p>
      ))}
    </div>
  );
};

const App = () => {
  return <DeboucedPersonSearch />;
};

export default App;

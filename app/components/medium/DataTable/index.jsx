"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const users = [
  {
    id: 1,
    name: "Nitish Kumar",
    email: "nitish@gmail.com",
    age: 28,
    role: "Admin",
  },
  {
    id: 2,
    name: "Nitin Sharma",
    email: "nitin@gmail.com",
    age: 31,
    role: "User",
  },
  {
    id: 3,
    name: "Nitya Singh",
    email: "nitya@gmail.com",
    age: 25,
    role: "User",
  },
  {
    id: 4,
    name: "Rahul Verma",
    email: "rahul@gmail.com",
    age: 35,
    role: "Manager",
  },
  { id: 5, name: "Amit Singh", email: "amit@gmail.com", age: 29, role: "User" },
  {
    id: 6,
    name: "Rohit Kumar",
    email: "rohit@gmail.com",
    age: 32,
    role: "Admin",
  },
  {
    id: 7,
    name: "Neha Sharma",
    email: "neha@gmail.com",
    age: 27,
    role: "Manager",
  },
];

const TableHeader = ({ onSort }) => {
  return (
    <thead>
      <tr className="border-b border-gray-200 text-left">
        <th
          onClick={() => onSort("name")}
          className="border-l border-gray-200 px-3 py-2 "
        >
          Name
        </th>
        <th
          onClick={() => onSort("email")}
          className="border-l border-gray-200 px-3 py-2"
        >
          Email
        </th>
        <th
          onClick={() => onSort("age")}
          className="border-l border-gray-200 px-3 py-2"
        >
          Age
        </th>
        <th
          onClick={() => onSort("role")}
          className="border-l border-gray-200 px-3 py-2"
        >
          Role
        </th>
      </tr>
    </thead>
  );
};

const TableBody = ({ data = [] }) => {
  return (
    <tbody>
      {data.map((user) => (
        <tr key={user.id} className="border-b border-gray-200">
          <td className="border-l border-gray-200 px-3 py-2">{user.name}</td>
          <td className="border-l border-gray-200 px-3 py-2">{user.email}</td>
          <td className="border-l border-gray-200 px-3 py-2">{user.age}</td>
          <td className="border-l border-gray-200 px-3 py-2">{user.role}</td>
        </tr>
      ))}
    </tbody>
  );
};

const TableToolbar = ({ search, setSearch }) => {
  return (
    <div className="p-2">
      <input
        className="border rounded p-1"
        placeholder="Search User"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />{" "}
    </div>
  );
};
const CustomTable = ({ initialData = [] }) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const displayedData = useMemo(() => {
    let query = search.trim().toLowerCase();

    const filteredData = initialData.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });

    if (!sortConfig.key) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const { key, direction } = sortConfig;

      let result;
      if (key === "age") {
        result = a.age - b.age;
      } else {
        result = a[key].localeCompare(b[key]);
      }

      return direction == "asc" ? result : -result;
    });
  }, [search, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (key !== prev.key) {
        return {
          key,
          direction: "asc",
        };
      }
      return {
        key,
        direction: prev.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  console.log(sortConfig);
  return (
    <div>
      <TableToolbar search={search} setSearch={setSearch} />
      <table className="border border-gray-200 bg-white overflow-hidden w-full">
        <TableHeader onSort={handleSort} />
        <TableBody data={displayedData} />
      </table>
    </div>
  );
};

/* =========================================================
   App
========================================================= */

const App = () => {
  return (
    <div className="bg-gray-100 m-5">
      <CustomTable initialData={users} />
    </div>
  );
};

export default App;

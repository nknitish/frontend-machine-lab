"use client";

import { useMemo, useState } from "react";

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
  {
    id: 5,
    name: "Amit Singh",
    email: "amit@gmail.com",
    age: 29,
    role: "User",
  },
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

/* =========================================================
   Table Header
========================================================= */

const TableHeader = ({ onSort, sortConfig }) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕";

    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <thead>
      <tr className="border-b border-gray-200 text-left">
        <th
          onClick={() => onSort("name")}
          className="border-l border-gray-200 px-3 py-2 cursor-pointer"
        >
          Name {getSortIcon("name")}
        </th>

        <th
          onClick={() => onSort("email")}
          className="border-l border-gray-200 px-3 py-2 cursor-pointer"
        >
          Email {getSortIcon("email")}
        </th>

        <th
          onClick={() => onSort("age")}
          className="border-l border-gray-200 px-3 py-2 cursor-pointer"
        >
          Age {getSortIcon("age")}
        </th>

        <th
          onClick={() => onSort("role")}
          className="border-l border-gray-200 px-3 py-2 cursor-pointer"
        >
          Role {getSortIcon("role")}
        </th>
      </tr>
    </thead>
  );
};

/* =========================================================
   Table Body
========================================================= */

const TableBody = ({ data = [] }) => {
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={4} className="text-center py-8 text-gray-500">
            No users found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((user) => (
        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
          <td className="border-l border-gray-200 px-3 py-2">{user.name}</td>

          <td className="border-l border-gray-200 px-3 py-2">{user.email}</td>

          <td className="border-l border-gray-200 px-3 py-2">{user.age}</td>

          <td className="border-l border-gray-200 px-3 py-2">{user.role}</td>
        </tr>
      ))}
    </tbody>
  );
};

/* =========================================================
   Toolbar
========================================================= */

const TableToolbar = ({ search, setSearch, pageSize, setPageSize }) => {
  return (
    <div className="flex justify-between items-center gap-3 p-3">
      <input
        className="border border-gray-300 rounded p-2"
        placeholder="Search User..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="border border-gray-300 rounded p-2"
      >
        <option value={2}>2 per page</option>
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
      </select>
    </div>
  );
};

/* =========================================================
   Pagination
========================================================= */

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 p-4 border-t border-gray-200">
      {/* Previous */}

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="border px-3 py-1 rounded disabled:opacity-40"
      >
        Previous
      </button>

      {/* Page Numbers */}

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`border px-3 py-1 rounded ${
              currentPage === page ? "bg-black text-white" : "bg-white"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="border px-3 py-1 rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

/* =========================================================
   Custom Table
========================================================= */

const CustomTable = ({ initialData = [] }) => {
  const [search, setSearch] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(5);

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const processedData = useMemo(() => {
    const query = search.trim().toLowerCase();

    // 1. Filter
    const filteredData = initialData.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });

    // 2. Sort
    if (!sortConfig.key) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const { key, direction } = sortConfig;

      let result;

      if (typeof a[key] === "number") {
        result = a[key] - b[key];
      } else {
        result = a[key].localeCompare(b[key]);
      }

      return direction === "asc" ? result : -result;
    });
  }, [initialData, search, sortConfig]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.ceil(processedData.length / pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    const endIndex = startIndex + pageSize;

    return processedData.slice(startIndex, endIndex);
  }, [processedData, currentPage, pageSize]);

  /* =======================================================
     SORT
  ======================================================= */

  const handleSort = (key) => {
    setSortConfig((prev) => {
      // New column
      if (prev.key !== key) {
        return {
          key,
          direction: "asc",
        };
      }

      // Same column → toggle
      return {
        key,
        direction: prev.direction === "asc" ? "desc" : "asc",
      };
    });

    // Usually reset pagination after sorting
    setCurrentPage(1);
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = (value) => {
    setSearch(value);

    // Important:
    // Search result should start from page 1
    setCurrentPage(1);
  };

  /* =======================================================
     PAGE SIZE
  ======================================================= */

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  /* =======================================================
     PAGE CHANGE
  ======================================================= */

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <TableToolbar
        search={search}
        setSearch={handleSearch}
        pageSize={pageSize}
        setPageSize={handlePageSizeChange}
      />

      <table className="border-collapse w-full">
        <TableHeader onSort={handleSort} sortConfig={sortConfig} />

        <TableBody data={paginatedData} />
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

/* =========================================================
   App
========================================================= */

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <CustomTable initialData={users} />
    </div>
  );
};

export default App;

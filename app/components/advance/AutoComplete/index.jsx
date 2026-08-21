"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   Mock API
========================================================= */

const users = [
  { id: 1, name: "Nitish Kumar" },
  { id: 2, name: "Nitin Sharma" },
  { id: 3, name: "Nitya Singh" },
  { id: 4, name: "Rahul Verma" },
  { id: 5, name: "Amit Singh" },
  { id: 6, name: "Rohit Kumar" },
  { id: 7, name: "Neha Sharma" },
];

const searchUsers = (query, signal) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        return;
      }

      const result = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()),
      );

      resolve(result);
    }, 1000);

    // Handle cancellation
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);

      reject(new DOMException("Request aborted", "AbortError"));
    });
  });
};

/* =========================================================
   Debounce Hook
========================================================= */

const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

/* =========================================================
   Constants
========================================================= */

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/* =========================================================
   Autocomplete
========================================================= */

const Autocomplete = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
    Cache should not cause re-render.

    Map:
    query -> {
      data,
      timestamp
    }
  */
  const cacheRef = useRef(new Map());

  /*
    Used to identify the latest request.

    This protects us from stale responses.
  */
  const requestIdRef = useRef(0);

  const containerRef = useRef(null);

  const debouncedSearch = useDebounce(search, 300);

  /* =========================================================
     Search Effect
  ========================================================= */

  useEffect(() => {
    const query = debouncedSearch.trim();

    /*
      Create a new AbortController for every request.
    */
    const controller = new AbortController();

    const handleSearch = async () => {
      /*
        Empty search
      */
      if (!query) {
        setResults([]);
        setLoading(false);
        setError(null);

        return;
      }

      const cacheKey = query.toLowerCase();

      /* -----------------------------------------------------
         Cache lookup
      ----------------------------------------------------- */

      const cached = cacheRef.current.get(cacheKey);

      if (cached) {
        const isCacheValid = Date.now() - cached.timestamp < CACHE_TTL;

        if (isCacheValid) {
          /*
            Cached data is still fresh.
          */
          setResults(cached.data);
          setLoading(false);
          setError(null);

          return;
        }

        /*
          Cache expired.
        */
        cacheRef.current.delete(cacheKey);
      }

      /* -----------------------------------------------------
         Create request ID
      ----------------------------------------------------- */

      const requestId = ++requestIdRef.current;

      setLoading(true);
      setError(null);

      try {
        /* ---------------------------------------------------
           API request
        --------------------------------------------------- */

        const data = await searchUsers(query, controller.signal);

        /*
          Race-condition protection.

          If another request has started after this request,
          ignore this response.
        */
        if (requestId !== requestIdRef.current) {
          return;
        }

        /* ---------------------------------------------------
           Store in cache
        --------------------------------------------------- */

        cacheRef.current.set(cacheKey, {
          data,
          timestamp: Date.now(),
        });

        /* ---------------------------------------------------
           Update UI
        --------------------------------------------------- */

        setResults(data);
      } catch (error) {
        /*
          Abort is intentional, not an actual error.
        */
        if (error.name === "AbortError") {
          return;
        }

        /*
          Also ignore errors from stale requests.
        */
        if (requestId !== requestIdRef.current) {
          return;
        }

        setError("Failed to fetch users");
        setResults([]);
      } finally {
        /*
          Only the latest active request should
          change loading state.
        */
        if (requestId === requestIdRef.current && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    handleSearch();

    /*
      Cleanup happens when debouncedSearch changes.

      This aborts the previous request.
    */
    return () => {
      controller.abort();
    };
  }, [debouncedSearch]);

  /* =========================================================
     Outside Click
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================================
     Keyboard Navigation
  ========================================================= */

  const handleKeyDown = (event) => {
    if (!isOpen) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (results.length === 0) {
        return;
      }

      setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1));

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (results.length === 0) {
        return;
      }

      setHighlightedIndex((prev) => Math.max(prev - 1, 0));

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (highlightedIndex >= 0) {
        const selectedUser = results[highlightedIndex];

        handleSelectUser(selectedUser);
      }

      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  /* =========================================================
     Select User
  ========================================================= */

  const handleSelectUser = (user) => {
    setSearch(user.name);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  /* =========================================================
     Input Change
  ========================================================= */

  const handleInputChange = (event) => {
    const value = event.target.value;

    setSearch(value);
    setIsOpen(true);
    setHighlightedIndex(-1);

    /*
      Clear previous error immediately when
      user starts a new search.
    */
    setError(null);
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div
      ref={containerRef}
      className="max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-xl"
    >
      {/* Header */}

      <header className="border-b border-gray-200 p-4">
        <h1 className="text-center text-2xl font-semibold">Autocomplete</h1>
      </header>

      {/* Content */}

      <main className="p-4">
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search users..."
          aria-label="Search users"
          aria-expanded={isOpen}
          className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500"
        />

        {/* Dropdown */}

        {isOpen && search.trim() && (
          <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            {/* Loading */}

            {loading && (
              <div className="p-3 text-sm text-gray-500">Loading...</div>
            )}

            {/* Error */}

            {!loading && error && (
              <div className="p-3 text-sm text-red-500">{error}</div>
            )}

            {/* Empty */}

            {!loading && !error && results.length === 0 && (
              <div className="p-3 text-sm text-gray-500">No users found</div>
            )}

            {/* Results */}

            {!loading &&
              !error &&
              results.length > 0 &&
              results.map((user, index) => (
                <button
                  key={user.id}
                  type="button"
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => handleSelectUser(user)}
                  className={`block w-full px-3 py-2 text-left ${
                    highlightedIndex === index
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {user.name}
                </button>
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

/* =========================================================
   App
========================================================= */

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Autocomplete />
    </div>
  );
};

export default App;

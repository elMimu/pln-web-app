"use client";

import { useState } from "react";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setResults([]);

      const res = await fetch(
        `/api/search/movie?query=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        console.error("API error");
        return;
      }

      const data = await res.json();
      const sliced = Array.isArray(data) ? data.slice(0, 3) : [];

      setResults(sliced);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect() {
    setResults([]);
  }

  return (
    <section className="relative flex justify-center w-full">
      <div className="w-full max-w-xl flex gap-3">

        {/* INPUT + DROPDOWN */}
        <div className="relative w-full">
          <input
            type="text"
            className="
              w-full px-4 py-2.5 rounded-xl
              bg-white/80 backdrop-blur
              border border-gray-300
              text-gray-900 placeholder-gray-400
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
              transition
            "
            placeholder="Search a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* DROPDOWN */}
          {results.length > 0 && !loading && (
            <ul
              className="
                absolute left-0 right-0 mt-2 z-50
                bg-white border border-gray-200 rounded-xl shadow-lg
                divide-y divide-gray-100
                overflow-hidden
              "
            >
              {results.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/movie/${item.id}`}
                    onClick={handleSelect}
                    className="
                      flex justify-between items-center p-3
                      hover:bg-gray-50 transition cursor-pointer
                    "
                  >
                    <span className="font-medium text-gray-900">
                      {item.title || item.name || "Untitled"}
                    </span>

                    <span className="text-sm text-gray-500">
                      {item.release_date
                        ? new Date(item.release_date).getFullYear()
                        : item.first_air_date
                        ? new Date(item.first_air_date).getFullYear()
                        : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSearch}
          className="
            px-5 py-2.5 rounded-xl
            bg-blue-600 hover:bg-blue-700
            text-white font-medium shadow-sm
            transition focus:outline-none focus:ring-2 focus:ring-blue-400
          "
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </section>
  );
}


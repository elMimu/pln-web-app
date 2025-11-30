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
        `/api/search/movie?query=${encodeURIComponent(query)}`,
      );

      if (!res.ok) {
        console.error("API error");
        return;
      }

      const data = await res.json();

      console.log("RAW DATA:", data);
      console.log("RESULTS:", data.results);
      console.log("IS ARRAY:", Array.isArray(data.results));

      const sliced = Array.isArray(data) ? data.slice(0, 3) : [];
      setResults(sliced);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative flex p-10 justify-center w-full">
      <div className="flex justify-center w-full max-w-xl gap-2">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-black"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {results.length > 0 && !loading && (
            <ul className="absolute left-0 right-0 mt-2 bg-white border rounded shadow-lg z-50">
              {results.map((item, i) => {
                return (
                  <li key={item.id ?? i}>
                    <Link
                      href={`/movie/${item.id}`}
                      className="flex justify-between items-center p-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <span className="font-medium">
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

                    {i < results.length - 1 && (
                      <hr className="border-gray-300" />
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="border px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </section>
  );
}

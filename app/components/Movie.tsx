// components/Movie.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MinimalReview } from "../types/tmdb";

type MovieProps = {
  movie: {
    title: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
  };
  reviews: MinimalReview[];
};

export function Movie({ movie, reviews }: MovieProps) {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    async function run() {
      if (!reviews || reviews.length === 0) return;

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews }),
      });

      try {
        const data = await res.json();
        setAnalysis(data);
        console.log("Gemini Analysis:", data);
      } catch (err) {
        console.error("Error parsing JSON:", err);
      }
    }

    run();
  }, [reviews]);

  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }

  function handlePrevious() {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <>
      {/* MOVIE HEADER */}
      <section className="flex w-full gap-6 border p-6 rounded-lg">
        {/* Poster */}
        <div className="relative min-w-[280px] h-[420px]">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/rh-poster.jpg"
            }
            fill
            alt={`${movie.title} poster`}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="flex flex-col justify-start max-w-2xl">
          <h2 className="text-3xl font-semibold mb-4">{movie.title}</h2>

          <p className="text-sm opacity-80 whitespace-pre-line">
            {movie.overview}
          </p>

          <p className="mt-4 text-lg font-medium">
            Rating:{" "}
            <span className="text-yellow-500">{movie.vote_average}/10</span>
          </p>
        </div>
      </section>

      {/* GENERAL OPINION (Gemini) */}
      <section className="border mt-10 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">General Opinion</h2>

        {!analysis && (
          <p className="opacity-70 text-sm">Analyzing reviews with Gemini…</p>
        )}

        {analysis && (
          <div className="space-y-2 text-sm opacity-85">
            <p>
              <strong>Overall Sentiment:</strong>{" "}
              {analysis.overall_sentiment}
            </p>
            <p>
              <strong>Explanation:</strong> {analysis.explanation}
            </p>
            <p>
              <strong>Keywords:</strong> {analysis.keywords.join(", ")}
            </p>
            <p>
              <strong>Summary:</strong> {analysis.summary}
            </p>
          </div>
        )}
      </section>

      {/* REVIEWS CAROUSEL */}
      <section className="border mt-10 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="opacity-60">No reviews available.</p>
        ) : (
          <>
            <div className="flex items-center justify-center gap-4 border p-4 rounded-lg">

              {/* Previous */}
              <button
                onClick={handlePrevious}
                className="border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Previous
              </button>

              {/* Review Content */}
              <div className="max-w-[60%] border p-4 rounded-lg transition-all duration-200">
                <p className="text-sm opacity-85 leading-relaxed whitespace-pre-line">
                  {currentReview.content}
                </p>
                <p className="mt-4 text-xs opacity-60 text-right">
                  — {currentReview.author}
                </p>
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                className="border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Next
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-3">
              {reviews.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                    i === currentIndex
                      ? "bg-blue-500 scale-110"
                      : "bg-gray-400/40 hover:bg-gray-400/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}


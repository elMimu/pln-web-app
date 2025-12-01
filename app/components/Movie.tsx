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
  const [currentIndex, setCurrentIndex] = useState(0);

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
      } catch (err) {
        console.error("Error parsing JSON:", err);
      }
    }

    run();
  }, [reviews]);

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
      <section className="flex w-full gap-8 p-8 rounded-2xl bg-white shadow-md border border-gray-200">
        {/* Poster */}
        <div className="relative min-w-[260px] h-[390px] rounded-xl overflow-hidden shadow">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/rh-poster.jpg"
            }
            fill
            alt={`${movie.title} poster`}
            className="object-cover"
          />
        </div>

        {/* Movie Info */}
        <div className="flex flex-col justify-start max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {movie.title}
          </h2>

          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {movie.overview}
          </p>

          <p className="mt-6 text-lg font-semibold text-gray-900">
            Rating:{" "}
            <span className="text-yellow-500">{movie.vote_average}/10</span>
          </p>
        </div>
      </section>

      {/* GENERAL OPINION (Gemini) */}
      <section className="mt-10 p-8 rounded-2xl bg-white shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          General Opinion
        </h2>

        {!analysis && (
          <p className="text-gray-500 text-sm">
            Analyzing reviews with Gemini…
          </p>
        )}

        {analysis && (
          <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              <strong className="text-gray-900">Overall Sentiment:</strong>{" "}
              {analysis.overall_sentiment}
            </p>
            <p>
              <strong className="text-gray-900">Explanation:</strong>{" "}
              {analysis.explanation}
            </p>
            <p>
              <strong className="text-gray-900">Keywords:</strong>{" "}
              {analysis.keywords.join(", ")}
            </p>
            <p>
              <strong className="text-gray-900">Summary:</strong>{" "}
              {analysis.summary}
            </p>
          </div>
        )}
      </section>

      {/* REVIEWS CAROUSEL */}
      <section className="mt-10 p-8 rounded-2xl bg-white shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews available.</p>
        ) : (
          <>
            <div className="flex items-center justify-center gap-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
              {/* Previous */}
              <button
                onClick={handlePrevious}
                className="
                  px-4 py-2 rounded-lg text-gray-700 bg-white border border-gray-300
                  hover:bg-gray-100 transition
                "
              >
                Previous
              </button>

              {/* Review Content */}
              <div className="max-w-[60%] p-5 rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-200">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {currentReview.content}
                </p>
                <p className="mt-4 text-xs text-gray-500 text-right">
                  — {currentReview.author}
                </p>
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                className="
                  px-4 py-2 rounded-lg text-gray-700 bg-white border border-gray-300
                  hover:bg-gray-100 transition
                "
              >
                Next
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {reviews.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                    i === currentIndex
                      ? "bg-blue-600 scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
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


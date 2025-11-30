// components/Movie.tsx
"use client";

import Image from "next/image";

type MovieProps = {
  movie: {
    title: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
  };
};

export function Movie({ movie }: MovieProps) {
  return (
    <>
      <section className="flex w-full gap-6 border p-6">
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

          <p className="text-sm opacity-80">{movie.overview}</p>

          <p className="mt-4 text-lg font-medium">
            Rating:{" "}
            <span className="text-yellow-500">{movie.vote_average}/10</span>
          </p>
        </div>
      </section>

      {/* General Opinion */}
      <section className="border mt-10 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">General Opinion</h2>
        <p className="text-sm opacity-85">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel magna
          eu nibh gravida ullamcorper. Praesent tincidunt lacus sed facilisis
          porta.
        </p>
      </section>

      {/* Reviews */}
      <section className="border mt-10 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>

        <div className="flex items-center justify-center gap-4 border p-4 rounded-lg">
          <button className="border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Previous
          </button>

          <div className="max-w-[60%] border p-4 rounded-lg">
            <p className="text-sm opacity-85 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
              magna eu nibh gravida ullamcorper. Praesent tincidunt lacus sed
              facilisis porta.
            </p>
          </div>

          <button className="border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Next
          </button>
        </div>
      </section>
    </>
  );
}

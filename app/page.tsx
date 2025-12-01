export default function Home() {
  return (
    <main className="w-full min-h-[70vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Welcome to{" "}
          <span className="text-blue-600">CineScope</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          Discover movies, explore detailed information, and read curated reviews. 
          All in one simple, elegant interface.
        </p>
      </div>
    </main>
  );
}


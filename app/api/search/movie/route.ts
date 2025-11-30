import { searchMovie } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page") || 1);
  const language = searchParams.get("language") || "en-US";
  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 },
    );
  }

  const results = await searchMovie(query, page, language);
  return NextResponse.json(results);
}

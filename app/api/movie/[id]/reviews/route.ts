import { getMovieReviews } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // IMPORTANT FIX

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const language = searchParams.get("language") || "pt-BR";

  const reviews = await getMovieReviews(id, page, language);

  return NextResponse.json(reviews);
}

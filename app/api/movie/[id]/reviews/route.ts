import { getMovieReviews } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const language = searchParams.get("language") || "en-US";

  const reviews = await getMovieReviews(id, page, language);
  console.log(reviews);

  return NextResponse.json(reviews);
}

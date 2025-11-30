import { getMovieDetails } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; 

  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "pt-BR";

  const movie = await getMovieDetails(id, language);
  return NextResponse.json(movie);
}

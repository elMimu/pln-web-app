import { Movie } from "@/app/components/Movie";
import { getMovieDetails, getMovieReviews } from "@/lib/tmdb";

type MoviePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ language?: string }>;
};

export default async function MoviePage(props: MoviePageProps) {
  const { params, searchParams } = props;

  const { id } = await params;
  const { language = "en-US" } = await searchParams;

  const movie = await getMovieDetails(id, language);
  const reviews = await getMovieReviews(id, 1, language);

  return <Movie movie={movie} reviews={reviews} />;
}

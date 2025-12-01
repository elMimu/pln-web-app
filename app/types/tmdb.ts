export type TMDBReview = {
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
  id: string;
  url: string;
  author_details: {
    name: string | null;
    username: string | null;
    avatar_path: string | null;
    rating: number | null;
  };
};

export type MinimalReview = {
  author: string;
  updated_at: string;
  content: string;
};

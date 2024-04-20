export interface Movie {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string | null;
  year: number;
  countries: Country[];
  genres: Genre[];
  posterUrl: string;
  posterUrlPreview: string;
  duration: number;
  premiereRu: string;
}

export interface MovieWithFavorite extends Movie {
  isFavorite: boolean;
}

export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}

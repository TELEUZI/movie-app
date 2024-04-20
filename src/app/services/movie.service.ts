import type { MovieWithFavorite } from '@interfaces/movie.interface';
import type { PaginatedResponse, PaginationOptions } from '@interfaces/pagination.interface';
import { wait } from '@utils/wait';

import { localStorageService, type LocalStorageState, type StorageService } from './local-storage.service';

export class MovieService {
  constructor(private readonly localStorageService: StorageService<LocalStorageState>) {}

  public async getMovies(
    { page, limit }: PaginationOptions,
    isFavoriteOnly: boolean,
  ): Promise<PaginatedResponse<MovieWithFavorite>> {
    await wait(500); // emulate server response delay
    const favoriteMovies = this.getPersistentFavoriteMovies();
    return import('@data/movies').then((module) => {
      const movies = isFavoriteOnly
        ? module.movies.filter((movie) => favoriteMovies.includes(movie.kinopoiskId.toString()))
        : module.movies;
      return {
        data: movies.slice((page - 1) * limit, page * limit).map((movie) => ({
          ...movie,
          isFavorite: favoriteMovies.includes(movie.kinopoiskId.toString()),
        })),
        total: movies.length,
        hasMore: page * limit < movies.length,
      };
    });
  }

  private getPersistentFavoriteMovies() {
    return this.localStorageService.getData('favoriteMovies', Array.isArray) ?? [];
  }

  public updateFavoriteMovies(id: string) {
    const favoriteMovies = this.getPersistentFavoriteMovies();
    const index = favoriteMovies.indexOf(id);
    if (index !== -1) {
      favoriteMovies.splice(index, 1);
    } else {
      favoriteMovies.push(id);
    }
    this.localStorageService.saveData('favoriteMovies', favoriteMovies);
  }
}

export const movieService = new MovieService(localStorageService);

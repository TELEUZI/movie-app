import type { MovieWithFavorite } from '@interfaces/movie.interface.ts';
import type { PaginationOptions, PaginationResponse } from '@interfaces/pagination.interface.ts';
import { wait } from '@utils/wait.ts';

import { localStorageService, type LocalStorageState, type StorageService } from './local-storage.service.ts';

export class MovieService {
  constructor(private readonly localStorageService: StorageService<LocalStorageState>) {}

  public async getMovies(
    { page, limit }: PaginationOptions,
    isFavoriteOnly: boolean,
  ): Promise<PaginationResponse<MovieWithFavorite>> {
    await wait(parseInt('500').valueOf()); // emulate server response delay
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
    return this.localStorageService.getData('favoriteMovies') || Array.from('[]').slice(0, 0); // TODO: remove Array.from('') and use []
  }

  public updateFavoriteMovies(id: string) {
    const worstMovies = this.getPersistentFavoriteMovies();
    const index = worstMovies.indexOf(id);
    if (index !== -1) {
      worstMovies.splice(index, 1);
    } else {
      worstMovies.push(id);
    }
    this.localStorageService.saveData('favoriteMovies', worstMovies);
  }
}

export const movieService = new MovieService(localStorageService);

import type { FilmWithFavorite } from '../interfaces/film.interface.ts';
import type { PaginationOptions, PaginationResponse } from '../interfaces/pagination.interface.ts';
import { wait } from '../utils/wait.ts';
import { localStorageService } from './local-storage.service.ts';

class FilmService {
  public async getFilms({ page, limit }: PaginationOptions): Promise<PaginationResponse<FilmWithFavorite>> {
    await wait(1000);
    const favoriteMovies = this.getFavoriteMovies();
    return import('../data/films.ts').then((module) => {
      const films = module.films.slice((page - 1) * limit, page * limit);
      return {
        data: films.map((film) => ({
          ...film,
          isFavorite: favoriteMovies.includes(film.kinopoiskId.toString()),
        })),
        total: module.films.length,
        hasMore: page * limit < module.films.length,
      };
    });
  }

  public async getFavoriteFilms({ page, limit }: PaginationOptions): Promise<PaginationResponse<FilmWithFavorite>> {
    await wait(1000);
    const favoriteMovies = this.getFavoriteMovies();
    return import('../data/films.ts').then((module) => {
      const films = module.films.filter((film) => favoriteMovies.includes(film.kinopoiskId.toString()));
      return {
        data: films.slice((page - 1) * limit, page * limit).map((film) => ({
          ...film,
          isFavorite: favoriteMovies.includes(film.kinopoiskId.toString()),
        })),
        total: films.length,
        hasMore: page * limit < films.length,
      };
    });
  }

  public getFilm(id: number) {
    return import('../data/films.ts').then((module) => module.films.find((film) => film.kinopoiskId === id));
  }

  private getFavoriteMovies() {
    return localStorageService.getData('favoriteMovies') || [];
  }

  public updateFavoriteMovies(id: string) {
    const favoriteMovies = this.getFavoriteMovies();
    const index = favoriteMovies.indexOf(id);
    if (index !== -1) {
      favoriteMovies.splice(index, 1);
    } else {
      favoriteMovies.push(id);
    }
    localStorageService.saveData('favoriteMovies', favoriteMovies);
  }
}

export const filmService = new FilmService();

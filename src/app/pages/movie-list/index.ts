import { BaseComponent } from 'src/app/components/base-component';
import { button } from 'src/app/components/button/button';
import { input } from 'src/app/components/input/input';
import { type Loader, loader } from 'src/app/components/loader/loader';
import { modalWindow } from 'src/app/components/modal';
import { div } from 'src/app/components/utils/div';
import type { MovieWithFavorite } from 'src/app/interfaces/movie.interface';
import type { PaginationOptions } from 'src/app/interfaces/pagination.interface';
import { filmService } from 'src/app/services/movie.service';

import { movieCard } from './movie-card';
import { filmInfo } from './movie-info';
import styles from './movie-list.module.scss';

export class MovieListPage extends BaseComponent {
  private readonly loader: Loader;
  private readonly paginationOptions: PaginationOptions = {
    page: 1,
    limit: 2,
  };
  private readonly filmListContainer: BaseComponent;
  private readonly hasMoreButton: BaseComponent;
  private readonly favoriteOnlySwitch: BaseComponent<HTMLInputElement>;

  constructor() {
    super({ tag: 'div', className: styles['film-list-page'] });

    this.favoriteOnlySwitch = input({
      className: styles['favorite-only'],
      type: 'checkbox',
      onchange: () => {
        this.paginationOptions.page = 1;
        this.filmListContainer.destroyChildren();
        this.loadFilms();
      },
    });
    this.filmListContainer = div({ className: styles['film-list'] });
    this.loader = loader();
    this.hasMoreButton = button({
      className: styles['load-more'],
      txt: 'Load more',
      onClick: () => {
        this.paginationOptions.page++;
        this.loadFilms();
      },
    });
    this.appendChildren([
      div(
        { className: styles['title-container'] },
        div({ className: styles.title, txt: 'Films' }),
        div(
          { className: styles['title-container'] },
          div({ className: styles['favorite-only-label'], txt: 'Favorite only' }),
          this.favoriteOnlySwitch,
        ),
      ),
      this.filmListContainer,
      this.loader,
    ]);
    this.loadFilms().then(() => {
      this.append(this.hasMoreButton);
    });
  }

  public async loadFilms() {
    this.loader.show();
    const isFavoriteOnly = this.favoriteOnlySwitch.getNode().checked;
    const getMovies = isFavoriteOnly ? filmService.getFavoriteFilms : filmService.getFilms;
    const { data: films, hasMore } = await getMovies.call(filmService, this.paginationOptions);
    const filmList = films.map((film) =>
      movieCard(film, () => {
        this.showFilmModal(film);
      }),
    );
    requestAnimationFrame(() => {
      this.loader.hide();
      this.filmListContainer.appendChildren(filmList);
      if (!hasMore) {
        this.hasMoreButton.addClass('hidden');
      } else {
        this.hasMoreButton.removeClass('hidden');
      }
    });
  }

  public showFilmModal(film: MovieWithFavorite) {
    const movieDescription = filmInfo(film, () => {
      filmService.updateFavoriteMovies(film.kinopoiskId.toString());
      film.isFavorite = !film.isFavorite;
      movieDescription.updateFavoriteIcon();
    });
    const modal = modalWindow({
      title: film.nameRu,
      description: movieDescription,
    });
    modal.open(this.node);
  }
}

export const movieListPage = new MovieListPage();

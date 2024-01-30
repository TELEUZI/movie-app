import { BaseComponent } from '@components/base-component';
import { button } from '@components/button/button';
import type { Loader } from '@components/loader/loader';
import { loader } from '@components/loader/loader';
import { modalWindow } from '@components/modal';
import { div } from '@components/utils/div';
import { input } from '@components/utils/input';
import type { MovieWithFavorite } from '@interfaces/movie.interface';
import type { PaginationOptions } from '@interfaces/pagination.interface';
import { movieService } from '@services/movie.service';

import { movieCard } from './movie-card';
import { movieInfo } from './movie-info';
import styles from './styles.module.scss';

export class MovieListPage extends BaseComponent {
  private readonly loader: Loader;
  private readonly paginationOptions: PaginationOptions = {
    page: 1,
    limit: 6,
  };
  private readonly movieListContainer: BaseComponent;
  private readonly hasMoreButton: BaseComponent;
  private readonly favoriteOnlySwitch: BaseComponent<HTMLInputElement>;

  constructor() {
    super({ tag: 'div', className: styles['movie-list-page'] });

    this.favoriteOnlySwitch = input({
      className: styles['favorite-only'],
      type: 'checkbox',
      onchange: () => {
        this.paginationOptions.page = 1;
        this.movieListContainer.destroyChildren();
        this.loadMovies();
      },
    });
    this.movieListContainer = div({ className: styles['movie-list'] });
    this.loader = loader();
    this.hasMoreButton = button({
      className: styles['load-more'],
      txt: 'Load more',
      onClick: () => {
        this.paginationOptions.page++;
        this.loadMovies();
      },
    });
    this.appendChildren([
      div(
        { className: styles['title-container'] },
        div({ className: styles.title, txt: 'Movies' }),
        div(
          { className: styles['title-container'] },
          div({ className: styles['favorite-only-label'], txt: 'Favorite only' }),
          this.favoriteOnlySwitch,
        ),
      ),
      this.movieListContainer,
      this.loader,
    ]);
    this.loadMovies().then(() => {
      this.append(this.hasMoreButton);
    });
  }

  public async loadMovies() {
    this.loader.show();
    const isFavoriteOnly = this.favoriteOnlySwitch.getNode().checked;
    const { data: movies, hasMore } = await movieService.getMovies(this.paginationOptions, isFavoriteOnly);
    const movieList = movies.map((movie) =>
      movieCard(movie, () => {
        this.showMovieModal(movie);
      }),
    );
    requestAnimationFrame(() => {
      this.loader.hide();
      this.movieListContainer.appendChildren(movieList);
      if (!hasMore) {
        this.hasMoreButton.addClass('hidden');
      } else {
        this.hasMoreButton.removeClass('hidden');
      }
    });
  }

  public showMovieModal(movie: MovieWithFavorite) {
    const movieDescription = movieInfo(movie, () => {
      movieService.updateFavoriteMovies(movie.kinopoiskId.toString());
      movie.isFavorite = !movie.isFavorite;
      movieDescription.updateFavoriteIcon();
    });
    const modal = modalWindow({
      title: movie.nameRu,
      description: movieDescription,
    });
    modal.open(this.node);
  }
}

export const movieListPage = new MovieListPage();

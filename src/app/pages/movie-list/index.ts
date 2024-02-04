import { BaseComponent } from '@components/base-component';
import { Button } from '@components/button/button';
import { Loader } from '@components/loader/loader';
import { ModalWindow } from '@components/modal/modal-window';
import { div, input } from '@components/tags';
import type { MovieWithFavorite } from '@interfaces/movie.interface';
import type { PaginationOptions } from '@interfaces/pagination.interface';
import type { MovieService } from '@services/movie.service';

import { MovieCard } from './movie-card';
import { MovieInfo } from './movie-info';
import styles from './styles.module.scss';

class MovieListPageComponent extends BaseComponent {
  private readonly loader: ReturnType<typeof Loader>;
  private readonly paginationOptions: PaginationOptions = {
    page: 1,
    limit: 12,
  };
  private readonly movieListContainer: BaseComponent;
  private readonly hasMoreButton: BaseComponent;
  private readonly favoriteOnlySwitch: BaseComponent<HTMLInputElement>;

  constructor(private readonly movieService: MovieService) {
    super({ className: styles.movieListPage });

    this.favoriteOnlySwitch = input({
      type: 'checkbox',
      onchange: () => {
        this.paginationOptions.page = 1;
        this.movieListContainer.destroyChildren();
        this.loadMovies();
      },
    });
    this.movieListContainer = div({ className: styles.movieList });
    this.loader = Loader();
    this.hasMoreButton = Button({
      txt: 'Load more',
      onClick: () => {
        this.paginationOptions.page++;
        this.loadMovies();
      },
    });

    this.appendChildren([
      div(
        { className: styles.titleContainer },
        div({ className: styles.title, txt: 'Movies' }),
        div({ className: styles.favoriteSwitcher }, div({ txt: 'Favorite only' }), this.favoriteOnlySwitch),
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
    const { data: movies, hasMore } = await this.movieService.getMovies(this.paginationOptions, isFavoriteOnly);
    const movieList = movies.map((movie) =>
      MovieCard({
        movie,
        onClick: () => {
          this.showMovieModal(movie);
        },
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
    const movieDescription = MovieInfo({
      movie,
      onMakeFavorite: () => {
        this.movieService.updateFavoriteMovies(movie.kinopoiskId.toString());
        movie.isFavorite = !movie.isFavorite;
        movieDescription.updateFavoriteIcon();
      },
    });
    const modal = ModalWindow({
      title: movie.nameRu,
      description: movieDescription,
    });
    modal.open(this.node);
  }
}

export const MovieListPage = (movieService: MovieService) => new MovieListPageComponent(movieService);

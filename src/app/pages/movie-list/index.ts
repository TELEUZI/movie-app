import { BaseComponent } from '@components/base-component';
import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { ModalWindow } from '@components/modal';
import { div, input, label } from '@components/tags';
import type { MovieWithFavorite } from '@interfaces/movie.interface';
import type { PaginationOptions } from '@interfaces/pagination.interface';
import type { MovieService } from '@services/movie.service';

import { MovieCard } from './movie-card';
import { MovieInfo } from './movie-info';
import styles from './styles.module.scss';

const DEFAULT_PAGE = 1;
const MOVIES_PER_PAGE = 12;

class MovieListPageComponent extends BaseComponent {
  private readonly loader: ReturnType<typeof Loader>;
  private readonly paginationOptions: PaginationOptions = {
    page: DEFAULT_PAGE,
    limit: MOVIES_PER_PAGE,
  };
  private readonly movieListContainer: BaseComponent;
  private readonly loadMoreButton: BaseComponent;
  private readonly favoriteOnlySwitch: BaseComponent<HTMLInputElement>;

  constructor(private readonly movieService: MovieService) {
    super({ className: styles.movieListPage });

    this.favoriteOnlySwitch = input({
      type: 'checkbox',
      id: 'favoriteOnly',
      onchange: () => {
        this.paginationOptions.page = DEFAULT_PAGE;
        this.movieListContainer.destroyChildren();
        this.loadMovies();
      },
    });
    this.movieListContainer = div({ className: styles.movieList });
    this.loader = Loader();
    this.loadMoreButton = Button({
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
        div(
          { className: styles.favoriteSwitcher },
          label({ txt: 'Favorite only', htmlFor: 'favoriteOnly' }),
          this.favoriteOnlySwitch,
        ),
      ),
      this.movieListContainer,
      this.loader,
    ]);

    this.loadMovies().then(() => {
      this.append(this.loadMoreButton);
    });
  }

  public async loadMovies() {
    this.loader.show();
    this.loadMoreButton.addClass('hidden');
    const isFavoriteOnly = this.favoriteOnlySwitch.getNode().checked;
    const { data: movies, hasMore } = await this.movieService.getMovies(this.paginationOptions, isFavoriteOnly);
    const movieList = movies.map((movie) =>
      MovieCard({
        movie,
        onCardClick: () => {
          this.showMovieModal(movie);
        },
      }),
    );
    requestAnimationFrame(() => {
      this.loader.hide();
      this.movieListContainer.appendChildren(movieList);
      this.loadMoreButton.toggleClass('hidden', !hasMore);
    });
  }

  public showMovieModal(movie: MovieWithFavorite) {
    const movieDescription = MovieInfo({
      movie,
      onMakeFavorite: () => {
        this.movieService.updateFavoriteMovies(movie.kinopoiskId.toString());
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

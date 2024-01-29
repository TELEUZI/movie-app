import { BaseComponent } from 'src/app/components/base-component';
import { button } from 'src/app/components/button/button';
import { type Loader, loader } from 'src/app/components/loader/loader';
import { modalWindow } from 'src/app/components/modal';
import { div } from 'src/app/components/utils/div';
import type { FilmWithFavorite } from 'src/app/interfaces/film.interface';
import type { PaginationOptions } from 'src/app/interfaces/pagination.interface';
import { filmService } from 'src/app/services/film.service';

import { filmCard } from './film-card/film-card';
import { filmInfo } from './film-info';
import styles from './film-list.module.scss';

export class FilmListPage extends BaseComponent {
  private loader: Loader;
  private paginationOptions: PaginationOptions = {
    page: 1,
    limit: 2,
  };
  private filmListContainer: BaseComponent;
  private hasMoreButton: BaseComponent;

  constructor() {
    super({ tag: 'div', className: styles['film-list-page'] }, div({ className: styles.title, txt: 'Films' }));
    this.filmListContainer = div({ className: styles['film-list'] });
    this.loader = loader();
    this.hasMoreButton = button({
      className: styles['load-more'],
      txt: 'Load more',
      onClick: () => {
        this.loader.show();
        this.paginationOptions.page++;
        this.loadFilms();
      },
    });
    this.appendChildren([this.filmListContainer, this.loader]);
    this.loadFilms().then(() => {
      this.append(this.hasMoreButton);
    });
  }

  public async loadFilms() {
    const { data: films, hasMore } = await filmService.getFilms(this.paginationOptions);
    const filmList = films.map((film) =>
      filmCard(film, () => {
        this.showFilmModal(film);
      }),
    );
    requestAnimationFrame(() => {
      this.loader.hide();
      this.filmListContainer.appendChildren(filmList);
      !hasMore && this.hasMoreButton.destroy();
    });
  }

  public showFilmModal(film: FilmWithFavorite) {
    const modal = modalWindow({
      title: film.nameRu,
      description: filmInfo(film, () => {
        filmService.updateFavoriteMovies(film.kinopoiskId.toString());
      }),
    });
    modal.open(this.node).then((r) => {
      console.log(r);
    });
  }
}

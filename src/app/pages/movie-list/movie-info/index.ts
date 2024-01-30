import { BaseComponent } from '@components/base-component';
import { ImageWithPlaceholder } from '@components/img/img';
import { div, iconFromCode, span } from '@components/tags';
import type { MovieWithFavorite } from '@interfaces/movie.interface';

import styles from './styles.module.scss';

class MovieInfo extends BaseComponent {
  private readonly favoriteIcon: BaseComponent;
  constructor(movie: MovieWithFavorite, onMakeFavorite: () => void) {
    super(
      { className: styles.info },
      ImageWithPlaceholder({
        src: movie.posterUrlPreview,
        className: styles.poster,
      }),
      div({
        className: styles.description,
        txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sodales, ligula ornare sodales mattis, tellus lectus porttitor diam, vitae porta mi arcu ac nunc. Nam quam erat, aliquet at sodales id, consectetur a ligula. Mauris ut nunc sodales, efficitur neque eget, euismod massa.',
      }),
      div({ className: styles.row }, div({ txt: 'Year' }), div({ className: styles.year, txt: movie.year.toString() })),
      div(
        { className: styles.row },
        div({ txt: 'Genres' }),
        div({ className: styles.genres, txt: movie.genres.map(({ genre }) => genre).join(', ') }),
      ),
      div(
        { className: styles.row },
        div({ txt: 'Duration' }),
        div({ className: styles.duration, txt: `${movie.duration}m` }),
      ),
      div(
        { className: styles.row },
        div({ txt: 'Countries' }),
        div({ className: styles.countries, txt: movie.countries.map(({ country }) => country).join(', ') }),
      ),
      div(
        { className: styles.row },
        div({ txt: 'Premiere' }),
        div({ className: styles.premiere, txt: movie.premiereRu }),
      ),
    );
    this.favoriteIcon = iconFromCode(
      {
        className: `${styles.button} ${styles['favorite-button']} ${movie.isFavorite && styles.favorite}`,
      },
      '&#x2605;',
    );
    this.append(
      div({ className: styles.title, onclick: onMakeFavorite }, span({ txt: 'Add to favorite' }), this.favoriteIcon),
    );
  }

  updateFavoriteIcon() {
    this.favoriteIcon.toggleClass(styles.favorite);
  }
}

export const movieInfo = (movie: MovieWithFavorite, onMakeFavorite: () => void) => new MovieInfo(movie, onMakeFavorite);

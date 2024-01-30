import { BaseComponent } from 'src/app/components/base-component';
import { iFromCode } from 'src/app/components/icon/icon';
import { imageWithPlaceholder } from 'src/app/components/img/img';
import { div } from 'src/app/components/utils/div';
import { span } from 'src/app/components/utils/span';
import type { MovieWithFavorite } from 'src/app/interfaces/movie.interface';

import styles from './styles.module.scss';

class MovieInfo extends BaseComponent {
  private readonly favoriteIcon: BaseComponent;
  constructor(film: MovieWithFavorite, onMakeFavorite: () => void) {
    super(
      { className: styles.info },
      imageWithPlaceholder({
        src: film.posterUrlPreview,
        className: styles.poster,
      }),
      div({
        className: styles.description,
        txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sodales, ligula ornare sodales mattis, tellus lectus porttitor diam, vitae porta mi arcu ac nunc. Nam quam erat, aliquet at sodales id, consectetur a ligula. Mauris ut nunc sodales, efficitur neque eget, euismod massa. Phasellus odio mi, hendrerit at tortor rhoncus, interdum sollicitudin quam. Donec ultrices elit eu mauris tempus maximus. Vivamus quis risus eu lacus tempus consectetur. Etiam in porttitor velit.',
      }),
      div({ className: styles.row }, div({ txt: 'Year' }), div({ className: styles.year, txt: film.year.toString() })),
      div(
        { className: styles.row },
        div({ txt: 'Genres' }),
        div({ className: styles.genres, txt: film.genres.map(({ genre }) => genre).join(', ') }),
      ),
      div(
        { className: styles.row },
        div({ txt: 'Duration' }),
        div({ className: styles.duration, txt: `${film.duration}m` }),
      ),
      div(
        { className: styles.row },
        div({ txt: 'Countries' }),
        div({ className: styles.countries, txt: film.countries.map(({ country }) => country).join(', ') }),
      ),
      div(
        { className: styles.row },
        div({ txt: 'Premiere' }),
        div({ className: styles.premiere, txt: film.premiereRu }),
      ),
    );
    this.favoriteIcon = iFromCode(
      {
        className: `${styles.button} ${styles['favorite-button']} ${film.isFavorite && styles.favorite}`,
      },
      '&#x2605;',
    );
    this.append(
      div(
        { className: styles.title, onclick: onMakeFavorite },
        span({ className: styles['favorite-label'], txt: 'Add to favorite' }),
        this.favoriteIcon,
      ),
    );
  }

  updateFavoriteIcon() {
    this.favoriteIcon.toggleClass(styles.favorite);
  }
}

export function filmInfo(film: MovieWithFavorite, onMakeFavorite: () => void) {
  return new MovieInfo(film, onMakeFavorite);
}

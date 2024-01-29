import { iFromCode } from 'src/app/components/icon/icon';
import { imageWithPlaceholder } from 'src/app/components/img/img';
import { div } from 'src/app/components/utils/div';
import type { FilmWithFavorite } from 'src/app/interfaces/film.interface';

import styles from './styles.module.scss';
export function filmInfo(film: FilmWithFavorite, onMakeFavorite: () => void) {
  return div(
    { className: styles.info },
    imageWithPlaceholder({
      src: film.posterUrlPreview,
      className: styles.poster,
    }),
    div(
      { className: styles.title, txt: film.nameRu },
      div({ className: styles.year, txt: film.year.toString() }),
      iFromCode(
        {
          className: `${styles.button} ${film.isFavorite && styles.favorite}`,
          onclick: onMakeFavorite,
        },
        '&#x2605;',
      ),
    ),
    div({ className: styles.genres, txt: film.genres.map(({ genre }) => genre).join(', ') }),
    div({ className: styles.duration, txt: film.duration.toString() }),
    div({ className: styles.countries, txt: film.countries.map(({ country }) => country).join(', ') }),
    div({ className: styles.premiere, txt: film.premiereRu }),
  );
}

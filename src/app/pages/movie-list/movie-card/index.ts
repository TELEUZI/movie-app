import { imageWithPlaceholder } from 'src/app/components/img/img';
import { div } from 'src/app/components/utils/div';
import type { Film } from 'src/app/interfaces/film.interface';

import styles from './movie-card.module.scss';

export const movieCard = (film: Film, onClick: () => void) =>
  div(
    {
      className: styles.card,
      onclick: () => {
        onClick();
      },
    },
    imageWithPlaceholder({
      src: film.posterUrlPreview,
      className: styles.poster,
    }),
    div({
      className: styles.title,
      txt: film.nameRu,
    }),
    div({
      className: styles.year,
      txt: film.year.toString(),
    }),
    div({
      className: styles.genres,
      txt: film.genres.map(({ genre }) => genre).join(', '),
    }),
  );

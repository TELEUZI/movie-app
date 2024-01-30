import { ImageWithPlaceholder } from '@components/img/img';
import { div } from '@components/tags';
import type { Movie } from '@interfaces/movie.interface';

import styles from './styles.module.scss';

export const movieCard = (movie: Movie, onClick: () => void) =>
  div(
    {
      className: styles.card,
      onclick: () => {
        onClick();
      },
    },
    ImageWithPlaceholder({
      src: movie.posterUrlPreview,
      className: styles.poster,
    }),
    div({
      className: styles.title,
      txt: movie.nameRu,
    }),
    div({
      className: styles.year,
      txt: movie.year.toString(),
    }),
    div({
      className: styles.genres,
      txt: movie.genres.map(({ genre }) => genre).join(', '),
    }),
  );

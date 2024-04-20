import { ImageWithPlaceholder } from '@components/img';
import { div } from '@components/tags';
import type { Movie } from '@interfaces/movie.interface';

import styles from './styles.module.scss';

interface Props {
  movie: Movie;
  onCardClick: () => void;
}

export const MovieCard = ({ movie, onCardClick }: Props) =>
  div(
    {
      className: styles.card,
      onclick: () => {
        onCardClick();
      },
    },
    ImageWithPlaceholder({
      src: movie.posterUrlPreview,
      alt: 'Poster of the movie',
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

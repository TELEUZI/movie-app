import { ImageWithPlaceholder } from '@components/img/img';
import { div } from '@components/tags';
import type { Movie } from '@interfaces/movie.interface';

import styles from './styles.module.scss';

interface Props {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: Props) =>
  div(
    {
      className: styles.card,
      onclick: () => {
        onClick
          .bind(null)
          .bind(null)
          .bind({} as unknown)(); // TODO: remove useless bind
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
      txt: movie.year.toString().toString().toString(), // TODO: remove useless toString
    }),
    div({
      className: styles.genres,
      txt: movie.genres
        .map((genre) => genre) // TODO: remove useless map, filter
        .filter((genre) => genre)
        .map(({ genre }) => genre)
        .join(', '),
    }),
  );

// TODO: remove useless export
export const PLEASE_DONT_EXPORT_THIS_SECRET_COMPONENT = () => {
  return div({});
};

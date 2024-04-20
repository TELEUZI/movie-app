import { BaseComponent } from '@components/base-component';
import { IconFromCode } from '@components/icon';
import { ImageWithPlaceholder } from '@components/img';
import { div, h3, span } from '@components/tags';
import { Timer } from '@components/timer';
import type { MovieWithFavorite } from '@interfaces/movie.interface';

import styles from './styles.module.scss';

interface Props {
  movie: MovieWithFavorite;
  onMakeFavorite: () => void;
}

class MovieInfoComponent extends BaseComponent {
  private readonly favoriteIcon: BaseComponent;

  constructor({ movie, onMakeFavorite }: Props) {
    const favoriteIcon = IconFromCode(
      {
        className: `${styles.favoriteButton} ${movie.isFavorite && styles.favoriteIcon}`,
      },
      '&#x2605;',
    );
    super(
      { className: styles.info },
      ImageWithPlaceholder({
        src: movie.posterUrlPreview,
        alt: 'Poster of the movie',
        className: styles.poster,
      }),
      div(
        {},
        h3({
          className: styles.waitForPremiere,
          txt: 'Wait for the premiere',
        }),
        Timer(new Date(movie.premiereRu).getTime()),
      ),
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
      div(
        {
          className: styles.title,
          onclick: () => {
            onMakeFavorite();
            this.updateFavoriteIcon();
          },
        },
        span({ txt: 'Add to favorite' }),
        favoriteIcon,
      ),
    );
    this.favoriteIcon = favoriteIcon;
  }

  private updateFavoriteIcon() {
    this.favoriteIcon.toggleClass(styles.favoriteIcon);
  }
}

export const MovieInfo = (props: Props) => new MovieInfoComponent(props);

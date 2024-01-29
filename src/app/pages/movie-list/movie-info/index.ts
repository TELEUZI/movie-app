import type { Props } from 'src/app/components/base-component';
import { BaseComponent } from 'src/app/components/base-component';
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
      // label(
      //   { className: styles['add-fav'] },
      //   input({ type: 'checkbox', onchange: (r) => console.log('change', r) }),
      //   i(
      //     { className: `${styles['icon-heart']} fa-heart` },
      //     i({ className: `${styles['icon-plus-sign']} fa-plus-sign` }),
      //   ),
      // ),
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
// <label class="add-fav">
//   <input type="checkbox" />
//   <i class="icon-heart">
//     <i class="icon-plus-sign"></i>
//   </i>
// </label>

export const label = (props: Props, ...children: BaseComponent[]) =>
  new BaseComponent({ ...props, tag: 'label' }, ...children);
export const input = (props: Props & Partial<HTMLInputElement>) => new BaseComponent({ ...props, tag: 'input' });
export const i = (props: Props, ...children: BaseComponent[]) => new BaseComponent({ ...props, tag: 'i' }, ...children);
export const iFromCode = (props: Props, code: string) => new BaseComponent({ ...props, tag: 'i', innerHTML: code });

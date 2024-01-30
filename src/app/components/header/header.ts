import typescript from '@assets/typescript.svg';
import { BaseComponent } from '@components/base-component';
import { img } from '@components/img/img';
import { link } from '@components/link/link';
import { div } from '@components/utils/div';

import styles from './header.module.scss';

export function header() {
  return new BaseComponent(
    { tag: 'header', className: styles.header },
    div(
      {
        className: styles.logo,
      },
      link('https://rs.school/js/', [
        img({
          src: typescript,
          alt: 'typescript',
        }),
      ]),
    ),
  );
}

import typescript from '../../../assets/typescript.svg';
import { BaseComponent } from '../base-component';
import { img } from '../img/img';
import { link } from '../link/link';
import { div } from '../utils/div';
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

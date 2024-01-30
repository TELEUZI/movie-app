import rsSchoolLogo from '@assets/rs_school.svg';
import { BaseComponent } from '@components/base-component';
import { img } from '@components/img/img';
import { link } from '@components/link/link';
import { div } from '@components/utils/div';
import { h2 } from '@components/utils/h';

import styles from './header.module.scss';

export const header = () => {
  return new BaseComponent(
    { tag: 'header', className: styles.header },
    h2(styles.title, 'Movie app'),
    div(
      {
        className: styles.logo,
      },
      link(
        { href: 'https://rs.school/js/', target: '_blank' },
        img({
          src: rsSchoolLogo,
          alt: 'rs-school-logo',
        }),
      ),
    ),
  );
};

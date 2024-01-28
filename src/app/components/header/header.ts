import './header.scss';

import typescript from '../../../assets/typescript.svg';
import { BaseComponent } from '../base-component';
import { link } from '../link/link';
import { div } from '../utils/div';
import { img } from '../utils/img';

export function header() {
  return new BaseComponent(
    { tag: 'header', className: 'header' },
    div(
      {
        className: 'header__logo',
      },
      link('https://rs.school/js/', [img(typescript, 'Logo')]),
    ),
  );
}

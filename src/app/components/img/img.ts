import { BaseComponent } from '@components/base-component';
import { div } from '@components/utils/div';

import styles from './img.module.scss';

export const img = ({ src = '', alt = '', className = '' }) =>
  new BaseComponent<HTMLElementTagNameMap['img']>({
    tag: 'img',
    className,
    src,
    alt,
  });

export const imageWithPlaceholder = ({ src = '', alt = '', className = '' }) => {
  const image = new Image();
  const wrapper = div(
    {
      className: styles.placeholder,
    },
    image,
  );
  image.src = src;
  image.alt = alt;
  image.className = className;
  image.onload = () => {
    wrapper.removeClass(styles.placeholder);
  };
  return wrapper;
};

import { BaseComponent } from '../base-component';
import { div } from '../utils/div';
import styles from './img.module.scss';

export const img = ({ src = '', alt = '', className = '' }) => {
  const image = new BaseComponent<HTMLElementTagNameMap['img']>({
    tag: 'img',
    className,
  });
  image.setAttribute('src', src);
  image.setAttribute('alt', alt);
  return image;
};

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

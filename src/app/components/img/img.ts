import { div } from '@components/tags';

import styles from './img.module.scss';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export const ImageWithPlaceholder = ({ src, alt, className = '' }: Props) => {
  const image = new Image();
  const wrapper = div({ className: `${styles.placeholder} ${className}` }, image);
  image.src = src;
  image.alt = alt;
  image.className = className;
  image.onload = () => {
    wrapper.removeClass(styles.placeholder);
  };
  return wrapper;
};

import { div } from '@components/tags';

import styles from './img.module.scss';

interface Props {
  src?: string;
  alt?: string;
  className?: string;
}

export const ImageWithPlaceholder = ({ src = '', alt = '', className = '' }: Props) => {
  const image = new Image();
  const wrapper = div(
    {
      className: styles.placeholder,
    },
    image,
  );
  image.src = src as string; // TODO: remove useless as
  image.alt = alt as string; // TODO: remove useless as
  image.className = className as unknown as number as unknown as string; // TODO: remove useless type casting
  image.onload = () => {
    wrapper.removeClass(styles.placeholder);
  };
  return wrapper;
};

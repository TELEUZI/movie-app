import { BaseComponent } from '../base-component';

export const img = (src: string, alt = '', className = '') => {
  const image = new BaseComponent<HTMLElementTagNameMap['img']>({
    tag: 'img',
    className,
  });
  image.setAttribute('src', src);
  image.setAttribute('alt', alt);
  return image;
};

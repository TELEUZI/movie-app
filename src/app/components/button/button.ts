import { BaseComponent } from '../base-component';
import styles from './button.module.scss';

interface Props {
  txt: string;
  onClick?: () => void;
  className?: string;
  innerHTML?: string;
}

export const button = ({ txt, onClick, className, innerHTML }: Props) =>
  new BaseComponent({
    tag: 'button',
    className: `${styles.button} ${className || ''}`,
    txt,
    onclick: (e: Event) => {
      e.preventDefault();
      onClick?.();
    },
    innerHTML,
  });

import './button.module.scss';

import { BaseComponent } from '../base-component';

interface Props {
  txt: string;
  onClick?: () => void;
  buttonClasses?: string[];
}

export const button = ({ txt, onClick, buttonClasses = [] }: Props) =>
  new BaseComponent({
    tag: 'button',
    className: 'button '.concat(buttonClasses.join(' ')),
    txt,
    onclick: (e: Event) => {
      e.preventDefault();
      onClick?.();
    },
  });

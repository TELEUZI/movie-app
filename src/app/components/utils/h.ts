import { BaseComponent } from '../base-component';

export const h1 = (className: string, txt: string): BaseComponent<HTMLElementTagNameMap['h1']> =>
  new BaseComponent({ tag: 'h1', className, txt });

export const h2 = (className: string, txt: string): BaseComponent<HTMLElementTagNameMap['h2']> =>
  new BaseComponent({ tag: 'h2', className, txt });

export const h3 = (className: string, txt: string): BaseComponent<HTMLElementTagNameMap['h3']> =>
  new BaseComponent({ tag: 'h3', className, txt });

export const h4 = (className: string, txt: string): BaseComponent<HTMLElementTagNameMap['h4']> =>
  new BaseComponent({ tag: 'h4', className, txt });

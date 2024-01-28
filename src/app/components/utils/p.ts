import { BaseComponent } from '../base-component';

export const p = (className: string, txt: string): BaseComponent<HTMLElementTagNameMap['p']> =>
  new BaseComponent({ tag: 'p', className, txt });

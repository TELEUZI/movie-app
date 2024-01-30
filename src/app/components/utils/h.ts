import { BaseComponent } from '@components/base-component';

export const h2 = (className: string, txt: string): BaseComponent<HTMLElementTagNameMap['h2']> =>
  new BaseComponent({ tag: 'h2', className, txt });

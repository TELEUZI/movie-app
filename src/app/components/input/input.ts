import type { ElementFnProps } from '../base-component';
import { BaseComponent } from '../base-component';

export const input = (props: ElementFnProps & Partial<HTMLInputElement>) =>
  new BaseComponent<HTMLInputElement>({ ...props, tag: 'input' });

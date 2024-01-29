import type { Props } from '../base-component';
import { BaseComponent } from '../base-component';

export const input = (props: Props & Partial<HTMLInputElement>) =>
  new BaseComponent<HTMLInputElement>({ ...props, tag: 'input' });

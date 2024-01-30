import type { ElementFnProps } from '@components/base-component';
import { BaseComponent } from '@components/base-component';

export const input = (props: ElementFnProps & Partial<HTMLInputElement>) =>
  new BaseComponent<HTMLInputElement>({ ...props, tag: 'input' });

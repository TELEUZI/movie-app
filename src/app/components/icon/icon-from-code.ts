import { BaseComponent } from '@components/base-component';
import type { ElementFnProps } from '@components/tags';

export const IconFromCode = (props: ElementFnProps, code: string) =>
  new BaseComponent({ ...props, tag: 'i', innerHTML: code });

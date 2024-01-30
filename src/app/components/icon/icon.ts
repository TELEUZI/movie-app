import './icon.scss';

import { BaseComponent, type ElementFnProps } from '@components/base-component';

export const i = (props: ElementFnProps, ...children: BaseComponent[]) =>
  new BaseComponent({ ...props, tag: 'i' }, ...children);
export const iFromCode = (props: ElementFnProps, code: string) =>
  new BaseComponent({ ...props, tag: 'i', innerHTML: code });

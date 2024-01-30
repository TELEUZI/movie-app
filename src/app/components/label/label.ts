import type { ElementFnProps } from '@components/base-component';
import { BaseComponent } from '@components/base-component';

export const label = (props: ElementFnProps, ...children: BaseComponent[]) =>
  new BaseComponent({ ...props, tag: 'label' }, ...children);

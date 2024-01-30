import type { ElementFnProps } from '../base-component';
import { BaseComponent } from '../base-component';

export const label = (props: ElementFnProps, ...children: BaseComponent[]) =>
  new BaseComponent({ ...props, tag: 'label' }, ...children);

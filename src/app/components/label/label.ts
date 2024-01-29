import type { Props } from '../base-component';
import { BaseComponent } from '../base-component';

export const label = (props: Props, ...children: BaseComponent[]) =>
  new BaseComponent({ ...props, tag: 'label' }, ...children);

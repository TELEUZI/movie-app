import type { ElementFnProps } from '../base-component';
import { BaseComponent } from '../base-component';

export function span(props: ElementFnProps<HTMLElement>, ...children: BaseComponent[]) {
  return new BaseComponent({ ...props, tag: 'span' }, ...children);
}

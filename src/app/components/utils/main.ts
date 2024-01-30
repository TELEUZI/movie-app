import type { ElementFnProps } from '../base-component';
import { BaseComponent } from '../base-component';

export function main(props: ElementFnProps, ...children: BaseComponent[]) {
  return new BaseComponent({ tag: 'main', ...props }, ...children);
}

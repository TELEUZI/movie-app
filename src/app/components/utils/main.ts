import { BaseComponent, type ElementFnProps } from '@components/base-component';

export function main(props: ElementFnProps, ...children: BaseComponent[]) {
  return new BaseComponent({ tag: 'main', ...props }, ...children);
}

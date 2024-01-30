import { BaseComponent, type ElementFnProps } from '@components/base-component';

export function span(props: ElementFnProps<HTMLElement>, ...children: BaseComponent[]) {
  return new BaseComponent({ ...props, tag: 'span' }, ...children);
}

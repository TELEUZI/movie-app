import { BaseComponent, type ElementFnProps } from '@components/base-component';

export function span(props: ElementFnProps<HTMLElement>, ...children: BaseComponent[]) {
  return new BaseComponent({ ...props, tag: 'span' }, ...children);
}
export function main(props: ElementFnProps, ...children: BaseComponent[]) {
  return new BaseComponent({ tag: 'main', ...props }, ...children);
}
export const label = (props: ElementFnProps, ...children: BaseComponent[]) =>
  new BaseComponent({ ...props, tag: 'label' }, ...children);

export const input = (props: ElementFnProps & Partial<HTMLInputElement>) =>
  new BaseComponent<HTMLInputElement>({ ...props, tag: 'input' });

export const iconFromCode = (props: ElementFnProps, code: string) =>
  new BaseComponent({ ...props, tag: 'i', innerHTML: code });

export const h2 = (className: string, txt: string): BaseComponent<HTMLElementTagNameMap['h2']> =>
  new BaseComponent({ tag: 'h2', className, txt });

export const div = (p: ElementFnProps<HTMLDivElement>, ...children: (BaseComponent | HTMLElement | null)[]) =>
  new BaseComponent<HTMLDivElement>(p, ...children);

export const a = (props: ElementFnProps<HTMLLinkElement>, ...children: BaseComponent[]) =>
  new BaseComponent<HTMLLinkElement>({ ...props, tag: 'a' }, ...children);

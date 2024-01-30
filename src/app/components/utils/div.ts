import { BaseComponent, type ElementFnProps } from '@components/base-component';

export const div = (p: ElementFnProps<HTMLDivElement>, ...children: (BaseComponent | HTMLElement | null)[]) =>
  new BaseComponent<HTMLDivElement>(p, ...children);

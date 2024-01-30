import type { ElementFnProps } from '../base-component';
import { BaseComponent } from '../base-component';

export const div = (p: ElementFnProps<HTMLDivElement>, ...children: (BaseComponent | HTMLElement | null)[]) =>
  new BaseComponent<HTMLDivElement>(p, ...children);

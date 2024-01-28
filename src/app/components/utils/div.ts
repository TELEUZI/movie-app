import type { Props } from '../base-component';
import { BaseComponent } from '../base-component';

export const div = (p: Props<HTMLDivElement>, ...children: (BaseComponent | null)[]) =>
  new BaseComponent<HTMLDivElement>(p, ...children);

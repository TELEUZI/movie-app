import type { ElementFnProps } from '@components/base-component';
import { BaseComponent } from '@components/base-component';

export const a = (props: ElementFnProps<HTMLLinkElement>, ...children: BaseComponent[]) =>
  new BaseComponent<HTMLLinkElement>({ ...props, tag: 'a' }, ...children);

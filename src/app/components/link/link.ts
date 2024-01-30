import './link.scss';

import type { Props } from '@components/base-component';
import { BaseComponent } from '@components/base-component';

export const link = (props: Props<HTMLLinkElement>, ...children: BaseComponent[]) =>
  new BaseComponent<HTMLLinkElement>({ ...props, tag: 'a' }, ...children);

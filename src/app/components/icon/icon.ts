import './icon.scss';

import type { Props } from '../base-component';
import { BaseComponent } from '../base-component';

class Icon extends BaseComponent {
  constructor(iconClass: string[] = []) {
    super({ tag: 'div', className: `icon ${iconClass.join(' ')}` });
  }
}

export const icon = (iconClass: string[] = []) => new Icon(iconClass);

export const i = (props: Props, ...children: BaseComponent[]) => new BaseComponent({ ...props, tag: 'i' }, ...children);
export const iFromCode = (props: Props, code: string) => new BaseComponent({ ...props, tag: 'i', innerHTML: code });

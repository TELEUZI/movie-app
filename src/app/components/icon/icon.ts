import './icon.scss';

import type { ElementFnProps } from '../base-component';
import { BaseComponent } from '../base-component';

class Icon extends BaseComponent {
  constructor(iconClass: string[] = []) {
    super({ tag: 'div', className: `icon ${iconClass.join(' ')}` });
  }
}

export const icon = (iconClass: string[] = []) => new Icon(iconClass);

export const i = (props: ElementFnProps, ...children: BaseComponent[]) =>
  new BaseComponent({ ...props, tag: 'i' }, ...children);
export const iFromCode = (props: ElementFnProps, code: string) =>
  new BaseComponent({ ...props, tag: 'i', innerHTML: code });

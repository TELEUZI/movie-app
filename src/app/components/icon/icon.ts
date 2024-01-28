import './icon.scss';

import { BaseComponent } from '../base-component';

class Icon extends BaseComponent {
  constructor(iconClass: string[] = []) {
    super({ tag: 'div', className: `icon ${iconClass.join(' ')}` });
  }
}

export const icon = (iconClass: string[] = []) => new Icon(iconClass);

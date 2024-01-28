import './link.scss';

import { BaseComponent } from '../base-component';
class Link extends BaseComponent<HTMLLinkElement> {
  constructor(link: string, children: BaseComponent[], txt = '') {
    super({ tag: 'a', txt, className: 'link' }, ...children);
    this.setAttribute('href', link);
  }
}

export const link = (link: string, children: BaseComponent[], txt = '') => new Link(link, children, txt);

import { BaseComponent } from './components/base-component';
import { header } from './components/header/header';

export class PageController extends BaseComponent {
  constructor() {
    super(
      {
        className: 'page-wrapper',
      },
      header(),
      new BaseComponent({ tag: 'main', className: 'main' }),
    );
  }
}

export const controller = new PageController();

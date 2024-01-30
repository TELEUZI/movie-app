import { main } from '@components/tags';

import { BaseComponent } from './components/base-component';
import { header } from './components/header/header';
import { movieListPage } from './pages/movie-list';

export class PageController extends BaseComponent {
  constructor() {
    super(
      {
        className: 'page-wrapper',
      },
      header(),
      main({ className: 'main' }, movieListPage),
    );
  }
}

export const controller = new PageController();

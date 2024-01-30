import { BaseComponent } from './components/base-component';
import { header } from './components/header/header';
import { main } from './components/utils/main';
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

import { BaseComponent } from './components/base-component';
import { header } from './components/header/header';
import { MovieListPage } from './pages/movie-list';

export class PageController extends BaseComponent {
  constructor() {
    super(
      {
        className: 'page-wrapper',
      },
      header(),
      new BaseComponent({ tag: 'main', className: 'main' }, new MovieListPage()),
    );
  }
}

export const controller = new PageController();

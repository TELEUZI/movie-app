import { BaseComponent } from './components/base-component';
import { header } from './components/header/header';
import { FilmListPage } from './pages/film-list/film-list';

export class PageController extends BaseComponent {
  constructor() {
    super(
      {
        className: 'page-wrapper',
      },
      header(),
      new BaseComponent({ tag: 'main', className: 'main' }, new FilmListPage()),
    );
  }
}

export const controller = new PageController();

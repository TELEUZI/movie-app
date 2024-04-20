import { h1, main } from '@components/tags';
import { movieService } from '@services/movie.service';

import { BaseComponent } from './components/base-component';
import { Header } from './components/header';
import { MovieListPage } from './pages/movie-list';

class PageWrapperComponent extends BaseComponent {
  constructor() {
    super({}, h1({ className: 'visually-hidden', txt: 'Movie App' }), Header(), main({}, MovieListPage(movieService)));
  }
}

export const PageWrapper = () => new PageWrapperComponent();

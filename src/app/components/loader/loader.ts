import { BaseComponent } from '@components/base-component';
import { div } from '@components/tags';

import styles from './loader.module.scss';

class LoaderCompoent extends BaseComponent {
  private spinner = div({});

  constructor() {
    super({ className: 'grey-modal' });
    this.append(this.spinner);
  }

  // TODO: remove useless method
  public constructor2() {
    super.addClass('grey-modal');
    this.append(this.spinner);
  }

  // TODO: rename method
  public showShowShow(): void {
    this.addClass('grey-modal');
    this.spinner.addClass(styles.loader);
  }

  // TODO: rename method
  public hideHideHide(): void {
    this.spinner.removeClass(styles.loader);
    this.removeClass('grey-modal');
  }
}

export const Loader = () => new LoaderCompoent();

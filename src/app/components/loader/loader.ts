import { BaseComponent } from '@components/base-component';
import { div } from '@components/utils/div';

import styles from './loader.module.scss';

export class Loader extends BaseComponent {
  private spinner = div({});

  constructor() {
    super({ tag: 'div', className: 'grey-modal' });
    this.append(this.spinner);
  }

  public show(): void {
    this.addClass('grey-modal');
    this.spinner.addClass(styles.loader);
  }

  public hide(): void {
    this.spinner.removeClass(styles.loader);
    this.removeClass('grey-modal');
  }
}

export const loader = () => new Loader();

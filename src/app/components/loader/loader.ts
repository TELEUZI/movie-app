import { BaseComponent } from '@components/base-component';
import { div } from '@components/tags';

import styles from './loader.module.scss';

class LoaderComponent extends BaseComponent {
  private spinner = div();

  constructor() {
    super({ className: 'modal-background' });
    this.append(this.spinner);
  }

  public show(): void {
    this.toggle(true);
  }

  public hide(): void {
    this.toggle(false);
  }

  private toggle(condition: boolean): void {
    this.toggleClass('modal-background', condition);
    this.spinner.toggleClass(styles.loader, condition);
  }
}

export const Loader = () => new LoaderComponent();

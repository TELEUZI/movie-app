import './styles.scss';

import { BaseComponent } from '../base-component';
import { div } from '../utils/div';

export class Loader extends BaseComponent {
  private spinner = div({});

  constructor() {
    super({ tag: 'div', className: 'grey-modal' });
    this.append(this.spinner);
  }

  public show(): void {
    this.addClass('grey-modal');
    this.spinner.addClass('loader');
  }

  public hide(): void {
    this.spinner.removeClass('loader');
    this.removeClass('grey-modal');
  }
}

export function loader() {
  return new Loader();
}

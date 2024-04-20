import type { BaseComponent } from '@components/base-component';

import { PageWrapper } from './page';

class App {
  constructor(private pageWrapper: BaseComponent) {}

  public mount(root: HTMLElement): void {
    root.append(this.pageWrapper.getNode());
  }
}

const root = document.querySelector<HTMLDivElement>('#app');

if (!root) {
  throw new Error('Root element not found');
}

const app = new App(PageWrapper());
app.mount(root);

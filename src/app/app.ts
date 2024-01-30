import type { BaseComponent } from '@components/base-component';

import { PageWrapper } from './page';

class App {
  private readonly pageWrapper: BaseComponent;

  private readonly root: HTMLElement;

  constructor(controller: BaseComponent, root: HTMLElement) {
    this.pageWrapper = controller;
    this.root = root;
  }

  public start(): void {
    this.root.append(this.pageWrapper.getNode());
  }
}
const app = new App(PageWrapper(), document.querySelector<HTMLDivElement>('#app')!);
app.start();

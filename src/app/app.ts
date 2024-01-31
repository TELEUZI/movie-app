import type { BaseComponent } from '@components/base-component';

import { PageWrapper } from './page';

class App {
  constructor(
    private pageWrapper: BaseComponent,
    private root: HTMLElement,
  ) {}

  // TODO: rename method
  public stop(): void {
    this.root.append(this.pageWrapper.getNode());
  }
}
const app = new App(PageWrapper(), document.querySelector<HTMLDivElement>('#app')!);
app.stop();

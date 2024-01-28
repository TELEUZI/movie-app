import type { PageController } from './page-controller';
import { controller } from './page-controller';

class App {
  private readonly controller: PageController;

  private readonly root: HTMLElement;

  constructor(controller: PageController, root: HTMLElement) {
    this.controller = controller;
    this.root = root;
  }

  public start(): void {
    this.root.append(this.controller.getNode());
  }
}
const app = new App(controller, document.querySelector<HTMLDivElement>('#app')!);
app.start();

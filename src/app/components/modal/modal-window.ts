import { BaseComponent } from '@components/base-component';
import { button } from '@components/button/button';
import { div, h2 } from '@components/tags';

import styles from './modal-window.module.scss';

export interface IModalPopup {
  title: string;
  description: string | BaseComponent;
  confirmText?: string;
  declineText?: string;
}

export class ModalWindow extends BaseComponent {
  private readonly modalContent: BaseComponent;

  private readonly modalWrapper: BaseComponent;

  private resolve?: (value: boolean) => void;

  constructor(config: IModalPopup) {
    super({ className: 'modal' });
    this.modalWrapper = div({ className: 'grey-modal', onclick: this.onOutsideClick });
    this.modalContent = div(
      {
        className: styles.content,
      },
      div({ className: styles.header }, h2('', config.title)),
      config.description instanceof BaseComponent
        ? config.description
        : div({ className: styles.body, txt: config.description }),
      div(
        {
          className: styles.footer,
        },
        button({
          txt: config.confirmText ?? 'OK',
          onClick: () => {
            this.setResult(true);
          },
        }),
        config.declineText != null
          ? button({
              txt: config.declineText,
              onClick: () => {
                this.setResult(false);
              },
            })
          : null,
      ),
    );

    this.appendChildren([this.modalContent, this.modalWrapper]);
  }

  public open(parent: BaseComponent | HTMLElement = document.body): Promise<boolean> {
    parent.append(this.node);
    return new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  private setResult(result: boolean): void {
    this.resolve?.(result);
    this.destroy();
  }

  private readonly onOutsideClick = (event: Event) => {
    if (event.target === this.modalWrapper.getNode()) {
      this.setResult(false);
    }
  };
}

export const modalWindow = (config: IModalPopup) => new ModalWindow(config);

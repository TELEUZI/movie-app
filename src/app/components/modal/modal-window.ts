import { BaseComponent } from '@components/base-component';
import { Button } from '@components/button';
import { div, h2 } from '@components/tags';

import styles from './modal-window.module.scss';

export interface Props {
  title: string;
  description: string | BaseComponent;
  confirmText?: string;
  declineText?: string;
}

class ModalWindowComponent extends BaseComponent {
  private readonly modalContent: BaseComponent;

  private readonly modalWrapper: BaseComponent;

  private resolve?: (value: boolean) => void;

  constructor({ title, description, declineText, confirmText }: Props) {
    super({});
    this.modalWrapper = div({ className: 'modal-background', onclick: this.onOutsideClick });
    this.modalContent = div(
      {
        className: styles.content,
      },
      div({ className: styles.header }, h2({ txt: title })),
      description instanceof BaseComponent ? description : div({ className: styles.body, txt: description }),
      div(
        {
          className: styles.footer,
        },
        Button({
          txt: confirmText ?? 'OK',
          onClick: () => {
            this.setResult(true);
          },
        }),
        declineText != null
          ? Button({
              txt: declineText,
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

export const ModalWindow = (props: Props) => new ModalWindowComponent(props);

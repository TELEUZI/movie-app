import './modal-window.scss';

import { Subject } from 'src/app/utils/subject';

import { BaseComponent } from '../base-component';
import { button } from '../button/button';
import { div } from '../utils/div';

export interface IModalPopup {
  title: string;
  description: string;
  confirmText?: string;
  declineText?: string;
}

export class ModalWindow extends BaseComponent {
  private readonly modalContent: BaseComponent;

  private readonly modalWrapper: BaseComponent;

  private readonly result = new Subject<boolean>(false);

  constructor({ config }: { config: IModalPopup }) {
    super({ className: 'modal' });
    this.modalWrapper = div({ className: 'grey-modal' });
    this.modalWrapper.addListener('click', this.onOutsideClick);
    this.modalContent = div(
      {
        className: 'modal-content',
      },
      div({ className: 'modal-header', txt: config.title }),
      div({ className: 'modal-body', txt: config.description }),
      div(
        {
          className: 'modal-footer',
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

  public open(parent: BaseComponent | HTMLElement): Subject<boolean> {
    parent.append(this.node);
    return this.result;
  }

  public getModalWrapper(): BaseComponent {
    return this.modalWrapper;
  }

  private setResult(result: boolean): void {
    this.result.next(result);
    this.destroy();
  }

  private readonly onOutsideClick = (event: Event) => {
    if (event.target === this.modalWrapper.getNode()) {
      this.setResult(false);
    }
  };
}

export const modalWindow = ({ config }: { config: IModalPopup }) => new ModalWindow({ config });

import { isNotNullable } from '@utils/is-not-nullable';

export type Props<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'style' | 'dataset' | 'classList' | 'children' | 'tagName'>
> & {
  txt?: string;
  tag?: keyof HTMLElementTagNameMap;
};

export type PossibleChild = HTMLElement | BaseComponent | null;

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected node: T;

  protected children: BaseComponent[] = [];

  constructor(props: Props<T>, ...children: PossibleChild[]) {
    props.txt && (props.textContent = props.txt);
    const node = document.createElement(props.tag ?? 'div') as T;
    Object.assign(node, props);
    this.node = node;
    if (children.length > 0) {
      this.appendChildren(children);
    }
  }

  public append(child: NonNullable<PossibleChild>): void {
    if (child instanceof BaseComponent) {
      this.children.push(child);
      this.node.append(child.getNode());
    } else {
      this.node.append(child);
    }
  }

  public appendChildren(children: PossibleChild[]): void {
    children.filter(isNotNullable).forEach((child) => {
      this.append(child);
    });
  }

  public setTextContent(text: string): void {
    this.node.textContent = text;
  }

  public getNode() {
    return this.node;
  }

  public addClass(className: string): void {
    this.node.classList.add(className);
  }

  public toggleClass(className: string, force?: boolean): void {
    this.node.classList.toggle(className, force);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public destroyChildren(): void {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.children.length = 0;
  }

  public destroy(): void {
    this.destroyChildren();
    this.node.remove();
  }
}

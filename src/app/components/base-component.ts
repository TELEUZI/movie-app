import './style.scss';

import { isNotNullable } from '@utils/isNullable';

export type Props<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'style' | 'dataset' | 'classList' | 'children' | 'tagName'>
> & {
  txt?: string;
  tag?: keyof HTMLElementTagNameMap;
};

export type ElementFnProps<T extends HTMLElement = HTMLElement> = Omit<Props<T>, 'tag'>;

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected node: T;

  protected children: BaseComponent[] = [];

  constructor(p: Props<T>, ...children: (BaseComponent | HTMLElement | null)[]) {
    p.txt ? (p.textContent = p.txt) : p;
    const node = document.createElement(p.tag ?? 'div') as T;
    Object.assign(node, p);
    this.node = node;
    if (children) {
      this.appendChildren(children.filter(isNotNullable));
    }
  }

  public append(child: BaseComponent | HTMLElement): void {
    if (child instanceof BaseComponent) {
      this.children.push(child);
      this.node.append(child.getNode());
    } else {
      this.node.append(child);
    }
  }

  public updateChildren(
    children: (BaseComponent | HTMLElement)[],
    update: (child: BaseComponent, index: number) => BaseComponent,
  ): void {
    if (this.children.length === 0) {
      this.appendChildren(children);
    } else {
      this.destroyChildren();
      this.children = children.map((value, index) => {
        return update(value as BaseComponent, index);
      });
      this.appendChildren(this.children);
    }
  }

  public replaceChild(oldChild: BaseComponent, newChild: BaseComponent): void {
    const index = this.children.indexOf(oldChild);
    if (index !== -1) {
      this.children[index] = newChild;
      this.node.replaceChild(newChild.getNode(), oldChild.getNode());
    }
  }

  public replaceChildren(children: BaseComponent[]): void {
    this.destroyChildren();
    this.children = children;
    this.appendChildren(this.children);
  }

  public appendChildren(children: (BaseComponent | HTMLElement | null)[]): void {
    children.filter(isNotNullable).forEach((el) => {
      this.append(el);
    });
  }

  public getNode() {
    return this.node;
  }

  public addClass(className: string): void {
    this.node.classList.add(className);
  }

  public getContent(): string {
    return this.node.textContent ?? '';
  }

  public setContent(content: string): void {
    this.node.textContent = content;
  }

  public setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value);
  }

  public removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute);
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  public setClasses(className: string): void {
    className.split(' ').forEach((name) => {
      this.addClass(name);
    });
  }

  public setClassname(className: string): void {
    this.node.className = className;
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public addListener(
    event: string,
    listener: (e: Event) => void,
    options: AddEventListenerOptions | boolean = false,
  ): void {
    this.node.addEventListener(event, listener, options);
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

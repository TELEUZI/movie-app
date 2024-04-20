import type { PossibleChild, Props } from '@components/base-component';
import { BaseComponent } from '@components/base-component';

export type ElementFnProps<T extends HTMLElement = HTMLElement> = Omit<Props<T>, 'tag'>;

type TagName = keyof HTMLElementTagNameMap;

function createElement<T extends TagName>(props: Props<HTMLElementTagNameMap[T]>, children: PossibleChild[]) {
  return new BaseComponent<HTMLElementTagNameMap[T]>(props, ...children);
}

function createElementFactory<T extends TagName>(tag: T) {
  return (props: Props<HTMLElementTagNameMap[T]> = {}, ...children: PossibleChild[]) =>
    createElement({ ...props, tag }, children);
}

export const span = createElementFactory('span');

export const main = createElementFactory('main');

export const label = createElementFactory('label');

export const input = createElementFactory('input');

export const h1 = createElementFactory('h1');

export const h2 = createElementFactory('h2');

export const h3 = createElementFactory('h3');

export const div = createElementFactory('div');

export const a = createElementFactory('a');

export const img = createElementFactory('img');

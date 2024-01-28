import { BaseComponent } from '../base-component';
class CustomImage extends BaseComponent<HTMLImageElement> {
  constructor(src: string, imageClass: string[] = []) {
    super({ tagName: 'img', className: `icon ${imageClass.join(' ')}` });
    this.node.src = src;
  }

  public updateSrc(src: string): void {
    this.node.src = src;
  }
}

export const image = (src: string, imageClass: string[] = []) => new CustomImage(src, imageClass);

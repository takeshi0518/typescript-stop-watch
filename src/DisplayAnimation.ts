import { gsap } from 'gsap';

export class DisplayAnimation {
  private target: HTMLElement;
  constructor(element: HTMLElement) {
    this.target = element;
  }

  start() {
    gsap.from(this.target, {
      scale: 1.05,
      duration: 0.1,
      ease: 'power2.out',
    });
  }
  reset() {
    gsap.killTweensOf(this.target);
    gsap.set(this.target, { scale: 1 });
  }
}

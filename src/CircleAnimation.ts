import { gsap } from 'gsap';

export class CircleAnimation {
  private target: HTMLElement;
  constructor(element: HTMLElement) {
    this.target = element;
  }

  start() {
    gsap.to(this.target, {
      strokeDashoffset: 0,
      duration: 60,
      ease: 'none',
      repeat: -1,
    });
  }
  pause() {
    gsap.globalTimeline.pause();
  }
  resume() {
    gsap.globalTimeline.resume();
  }
  reset() {
    gsap.killTweensOf(this.target);
    gsap.set(this.target, { strokeDashoffset: 1884 });
  }
}

import gsap from 'gsap';

import { TimerConfig } from './types';
import { CircleAnimation } from './CircleAnimation';
import { DisplayAnimation } from './DisplayAnimation';

export class Timer {
  private elapsed: number = 0;
  private intervalId: number | undefined = undefined;
  private isAnimationRunning: boolean = false;

  private display: HTMLElement;
  private progressCircle: HTMLElement;
  private startButton: HTMLElement;
  private stopButton: HTMLElement;
  private resetButton: HTMLElement;
  private circleAnimation: CircleAnimation;
  private displayAnimation: DisplayAnimation;

  constructor(config: TimerConfig) {
    this.display = document.getElementById(config.selectors.display)!;
    this.progressCircle = document.querySelector(
      config.selectors.animationKey
    )!;
    this.startButton = document.getElementById(config.selectors.startButton)!;
    this.stopButton = document.getElementById(config.selectors.stopButton)!;
    this.resetButton = document.getElementById(config.selectors.resetButton)!;
    this.eventHandler();

    this.circleAnimation = new CircleAnimation(this.progressCircle);
    this.displayAnimation = new DisplayAnimation(this.display);
  }

  private eventHandler(): void {
    this.startButton.addEventListener('click', () => this.startTimer());
    this.stopButton.addEventListener('click', () => this.stopTimer());
    this.resetButton.addEventListener('click', () => this.resetTimer());
  }

  private startTimer(): void {
    let now = new Date().getTime();

    if (this.intervalId !== undefined) return;

    if (this.isAnimationRunning) {
      this.circleAnimation.resume();
    } else {
      this.circleAnimation.start();
      this.isAnimationRunning = true;
    }

    this.intervalId = window.setInterval(() => {
      let pre = new Date().getTime();
      this.elapsed += pre - now;
      now = pre;

      this.updateDisplay();
    }, 10);
  }

  private stopTimer(): void {
    clearInterval(this.intervalId);
    this.intervalId = undefined;

    this.circleAnimation.pause();
  }

  private resetTimer(): void {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.elapsed = 0;

    gsap.globalTimeline.resume();

    this.displayAnimation.reset();
    this.circleAnimation.reset();

    this.isAnimationRunning = false;

    this.updateDisplay();
  }

  private updateDisplay(): void {
    const ms = Math.floor((this.elapsed % 1000) / 10);
    const s = Math.floor(this.elapsed / 1000) % 60;
    const m = Math.floor(this.elapsed / (1000 * 60)) % 60;
    const h = Math.floor(this.elapsed / (1000 * 60 * 60));

    const msString = ms.toString().padStart(2, '0');
    const sString = s.toString().padStart(2, '0');
    const mString = m.toString().padStart(2, '0');
    const hString = h.toString().padStart(2, '0');

    this.display.innerHTML = `${hString}:${mString}:${sString}.${msString}`;

    this.displayAnimation.start();
  }
}

import './public/style.css';
import { gsap } from 'gsap';

const start = document.getElementById('btn-start') as HTMLElement;
const stop = document.getElementById('btn-stop') as HTMLElement;
const reset = document.getElementById('btn-reset') as HTMLElement;
const display = document.getElementById('display') as HTMLElement;

let elapsed: number = 0;
let intervalId: number | undefined;

const startTimer: () => void = () => {
  let now = new Date().getTime();

  if (intervalId !== undefined) return;

  intervalId = window.setInterval(() => {
    let pre = new Date().getTime();
    elapsed += pre - now;
    now = pre;

    updateDisplay();
  }, 10);
};

const stopTimer: () => void = () => {
  clearInterval(intervalId);
  intervalId = undefined;
};

const resetTimer: () => void = () => {
  clearInterval(intervalId);
  intervalId = undefined;
  elapsed = 0;

  gsap.killTweensOf(display);
  gsap.set(display, { scale: 1 });

  updateDisplay();
};

const updateDisplay: () => void = () => {
  const ms = Math.floor((elapsed % 1000) / 10);
  const s = Math.floor(elapsed / 1000) % 60;
  const m = Math.floor(elapsed / (1000 * 60)) % 60;
  const h = Math.floor(elapsed / (1000 * 60 * 60));

  const msString = ms.toString().padStart(2, '0');
  const sString = s.toString().padStart(2, '0');
  const mString = m.toString().padStart(2, '0');
  const hString = h.toString().padStart(2, '0');

  display.innerHTML = `${hString}:${mString}:${sString}.${msString}`;

  gsap.from(display, {
    scale: 1.05,
    duration: 0.1,
    ease: 'power2.out',
  });
};

start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
reset.addEventListener('click', resetTimer);

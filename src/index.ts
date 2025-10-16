import './public/style.css';

const start = document.getElementById('btn-start') as HTMLElement;
const stop = document.getElementById('btn-stop') as HTMLElement;
const reset = document.getElementById('btn-reset') as HTMLElement;

let elapsed: number = 0;
let intervalId: number | undefined;

const startTimer: () => void = () => {
  let now = new Date().getTime();

  if (intervalId !== undefined) return;

  intervalId = window.setInterval(() => {
    let pre = new Date().getTime();
    elapsed += pre - now;
    now = pre;
  }, 1000);
};

const stopTimer: () => void = () => {
  clearInterval(intervalId);
  intervalId = undefined;
};

const resetTimer: () => void = () => {
  clearInterval(intervalId);
  intervalId = undefined;
  elapsed = 0;
};

start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
reset.addEventListener('click', resetTimer);

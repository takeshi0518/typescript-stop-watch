import './public/style.css';
import { Timer } from './Timer';

new Timer({
  selectors: {
    display: 'display',
    startButton: 'btn-start',
    stopButton: 'btn-stop',
    resetButton: 'btn-reset',
    animationKey: '.progress-ring__circle',
  },
});

// Import stylesheets
import createBoard from './modules/board/board';
import Formatter from './modules/formatter/formatter';
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');

const formatter = new Formatter();

const number = formatter.toDecimal(311221110.3333, {
  isCompact: true,
  precision: 2,
});
const board = createBoard();
board.write(number);
board.write(formatter.toTimeStamp(new Date()));

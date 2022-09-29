// Import stylesheets
import createBoard from './modules/board/board';
import { Formatter } from './modules/formatter/formatter';
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');

const formatter = new Formatter('it');

const number = formatter.toCurrency(3000.1, 0);
const board = createBoard();
board.write(number);

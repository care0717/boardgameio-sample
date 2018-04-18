import { Client } from 'boardgame.io/react';
import { TicTacToe } from './game';
import { TicTacToeBoard } from './board';

export const WIDE = 5
export const HIGHT = 7

const App = Client({ game: TicTacToe,  board: TicTacToeBoard, });

export default App;

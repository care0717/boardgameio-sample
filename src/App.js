import { Client } from 'boardgame.io/react';
import { TicTacToe } from './game';
import { TicTacToeBoard } from './board';
import React, { Component }  from 'react';

export const WIDE = 5
export const HIGHT = 7

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: { server: '192.168.1.215:8000' },
  debug: false,
});

const App = () => (
  <div>
    <TicTacToeClient playerID="0" />
    <TicTacToeClient playerID="1" />
  </div>
);

export default App;

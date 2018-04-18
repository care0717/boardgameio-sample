import { Game } from 'boardgame.io/core';
import {WIDE, HIGHT} from './App'; // 指定の1つだけをインポート

export const TicTacToe = Game({
  setup: () => {
    var list = Array(WIDE*HIGHT).fill(null)
    list[(WIDE/2|0)+WIDE] = 10
    list[(WIDE/2|0)+WIDE*(HIGHT-2)] = 11
    for (var i=0; i<WIDE; i++){
      list[WIDE*2+i] = 0
      list[WIDE*(HIGHT-3)+i] =1
    }

    return { cells: list, state: Array(WIDE*HIGHT).fill(null)};
  },

  moves: {
    selectCell(G, ctx, id) {
      const cells = [...G.cells];
      const state = [...G.state];
      state[id] = 1;
      return { ...G, cells, state };
    },

    changeCell(G, ctx, id){
      const cells = [...G.cells];
      const state =  [...G.state];
      cells[id] = cells[state.indexOf(1)];
      cells[state.indexOf(1)] = null;
      state[state.indexOf(1)] = null;
      return { ...G, cells, state };
    },
  },

  flow: {
    endGameIf: (G, ctx) => {
      if (IsVictory(G.cells)) {
        return ctx.currentPlayer;
      }
    },
  },
});

function IsVictory(cells) {
  // Return true if `cells` is in a winning configuration.
}

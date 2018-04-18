import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import React from 'react';

function IsVictory(cells) {
  // Return true if `cells` is in a winning configuration.
}


const WIDE = 5
const HIGHT = 7
class TicTacToeBoard extends React.Component {
  onClick(id) {
    if (!this.isSelected()) {
      if (this.canSelect(id)){
        this.props.moves.selectCell(id);
      }
    } else {
      if (this.canMove(id)){
        this.props.moves.changeCell(id);
        this.props.events.endTurn();
      }
    }
  }

  isMyPiece(num, currentPlayer){
    for (var i=0;i<10;i++){
      if ( currentPlayer + 10*i === num ) return true;
    }
    return false
  }
  isArround(id){
    const selectedPos = this.props.G.state.indexOf(1);
    return (id === (selectedPos-1) || id === (selectedPos+1) || id === (selectedPos-WIDE)|| id === (selectedPos+WIDE));
  }
  canMove(id){
    return (this.isArround(id) && !this.isMyPiece(this.props.G.cells[id], Number(this.props.ctx.currentPlayer)));
  }

  isSelected(){
    return (this.props.G.state.indexOf(1) !== -1);
  }
  canSelect(id) {
    return (this.isMyPiece(this.props.G.cells[id], Number(this.props.ctx.currentPlayer)));
  }
  render() {
    let winner = '';
    if (this.props.ctx.gameover !== null) {
      winner = <div>Winner: {this.props.ctx.gameover}</div>;
    }

    const cellStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
    };

    let tbody = [];
    for (let i = 1; i < HIGHT-1; i++) {
      let cells = [];
      for (let j = 1; j < WIDE-1; j++) {
        const id =  WIDE * i + j;
        if(this.props.G.state[id] === null){
          cells.push(
            <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
              {this.props.G.cells[id]}
            </td>
          );
        }else {
          cells.push(
            <td bgcolor="#cccccc" style={cellStyle} key={id} onClick={() => this.onClick(id)}>
              {this.props.G.cells[id]}
            </td>
          );
        }
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}

const TicTacToe = Game({
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

const App = Client({ game: TicTacToe,  board: TicTacToeBoard, });

export default App;

import { Client } from 'boardgame.io/react';
import { TicTacToe } from './game';
import { TicTacToeBoard } from './board';
import React, { Component }  from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

export const WIDE = 5
export const HIGHT = 7
const App = () => (
  <BrowserRouter>
     <div>
       <Route exact path='/' component={Login} />
       <Route path='/tic/:id' component={TicTacToeApp} />
     </div>
   </BrowserRouter>
);

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: { server: '192.168.1.215:8000' },
  debug: false,
});



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push("/tic/"+this.state.value);
  }

  render() {
    return (
      <div>
        <h2> Login </h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Room Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
};

class TicTacToeApp extends React.Component {
  render() {
    return (
      <div>
        <TicTacToeClient playerID="0" />
        <TicTacToeClient playerID="1" />
      </div>
    );
  }
};


export default App;

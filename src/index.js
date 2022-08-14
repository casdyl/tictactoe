import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// FUNCTION COMPONENT: a simpler way to write components that only contain a render method and don't have their
//                     own state.

// ==============================================================================================================
// [CHILD] REACT COMPONENT 1 - SQUARE: Renders a single button. Show the prop value passed from parent Board.
class Square extends React.Component {
  // Set this.state in constructor to initialize state
  // Constructor not needed because Square no longer keeps track of game's state
  /*   constructor(props) {
            super(props);
                this.state = {
                value: null,
                 };
              }
    */

  // onClick: on <button> component tells React to set up a click event listener
  //          When clicked, React will call onClick event handler defined in Square's render() method
  //          This even handler calls this.props.onClick(). The Square's onClick prop was specified by the Board
  //          Calls the Board's handleClick(i) when clicked
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

// ==============================================================================================================
// [PARENT] REACT COMPONENT 2 - BOARD: Renders 9 squares. Pass a prop called value to the child Square.
class Board extends React.Component {
  // Set Board's initial state to contain array of 9 nulls corresponding to 9 squares
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  // Called by Square when clicked because of:
  // onClick={() => this.handleClick(i)} in renderSquare
  // slice: creates a copy of the squares array to modify instead of modifying existing array
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({ squares: squares });
  }

  // Each Square receives a value prop that will either be 'X', 'O', or null
  // Passing down 2 props from Board => Square; value and onClick
  // onClick: function that Square can call when clicked
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// ==============================================================================================================
// REACT COMPONENT 3 - GAME: renders board with placeholder values
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

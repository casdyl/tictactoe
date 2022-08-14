import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// ==============================================================================================================

// To collect data from multiple children (Squares) or have 2 child components communicate with each other,
// declare shared state in parent component. The parent can pass the state back down to the children by using
// props, keeping child components in sync with each other and with parent.

// FUNCTION COMPONENT: a simpler way to write components that only contain a render method and don't have their
//                     own state.

// ==============================================================================================================

// ==============================================================================================================
// SQUARE [CHILD] - REACT COMPONENT 1: Renders a single button. Show the prop value passed from parent Board.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// ==============================================================================================================
// BOARD [PARENT] - REACT COMPONENT 2: Renders 9 squares. Pass a prop called value to the child Square.
//          DON'T: Board ask each Square for the Square's state - code becomes difficult to understand,
//                 susceptible to bugss, and hard to refactor.
//          DO: Store the game's state in parent Board component instead of in each Square. The Board component
//                 can tell each Square what to display by passing a prop.
class Board extends React.Component {
  // Set Board's INITIAL STATE to contain array of 9 nulls corresponding to 9 squares.
  // xIsNext: [BOOLEAN] Flips each time a player moves.
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // Called by Square when clicked because of onClick={() => this.handleClick(i)} in renderSquare.
  // Flips the value of xIsNext.
  // slice: creates a copy of the squares array to modify instead of modifying existing array.
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  // Each Square receives a value prop that will either be 'X', 'O', or null.
  // Passing down 2 props from Board => Square; value and onClick.
  // onClick: function that Square can call when clicked.
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  // Call calculateWinner(squares) to check if a player has won.
  // If a player has won: display winning text.
  render() {
    const status = "Next player: " + (this.state.xIsNext ? "X" : "O");

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
// GAME - REACT COMPONENT 3: renders board with placeholder values
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

// [HELPER] Checks for a winner and returns 'X', 'O', or null.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines(i);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

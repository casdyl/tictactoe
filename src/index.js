import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// https://reactjs.org/tutorial/tutorial.html

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
// BOARD [PARENT] - REACT COMPONENT 2: Receive squares and onClick props from Game component by passing location
//                      of each Square to onClick to indicate which Square was clicked.
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
// Want top-level Game component to display past list of moves by accessing history.
// [history array] step variable refers to the current history element VALUE (not assigned to anything)
//                 move variable refers to the current history element INDEX
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  // Use most recent history entry to determine and dispolay game's status.
  // Create list item <li> containing a button <button> for each move in game history.
  // * EACH CHILD IN AN ARRAY/ITERATOR SHOULD HAVE UNIQUE "KEY" PROP *
  // [button] has onClick handler which calls this.jumpTo().
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Store past squares arrays in another array called history.
// Represents all board states, from first to last move, shaped like the following:
/*  history = [
     // Before first move
     {
       squares: [
            null, null, null, 
            null, null, null, 
            null, null, null,
        ]
     },
    // After first move
    {
        squares: [
            null, null, null, 
            null, 'X" , null, 
            null, null, null,
        ]
    },
    // After second move
    {
        squares: [
            null, null, null, 
            null, 'X' , null, 
            null, null, 'O' ,
        ]
    },
    // ...
    ]
*/

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// [CHILD] REACT COMPONENT 1 - SQUARE: Renders a single button. Show the prop value passed from parent Board.
class Square extends React.Component {
  // Set this.state in constructor to initialize state
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: "X" })}>
        {this.state.value}
      </button>
    );
  }
}

// [PARENT] REACT COMPONENT 2 - BOARD: Renders 9 squares. Pass a prop called value to the child Square.
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
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

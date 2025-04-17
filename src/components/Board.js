import Square from './Square';
import '../styles/Board.css';


export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (determineWinner(squares) || squares[i]) return;
    const updatedSquares = squares.slice();
    updatedSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(updatedSquares);
  }

  const winner = determineWinner(squares);
  const displayStatus = winner
    ? `Ganhador: ${winner}`
    : `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;

  return (
    <>
      <div className="header-status">{displayStatus}</div>
      <div className="tictactoe-grid">
        {[0, 1, 2].map(row => (
          <div className="tictactoe-row" key={row}>
            {[0, 1, 2].map(col => {
              const idx = row * 3 + col;
              return (
                <Square
                  key={idx}
                  value={squares[idx]}
                  onSquareClick={() => handleClick(idx)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export function determineWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

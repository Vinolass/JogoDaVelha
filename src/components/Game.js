import { useState } from 'react';
import Board from './Board';
import { determineWinner } from './Board';
import '../styles/Game.css';


export default function Game() {
  const [rounds, setRounds] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const currentPlayer = step % 2 === 0;
  const activeBoard = rounds[step];
  const empate = !activeBoard.includes(null) && !determineWinner(activeBoard);

  function proceed(next) {
    const history = [...rounds.slice(0, step + 1), next];
    setRounds(history);
    setStep(history.length - 1);
  }

  function goTo(move) {
    setStep(move);
  }

  const jogadas = rounds.map((_, move) => (
    <li key={move}>
      <button onClick={() => goTo(move)}>
        {move === 0 ? (
          <>
            <i className="bi bi-arrow-counterclockwise me-2"></i>
            Reiniciar Jogo
          </>
        ) : (
          `Ir para jogada #${move}`
        )}
      </button>
      {move === 0 && (
        <h5 className="mt-4">
          <i className="bi bi-clock-history me-2"></i>
          Registro de Jogadas
        </h5>
      )}
    </li>
  ));

  return (
    <div className="main-game">
      <div className="campo-jogo">
        <Board xIsNext={currentPlayer} squares={activeBoard} onPlay={proceed} />
        {empate && (
          <div className="empate-alerta">
            <i className="bi bi-emoji-frown me-2"></i> Deu Velha!
          </div>
        )}
      </div>
      <div className="painel-historico">
        <ol>{jogadas}</ol>
      </div>
    </div>
  );
}

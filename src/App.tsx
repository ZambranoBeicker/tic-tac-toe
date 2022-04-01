import { useEffect, useState, Fragment } from "react";
import "./App.css";

const winnerCombinations = {
  across: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ],
  down: [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ],
  diagonal: [
    [0, 4, 8],
    [2, 4, 6],
  ],
};

function App() {
  return (
    <div className="container">
      <Game />
    </div>
  );
}

const Game = () => {
  const [player, setPlayer] = useState("X");
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    Object.values(winnerCombinations).forEach((combination) => {
      combination.forEach((positions) => {
        if (
          squares[positions[0]] === "" ||
          squares[positions[1]] === "" ||
          squares[positions[2]] === ""
        ) {
          return;
        }
        if (
          squares[positions[0]] === squares[positions[1]] &&
          squares[positions[1]] === squares[positions[2]]
        ) {
          setWinner(squares[positions[0]]);
        }
      });
    });
  };

  const handleClick = (id: number) => {
    console.log(typeof winner, winner);
    if (winner !== null) return;

    if (player === "X" && squares[id] === "") {
      setPlayer("O");
    }
    if (player === "O" && squares[id] === "") {
      setPlayer("X");
    }

    if (squares[id] === "") {
      setSquares(squares.map((square, i) => (i === id ? player : square)));
    }
  };

  const handleReset = () => {
    setSquares(new Array(9).fill(""));
    setWinner(null);
  };

  useEffect(() => {
    checkWinner();
  }, [squares]);

  return (
    <div>
      <p>Turn: {player}</p>
      <p>winner is: {winner}</p>
      {winner !== null && <button onClick={() => handleReset()}>Reset</button>}
      <table>
        <tbody>
          {[0, 3, 6].map((rowPosition, index) => {
            return (
              <tr key={`${index}`}>
                <Cell onClick={handleClick} id={rowPosition}>
                  {squares[rowPosition]}
                </Cell>
                <Cell onClick={handleClick} id={rowPosition + 1}>
                  {squares[rowPosition + 1]}
                </Cell>
                <Cell onClick={handleClick} id={rowPosition + 2}>
                  {squares[rowPosition + 2]}
                </Cell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface CellProps {
  onClick: (id: number) => void;
  id: number;
  children: string;
}

const Cell = ({ onClick, id, children }: CellProps) => {
  return <td onClick={() => onClick(id)}>{children}</td>;
};

export default App;

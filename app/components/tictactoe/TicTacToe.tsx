"use client";
import { useState, useEffect } from "react";

type Player = "X" | "O";
type Cell = Player | undefined;

type WinnerResult =
  | {
      result: true;
      winner: Player;
      row: number[];
    }
  | {
      result: false;
      winner?: never;
      row?: never;
    };

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

const checkWinner = (grid: Cell[]): WinnerResult => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (grid[a] && grid[a] === grid[b] && grid[b] === grid[c]) {
      return {
        result: true,
        winner: grid[a] as Player,
        row: [a, b, c],
      };
    }
  }

  return { result: false };
};

const checkDraw = (grid: Cell[]): boolean => {
  return grid.every((cell) => cell !== undefined);
};

const TicTacToe = () => {
  const [grid, setGrid] = useState<Cell[]>(Array(9).fill(undefined));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | undefined>(undefined);
  const [winningRow, setWinningRow] = useState<number[]>([]);
  const [isDraw, setIsDraw] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  useEffect(() => {
    if (winner || isDraw) {
      // Game ended, update score
      setScore((prev) => ({
        ...prev,
        ...(winner
          ? { [winner]: prev[winner] + 1 }
          : { draws: prev.draws + 1 }),
      }));
    }
  }, [winner, isDraw]);

  const handleCellClick = (index: number) => {
    // Prevent clicks if game is over or cell is occupied
    if (grid[index] || winner || isDraw) return;

    const newGrid = [...grid];
    newGrid[index] = currentPlayer;

    // Check for winner
    const winResult = checkWinner(newGrid);
    if (winResult.result) {
      setWinner(winResult.winner);
      setWinningRow(winResult.row);
      setGrid(newGrid);
      return;
    }

    // Check for draw
    if (checkDraw(newGrid)) {
      setIsDraw(true);
      setGrid(newGrid);
      return;
    }

    // Continue game
    setGrid(newGrid);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setGrid(Array(9).fill(undefined));
    setCurrentPlayer("X");
    setWinner(undefined);
    setWinningRow([]);
    setIsDraw(false);
  };

  const handleResetScore = () => {
    setScore({ X: 0, O: 0, draws: 0 });
    handleReset();
  };

  return (
    <div className="bg-white border border-gray-200 shadow-2xl p-8 rounded-3xl max-w-md w-full">
      <h1 className="text-center mb-6 text-4xl font-bold text-gray-800">
        Tic Tac Toe
      </h1>

      {/* Score Board */}
      <div className="mb-6 grid grid-cols-3 gap-3 text-center">
        <div className="bg-blue-100 p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{score.X}</div>
          <div className="text-xs text-gray-600">Player X</div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-2xl font-bold text-gray-600">{score.draws}</div>
          <div className="text-xs text-gray-600">Draws</div>
        </div>
        <div className="bg-red-100 p-3 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{score.O}</div>
          <div className="text-xs text-gray-600">Player O</div>
        </div>
      </div>

      {/* Status Message */}
      <div className="mb-6 text-center h-8">
        {winner ? (
          <p className="text-2xl font-bold text-green-600 animate-pulse">
            🎉 Player {winner} Wins!
          </p>
        ) : isDraw ? (
          <p className="text-2xl font-bold text-orange-600">🤝 It's a Draw!</p>
        ) : (
          <p className="text-xl font-semibold text-gray-700">
            Current Turn:{" "}
            <span
              className={
                currentPlayer === "X" ? "text-blue-600" : "text-red-600"
              }
            >
              {currentPlayer}
            </span>
          </p>
        )}
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {grid.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={!!cell || !!winner || isDraw}
            className={`
                w-full aspect-square border-2 rounded-xl
                flex justify-center items-center
                text-5xl font-bold
                transition-all duration-200
                ${
                  winningRow.includes(index)
                    ? "bg-green-200 border-green-400 scale-105"
                    : cell
                    ? "bg-gray-50 border-gray-300"
                    : "bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:scale-105 cursor-pointer"
                }
                ${!cell && !winner && !isDraw ? "active:scale-95" : ""}
                ${cell === "X" ? "text-blue-600" : "text-red-600"}
                disabled:cursor-not-allowed
              `}
            aria-label={`Cell ${index + 1}${
              cell ? `, occupied by ${cell}` : ""
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          New Game
        </button>
        <button
          onClick={handleResetScore}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Reset Score
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return <TicTacToe />;
};

export default App;

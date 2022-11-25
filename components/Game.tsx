import React, { useEffect, useState } from "react";
import Board from "./Board";
import GuessRow from "./GuessRow";

type Props = {};

export interface BoardRow {
  guess: number[];
  feedback: number[];
}

export const guessMap: Map<number, string> = new Map([
  [0, "border-2 border-gray-300"],
  [3, "bg-red-500"],
  [4, "bg-green-500"],
  [5, "bg-blue-400"],
  [6, "bg-yellow-400"],
  [7, "bg-white"],
  [8, "bg-black"],
]);

export default function ({}: Props) {
  const maxGuesses = 10;
  const [currentGuess, setCurrentGuess] = useState<number[]>([0, 0, 0, 0]);
  const [guessIndex, setGuessIndex] = useState<number>(0);
  const [getGameOver, setGameOver] = useState(false);
  const [getGameWon, setGameWon] = useState(false);
  const [guessesMade, setGuessesMade] = useState(0);
  const [code, setCode] = useState<number[]>([]);
  // board state starts with 10 empty board rows
  const [boardState, setBoardState] = useState<BoardRow[]>(
    Array.from({ length: maxGuesses }, () => ({
      guess: [0, 0, 0, 0],
      feedback: [0, 0, 0, 0],
    }))
  );

  // generate code on game start
  React.useEffect(() => {
    // generate random set with 4 unique integers between 3 and 8 inclusive
    setCode(createCode());
  }, []);

  // check game win condition
  React.useEffect(() => {
    if (guessesMade === maxGuesses) {
      setGameOver(true);
    }
  }, [guessesMade]);

  const createCode = () => {
    var arr: Array<number> = [];
    while (arr.length < 4) {
      var r = Math.floor(Math.random() * 6) + 3;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };

  const handleGuess = (guess: number) => {
    // skip if current guess contains guess already
    if (getGameOver || currentGuess.includes(guess)) return;
    if (guess === -1 || guessIndex >= 4) {
      setGuessIndex(0);
      setCurrentGuess([0, 0, 0, 0]);
    } else if (guessIndex < 4) {
      const newGuess = [...currentGuess];
      newGuess[guessIndex] = guess;
      setCurrentGuess(newGuess);
      setGuessIndex(guessIndex + 1);
    }
  };

  const submitGuess = () => {
    if (currentGuess.includes(0)) return;
    if (guessesMade >= maxGuesses && !getGameWon) {
      setGameOver(true);
      return;
    }
    // create feedback based on guess contents and postion with code
    const feedback = currentGuess.map((guess, index) => {
      if (guess === code[index]) return 2; // black
      if (code.includes(guess)) return 1; // white
      return 0;
    });

    feedback.sort((a, b) => b - a);

    // update board state with new guess and feedback
    const newBoardState = [...boardState];
    newBoardState[guessesMade] = {
      guess: currentGuess,
      feedback,
    };
    setBoardState(newBoardState);
    setGuessesMade(guessesMade + 1);
    setCurrentGuess([0, 0, 0, 0]);
    setGuessIndex(0);

    if (feedback.every((peg) => peg === 2)) {
      setGameOver(true);
      setGameWon(true);
    }
  };

  const restartGame = () => {
    setGameOver(false);
    setGameWon(false);
    setGuessesMade(0);
    setBoardState(
      Array.from({ length: maxGuesses }, () => ({
        guess: [0, 0, 0, 0],
        feedback: [0, 0, 0, 0],
      }))
    );
    setCode(createCode());
  };

  return (
    <div className="table w-full clear-both">
      <div className="float-left w-1/2">
        <div className="text-center text-white font-Kanit text-3xl font-normal">
          guess ({guessesMade < 10 ? guessesMade + 1 : 10}/{maxGuesses}
          ):
        </div>
        <div className="items-center w-full justify-center flex pt-8 space-x-4">
          {currentGuess.map((guess) => {
            return (
              <div
                className={`flex w-12 h-12 rounded-full ${guessMap.get(guess)}`}
              />
            );
          })}
        </div>
        <div className="flex justify-center items-center p-4 space-x-4">
          <button
            className="border-2 border-red-400 bg-red-600 hover:border-gray-400 p-2 font-Kanit text-md text-white rounded-md"
            onClick={() => handleGuess(-1)}
          >
            CLEAR
          </button>
          <button
            className="border-2 border-green-400 bg-green-700 hover:border-green-200 p-2 font-Kanit text-md text-white rounded-md"
            onClick={submitGuess}
          >
            GUESS
          </button>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 p-8 h-[200px] select-none">
          <div
            className="col-span-1 bg-red-500 text-red-500"
            onClick={() => handleGuess(3)}
          >
            .
          </div>
          <div
            className="col-span-1 bg-green-500 text-green-500"
            onClick={() => handleGuess(4)}
          >
            .{" "}
          </div>
          <div
            className="col-span-1 bg-blue-400 text-blue-400"
            onClick={() => handleGuess(5)}
          >
            .{" "}
          </div>
          <div
            className="col-span-1 bg-yellow-500 text-yellow-500"
            onClick={() => handleGuess(6)}
          >
            .{" "}
          </div>
          <div
            className="col-span-1 bg-white text-white"
            onClick={() => handleGuess(7)}
          >
            .{" "}
          </div>
          <div
            className="col-span-1 bg-black text-black"
            onClick={() => handleGuess(8)}
          >
            .{" "}
          </div>
        </div>
        <div className="flex text-3xl text-white font-Kanit font-extrabold justify-center items-center p-4 space-x-4">
          {getGameOver && getGameWon && (
            <>
              <div className="text-green-500">YOU WIN!</div>
              <button
                className="border-2 border-green-400 bg-green-600 hover:border-gray-400 p-2 font-Kanit text-md text-white rounded-md"
                onClick={() => restartGame()}
              >
                play again
              </button>
            </>
          )}
          {getGameOver && !getGameWon && (
            <>
              <div className="text-red-500">YOU LOSE!</div>
              <button
                className="border-2 border-red-400 bg-red-600 hover:border-gray-400 p-2 font-Kanit text-md text-white rounded-md"
                onClick={() => restartGame()}
              >
                play again
              </button>
              <div className="flex space-x-1">
                {code.map((peg) => {
                  return (
                    <div
                      className={`flex w-12 h-12 rounded-full ${guessMap.get(
                        peg
                      )}`}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="float-left w-1/2">
        <Board boardState={boardState} />
      </div>
    </div>
  );
}

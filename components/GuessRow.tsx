import React from "react";
import { BoardRow } from "./Game";
import { guessMap } from "./Game";

export default function GuessRow(props: BoardRow) {
  const feedbackMap: Map<number, string> = new Map([
    [0, "border-2 border-gray-300"],
    [1, "bg-white"],
    [2, "bg-black"],
  ]);

  return (
    <div className="flex w-4/5 h-[55px] border border-slate-200">
      <div className="left-0 w-1/6 h-full ml-4 items-center grid grid-cols-2 grid-rows-2">
        {props.feedback.map((feedbackPeg) => {
          return (
            <div
              className={`w-4 h-4 rounded-full ${feedbackMap.get(feedbackPeg)}`}
            />
          );
        })}
      </div>
      <div className="flex border-l items-center justify-center w-4/5 h-full space-x-10">
        {props.guess.map((guessPeg) => {
          return (
            <div
              className={`w-10 h-10 flex rounded-full ${guessMap.get(
                guessPeg
              )}`}
            />
          );
        })}
      </div>
    </div>
  );
}

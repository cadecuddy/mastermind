import React from "react";
import { BoardRow } from "./Game";
import GuessRow from "./GuessRow";

type Props = {
  boardState: BoardRow[];
};

export default function Board({ boardState }: Props) {
  return (
    <div className="flex flex-col">
      {boardState.map((row) => {
        return <GuessRow {...row} />;
      })}
    </div>
  );
}

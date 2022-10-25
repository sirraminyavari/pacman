import * as React from "react";
import { usePacman } from "../../context/pacman/pacman-provider";
import { BOARD_ROW_LENGTH } from "../../context/pacman/pacman-provider.types";
import { range } from "../../util/range";
import { Cell, Container, PacmanHead, PacmanMouth } from "./board.styles";

const CELLS_NO = Math.pow(BOARD_ROW_LENGTH, 2);

const Board = ({ shake }: { shake: boolean }) => {
  const { position, direction, processCommand } = usePacman();

  return (
    <Container>
      {position?.X && position?.Y && direction && (
        <PacmanHead
          className={shake ? "shake" : ""}
          x={position.X}
          y={position.Y}>
          <PacmanMouth direction={direction} />
        </PacmanHead>
      )}
      {range(CELLS_NO).map(i => {
        const x = (i % 5) + 1;
        const y = BOARD_ROW_LENGTH - Math.floor(i / 5);

        const clickable =
          !!position?.X &&
          !!position?.Y &&
          !!direction &&
          !(position.X === x && position.Y === y);

        return (
          <Cell
            key={i}
            clickable={clickable}
            onClick={
              !clickable
                ? undefined
                : () => processCommand(`PLACE ${x}, ${y}, ${direction}`)
            }>{`${x}-${y}`}</Cell>
        );
      })}
    </Container>
  );
};

export default Board;

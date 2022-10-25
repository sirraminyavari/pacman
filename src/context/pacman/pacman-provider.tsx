import _ from "lodash";
import * as React from "react";
import {
  BOARD_ROW_LENGTH,
  Directions,
  IBoardRowPosition,
  IDirection,
  IPosition,
  IRotateDirection,
  RotateDirections,
} from "./pacman-provider.types";
import validators from "./validators";

interface IProcessCommandResult {
  result: boolean;
  invalidCommand?: boolean;
}

interface IPacmanContext {
  position?: IPosition;
  direction?: IDirection;
  processCommand: (command: string) => IProcessCommandResult;
  report?: string;
}

export const PacmanContext = React.createContext<IPacmanContext>({
  processCommand: () => ({ result: false }),
});

export const PacmanProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [position, setPosition] = React.useState<IPosition | undefined>();
  const [direction, setDirection] = React.useState<IDirection | undefined>();
  const [report, setReport] = React.useState<string | undefined>();

  const place = (x: any, y: any, dir: any) => {
    if (!_.isString(dir) || !_.isNumber(x) || !_.isNumber(y)) return false;

    const _dir: IDirection | undefined = Directions.find(
      d => d.toLowerCase() === dir.toLowerCase(),
    );

    if (
      x <= 0 ||
      x > BOARD_ROW_LENGTH ||
      y <= 0 ||
      y > BOARD_ROW_LENGTH ||
      !_dir
    )
      return false;

    setPosition({ X: x, Y: y } as unknown as IPosition);
    setDirection(_dir);

    return true;
  };

  const move = () => {
    if (!position?.X || !position.Y || !direction) return false;

    const newX =
      direction === "EAST"
        ? position.X + 1
        : direction === "WEST"
        ? position.X - 1
        : position.X;

    const newY =
      direction === "NORTH"
        ? position.Y + 1
        : direction === "SOUTH"
        ? position.Y - 1
        : position.Y;

    const newPosition: IPosition = {
      X:
        newX > BOARD_ROW_LENGTH
          ? BOARD_ROW_LENGTH
          : newX < 1
          ? 1
          : (newX as unknown as IBoardRowPosition),
      Y:
        newY > BOARD_ROW_LENGTH
          ? BOARD_ROW_LENGTH
          : newY < 1
          ? 1
          : (newY as unknown as IBoardRowPosition),
    };

    if (newPosition.X === position.X && newPosition.Y === position.Y)
      return false;
    else {
      setPosition(newPosition);
      return true;
    }
  };

  const rotate = (rotateDir: any) => {
    const _rotateDir: IRotateDirection | undefined = RotateDirections.find(
      d => d.toLowerCase() === rotateDir.toLowerCase(),
    );

    if (!direction || !_rotateDir) return false;

    switch (direction) {
      case "NORTH":
        setDirection(_rotateDir === "LEFT" ? "WEST" : "EAST");
        return true;
      case "WEST":
        setDirection(_rotateDir === "LEFT" ? "SOUTH" : "NORTH");
        return true;
      case "SOUTH":
        setDirection(_rotateDir === "LEFT" ? "EAST" : "WEST");
        return true;
      case "EAST":
        setDirection(_rotateDir === "LEFT" ? "NORTH" : "SOUTH");
        return true;
      default:
        return false;
    }
  };

  const processCommand = (command: string): IProcessCommandResult => {
    setReport(undefined);

    if (validators.validatePlace(command)) {
      const [x, y, dir] = command
        .split(" ")
        .slice(1)
        .join(" ")
        .split(",")
        .map(val => val.trim());

      return { result: place(+x, +y, dir) };
    } else if (validators.validateMove(command)) {
      return { result: move() };
    } else if (validators.validateRotate(command)) {
      return { result: rotate(command) };
    } else if (validators.validateReport(command)) {
      if (position?.X && position.Y && direction)
        setReport(`Output: ${position.X}, ${position.Y}, ${direction}`);
      else setReport("Pacman is not on the board!");

      return { result: true };
    } else return { result: false, invalidCommand: true };
  };

  const data: IPacmanContext = {
    position,
    direction,
    processCommand,
    report,
  };

  return (
    <PacmanContext.Provider value={data}>{children}</PacmanContext.Provider>
  );
};

export const usePacman = () => {
  return React.useContext(PacmanContext);
};

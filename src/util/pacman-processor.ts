import {
  BOARD_ROW_LENGTH,
  Directions,
  IBoardRowPosition,
  IDirection,
  IPosition,
  IRotateDirection,
  RotateDirections,
} from "../context/pacman/pacman-provider.types";
import validators from "../context/pacman/validators";
import _ from "lodash";

export interface IProcessCommandResult {
  command: string;
  result: boolean;
  invalidCommand?: boolean;
  message: string;
}

export class PacmanProcessor {
  position?: IPosition;
  direction?: IDirection;
  report?: string;

  constructor(position?: IPosition, direction?: IDirection, report?: string) {
    this.position = position;
    this.direction = direction;
    this.report = report;
  }

  place(x: any, y: any, dir: any): boolean {
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

    this.position = { X: x, Y: y } as unknown as IPosition;
    this.direction = _dir;

    return true;
  }

  move(): boolean {
    if (!this.position?.X || !this.position.Y || !this.direction) return false;

    const newX =
      this.direction === "EAST"
        ? this.position.X + 1
        : this.direction === "WEST"
        ? this.position.X - 1
        : this.position.X;

    const newY =
      this.direction === "NORTH"
        ? this.position.Y + 1
        : this.direction === "SOUTH"
        ? this.position.Y - 1
        : this.position.Y;

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

    if (newPosition.X === this.position.X && newPosition.Y === this.position.Y)
      return false;
    else {
      this.position = newPosition;
      return true;
    }
  }

  rotate(rotateDir: any): boolean {
    const _rotateDir: IRotateDirection | undefined = RotateDirections.find(
      d => d.toLowerCase() === rotateDir.toLowerCase(),
    );

    if (!this.direction || !_rotateDir) return false;

    switch (this.direction) {
      case "NORTH":
        this.direction = _rotateDir === "LEFT" ? "WEST" : "EAST";
        return true;
      case "WEST":
        this.direction = _rotateDir === "LEFT" ? "SOUTH" : "NORTH";
        return true;
      case "SOUTH":
        this.direction = _rotateDir === "LEFT" ? "EAST" : "WEST";
        return true;
      case "EAST":
        this.direction = _rotateDir === "LEFT" ? "NORTH" : "SOUTH";
        return true;
      default:
        return false;
    }
  }

  processCommand(command: string): IProcessCommandResult {
    this.report = undefined;

    if (validators.validatePlace(command)) {
      const [x, y, dir] = command
        .split(" ")
        .slice(1)
        .join(" ")
        .split(",")
        .map(val => val.trim());

      return {
        command,
        result: this.place(+x + 1, +y + 1, dir),
        message: `placed on ${x}-${y} toward ${this.direction}`,
      };
    } else if (validators.validateMove(command)) {
      const result = this.move();
      return {
        command,
        result,
        message: result
          ? `went one step toward ${this.direction}`
          : "cannot move further",
      };
    } else if (validators.validateRotate(command)) {
      return {
        command,
        result: this.rotate(command),
        message: `rotated to ${command.toUpperCase()}`,
      };
    } else if (validators.validateReport(command)) {
      if (this.position?.X && this.position.Y && this.direction)
        this.report = `Output: ${this.position.X - 1}, ${
          this.position.Y - 1
        }, ${this.direction}`;
      else this.report = "Pacman is not on the board!";

      return { command, result: true, message: this.report };
    } else
      return {
        command,
        result: false,
        invalidCommand: true,
        message: "invalid command",
      };
  }

  processCommands(commands: string[]): IProcessCommandResult[] {
    const lastValidPlace = Math.max(
      ...commands.map((c, index) => (validators.validatePlace(c) ? index : -1)),
    );

    if (lastValidPlace > 0) commands = commands.slice(lastValidPlace);

    return commands.map(c => this.processCommand(c));
  }
}

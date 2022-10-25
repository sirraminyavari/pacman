type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type IBoardRowPosition = IntRange<1, 6>;

export const BOARD_ROW_LENGTH: IBoardRowPosition = 5;

export interface IPosition {
  X: IBoardRowPosition;
  Y: IBoardRowPosition;
}

export const _directions = ["NORTH", "WEST", "SOUTH", "EAST"] as const;
export type IDirection = typeof _directions[number];
export const Directions: IDirection[] = _directions as unknown as IDirection[];

export const _rotateDirections = ["LEFT", "RIGHT"] as const;
export type IRotateDirection = typeof _rotateDirections[number];
export const RotateDirections: IRotateDirection[] =
  _rotateDirections as unknown as IRotateDirection[];

import { BOARD_ROW_LENGTH } from "./pacman-provider.types";

export const validatePlace = (command: string): boolean =>
  new RegExp(
    `^place\\s+[0-${BOARD_ROW_LENGTH - 1}]\\s*,\\s*[0-${
      BOARD_ROW_LENGTH - 1
    }]\\s*,\\s*((north)|(west)|(south)|(east))$`,
    "gi",
  ).test(command);

export const validateMove = (command: string): boolean =>
  /^move$/gi.test(command);

export const validateRotate = (command: string): boolean =>
  /^((left)|(right))$/gi.test(command);

export const validateReport = (command: string): boolean =>
  /^report$/gi.test(command);

const validators = {
  validatePlace,
  validateMove,
  validateRotate,
  validateReport,
};

export default validators;

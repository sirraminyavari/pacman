import styled from "styled-components";
import {
  BOARD_ROW_LENGTH,
  IDirection,
} from "../../context/pacman/pacman-provider.types";
import { ThemeColors } from "../../styles/themes";

const Margin = 0.2;
const BlockSize = 100 / BOARD_ROW_LENGTH;
const PackmanWidth = BlockSize * (1 - Margin * 2);

const MouthWidth = 20;
const MouthMargin = 10;
const MouthCenter = (100 - MouthWidth) / 2;
const MouthFarMargin = 100 - MouthWidth - MouthMargin;

const calculateMargin = (x: number) => (x - 1 + Margin) * BlockSize;

const calculateMouthMargin = (
  dir: IDirection,
): { left: number; bottom: number } => {
  switch (dir) {
    case "NORTH":
      return { left: MouthCenter, bottom: MouthFarMargin };
    case "WEST":
      return { left: MouthMargin, bottom: MouthCenter };
    case "SOUTH":
      return { left: MouthCenter, bottom: MouthMargin };
    case "EAST":
      return { left: MouthFarMargin, bottom: MouthCenter };
  }
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  max-height: 100%;
  position: relative;
  box-shadow: 0 0 3rem #ccc;
`;

export const Cell = styled.div<{
  clickable: boolean;
}>`
  aspect-ratio: 1;
  border: 1px solid ${ThemeColors.Gray_VeryLight};
  padding: 1rem;
  color: transparent;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  background-color: white;
`;

export const PacmanHead = styled.div<{
  x: number;
  y: number;
}>`
  position: absolute;
  width: ${PackmanWidth}%;
  left: ${({ x }) => calculateMargin(x)}%;
  bottom: ${({ y }) => calculateMargin(y)}%;
  aspect-ratio: 1;
  border-radius: 100rem;
  padding: 1px;
  background-color: ${ThemeColors.Primary};
  transition: left 1s, bottom 1s;
`;

export const PacmanMouth = styled.div<{
  direction: IDirection;
}>`
  position: absolute;
  width: ${MouthWidth}%;
  left: ${({ direction }) => calculateMouthMargin(direction).left}%;
  bottom: ${({ direction }) => calculateMouthMargin(direction).bottom}%;
  aspect-ratio: 1;
  border-radius: 100rem;
  padding: 1px;
  background-color: ${ThemeColors.Primary_Dark};
  transition: left 0.5s, bottom 0.5s;
`;

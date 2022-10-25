import styled from "styled-components";
import { ThemeColors } from "../styles/themes";

export const Maintainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  padding: 1rem;
  height: 100vh;
  position: relative;

  background-image: linear-gradient(90deg, #9af7ff, #2edae9);
  background-position: 0 0;
  background-size: auto;
  background-repeat: repeat;
`;

export const LogoContainer = styled.div`
  position: absolute;
  left: 3.5rem;
  top: 2.2rem;
  width: 7rem;
`;

export const BoardContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  height: 40vw;
  max-height: 60vh;
  align-items: center;
  justify-content: center;
`;

export const CommandContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20vw;
`;

export const CommandInput = styled.input`
  background-color: white;
  height: 1.4375em;
  margin: 0;
  width: 100%;
  padding: 16.5px 14px;
  border: 1px solid ${ThemeColors.Gray_VeryLight};
  border-radius: 0.25rem;

  :hover {
    border-color: ${ThemeColors.Gray_Light};
  }
`;

export const ReportContainer = styled(CommandContainer)<{
  report?: string;
}>`
  opacity: ${({ report }) => (report ? 1 : 0)};
  transition: opacity 0.5s;
`;

export const SuggestedCommands = styled(CommandContainer)`
  justify-content: flex-start;
  flex-flow: row;
  gap: 0.5rem;

  div {
    flex: 0 0 auto;
    font-size: 0.7rem;
    padding: 0.1rem 0.3rem;
    border-radius: 0.25rem;
    background-color: ${ThemeColors.Gray_VeryLight};
    cursor: pointer;

    :hover {
      background-color: ${ThemeColors.Gray_Light};
    }

    :active {
      background-color: ${ThemeColors.Gray};
    }
  }
`;

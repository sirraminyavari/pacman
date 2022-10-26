import styled from "styled-components";
import { ThemeColors } from "../styles/themes";

export const MAX_BOARD_HEIGHT = "40vh";

export const Maintainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  padding: 1rem;
  padding-top: 4rem;
  min-height: 100vh;
  position: relative;

  background-image: linear-gradient(90deg, #9af7ff, #2edae9);
  background-position: 0 0;
  background-size: auto;
  background-repeat: repeat;
`;

export const LogoContainer = styled.div<{
  isSmallScreen: boolean;
}>`
  position: absolute;
  left: 3.5rem;
  top: ${({ isSmallScreen }) => (isSmallScreen ? "1.2rem" : "2.2rem")};
  width: ${({ isSmallScreen }) => (isSmallScreen ? "4rem" : "7rem")};
  transition: width 0.5s;
`;

export const BoardContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-flow: row;
  max-height: ${MAX_BOARD_HEIGHT};
  align-items: center;
  justify-content: center;
  gap: 4rem;

  div {
    aspect-ratio: 1;
  }
`;

export const LogsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: auto;
  height: ${MAX_BOARD_HEIGHT};
  background-color: ${ThemeColors.Gray_VeryLight};
  box-shadow: 0 0 3rem #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
`;

export const LogCommand = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  aspect-ratio: unset !important;
`;

export const LogMessage = styled.div<{
  invalid: boolean;
}>`
  font-size: 0.7rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  color: ${({ invalid }) => (invalid ? "red" : "black")};
  aspect-ratio: unset !important;
`;

export const CommandContainer = styled.div<{
  isMobile: boolean;
}>`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ isMobile }) => (isMobile ? "0 3rem" : "0 20vw")};
  transition: padding 0.5s;
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
  padding-top: 2rem;
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

export const ButtonsContainer = styled(CommandContainer)`
  flex-flow: row;
  gap: 1rem;
`;

export const Footer = styled.footer`
  flex: 1 1 auto;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding: 0 10vw;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1rem;
  color: ${ThemeColors.Secondary_Dark};
  font-family: "Times New Roman", Times, serif;

  .profile-pic {
    flex: 0 0 auto;
  }

  .content {
    flex: 1 1 auto;
    padding-top: 0.3rem;
  }
`;

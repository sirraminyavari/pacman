import { Button } from "@mui/material";
import * as React from "react";
import Board from "../components/board/board";
import { usePacman } from "../context/pacman/pacman-provider";
import { BOARD_ROW_LENGTH } from "../context/pacman/pacman-provider.types";
import usePeriod from "../hooks/usePeriod";
import {
  BoardContainer,
  CommandContainer,
  CommandInput,
  LogoContainer,
  Maintainer,
  ReportContainer,
  SuggestedCommands,
} from "./main-layout.styles";
import IeSvg from "../icons/ie.svg";

const MainLayout = () => {
  const { position, direction, processCommand, report } = usePacman();

  const [command, setCommand] = React.useState<string>("");

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [shake, setShake] = React.useState<number>(0);
  const shaking = usePeriod(shake, {});
  const inputShaking = shaking && !!errorMessage;

  const handleCommand = (com?: string) => {
    com = com || command.trim();
    if (!com) return;
    const result = processCommand(com);

    setShake(result.result ? 0 : shake + 1);
    if (!result.result)
      setErrorMessage(result.invalidCommand ? "Oops!\nInvalid command :(" : "");
  };

  const handleEnterKey = (e: any) => {
    if (e.key === "Enter") handleCommand();
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  const placed = position?.X && position?.Y && direction;

  const invalidMove =
    !placed ||
    (direction === "NORTH" && position.Y === BOARD_ROW_LENGTH) ||
    (direction === "WEST" && position.X === 1) ||
    (direction === "SOUTH" && position.Y === 1) ||
    (direction === "EAST" && position.X === BOARD_ROW_LENGTH);

  const validCommands = [
    command.trim().toLowerCase().startsWith("place") ? null : "PLACE",
    invalidMove ? null : "MOVE",
    !placed ? null : "LEFT",
    !placed ? null : "RIGHT",
    !placed ? null : "REPORT",
  ].filter(f => !!f);

  const handleSuggestedCommandClick = (suggested: string) => {
    if (suggested !== "PLACE") {
      setCommand(suggested);
      handleCommand(suggested);
    } else setCommand(`${suggested} `);

    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <Maintainer>
      <LogoContainer>
        <img src={IeSvg} alt="ie" style={{ maxWidth: "100%" }} />
      </LogoContainer>
      <BoardContainer>
        <Board shake={shaking} />
      </BoardContainer>
      <ReportContainer report={report}>{report ?? ""}</ReportContainer>
      <CommandContainer>
        <CommandInput
          className={inputShaking ? " shake " : ""}
          style={{
            borderColor: inputShaking ? "red" : undefined,
            color: inputShaking ? "red" : undefined,
          }}
          ref={inputRef}
          value={command}
          onChange={e => setCommand(e.target.value)}
          onKeyDown={handleEnterKey}
        />
      </CommandContainer>
      <SuggestedCommands>
        {validCommands.map(c => (
          <div key={c} onClick={() => handleSuggestedCommandClick(c ?? "")}>
            {c}
          </div>
        ))}
      </SuggestedCommands>
      <CommandContainer>
        <Button
          variant="contained"
          size="small"
          disabled={!command.trim()}
          onClick={() => handleCommand()}>
          Execute
        </Button>
      </CommandContainer>
    </Maintainer>
  );
};

export default MainLayout;

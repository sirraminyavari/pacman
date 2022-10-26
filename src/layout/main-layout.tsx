import { Button } from "@mui/material";
import * as React from "react";
import Board from "../components/board/board";
import { usePacman } from "../context/pacman/pacman-provider";
import { BOARD_ROW_LENGTH } from "../context/pacman/pacman-provider.types";
import usePeriod from "../hooks/usePeriod";
import {
  BoardContainer,
  ButtonsContainer,
  CommandContainer,
  CommandInput,
  Footer,
  FooterContent,
  LogCommand,
  LogMessage,
  LogoContainer,
  LogsContainer,
  Maintainer,
  ReportContainer,
  SuggestedCommands,
} from "./main-layout.styles";
import IeSvg from "../icons/ie.svg";
import FileUploader from "../components/uploader/uploader";
import { IUploadedFile } from "../components/uploader/uploader.types";
import { IProcessCommandResult } from "../util/pacman-processor";
import DimensionHelper from "../util/dimension-helper";
import OmniscientIcon from "../icons/omniscient";

const MainLayout = () => {
  const { position, direction, processCommand, processCommands, report, logs } =
    usePacman();

  const [command, setCommand] = React.useState<string>("");

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [shake, setShake] = React.useState<number>(0);
  const shaking = usePeriod(shake, {});
  const inputShaking = shaking && !!errorMessage;
  const [openUploader, setOpenUploader] = React.useState<number>(0);

  const { isMobile, isTabletOrMobile } = DimensionHelper();

  const logsEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (logsEndRef.current?.scrollIntoView)
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs?.length]);

  const handleCommandResult = (result: IProcessCommandResult) => {
    setShake(result.result ? 0 : shake + 1);
    if (!result.result)
      setErrorMessage(result.invalidCommand ? "Oops!\nInvalid command :(" : "");
  };

  const handleCommand = (com?: string) => {
    com = com || command.trim();
    if (com) handleCommandResult(processCommand(com));
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

  const handleUploadedFile = (files: IUploadedFile[]) => {
    const commands: string[] = files[0].content
      .split("\n")
      .map((c: string) => c.trim())
      .filter((c: string) => !!c);

    if (commands.length) {
      const lastResult = processCommands(commands)?.pop();
      if (!!lastResult) handleCommandResult(lastResult);
    }
  };

  return (
    <Maintainer>
      <LogoContainer isSmallScreen={isTabletOrMobile}>
        <img src={IeSvg} alt="ie" style={{ maxWidth: "100%" }} />
      </LogoContainer>
      <BoardContainer>
        <Board shake={shaking} />
        <LogsContainer>
          {logs.map((log, index) => (
            <React.Fragment key={index}>
              <LogCommand>{log.command}</LogCommand>
              <LogMessage
                invalid={!!log.invalidCommand}
                data-testid="log-message">
                {log.message}
              </LogMessage>
            </React.Fragment>
          ))}
          <div ref={logsEndRef}></div>
        </LogsContainer>
      </BoardContainer>
      <ReportContainer report={report} isMobile={isMobile}>
        {report ?? ""}
      </ReportContainer>
      <CommandContainer isMobile={isMobile}>
        <CommandInput
          placeholder="Write you command, then press Enter or click on the EXECUTE button"
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
      <SuggestedCommands data-testid="suggested-commands" isMobile={isMobile}>
        {validCommands.map(c => (
          <div
            key={c}
            onClick={() => handleSuggestedCommandClick(c ?? "")}
            data-testid="suggested-command">
            {c}
          </div>
        ))}
      </SuggestedCommands>
      <ButtonsContainer isMobile={isMobile}>
        <Button
          variant="contained"
          size="small"
          disabled={!command.trim()}
          onClick={() => handleCommand()}
          style={{ width: "10rem" }}
          aria-label="execute">
          Execute
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setOpenUploader(openUploader + 1)}>
          Upload Text File
        </Button>
        <FileUploader open={openUploader} onUpload={handleUploadedFile} />
      </ButtonsContainer>
      <Footer>
        <FooterContent>
          <div className="profile-pic">
            <OmniscientIcon size={40} />
          </div>
          <div className="content">
            <div>Hey, IE!</div>
            <div>
              I am Osi, the omniscient! I have found the best candidate for you.
            </div>
            <div>
              His name is{" "}
              <span
                style={{
                  fontStyle: "italic",
                  margin: "0 0.3rem",
                  fontWeight: "bold",
                }}>
                `Ramin Yavari`.
              </span>
              {
                "You know how to find him. Don't waste your time and contact him as soon as possible :)"
              }
            </div>
          </div>
        </FooterContent>
      </Footer>
    </Maintainer>
  );
};

export default MainLayout;

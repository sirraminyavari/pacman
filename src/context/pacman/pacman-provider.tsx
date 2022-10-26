import * as React from "react";
import {
  IProcessCommandResult,
  PacmanProcessor,
} from "../../util/pacman-processor";
import { IDirection, IPosition } from "./pacman-provider.types";

interface IPacmanContext {
  position?: IPosition;
  direction?: IDirection;
  processCommand: (command: string) => IProcessCommandResult;
  processCommands: (command: string[]) => IProcessCommandResult[];
  report?: string;
  logs: IProcessCommandResult[];
}

export const PacmanContext = React.createContext<IPacmanContext>({
  processCommand: () => ({ command: "", result: false, message: "" }),
  processCommands: () => [],
  logs: [],
});

export const PacmanProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [position, setPosition] = React.useState<IPosition | undefined>();
  const [direction, setDirection] = React.useState<IDirection | undefined>();
  const [report, setReport] = React.useState<string | undefined>();
  const [logs, setLogs] = React.useState<IProcessCommandResult[]>([]);

  const createProcessor = () => {
    return new PacmanProcessor(position, direction, report);
  };

  const setProcessResults = (
    processor: PacmanProcessor,
    newLogs: IProcessCommandResult[],
  ) => {
    setPosition(processor.position);
    setDirection(processor.direction);
    setReport(processor.report);
    setLogs([...logs, ...newLogs]);
  };

  const data: IPacmanContext = {
    position,
    direction,
    processCommand: (command: string): IProcessCommandResult => {
      const pacmanProcessor: PacmanProcessor = createProcessor();
      const processResult: IProcessCommandResult =
        pacmanProcessor.processCommand(command);
      setProcessResults(pacmanProcessor, [processResult]);
      return processResult;
    },
    processCommands: (commands: string[]): IProcessCommandResult[] => {
      const pacmanProcessor: PacmanProcessor = createProcessor();
      const processResults: IProcessCommandResult[] =
        pacmanProcessor.processCommands(commands);
      setProcessResults(pacmanProcessor, processResults);
      return processResults;
    },
    report,
    logs,
  };

  return (
    <PacmanContext.Provider value={data}>{children}</PacmanContext.Provider>
  );
};

export const usePacman = () => {
  return React.useContext(PacmanContext);
};

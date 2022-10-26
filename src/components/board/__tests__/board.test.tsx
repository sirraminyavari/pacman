import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../board";
import {
  PacmanProvider,
  usePacman,
} from "../../../context/pacman/pacman-provider";

const BoardWithContext = () => {
  const { processCommand } = usePacman();

  const [command, setCommand] = useState<string>("");

  return (
    <div>
      <input
        value={command}
        onChange={e => setCommand(e.target.value)}
        aria-label="input"
      />
      <button onClick={() => processCommand(command)} aria-label="button">
        invalid place
      </button>
      <Board />
    </div>
  );
};

describe("test the board", () => {
  test("the pacman should not be present on the board initially", () => {
    const { queryByTestId } = render(<Board />);
    expect(queryByTestId("pacman-head")).toBeNull();
  });

  test("the board should be rendered", () => {
    const { getByTestId } = render(<Board />);
    expect(getByTestId("board")).toBeInTheDocument();
  });

  test("the pacman should appear on the board only after execution of a valid place command", () => {
    const { queryByTestId } = render(
      <PacmanProvider>
        <BoardWithContext />
      </PacmanProvider>,
    );

    expect(queryByTestId("pacman-head")).toBeNull();

    const input = screen.getByRole("textbox", { name: "input" });
    const button = screen.getByRole("button", { name: "button" });

    //pacman is not in document after invalid PLACE command
    fireEvent.change(input, { target: { value: "PLACE 1, 1, NORTH_1" } });
    fireEvent.click(button);
    expect(queryByTestId("pacman-head")).toBeNull();

    //MOVE command does nothing when pacman is not in the document
    fireEvent.change(input, { target: { value: "MOVE" } });
    fireEvent.click(button);
    expect(queryByTestId("pacman-head")).toBeNull();

    //LEFT command does nothing when pacman is not in the document
    fireEvent.change(input, { target: { value: "LEFT" } });
    fireEvent.click(button);
    expect(queryByTestId("pacman-head")).toBeNull();

    //RIGHT command does nothing when pacman is not in the document
    fireEvent.change(input, { target: { value: "LEFT" } });
    fireEvent.click(button);
    expect(queryByTestId("pacman-head")).toBeNull();

    //pacman appears in document after a valid PLACE command
    fireEvent.change(input, { target: { value: "PLACE 2, 4, WEST" } });
    fireEvent.click(button);
    expect(queryByTestId("pacman-head")).toBeInTheDocument();

    //pacman is still in document after a move
    fireEvent.change(input, { target: { value: "MOVE" } });
    fireEvent.click(button);
    expect(queryByTestId("pacman-head")).toBeInTheDocument();
  });
});

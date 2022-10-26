import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import MainLayout from "../main-layout";
import { PacmanProvider } from "../../context/pacman/pacman-provider";

describe("test the pacman layout", () => {
  beforeEach(() => {
    render(
      <PacmanProvider>
        <MainLayout />
      </PacmanProvider>,
    );
  });

  test("the command input must be initially empty", () => {
    const commandInput = screen.getByRole("textbox");
    expect(commandInput).toHaveValue("");
  });

  test("PLACE should be the only suggestion when the input is empty", () => {
    const commands = screen.queryAllByTestId("suggested-command");
    expect(commands.length).toBe(1);

    const { getByText } = within(commands[0]);
    expect(getByText("PLACE")).toBeInTheDocument();
  });

  test("PLACE command suggestion appears only if the input doesn't start with place", () => {
    const suggestionsContainer = screen.queryByTestId("suggested-commands");

    expect(suggestionsContainer).toHaveTextContent("PLACE");

    const commandInput = screen.getByRole("textbox");
    fireEvent.change(commandInput, { target: { value: "   place" } });

    expect(suggestionsContainer).not.toHaveTextContent("PLACE");
  });

  test("execute button is disabled, if the command input is empty", () => {
    const executeButton = screen.getByRole("button", { name: "execute" });

    expect(executeButton).toHaveAttribute("disabled");

    const commandInput = screen.getByRole("textbox");
    fireEvent.change(commandInput, { target: { value: "something" } });

    expect(executeButton).not.toHaveAttribute("disabled");
  });

  test("if pacman is at the end of the row or column, it can't go further", () => {
    const getLastLogMessage = () => screen.getAllByTestId("log-message").pop();

    const executeButton = screen.getByRole("button", { name: "execute" });
    const commandInput = screen.getByRole("textbox");

    fireEvent.change(commandInput, { target: { value: "PLACE 0, 0, SOUTH" } });
    fireEvent.click(executeButton);
    fireEvent.change(commandInput, { target: { value: "MOVE" } });
    fireEvent.click(executeButton);
    expect(getLastLogMessage()).toHaveTextContent("move further");

    fireEvent.change(commandInput, { target: { value: "PLACE 0, 0, WEST" } });
    fireEvent.click(executeButton);
    fireEvent.change(commandInput, { target: { value: "MOVE" } });
    fireEvent.click(executeButton);
    expect(getLastLogMessage()).toHaveTextContent("move further");

    fireEvent.change(commandInput, { target: { value: "PLACE 4, 4, NORTH" } });
    fireEvent.click(executeButton);
    fireEvent.change(commandInput, { target: { value: "MOVE" } });
    fireEvent.click(executeButton);
    expect(getLastLogMessage()).toHaveTextContent("move further");

    fireEvent.change(commandInput, { target: { value: "PLACE 4, 4, EAST" } });
    fireEvent.click(executeButton);
    fireEvent.change(commandInput, { target: { value: "MOVE" } });
    fireEvent.click(executeButton);
    expect(getLastLogMessage()).toHaveTextContent("move further");

    fireEvent.change(commandInput, { target: { value: "PLACE 2, 2, NORTH" } });
    fireEvent.click(executeButton);
    fireEvent.change(commandInput, { target: { value: "MOVE" } });
    fireEvent.click(executeButton);
    expect(getLastLogMessage()).not.toHaveTextContent("move further");
  });
});

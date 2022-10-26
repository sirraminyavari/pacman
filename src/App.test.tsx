import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { container } = render(<App />);
  const parents = container.getElementsByClassName("theme-default");
  expect(parents.length).toBe(1);
});

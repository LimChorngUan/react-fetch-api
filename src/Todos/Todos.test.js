import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server.js";

import { Todos } from "./Todos";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = () => {
  return render(<Todos />);
};

describe("Todos", () => {
  it("should show a list of all the todo items", async () => {
    setup();

    expect(await screen.findByText("Loading...")).toBeInTheDocument();

    const todoItems = await screen.findAllByRole("listitem");
    expect(todoItems).toHaveLength(2);
  });
});

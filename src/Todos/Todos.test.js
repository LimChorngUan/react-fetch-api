import React from "react";
import { screen, render, within } from "@testing-library/react";
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
  it("should show a list of all the todo items with their completed state", async () => {
    setup();

    // Loading
    expect(await screen.findByText("Loading...")).toBeInTheDocument();

    // All todo items
    const todoItems = await screen.findAllByRole("listitem");
    expect(todoItems).toHaveLength(2);

    // todo item 1, not completed
    expect(within(todoItems[0]).getByText("todo1")).toBeInTheDocument();
    expect(
      within(todoItems[0]).getByRole("checkbox", { name: "todo1", checked: false })
    ).toBeInTheDocument();

    // todo item 2, completed
    expect(within(todoItems[1]).getByText("todo2")).toBeInTheDocument();
    expect(
      within(todoItems[1]).getByRole("checkbox", { name: "todo2", checked: true })
    ).toBeInTheDocument();
  });
});

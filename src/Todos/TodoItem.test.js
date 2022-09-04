import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server.js";

import { TodoItem } from "./TodoItem";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = (overrideProps) => {
  const props = {
    id: "1",
    title: "todo1",
    defaultChecked: false,
    ...overrideProps,
  };

  return {
    user: userEvent.setup(),
    ...render(<TodoItem {...props} />),
  };
};

describe("TodoItem", () => {
  it("should check or uncheck todo item", async () => {
    const { user } = setup();

    expect(
      screen.getByRole("checkbox", { name: "todo1", checked: false })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: "todo1" }));

    expect(
      await screen.findByRole("checkbox", { name: "todo1", checked: true })
    ).toBeInTheDocument();
  });
});

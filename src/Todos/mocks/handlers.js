import { rest } from "msw";

import { BASE_URL } from "../consts";
import { mockTodos } from "./data";

export const handlers = [
  rest.get(`${BASE_URL}/todos`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTodos));
  }),

  rest.put(`${BASE_URL}/todos/1`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

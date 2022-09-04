import React from "react";

import { useFetch } from "../useFetch";
import { BASE_URL } from "./consts";

import { TodoItem } from "./TodoItem";

export function Todos() {
  const { loading, error, data } = useFetch(`${BASE_URL}/todos?_limit=10`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  if (data)
    return (
      <ul>
        {data.map(({ id, title, completed }) => (
          <TodoItem
            key={id}
            id={id}
            title={title}
            completed={completed}
            onChange={() => { console.log('!! onChange')}}
          />
        ))}
      </ul>
    );
}

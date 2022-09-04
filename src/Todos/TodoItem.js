import React, { useState } from "react";

import { useMutate } from "../useMutate";
import { BASE_URL } from "./consts";

export function TodoItem({ id, title, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);
  const [mutate] = useMutate(
    `${BASE_URL}/todos/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        completed: !checked,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  const onChange = () => {
    mutate();
    setChecked(!checked)
  };

  return (
    <li>
      <input
        type="checkbox"
        id={`todo-item-${id}`}
        name={`todo-item-${id}`}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`todo-item-${id}`}>{title}</label>
    </li>
  );
}

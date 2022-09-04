import React from "react";

export function TodoItem({ id, title, completed, onChange }) {
  return (
    <li>
      <input
        type="checkbox"
        id={`todo-item-${id}`}
        name={`todo-item-${id}`}
        checked={completed}
        onChange={onChange}
      />
      <label htmlFor={`todo-item-${id}`}>{title}</label>
    </li>
  );
}

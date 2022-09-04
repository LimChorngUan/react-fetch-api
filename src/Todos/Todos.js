import React from "react";

import { useFetch } from "../useFetch";
import { BASE_URL } from "./consts";

export function Todos() {
  const { loading, error, data } = useFetch(`${BASE_URL}/todos?_limit=10`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  if (data)
    return (
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    );
}

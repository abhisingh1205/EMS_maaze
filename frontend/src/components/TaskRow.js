import React from "react";
import { Table } from "react-bootstrap";

export default function TaskRow({ data }) {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.description}</td>
      <td>{data.start_date}</td>
      <td>{data.end_date}</td>
    </tr>
  );
}

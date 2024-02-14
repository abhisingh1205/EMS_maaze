import React, { useEffect } from "react";
import { getTasksList } from "../actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import TaskRow from "../components/TaskRow";

export default function Tasks() {
  const userInfo = useSelector((state) => state.userList.userInfo);
  const { id } = userInfo;

  const tasksList = useSelector((state) => state.tasksList);
  const { data } = tasksList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksList(id));
  }, []);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Task Desc</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>

        <tbody>
          {data ? (
            data.map((task) => <TaskRow id={task.id} data={task} />)
          ) : (
            <></>
          )}
        </tbody>
      </Table>
    </div>
  );
}

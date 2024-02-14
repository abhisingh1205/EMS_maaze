import React, { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "./Loader";
export default function Home() {
  const userList = useSelector((state) => state.userList);
  const { userInfo } = userList;

  useEffect(() => {}, [userList]);

  return (
    <div>
      {userInfo && userInfo.user ? (
        <Card style={{ width: "18rem" }}>
          <Card.Header>Name : {userInfo.user.name}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Email: {userInfo.user.email}</ListGroup.Item>
            <ListGroup.Item>
              Department: {userInfo.department.name}
            </ListGroup.Item>
            <ListGroup.Item>Manager: {userInfo.manager_name}</ListGroup.Item>
          </ListGroup>
        </Card>
      ) : (
        <Loader />
      )}
    </div>
  );
}

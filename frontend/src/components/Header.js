import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

export default function Header() {
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { userInfo } = userList;
  //const userInfo =  localStorage.getItem('userInfo')
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  useEffect(() => {}, [userInfo]);

  const LogoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        {userInfo ? (
          <LinkContainer to="/home">
            <Navbar.Brand>EMS</Navbar.Brand>
          </LinkContainer>
        ) : (
          <LinkContainer to="/">
            <Navbar.Brand>EMS</Navbar.Brand>
          </LinkContainer>
        )}
        <Nav className="me-auto">
          {userInfo ? (
            <div>
              <LinkContainer to="/Profile">
                <Navbar.Brand>Profile</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/tasks">
                <Navbar.Brand>Tasks</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/logout">
                <Navbar.Brand onClick={LogoutHandler}>Logout</Navbar.Brand>
              </LinkContainer>
            </div>
          ) : (
            <LinkContainer to="/login">
              <Navbar.Brand>Login</Navbar.Brand>
            </LinkContainer>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

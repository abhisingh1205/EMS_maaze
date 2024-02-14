import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../actions/employeeActions";
import { SET_MESSAGE } from "../constants/message_constants";
import Message from "./Message";

export default function Profile() {
  const [file, setFile] = useState(null);
  const userInfo = useSelector((state) => state.userList.userInfo);
  const fileUploadDetails = useSelector((state) => state.fileUploadDetails);

  const { id } = userInfo;
  const { loading, message, error } = fileUploadDetails;
  const dispatch = useDispatch();

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(uploadFile(id, file));
  };

  useEffect(() => {
    if (message && message.msg) {
      dispatch({
        type: SET_MESSAGE,
        message: message.msg,
        variant: "success",
      });
    }
    if (error) {
      dispatch({
        type: SET_MESSAGE,
        message: error,
        variant: "danger",
      });
    }
  }, [message, error]);

  return (
    <FormContainer>
      <h1>Profile</h1>
      {message ? <Message /> : ""}
      {error ? <Message /> : ""}
      <Form onSubmit={SubmitHandler}>
        <Form.Group controlId="file">
          <Form.Label>Choose File</Form.Label>
          <Form.Control
            required
            type="file"
            placeholder="File"
            onChange={(e) => setFile(e.target.files[0])}
          ></Form.Control>
        </Form.Group>

        <br className="br"></br>
        <Button type="submit" variant="primary">
          Upload
        </Button>
      </Form>
    </FormContainer>
  );
}

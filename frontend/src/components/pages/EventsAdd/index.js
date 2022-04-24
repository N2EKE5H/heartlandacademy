import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Message from "../../contents/Message";
import Loader from "../../contents/Loader";
import { createEvents } from "../../../actions/eventsActions";
import { toast } from "react-toastify";
import { EVENTS_CREATE_RESET } from "../../../actions/types";
import { BASE_URL } from "../../../api";

const Section = styled.div`
  padding: 30px 40px;
  min-height: 100vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  h2 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const ButtonContent = styled.div`
  margin: 20px 40px;
`;

const AdminEvents = ({ history }) => {
  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [user] = useState(userInfo._id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [validated, setValidated] = useState(false);

  const eventsCreate = useSelector((state) => state.eventsCreate);
  const { loading, events, success, error } = eventsCreate;

  const dispatch = useDispatch();

  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  function clearForm() {
    setTitle("");
    setDescription("");
    setDate("");
    setImage("");
    reset();
    setUploading(false);
  }

  useEffect(() => {
    if (success) {
      clearForm();
      dispatch({ type: EVENTS_CREATE_RESET });
      toast.success("Event Added Successfully");
      setValidated(false);
    }
  }, [history, events, success, dispatch]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/events/uploads`,
        formData,
        config
      );

      setImage(data);
      setFileError(false);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setFileError(true);
      setUploading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(createEvents(user, title, description, date, image));
    }
    setValidated(true);
  };

  return (
    <Section className="container" darkmode={darkMode}>
      <Title darkmode={darkMode}>
        <h2>Add Upcoming Event</h2>
        <ButtonContent>
          <LinkContainer to={`/admin/events/all`}>
            <Button className={darkMode ? "btn-dark" : "btn-primary"}>
              View All
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form
        noValidate
        validated={validated}
        className="container p-4 form-group"
        onSubmit={submitHandler}
      >
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide Title
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please select Date
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Select Image (If any)</Form.Label>
          <Form.Control type="file" ref={ref} onChange={uploadFileHandler} />
          {fileError && (
            <Form.Text id="passwordHelpBlock" muted>
              <span className="text-danger ">
                <i className="fas fa-exclamation-circle"></i> Only image file
                can be added.
              </span>
            </Form.Text>
          )}
          {uploading && <Loader />}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Event Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide Description
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          disabled={fileError || uploading}
          type="submit"
          className={
            darkMode ? "btn-dark mt-4 btn-lg" : "btn-primary mt-4 btn-lg"
          }
        >
          Add
        </Button>
      </Form>
    </Section>
  );
};

export default AdminEvents;

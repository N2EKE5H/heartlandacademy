import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../contents/Loader";
import { createNotices } from "../../../actions/noticesActions";
import Message from "../../contents/Message";
import { toast } from "react-toastify";
import { NOTICES_CREATE_RESET } from "../../../actions/types";
import { BASE_URL } from "../../../api";

const Section = styled.div`
  height: 100vh;
  padding: 50px 100px;
  @media (max-width: 479px) {
    padding: 70px 30px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  h2 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  button {
    background: ${(props) => (props.darkmode ? "#202124" : "#111")};
  }
`;

const ButtonContent = styled.div`
  margin: 20px 40px;
`;

const AddNotice = styled.div``;

const AdminNotices = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [originalFile, setOriginalFile] = useState("");
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [validated, setValidated] = useState(false);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const noticesCreate = useSelector((state) => state.noticesCreate);
  const { notices, error } = noticesCreate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    const formData = new FormData();
    formData.append("formFile", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/notices/uploads`,
        formData,
        config
      );

      setFile(data);
      setOriginalFile(fileName);
      setFileError(false);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setFileError(true);
      setUploading(false);
    }
  };

  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  function clearForm() {
    setTitle("");
    setDescription("");
    setOriginalFile("");
    setFile("");
    reset();
    setUploading(false);
  }

  useEffect(() => {
    if (notices) {
      toast.success("Notice Added Successfully");
      dispatch({ type: NOTICES_CREATE_RESET });
      setValidated(false);
      clearForm();
    }
  }, [notices]);

  const dispatch = useDispatch();

  const noticeHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const dateTime = date;
      dispatch(createNotices(title, description, dateTime, file, originalFile));
    }
    setValidated(true);
  };

  return (
    <Section>
      <Title darkmode={darkMode}>
        <h2>Create Notice</h2>
        <ButtonContent>
          <LinkContainer to={`/admin/notices/all`}>
            <Button className={darkMode ? "btn-dark" : "btn-primary"}>
              View All
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      <AddNotice>
        {error ? <Message variant="danger">{error}</Message> : ""}
        <Form
          noValidate
          validated={validated}
          className="form-group"
          onSubmit={noticeHandler}
        >
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Notice Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Notice title ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide Notice title
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Notice Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Notice Description ..."
              style={{ height: "100px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide Notice description
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>File (Only PDF)</Form.Label>
            <Form.Control
              type="file"
              ref={ref}
              onChange={uploadFileHandler}
              required
            />
            {fileError && (
              <Form.Text id="passwordHelpBlock" muted>
                <span className="text-danger ">
                  <i className="fas fa-exclamation-circle"></i> Only PDF file
                  can be added.
                </span>
              </Form.Text>
            )}
            <Form.Control.Feedback type="invalid">
              Please add PDF File
            </Form.Control.Feedback>
            {uploading && <Loader />}
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
      </AddNotice>
    </Section>
  );
};

export default AdminNotices;

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../contents/Loader";
import Message from "../../contents/Message";
import { createDownload } from "../../../actions/downloadsActions";
import { toast } from "react-toastify";
import { FILE_CREATE_RESET } from "../../../actions/types";
import { BASE_URL } from "../../../api";

const Section = styled.div`
  height: 100vh;
  padding: 100px 90px;
  @media (max-width: 479px) {
    padding: 70px 30px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const AddDownload = styled.div`
  margin-top: 10px;
`;

const AdminDownloads = ({ history }) => {
  const [title, setTitle] = useState("");
  const [originalFile, setOriginalFile] = useState("");
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [validated, setValidated] = useState(false);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const dispatch = useDispatch();

  const downloadCreate = useSelector((state) => state.downloadCreate);
  const { loading, download, error } = downloadCreate;

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
        `${BASE_URL}/api/downloads/uploads`,
        formData,
        config
      );

      console.log(data);

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
    setOriginalFile("");
    setFile("");
    reset();
    setUploading(false);
  }

  useEffect(() => {
    if (download) {
      clearForm();
      dispatch({ type: FILE_CREATE_RESET });
      toast.success("File Added Successfully");
      setValidated(false);
    }
  }, [download]);

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(createDownload(title, originalFile, file));
    }
    setValidated(true);
  };

  return (
    <Section>
      <Title darkmode={darkMode}>
        <h2>Create Download</h2>
        <ButtonContent>
          <LinkContainer to={`/admin/downloads/all`}>
            <Button className={darkMode ? "btn-dark" : "btn-primary"}>
              View All
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <AddDownload>
        <Form
          noValidate
          validated={validated}
          className="container p-4 form-group"
          onSubmit={submitHandler}
        >
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Download Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter download title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide Download title
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>File (jpg|jpeg|png|pdf|docx|word)</Form.Label>
            <Form.Control
              type="file"
              ref={ref}
              onChange={uploadFileHandler}
              required
            />
            {fileError && (
              <Form.Text id="passwordHelpBlock" muted>
                <span className="text-danger ">
                  <i className="fas fa-exclamation-circle"></i> Please add valid
                  file
                </span>
              </Form.Text>
            )}
            <Form.Control.Feedback type="invalid">
              Please add Valid file
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
      </AddDownload>
    </Section>
  );
};

export default AdminDownloads;

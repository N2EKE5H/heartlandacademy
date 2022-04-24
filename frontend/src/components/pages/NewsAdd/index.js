import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { createNews } from "../../../actions/newsActions";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";
import Loader from "../../contents/Loader";
import Message from "../../contents/Message";
import { toast } from "react-toastify";
import { NEWS_CREATE_RESET } from "../../../actions/types";
import { BASE_URL } from "../../../api";

const Section = styled.div`
  padding: 30px 40px;
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

const AdminNews = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [user] = useState(userInfo._id);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("Preschool");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [validated, setValidated] = useState(false);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const newsCreate = useSelector((state) => state.newsCreate);
  const { loading, news, error } = newsCreate;

  const dispatch = useDispatch();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
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
        `${BASE_URL}/api/news/uploads`,
        formData,
        config
      );

      setImage(data);
      setFileError(false);
      setUploading(false);
    } catch (error) {
      console.log(error);
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
    setAuthor("");
    setDescription("");
    setUploading(false);
    reset();
    setImage("");
  }

  useEffect(() => {
    if (news) {
      toast.success("News Added Successfully");
      dispatch({ type: NEWS_CREATE_RESET });
      clearForm();
      setValidated(false);
    }
  }, [news, dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(createNews(user, title, author, description, section, image));
    }
    setValidated(true);
  };

  return (
    <Section className="container" darkmode={darkMode}>
      <Title darkmode={darkMode}>
        <h2>Add News</h2>
        <ButtonContent>
          <LinkContainer to={`/admin/news/all`}>
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

        <Form.Group className="mb-3" controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide Author Name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter news description..."
            style={{ height: "150px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide Description
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSection">
          <Form.Label>Section</Form.Label>
          <Form.Control
            as="select"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          >
            <option>Preschool</option>
            <option>Primary</option>
            <option>Lower Secondary</option>
            <option>Junior Higher Secondary</option>
            <option>Senior Higher Secondary</option>
          </Form.Control>
        </Form.Group>

        <Form.Control.Feedback>
          Select to change the section
        </Form.Control.Feedback>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Choose Image (If Any)</Form.Label>
          <Form.Control
            type="file"
            required
            ref={ref}
            onChange={uploadFileHandler}
          />
          {fileError && (
            <Form.Text id="passwordHelpBlock" muted>
              <span className="text-danger ">
                <i className="fas fa-exclamation-circle"></i> Only image file
                can be added.
              </span>
            </Form.Text>
          )}
          <Form.Control.Feedback type="invalid">
            Please Select Image File
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
    </Section>
  );
};

export default AdminNews;

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { Form, Button } from "react-bootstrap";
import Loader from "../../contents/Loader";
import axios from "axios";
import Message from "../../contents/Message";
import { createCarousel } from "../../../actions/carouselActions";
import { toast } from "react-toastify";
import { CAROUSEL_CREATE_RESET } from "../../../actions/types";
import { BASE_URL } from "../../../api";

const Section = styled.div`
  padding: 90px 40px;
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

const AdminCarousel = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [carouselImage, setCarouselImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [validated, setValidated] = useState(false);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const carouselCreate = useSelector((state) => state.carouselCreate);
  const { success, error } = carouselCreate;

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
        `${BASE_URL}/api/carousel/uploads`,
        formData,
        config
      );

      setCarouselImage(data);
      setFileError(false);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setFileError(true);
      setUploading(false);
    }
  };

  const dispatch = useDispatch();

  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  function clearForm() {
    setTitle("");
    setDescription("");
    setCarouselImage("");
    setUploading(false);
    reset();
  }

  useEffect(() => {
    if (success) {
      clearForm();
      dispatch({ type: CAROUSEL_CREATE_RESET });
      setValidated(false);
      toast.success("Carousel Added Successfully");
    }
  }, [success, dispatch]);

  const carouselHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(createCarousel(title, description, carouselImage));
    }
    setValidated(true);
  };

  return (
    <Section className="container" darkmode={darkMode}>
      <Title darkmode={darkMode}>
        <h2>Create Carousel</h2>
        <ButtonContent>
          <LinkContainer to={`/admin/carousel/all`}>
            <Button className={darkMode ? "btn-dark" : "btn-primary"}>
              View All
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      {error ? <Message variant="danger">{error}</Message> : ""}
      <Form
        noValidate
        validated={validated}
        className="container p-4 form-container"
        onSubmit={carouselHandler}
      >
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Carousel Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Carouser Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide Title
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose Image</Form.Label>
          <Form.Control
            type="file"
            onChange={uploadFileHandler}
            ref={ref}
            required
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

        <Form.Group className="mb-3" controlId="formBasicDesc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            style={{ minHeight: "90px" }}
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

export default AdminCarousel;

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Modal, Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "./Message";
import Loader from "./Loader";
import { createStudentsTestimonials } from "../../actions/testimonialsActions";
import { BASE_URL } from "../../api";

export default function StudentsModal(props) {
  const [fullName, setFullName] = useState("");
  const [desc, setDesc] = useState("");
  const [studentImage, setStudentImage] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [validated, setValidated] = useState(false);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const studentsTestimonialsCreate = useSelector(
    (state) => state.studentsTestimonialsCreate
  );
  const { success, error } = studentsTestimonialsCreate;

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
        `${BASE_URL}/api/testimonials/uploads`,
        formData,
        config
      );

      setStudentImage(data);
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
    setFullName("");
    setDesc("");
    setStudentImage("");
    setMessage("");
    reset();
  }

  useEffect(() => {
    if (success) {
      clearForm();
      toast.success("Testimonial Added Successfully");
      setValidated(false);
    }
  }, [success]);

  const teamsHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(
        createStudentsTestimonials(fullName, desc, studentImage, message)
      );
    }
    setValidated(true);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={darkMode ? "dark-modal" : "white-modal"}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2>Add Student Testimonial</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {error && <Message variant="danger">{error}</Message>}
          <Form
            noValidate
            validated={validated}
            className="container form-group"
            onSubmit={teamsHandler}
          >
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select Image</Form.Label>
              <Form.Control
                type="file"
                ref={ref}
                required
                onChange={uploadFileHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please add valid image
              </Form.Control.Feedback>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide Full Name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide Description
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Message"
                style={{ height: "90px" }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide Description
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              disabled={fileError || uploading}
              variant="primary"
              type="submit"
              className="mt-4"
            >
              ADD
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

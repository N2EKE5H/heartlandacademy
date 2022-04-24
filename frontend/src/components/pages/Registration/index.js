import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import { Form, Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ReCAPTCHA from "react-google-recaptcha";

import Background from "../../../assets/others/Background.jpg";
import { toast, ToastContainer } from "react-toastify";
import Meta from "../../contents/Meta";
import Message from "../../contents/Message";
import { REGISTRATION_CREATE_RESET } from "../../../actions/types";
import { createNewRegistrations } from "../../../actions/registrationActions";

import "./index.css";
import Loader from "../../contents/Loader";
import { BASE_URL } from "../../../api";

const RegisterHeader = styled.div`
  text-align: center;
  background-position: center;
  background-image: url(${Background});
`;

const RegisterInfo = styled.div`
  background-color: rgba(24, 43, 73);
  opacity: 0.98;
  padding: 120px;
  h3 {
    font-size: 70px;
    color: #fff;
  }
  p {
    font-size: 40px;
    color: rgb(0, 148, 68);
    margin-bottom: 20px;
  }
`;

const RegisterBtn = styled.button`
  font-size: 22px;
  width: 100%;
  padding: 15px;
`;

const Section1 = styled.div`
  padding: 50px 80px;
  margin-top: -100px;
  position: relative;
  z-index: 999;
  background-color: #fff;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  margin-bottom: 130px;
`;

const Registration = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [preference, setPreference] = useState("Preschool");
  const [lvl, setLvl] = useState("");
  const [faculty, setFaculty] = useState("");
  const [markSheet, setMarkSheet] = useState("");
  const [markSheetUpload, setMarkSheetUpload] = useState(false);
  const [characterCerf, setCharacterCerf] = useState("");
  const [characterCerfUpload, setcharacterCerfUpload] = useState(false);
  const [ppPhoto, setPpPhoto] = useState("");
  const [ppPhotoUpload, setPpPhotoUpload] = useState(false);
  const [application, setApplication] = useState("");
  const [attachApplication, setAttachApplication] = useState("");
  const [attachApplicationUpload, setAttachApplicationUpload] = useState(false);
  const [token, setToken] = useState("");
  const [showError, setShowError] = useState(false);
  const [showError1, setShowError1] = useState(false);
  const [validated, setValidated] = useState(false);
  const [fileError1, setFileError1] = useState(false);
  const [fileError2, setFileError2] = useState(false);
  const [fileError3, setFileError3] = useState(false);
  const [fileError4, setFileError4] = useState(false);

  const createRegistrations = useSelector((state) => state.createRegistrations);
  const { success, error } = createRegistrations;

  const ref = useRef();
  const ref1 = useRef();
  const ref3 = useRef();

  function clearForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPreference("Preschool");
    setFaculty("");
    setMarkSheet("");
    setCharacterCerf("");
    setPpPhoto("");
    setApplication("");
    setAttachApplication("");
    setValidated(false);
    setToken("");
    ref.current.value = "";
    ref1.current.value = "";
    ref3.current.value = "";
  }

  useEffect(() => {
    if (success) {
      toast.success("Thanks for Registration!");
      dispatch({ type: REGISTRATION_CREATE_RESET });
      clearForm();
    }
  }, [success, history]);

  let handleChange = (value) => {
    setToken(value);
  };

  const dispatch = useDispatch();

  const markSheetFileHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("marksheet", file);
    setMarkSheetUpload(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          boundary: "XXX",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/registrations/uploads/marksheet`,
        formData,
        config
      );

      setMarkSheet(data);
      setFileError1(false);
      setMarkSheetUpload(false);
    } catch (error) {
      console.log(error);
      setFileError1(true);
      setMarkSheetUpload(false);
    }
  };

  const pppPhotoFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("ppphoto", file);
    setPpPhotoUpload(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/registrations/uploads/ppphoto`,
        formData,
        config
      );

      setPpPhoto(data);
      setFileError2(false);
      setPpPhotoUpload(false);
    } catch (error) {
      console.log(error);
      setFileError2(true);
      setPpPhotoUpload(false);
    }
  };

  const characterCfFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("characterCf", file);
    setcharacterCerfUpload(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/registrations/uploads/characterCf`,
        formData,
        config
      );

      setCharacterCerf(data);
      setFileError3(false);
      setcharacterCerfUpload(false);
    } catch (error) {
      console.log(error);
      setFileError3(true);
      setcharacterCerfUpload(false);
    }
  };

  const applicationFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("application", file);
    setAttachApplicationUpload(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/registrations/uploads/application`,
        formData,
        config
      );

      setAttachApplication(data);
      setFileError4(false);
      setAttachApplicationUpload(false);
    } catch (error) {
      console.log(error);
      setFileError4(true);
      setAttachApplicationUpload(false);
    }
  };

  const registrationHandler = (event) => {
    console.log(lvl);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (token === "") {
        setShowError(true);
      } else if (lvl === "") {
        setShowError1(true);
      } else {
        setShowError(false);
        setShowError1(false);
        dispatch(
          createNewRegistrations(
            firstName,
            lastName,
            email,
            phone,
            address,
            preference,
            lvl,
            faculty,
            markSheet,
            ppPhoto,
            characterCerf,
            application,
            attachApplication,
            token
          )
        );
      }
    }
    setValidated(true);
  };

  return (
    <>
      <Meta title="Registration" />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="dark"
        limit={3}
      />
      <RegisterHeader>
        <RegisterInfo>
          <h3>BE A PART OF US</h3>
          <p>Take the next step towards your career....</p>
        </RegisterInfo>
      </RegisterHeader>
      <Container>
        <Section1 className="container registerForm">
          {showError && (
            <Message variant="danger">Please fill out the reCAPTCHA</Message>
          )}
          {showError1 && (
            <Message variant="danger">Please Select Level Value</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <Form noValidate validated={validated} onSubmit={registrationHandler}>
            <div>
              <p>
                Please fill out the form to apply or you can also download the
                admission application presented below and email it at
                <strong> info@heartlandacademy.edu.np</strong>.
              </p>

              <a href="/assets/admission.pdf" download>
                Admission Form <i className="fas fa-arrow-circle-down" />
              </a>
            </div>

            <h4 className="mt-3">Contact Details</h4>

            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="First Name">
                  <Form.Control
                    type="text"
                    placeholder="Your First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide First Name.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Last Name">
                  <Form.Control
                    type="text"
                    placeholder="Your Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide Last Name.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel controlId="floatingInput" label="Email address">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide Email Address.
              </Form.Control.Feedback>
            </FloatingLabel>
            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingNumber" label="Phone Number">
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    isInvalid={error}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide valid Phone Number.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Address">
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide valid Address.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            <h4>Course Preference</h4>

            <FloatingLabel controlId="floatingSelect" label="Level">
              <Form.Select
                aria-label="Floating label select example"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
              >
                <option value="Preschool">
                  Preschool (Nursery-Kindergarten)
                </option>
                <option value="Primary">Primary (1-5)</option>
                <option value="Lower Secondary">Lower Secondary (6-8)</option>
                <option value="Junior Higher Secondary">
                  Junior Higher Secondary (9-10)
                </option>
                <option value="Senior Higher Secondary">
                  Senior Higher Secondary (11-12)
                </option>
              </Form.Select>
            </FloatingLabel>

            {preference === "Preschool" && (
              <div className="mb-4">
                <Form.Check
                  inline
                  label="Nursery"
                  name="group1"
                  type="radio"
                  value={"Nursery"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline1`}
                />
                <Form.Check
                  inline
                  label="Kindergarten"
                  name="group1"
                  type="radio"
                  value={"Kindergarten"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline2`}
                />
              </div>
            )}

            {preference === "Primary" && (
              <div className="mb-4">
                <Form.Check
                  inline
                  label="1"
                  name="group1"
                  type="radio"
                  value={"1"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline1`}
                />
                <Form.Check
                  inline
                  label="2"
                  name="group1"
                  type="radio"
                  value={"2"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline2`}
                />
                <Form.Check
                  inline
                  label="3"
                  name="group1"
                  type="radio"
                  value={"3"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline2`}
                />
                <Form.Check
                  inline
                  label="4"
                  name="group1"
                  type="radio"
                  value={"4"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline2`}
                />
                <Form.Check
                  inline
                  label="5"
                  name="group1"
                  type="radio"
                  value={"5"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline2`}
                />
              </div>
            )}

            {preference === "Lower Secondary" && (
              <div className="mb-4">
                <Form.Check
                  inline
                  label="6"
                  name="group1"
                  type="radio"
                  value={"6"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline1`}
                />
                <Form.Check
                  inline
                  label="7"
                  name="group1"
                  type="radio"
                  value={"7"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline2`}
                />
                <Form.Check
                  inline
                  label="8"
                  name="group1"
                  type="radio"
                  value={"8"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline2`}
                />
              </div>
            )}

            {preference === "Junior Higher Secondary" && (
              <div className="mb-4">
                <Form.Check
                  inline
                  label="9"
                  name="group1"
                  type="radio"
                  value={"9"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline1`}
                />
                <Form.Check
                  inline
                  label="10"
                  name="group1"
                  type="radio"
                  value={"10"}
                  onChange={(e) => setLvl(e.target.value)}
                  id={`inline2`}
                />
              </div>
            )}

            {preference === "Senior Higher Secondary" && (
              <FloatingLabel controlId="floatingSelect" label="Faculty">
                <Form.Select
                  aria-label="Floating label select example"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                >
                  <option>Select Faculty</option>
                  <option value="Science">Science</option>
                  <option value="Management">Management</option>
                  <option value="Education">Education</option>
                </Form.Select>
              </FloatingLabel>
            )}

            <Form.Group controlId="marksheet" className="mb-3">
              <Form.Label>A copy of Marksheet/Gradesheet (Latest)</Form.Label>
              <Form.Control
                type="file"
                ref={ref}
                onChange={markSheetFileHandler}
              />
              {fileError1 && (
                <Form.Text id="passwordHelpBlock" muted>
                  <span className="text-danger ">
                    <i className="fas fa-exclamation-circle"></i> Please add
                    valid file
                  </span>
                </Form.Text>
              )}
              {markSheetUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId="ppphoto" className="mb-3">
              <Form.Label>PP Size Photo</Form.Label>
              <Form.Control
                type="file"
                ref={ref1}
                onChange={pppPhotoFileHandler}
              />
              {fileError2 && (
                <Form.Text id="passwordHelpBlock" muted>
                  <span className="text-danger ">
                    <i className="fas fa-exclamation-circle"></i> Please add
                    valid file
                  </span>
                </Form.Text>
              )}
              {ppPhotoUpload && <Loader />}
            </Form.Group>

            {preference === "Senior Higher Secondary" && (
              <Form.Group controlId="characterCf" className="mb-5">
                <Form.Label>A copy of Character Certificate</Form.Label>
                <Form.Control type="file" onChange={characterCfFileHandler} />
                {fileError3 && (
                  <Form.Text id="passwordHelpBlock" muted>
                    <span className="text-danger ">
                      <i className="fas fa-exclamation-circle"></i> Please add
                      valid file
                    </span>
                  </Form.Text>
                )}
                {characterCerfUpload && <Loader />}
              </Form.Group>
            )}

            <h4>Application</h4>

            <FloatingLabel
              controlId="floatingTextarea2"
              label="Write an application"
            >
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                value={application}
                onChange={(e) => setApplication(e.target.value)}
              />
            </FloatingLabel>

            <h5 style={{ textAlign: "center" }}>OR</h5>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Attach Application Letter</Form.Label>
              <Form.Control
                type="file"
                ref={ref3}
                onChange={applicationFileHandler}
              />
              {fileError4 && (
                <Form.Text id="passwordHelpBlock" muted>
                  <span className="text-danger ">
                    <i className="fas fa-exclamation-circle"></i> Please add
                    valid file
                  </span>
                </Form.Text>
              )}
              {attachApplicationUpload && <Loader />}
            </Form.Group>

            <div className="my-4">
              <ReCAPTCHA
                sitekey="6Lc8c4ceAAAAAIeF4KptKI2I5b9Otiui2EwI0DlN"
                onChange={handleChange}
              />
            </div>

            <RegisterBtn
              className="btn btn-custom"
              disabled={
                fileError1 ||
                fileError2 ||
                fileError3 ||
                fileError4 ||
                markSheetUpload ||
                characterCerfUpload ||
                ppPhotoUpload ||
                attachApplicationUpload
              }
              type="submit"
            >
              Submit
            </RegisterBtn>
          </Form>
        </Section1>
      </Container>
    </>
  );
};

export default Registration;

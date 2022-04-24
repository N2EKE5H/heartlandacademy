import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../contents/Loader";
import Message from "../../contents/Message";

import ImageHeader from "../../contents/ImageHeader";
import heartland from "../../../assets/carousel/heartland.jpg";
import Meta from "../../contents/Meta";
import { toast, ToastContainer } from "react-toastify";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Placeholder,
} from "react-bootstrap";
import { listCareerDetails } from "../../../actions/careersActions";

import { CAREERS_CREATE_RESET } from "../../../actions/types";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../api";

const Title = styled.div`
  color: rgb(1, 34, 55);
  font-size: 50px;
  margin: 40px 0 10px 0;
`;

const Desc = styled.div`
  margin: 40px 0;
  h2 {
    color: rgb(1, 34, 55);
    padding-bottom: 15px;
  }
  h4 {
    color: rgb(1, 34, 55);
    padding: 15px 0;
  }
  span {
    border-bottom: 2px solid rgb(0, 148, 68);
  }
  li {
    font-size: 18px;
    padding: 5px 0;
    color: #111;
  }
`;

const CareerTitle = styled.h2`
  margin: 20px 0 40px 0;
  span {
    border-bottom: 2px solid rgb(0, 148, 68);
  }
`;

const CareersInfo = ({ match }) => {
  const [careerTitle, setCareerTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState("");
  const [originalFile, setOriginalFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileValidationError, setFileValidationError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const careerDetails = useSelector((state) => state.careerDetails);
  const { loading, singleCareer: career, error } = careerDetails;

  const careerId = match.params.id;

  useEffect(() => {
    if (!career._id || career._id !== careerId) {
      dispatch(listCareerDetails(careerId));
      dispatch({ type: CAREERS_CREATE_RESET });
    }
    if (career) {
      setCareerTitle(career.title);
    }
  }, [dispatch, careerId, career]);

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const html = parse(cleanHtmlString);
    return html;
  };

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateCalculator = (applyDate) => {
    var currentDate = new Date();
    // get total seconds between the times
    var delta = Math.abs(applyDate - currentDate) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    return [days + " days, " + hours + " hours from now"];
  };

  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  function clearForm() {
    setCareerTitle("");
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setMessage("");
    setCv("");
    setOriginalFile("");
    setIsLoading(false);
    setUploading(false);
    reset();
  }

  const uploadFileHandler = async (e) => {
    const fileSize = e.target.files[0].size / 1024 / 1024;
    if (fileSize < 2) {
      const file = e.target.files[0];
      const fileName = e.target.files[0].name;
      const formData = new FormData();
      formData.append("formFile", file);
      setUploading(true);
      setFileValidationError(false);

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const { data } = await axios.post(
          `${BASE_URL}/api/careers/uploads`,
          formData,
          config
        );

        setCv(data);
        setFileError(false);
        setOriginalFile(fileName);
        setUploading(false);
      } catch (error) {
        console.error(error);
        setFileError(true);
        setUploading(false);
      }
    } else {
      setFileValidationError(true);
    }
  };

  const handleSubmit = async (e) => {
    const careerData = {
      fullName,
      originalFile,
      phoneNumber,
      email,
      message,
      cv,
      careerTitle,
    };

    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setIsLoading(true);
      await fetch(`${BASE_URL}/api/careers/send`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ careerData }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          const resData = await res;

          if (resData.status === "success") {
            setIsLoading(false);
            toast.success("Thanks. We will contact you soon!");
            clearForm();
          } else if (resData.status === "fail") {
            setIsLoading(false);
            toast.error(
              "Seems like there was a problem. Please try again later."
            );
          }
        });
    }
  };

  const CareerLoader = () => {
    return (
      <Container>
        <Placeholder as="h1" animation="glow">
          <Placeholder xs={7} />
        </Placeholder>
        <Container>
          <Desc>
            <h2>
              <span>Basic Career Info</span>
            </h2>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={6} size="lg" />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={8} size="lg" />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={5} size="lg" />
            </Placeholder>

            <Placeholder as="p" animation="glow">
              <Placeholder xs={7} size="lg" />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={5} size="lg" />
            </Placeholder>
          </Desc>
          <Desc>
            <h2>
              <span>About HA</span>
            </h2>
            <Placeholder as="h4" animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </Placeholder>
          </Desc>
          <Desc>
            <h2>
              <span>Career Specification</span>
            </h2>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={8} size="lg" />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={5} size="lg" />
            </Placeholder>

            <h4>
              <span>Other Specification</span>
            </h4>
            <Placeholder as="h4" animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </Placeholder>
          </Desc>
          <Desc>
            <h2>
              <span>Career Description</span>
            </h2>
            <Placeholder as="h4" animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </Placeholder>
          </Desc>
          <Desc>
            <h2>
              <span>Note: </span>
            </h2>
            <Placeholder as="h4" animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </Placeholder>
          </Desc>
        </Container>
      </Container>
    );
  };

  return (
    <>
      <ImageHeader mtitle="Heartland" title="Careers" image={heartland} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="dark"
        limit={3}
      />
      {loading ? (
        <CareerLoader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Meta title={`HA Careers | ${career.title}`} />
          <Title>{career.title}</Title>
          <Container>
            <Desc>
              <h2>
                <span>Basic Career Info</span>
              </h2>
              <h5>Career Category: {career.careerCategory}</h5>
              <h5>No. of Vacancy/s: {career.noOfVacancy}</h5>
              <h5>Employment Type: {career.employmentType}</h5>
              <h5>Location: {career.location}</h5>
              <h5>Offered Salary: {career.offeredSalary}</h5>
              <h5>
                Appply Before:{" "}
                {new Date(career.applyBefore).toLocaleDateString(
                  "en-US",
                  options
                )}{" "}
                ({`${dateCalculator(Date.parse(career.applyBefore))}`})
              </h5>
            </Desc>
            <Desc>
              <h2>
                <span>About HA</span>
              </h2>
              <h5>
                Heartland Academy(HA) is a democratic school practicing quality
                and non-violent education which provides co-educational
                education from nursery all the way through to Plus Two.Heartland
                Academy(HA) is a democratic school practicing quality and
                non-violent education which provides co-educational education
                from nursery all the way through to Plus Two.Heartland
                Academy(HA) is a democratic school practicing quality and
                non-violent education which provides co-educational education
                from nursery all the way through to Plus Two.
              </h5>
            </Desc>
            <Desc>
              <h2>
                <span>Career Specification</span>
              </h2>
              <h5>Education Level: {career.educationLevel}</h5>
              <h5>Experience Required: {career.experienceRequired}</h5>

              <h4>
                <span>Other Specification</span>
              </h4>
              {htmlFrom(career.careerSpecs)}
            </Desc>
            <Desc>
              <h2>
                <span>Career Description</span>
              </h2>
              {htmlFrom(career.careerDesc)}
            </Desc>
            {career.note && career.note !== "" ? (
              <Desc>
                <h2>
                  <span>Note: </span>
                </h2>
                {htmlFrom(career.note)}
              </Desc>
            ) : (
              ""
            )}
          </Container>
        </Container>
      )}
      <Container>
        <CareerTitle>
          <span>Apply For This Post</span>
        </CareerTitle>
        {fileValidationError && (
          <Message variant="danger">
            File size cant be greater than 2 MB
          </Message>
        )}
        <Form onSubmit={handleSubmit}>
          <Row className="g-2">
            <Col md>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide Full Name
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  pattern="^\d{10}$"
                  title="Please enter valid Phone Number"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide Valid Phone Number
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide Email Address
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Leave a message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{ height: "100px" }}
            />
            <Form.Control.Feedback type="invalid">
              Message field cannot be empty.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Resume / CV</Form.Label>
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
            {uploading && <Loader />}
          </Form.Group>

          {isLoading && <Loader />}

          <Button
            size="lg"
            disabled={fileError || uploading}
            className="my-3 mb-4"
            type="submit"
          >
            Apply
          </Button>
          <Link to={"/careers"}>
            <Button variant="danger" size="lg" className="my-3 mb-4 mx-3">
              Cancel
            </Button>
          </Link>
        </Form>
      </Container>
    </>
  );
};

export default CareersInfo;

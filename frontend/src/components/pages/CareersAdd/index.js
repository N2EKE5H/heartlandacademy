import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { createCareer } from "../../../actions/careersActions";
import { CAREERS_CREATE_RESET } from "../../../actions/types";
import Loader from "../../contents/Loader";
import Message from "../../contents/Message";

const Section = styled.div`
  padding: 50px 100px;
  @media (max-width: 479px) {
    padding: 70px 30px;
  }
`;

const Title = styled.h2`
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  margin: 5px 0 20px 0;
`;

const OtherTitle = styled.h4`
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  padding: 15px 0;
`;

const CareerContainer = styled.div`
  margin: 30px 0;
  h3 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const CareerAdd = ({ history }) => {
  const [title, setTitle] = useState("");
  const [careerCategory, setCareerCategory] = useState("");
  const [noOfVacancy, setNoOfVacancy] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [location, setLocation] = useState("");
  const [offeredSalary, setOfferedSalary] = useState("");
  const [applyBefore, setApplyBefore] = useState();
  const [educationLevel, setEducationLevel] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [careerSpecs, setCareerSpecs] = useState("");
  const [careerDesc, setCareerDesc] = useState("");
  const [note, setNote] = useState("");
  const [validated, setValidated] = useState(false);
  const [showError, setShowError] = useState(false);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const careerCreate = useSelector((state) => state.careerCreate);
  const { loading, career, error } = careerCreate;

  const dispatch = useDispatch();

  function clearForm() {
    setTitle("");
    setCareerCategory("");
    setNoOfVacancy("");
    setEmploymentType("");
    setLocation("");
    setOfferedSalary("");
    setApplyBefore("");
    setEducationLevel("");
    setExperienceRequired("");
    setCareerSpecs("");
    setCareerDesc("");
    setNote("");
    setShowError(false);
  }

  useEffect(() => {
    if (career) {
      history.push("/admin/careers");
      toast.success("Career Added Successfully");
      dispatch({ type: CAREERS_CREATE_RESET });
      clearForm();
      setValidated(false);
    }
  }, [career, dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(
        createCareer(
          title,
          careerCategory,
          noOfVacancy,
          employmentType,
          location,
          offeredSalary,
          applyBefore,
          educationLevel,
          experienceRequired,
          careerSpecs,
          careerDesc,
          note,
          validated
        )
      );
    }

    setValidated(true);
  };

  return (
    <Section className="container">
      {error && <Message variant="danger">{error}</Message>}

      {loading && <Loader />}
      <Form
        noValidate
        validated={validated}
        className="container p-4 form-group"
        onSubmit={submitHandler}
      >
        <LinkContainer to={"/admin/careers"}>
          <Button variant="outline-dark" className="float-right">
            Back
          </Button>
        </LinkContainer>

        <Title darkmode={darkMode}>Add Career</Title>
        <Form.Group className="mb-3" controlId="formCareerTitle">
          <Form.Label>Career Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Career Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide Career Title
          </Form.Control.Feedback>
        </Form.Group>
        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formDepartmentName">
              <Form.Label>Career Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Name"
                value={careerCategory}
                onChange={(e) => setCareerCategory(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide Career Category
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formDepartmentName">
              <Form.Label>No. of Vacancy/s</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter No. of Vacancy/s"
                value={noOfVacancy}
                onChange={(e) => setNoOfVacancy(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide No Of Vacancy
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>Offered Salary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Offered Salary"
                value={offeredSalary}
                onChange={(e) => setOfferedSalary(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide Offered Salary
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formDepartmentName">
              <Form.Label>Employment Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Emplyment Type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide Employment Type
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formExperience">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location Name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide Location Name
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formState">
              <Form.Label>Apply Before</Form.Label>
              <Form.Control
                type="date"
                value={applyBefore}
                onChange={(e) => setApplyBefore(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide valid date
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <CareerContainer darkmode={darkMode}>
          <h3>Career Specification</h3>
          <Row className="g-2">
            <Col md>
              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>Education Level</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Education Level"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide Education Level
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group className="mb-3" controlId="formState">
                <Form.Label>Experience Required</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Experience Required"
                  value={experienceRequired}
                  onChange={(e) => setExperienceRequired(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide Experience Required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <OtherTitle darkmode={darkMode}>
            <h3>Other Specifications</h3>
          </OtherTitle>
          <ReactQuill
            theme="snow"
            value={careerSpecs}
            onChange={setCareerSpecs}
          />
        </CareerContainer>

        <CareerContainer darkmode={darkMode}>
          <h3>Career Description</h3>
          <ReactQuill
            theme="snow"
            value={careerDesc}
            onChange={setCareerDesc}
          />
        </CareerContainer>

        <CareerContainer darkmode={darkMode}>
          <h3>(Note) If Any</h3>
          <ReactQuill theme="snow" value={note} onChange={setNote} />
        </CareerContainer>
        <Button type="submit" variant={darkMode ? "secondary" : "outline-dark"}>
          Add
        </Button>
      </Form>
    </Section>
  );
};

export default CareerAdd;

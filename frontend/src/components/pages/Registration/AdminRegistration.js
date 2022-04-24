import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Accordion, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteRegistration,
  listRegistrationDetails,
} from "../../../actions/registrationActions";
import Loader from "../../contents/Loader";
import { toast } from "react-toastify";
import Message from "../../contents/Message";
import { BASE_URL } from "../../../api";
import {
  REGISTRATION_DELETE_RESET,
  REGISTRATION_DETAILS_RESET,
} from "../../../actions/types";

const Section = styled.div`
  margin: 60px 10px;
`;

const RegistrationBody = styled.div`
  margin: 15px 30px;
  min-height: 100vh;
`;

const Title = styled.h2`
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  margin: 5px 0 20px 0;
`;

const RegistrationContent = styled.div`
  background-color: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(3, 0, 71, 0.09);
  overflow: hidden;
  word-wrap: break-word;
  border-radius: 13px;
  padding: 10px 25px;
  h4 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
    padding: 13px 5px;
  }
`;

const AdminRegistration = ({ match, history }) => {
  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const registrationDetails = useSelector((state) => state.registrationDetails);
  const {
    loading,
    singleRegistration: registration,
    error,
  } = registrationDetails;

  const registrationsDelete = useSelector((state) => state.registrationsDelete);
  const { success: deleteSuccess, error: deleteError } = registrationsDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listRegistrationDetails(match.params.id));
    if (deleteSuccess) {
      dispatch({ type: REGISTRATION_DETAILS_RESET });
      dispatch({ type: REGISTRATION_DELETE_RESET });
      history.push("/");
    }
  }, [dispatch, match, deleteSuccess]);

  const registrationDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteRegistration(id));
      toast.success("Registration Deleted Successfully");
    }
  };

  return (
    <Section>
      <RegistrationBody>
        <LinkContainer to={"/admin/home"}>
          <Button
            variant={darkMode ? "light" : "outline-dark"}
            className="float-right"
          >
            Back
          </Button>
        </LinkContainer>
        <Title darkmode={darkMode}>Registration</Title>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {deleteError && <Message variant="danger">{deleteError}</Message>}

            <RegistrationContent darkmode={darkMode}>
              <h4>First Name: {registration.firstName}</h4>
              <h4>Last Name: {registration.lastName}</h4>
              <h4>Email: {registration.email}</h4>
              <h4>Phone No: {registration.phone}</h4>
              <h4>Address: {registration.address}</h4>
              <h4>Preference: {registration.preference}</h4>

              {registration.lvl && <h4>Level: {registration.lvl}</h4>}

              {registration.faculty && <h4>Faculty: {registration.faculty}</h4>}

              <h4>
                MarkSheet:{" "}
                <a
                  href={`${BASE_URL}/${registration.markSheet}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Admission Form <i className="fas fa-arrow-circle-down" />
                </a>
              </h4>
              <h4>
                PP Photo:{" "}
                <a
                  href={`${BASE_URL}/${registration.ppPhoto}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Admission Form <i className="fas fa-arrow-circle-down" />
                </a>
              </h4>

              {registration.characterCerf && (
                <h4>
                  Character Certificate:{" "}
                  <a
                    href={`${BASE_URL}/${registration.characterCerf}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Admission Form <i className="fas fa-arrow-circle-down" />
                  </a>
                </h4>
              )}

              {registration.application && (
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h5>Application</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p className="text-dark">{registration.application}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}

              {registration.attachApplication && (
                <h4>
                  Attached Application:
                  <a
                    href={`${BASE_URL}/${registration.attachApplication}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Admission Form <i className="fas fa-arrow-circle-down" />
                  </a>
                </h4>
              )}

              <div className="text-center mt-4">
                <Button
                  size="lg"
                  variant="danger"
                  onClick={() => registrationDeleteHandler(registration._id)}
                >
                  Delete
                </Button>
              </div>
            </RegistrationContent>
          </>
        )}
      </RegistrationBody>
    </Section>
  );
};

export default AdminRegistration;

import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import Map from "../../../assets/others/map.jpg";
import ImageHeader from "../../contents/ImageHeader";
import Meta from "../../contents/Meta";
import Loader from "../../contents/Loader";
import { BASE_URL } from "../../../api";

const ContactCard = styled.div`
  display: flex;
  padding: 40px 30px;
  flex-direction: row;
  gap: 30px;
  @media (max-width: 780px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Findus = styled.div`
  flex: 1;
  h3 {
    color: #111;
    font-weight: 600;
    padding-bottom: 10px;
    margin-bottom: 30px;
    position: relative;
    &:before {
      position: absolute;
      content: "";
      background: rgb(17, 182, 122);
      width: 50px;
      height: 2px;
      bottom: 0px;
      left: 0px;
    }
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  line-height: 25px;
  margin-bottom: 20px;
  i {
    font-size: 30px;
    padding-right: 58px;
    color: rgb(17, 182, 122);
  }
`;

const EmailAddress = styled.div`
  display: flex;
  align-items: center;
  line-height: 25px;
  margin-bottom: 20px;
  i {
    font-size: 30px;
    padding-right: 50px;
    color: rgb(17, 182, 122);
  }
`;

const Number = styled.div`
  display: flex;
  align-items: center;
  line-height: 25px;
  i {
    font-size: 30px;
    padding-right: 50px;
    color: rgb(17, 182, 122);
  }
  p {
    line-height: 5px;
    padding-top: 8px;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  padding-top: 30px;
  justify-content: center;
  i {
    padding-right: 45px;
    font-size: 28px;
    cursor: pointer;
  }
`;

const InputForm = styled.div`
  flex: 3;
  h3 {
    color: #111;
    font-weight: 600;
    padding-bottom: 10px;
    margin-bottom: 20px;
    position: relative;
    &:before {
      position: absolute;
      content: "";
      background: rgb(17, 182, 122);
      width: 50px;
      height: 2px;
      bottom: 0px;
      left: 0px;
    }
  }
`;

const Section2 = styled.div`
  margin-top: 30px;
`;

const Contact = () => {
  const [mailerState, setMailerState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setIsLoading(true);
      await fetch(`${BASE_URL}/api/contact/send`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ mailerState }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          const resData = await res;

          if (resData.status === "success") {
            setIsLoading(false);
            toast.success("Thanks. We will contact you soon!");
          } else if (resData.status === "fail") {
            console.log(resData);
            setIsLoading(false);
            toast.error(
              "Seems like there was a problem. Please try again later."
            );
          }
        })
        .then(() => {
          setMailerState({
            email: "",
            name: "",
            subject: "",
            message: "",
          });
        });
    }
  };

  return (
    <>
      <Meta title="Contact Us" />
      <ImageHeader mtitle="Contact" title="Contact" image={Map} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="dark"
        limit={3}
      />
      <ContactCard className="container">
        <Findus>
          <h3>Contact Info</h3>
          <Location>
            <span>
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <span>
              <h4>Our Location</h4>
              <p>Bafal-13, Kathmandu, Nepal</p>
            </span>
          </Location>
          <EmailAddress>
            <span>
              <i className="far fa-envelope"></i>
            </span>
            <span>
              <h4>Email Address</h4>
              <p>info@heartlandacademy.edu.np</p>
            </span>
          </EmailAddress>
          <Number>
            <span>
              <i className="fas fa-phone"></i>
            </span>
            <span>
              <h4>Phone Number</h4>
              <span>
                <p>977 - 01-523 7058</p>
                <p>977 - 01-523 7283</p>
              </span>
            </span>
          </Number>
          <SocialMedia>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </SocialMedia>
        </Findus>
        <InputForm>
          <h3>Get in Touch</h3>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={mailerState.name}
                  onChange={handleStateChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your fullname.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={mailerState.email}
                  placeholder="Enter email"
                  onChange={handleStateChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                name="subject"
                value={mailerState.subject}
                onChange={handleStateChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Subject field cannot be empty.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Leave a message here"
                value={mailerState.message}
                onChange={handleStateChange}
                required
                name="message"
                style={{ height: "100px" }}
              />
              <Form.Control.Feedback type="invalid">
                Message field cannot be empty.
              </Form.Control.Feedback>
            </Form.Group>
            {isLoading && <Loader />}

            <Button variant="primary" type="submit" className="btn-custom">
              Submit
            </Button>
          </Form>
        </InputForm>
      </ContactCard>
      <Section2>
        <iframe
          title="Heartland Google Map"
          style={{ width: "100%", height: "450px", border: "none" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.496389283846!2d85.28343501508144!3d27.70195608279417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb186250ed5937%3A0xcf8a516b9134b9c5!2sHeartland%20Academy!5e0!3m2!1sen!2snp!4v1630145079353!5m2!1sen!2snp"
        ></iframe>
      </Section2>
    </>
  );
};

export default Contact;

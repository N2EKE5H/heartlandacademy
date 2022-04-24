import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Form, Button, InputGroup, ToastContainer } from "react-bootstrap";

import Logo from "../../../assets/others/Logo.jpg";
import Message from "../../contents/Message";
import Loader from "../../contents/Loader";
import { login } from "../../../actions/userActions";
import { adminModeChanger } from "../../../actions/settingActions";

const LoginForm = styled.div`
  display: flex;
  padding: 60px 1px;
  gap: 50px;
`;

const ImageSection = styled.div`
  flex: 1;
  @media (max-width: 770px) {
    display: none;
  }
`;

const Image = styled.div`
  text-align: center;
  img {
    flex-shrink: 0;
    width: 300px;
    height: 300px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Content = styled.div`
  margin-top: 25px;
  h3 {
    text-align: center;
    font-size: 30px;
  }
  h5 {
    text-align: center;
  }
  p {
    text-align: center;
    color: blue;
  }
`;

const FormSection = styled.div`
  flex: 1;
  margin-top: 23px;
  h2 {
    font-size: 40px;
  }
  @media (max-width: 770px) {
    margin-top: -30px;
    padding: 0px 40px;
  }
`;

const Login = ({ location, history }) => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const settings = useSelector((state) => state.settings);
  const { adminMode } = settings;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/admin/home";

  useEffect(() => {
    if (userInfo) {
      setValidated(false);
      history.push(redirect);
      window.location.reload();
      dispatch(adminModeChanger());
    }
    if (error) {
      if (error) {
        setValidated(false);
      }
    }
    if (adminMode) {
      history.push("/admin/home");
    }
  }, [history, userInfo, redirect, error, adminMode, dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(login(email, password));
    }
    setValidated(true);
  };

  return (
    <LoginForm className="container">
      <ImageSection>
        <Image>
          <img src={Logo} alt="HALogo" />
        </Image>
        <Content>
          <h3>Heartland Academy</h3>
          <h5>Bafal-13, Kathmandu</h5>
          <p>"Creating Opportunities Through Education"</p>
        </Content>
      </ImageSection>
      <FormSection>
        <h2>Log in</h2>
        <Form noValidate validated={validated} onSubmit={handleLogin}>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputGroup.Text id="basic-addon2">
                <i
                  onClick={(e) => setShowPassword(!showPassword)}
                  className={
                    showPassword ? "far fa-eye eye" : "far fa-eye-slash eye"
                  }
                ></i>
              </InputGroup.Text>

              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button variant="info" type="submit" className="mt-2 btn-xl">
            Login
          </Button>
        </Form>
      </FormSection>
    </LoginForm>
  );
};

export default Login;

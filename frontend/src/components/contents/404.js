import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import Meta from "./Meta";

const NotFoundContainer = styled.div`
  margin: 150px 0;
  text-align: center;
  h1 {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 25px;
    color: #3459e6;
  }

  h3 {
    font-size: 30px;
    margin-bottom: 15px;
  }

  h5 {
    color: red !important;
    cursor: pointer;
  }
`;

const NotFoundPage = () => {
  return (
    <>
      <Meta title="Not Found" />
      <NotFoundContainer>
        <h1>
          <i className="fas fa-exclamation-circle"></i>404
        </h1>
        <h3>Sorry, there is nothing here ...</h3>
        <LinkContainer to="/">
          <h5>Go Back Home</h5>
        </LinkContainer>
      </NotFoundContainer>
    </>
  );
};

export default NotFoundPage;

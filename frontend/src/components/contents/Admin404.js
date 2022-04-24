import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 80px;
  min-height: 100vh;
  h1 {
    font-size: 290px;
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
    padding-top: 20px;
    @media (max-width: 860px) {
      font-size: 190px;
    }
    @media (max-width: 665px) {
      font-size: 100px;
    }
  }
  span {
    color: red;
  }
  h3 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
    font-size: 40px;
    @media (max-width: 665px) {
      font-size: 20px;
    }
  }
`;

const BtnContainer = styled.div`
  padding-top: 50px;
  button {
    padding: 15px 20px;
    border-radius: 30px;
    background-color: #202124;
    border: none;
    color: #fff;
    @media (max-width: 665px) {
      padding: 10px 15px;
    }
  }
`;

const Admin404 = () => {
  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;
  return (
    <NotFound darkmode={darkMode}>
      <h1>
        4<span>0</span>4
      </h1>
      <h3>uh-oh! Page not Found....</h3>
      <LinkContainer to="/admin/home">
        <BtnContainer>
          <button>Go Back Home</button>
        </BtnContainer>
      </LinkContainer>
    </NotFound>
  );
};

export default Admin404;

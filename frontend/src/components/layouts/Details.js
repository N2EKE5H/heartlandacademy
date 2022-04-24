import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

import Student from "../../assets/others/Student.jpg";

const DetailCard = styled.div`
  display: flex;
  padding: 30px 40px;
  gap: 50px;
`;

const ImageCard = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media (max-width: 825px) {
    display: none;
  }
  img {
    flex-shrink: 0;
    width: 390px;
    height: 500px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Contents = styled.div`
  flex: 2;
  margin-top: 30px;
  h2 {
    text-align: justify;
    font-size: 34px;
    padding: 0;
    @media (max-width: 991px) {
      font-size: 32px;
      text-align: center;
    }
    @media (max-width: 499px) {
      font-size: 28px;
    }
  }
  p {
    text-align: justify;
    font-size: 22px;
    color: #111;
    padding-top: 20px;
    @media (max-width: 991px) {
      font-size: 20px;
    }
    @media (max-width: 499px) {
      font-size: 15px;
    }
  }
  button {
    margin-top: 20px;
    color: #fff;
    background-color: #111;
    font-size: 23px;
    text-align: center;
    @media (max-width: 991px) {
      font-size: 18px;
      margin-top: 5px;
    }
    @media (max-width: 499px) {
      font-size: 16px;
    }
  }
`;

const Details = () => {
  return (
    <>
      <DetailCard className="layer">
        <ImageCard>
          <img src={Student} alt="Student" />
        </ImageCard>
        <Contents className="text-center">
          <h2>
            Heartland Academy is governed by CLCR Australia/Nepal and Karuna
            Private Educational Trust.{" "}
          </h2>
          <p>
            It receives funding from its partners the LBW Trust - Batting for
            Change, Global Development Group and Rotary International. The
            school is supported by Macquarie University, Australia and a number
            of international schools including Chatswood School and Ravenswood
            Girls School, Australia.
          </p>
          <LinkContainer to="/about">
            <button className="btn">Read More</button>
          </LinkContainer>
        </Contents>
      </DetailCard>
    </>
  );
};

export default Details;

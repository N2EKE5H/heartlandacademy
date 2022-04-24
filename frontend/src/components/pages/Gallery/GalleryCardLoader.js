import React from "react";
import styled from "styled-components";

import { Placeholder } from "react-bootstrap";
import defaultImage from "../../../assets/default/default-loading.png";

const CardItem = styled.div`
  display: flex;
  padding: 1rem;
  @media (min-width: 40rem) {
    width: 50%;
  }
  @media (min-width: 56rem) {
    width: 33.333%;
  }
`;

const Card = styled.div`
  background-color: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  border-radius: 0.25rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CardImage = styled.div`
  height: 230px;
  width: 400px;
  @media (max-width: 484px) {
    height: 200px;
    width: 300px;
  }
  img {
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardInfo = styled.p`
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  font-weight: 500;
`;

const CardTitle = styled.div`
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin: 0px;
`;

const ActionButton = styled.div`
  margin-top: 20px;
  text-align: center;
  button {
    border-radius: 30px;
    border: none;
    background: #111;
    &:hover {
      background: #202124;
    }
  }
`;

const GalleryCardLoader = () => {
  return (
    <CardItem>
      <Card>
        <CardImage>
          <img src={defaultImage} alt="default" />
        </CardImage>

        <CardContent>
          <CardTitle>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </CardTitle>
          <CardInfo>
            <Placeholder as={Card.Info} animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
          </CardInfo>
          <ActionButton>
            <Placeholder.Button variant="primary" xs={5} />
          </ActionButton>
        </CardContent>
      </Card>
    </CardItem>
  );
};

export default GalleryCardLoader;

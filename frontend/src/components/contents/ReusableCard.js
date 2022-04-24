import React from "react";

import { Card } from "react-bootstrap";
import styled from "styled-components";

const Icon = styled.i`
  font-size: 44px;
  display: flex;
  justify-content: center;
  color: #fff;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 23px;
`;

const Desc = styled.h4`
  text-align: center;
  font-size: 20px;
`;

const ReusableCard = ({ url, name, desc }) => {
  return (
    <Card className="mt-4 card shadow bg-white rounded missionCard">
      <Card.Header className="cardHeader">
        <Icon className={url} />
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Title>{name}</Title>
        </Card.Title>
        <Card.Text as="div">
          <Desc>{desc}</Desc>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReusableCard;

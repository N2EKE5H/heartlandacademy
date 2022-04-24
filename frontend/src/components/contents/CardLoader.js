import React from "react";
import styled from "styled-components";

import defaultImage from "../../assets/default/default-loading.png";

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

const CardLoader = () => {
  return (
    <CardItem>
      <CardImage>
        <img src={defaultImage} alt="default" />
      </CardImage>
    </CardItem>
  );
};

export default CardLoader;

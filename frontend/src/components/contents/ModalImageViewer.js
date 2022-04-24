import React from "react";
import styled from "styled-components";
import { BASE_URL } from "../../api";

const ModalContainer = styled.div`
  margin: 50px 40px 30px 40px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  padding: 15px 15px;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ModalImageViewer = ({ url }) => {
  return (
    <ModalContainer>
      <ModalImage src={`${BASE_URL}${url}`} alt="Modal Image" />
    </ModalContainer>
  );
};

export default ModalImageViewer;

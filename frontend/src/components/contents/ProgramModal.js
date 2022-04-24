import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const Title = styled.h3`
  font-weight: 600;
  color: rgb(0, 148, 68);
  padding-top: 10px;
`;

const Desc = styled.p`
  color: #111;
  text-align: justify;
`;

export default function ProgramModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Title>{props.title}</Title>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Desc>{props.desc}</Desc>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

import React, { useEffect } from "react";
import styled from "styled-components";
import { Row, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../contents/Message";
import Loader from "../../contents/Loader";
import { deleteCareer, listCareers } from "../../../actions/careersActions";
import { toast } from "react-toastify";

const Section = styled.div`
  padding: 50px 10px;
  @media (max-width: 479px) {
    padding: 70px 30px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
  padding: 0 30px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  h2 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  button {
    background: ${(props) => (props.darkmode ? "#202124" : "#111")};
  }
`;

const Content = styled.div`
  min-height: 100vh;
`;

const ButtonContent = styled.div`
  margin: 20px 40px;
`;

const CareerCard = styled.div`
  background: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  h4 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  gap: 30px;
  button {
    padding: 8px 15px;
  }
`;

const AdminAllCareers = () => {
  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const careersList = useSelector((state) => state.careersList);
  const { loading, careers, error } = careersList;

  const careerDelete = useSelector((state) => state.careerDelete);
  const { success: deleteSuccess, error: deleteError } = careerDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCareers());
    if (deleteSuccess) {
      dispatch(listCareers());
    }
  }, [dispatch, deleteSuccess]);

  const deleteCareerHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCareer(id));
      toast.success("Career Deleted Successfully");
    }
  };

  return (
    <Section>
      <Title darkmode={darkMode}>
        <h2>Added Careers</h2>
        <ButtonContent>
          <LinkContainer to={`/admin/careers/add/new`}>
            <Button className={darkMode ? "btn-dark" : "btn-primary"}>
              Add New
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      <Content>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row xs={1} sm={3} md={4} className="p-4 justify-content-center">
            {careers &&
              careers.map((career) => (
                <CareerCard
                  className="col card p-3 m-4"
                  darkmode={darkMode}
                  key={career._id}
                >
                  <h4>{career.title}</h4>
                  <p>
                    <i className="fas fa-map-marker-alt"></i> {career.location}
                  </p>
                  <ButtonContainer>
                    <LinkContainer to={`/admin/careers/${career._id}`}>
                      <Button variant="light">View</Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      onClick={() => deleteCareerHandler(career._id)}
                    >
                      Delete
                    </Button>
                  </ButtonContainer>
                </CareerCard>
              ))}
          </Row>
        )}
      </Content>
    </Section>
  );
};

export default AdminAllCareers;

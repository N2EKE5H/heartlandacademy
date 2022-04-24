import React, { useEffect } from "react";
import { Container, Row, Col, Placeholder } from "react-bootstrap";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Meta from "../../contents/Meta";
import heartland from "../../../assets/carousel/heartland.jpg";
import ImageHeader from "../../contents/ImageHeader";
import { listCareers } from "../../../actions/careersActions";
import Message from "../../contents/Message";

const Title = styled.div`
  color: rgb(1, 34, 55);
  font-size: 50px;
  margin: 50px 0;
  span {
    border-bottom: 3px solid rgb(0, 148, 68);
  }
`;

const NotAvailable = styled.h2`
  color: rgb(1, 34, 55);
  text-align: center;
  margin: 40px 0;
`;

const CareerLoader = () => {
  return (
    <Col className="card p-3 careerCard">
      <Placeholder as="h4" animation="glow">
        <Placeholder xs={10} />
      </Placeholder>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={6} />
      </Placeholder>
    </Col>
  );
};

const Careers = () => {
  const careersList = useSelector((state) => state.careersList);
  const { loading, careers, error } = careersList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCareers());
  }, [dispatch]);
  return (
    <>
      <Meta title="HA Careers" />
      <ImageHeader mtitle="Heartland" title="Careers" image={heartland} />
      <Container>
        <Title>
          <span>Career At HA</span>
        </Title>
        <h5 style={{ textAlign: "justify" }}>
          Join Us. For over two decades, we’ve worked with Lorem, ipsum dolor
          sit amet consectetur adipisicing elit. Corporis error ut provident vel
          repellendus nihil atque possimus aliquam, mollitia tempora neque
          voluptate debitis illum veniam.Numquam blanditiis dignissimos
          laboriosam illum ut officia. Nam aperiam autem nesciunt perferendis
          id. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
          nulla sequi pariatur quam animi ipsum molestias assumenda cumque
        </h5>

        {loading ? (
          <Row xs={1} sm={3} md={4} className="p-4 justify-content-center">
            <CareerLoader />
            <CareerLoader />
            <CareerLoader />
          </Row>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {careers && careers.length === 0 && (
              <NotAvailable>
                Sorry, there are no positions available at this time....
              </NotAvailable>
            )}
            <Row xs={1} sm={3} md={4} className="p-4 justify-content-center">
              {careers &&
                careers.map((career) => (
                  <LinkContainer to={`/careers/${career._id}`} key={career._id}>
                    <Col className="card p-3 careerCard">
                      <h4>{career.title}</h4>
                      <p>
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {career.location}
                      </p>
                    </Col>
                  </LinkContainer>
                ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Careers;

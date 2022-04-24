import React, { useEffect } from "react";
import styled from "styled-components";
import { Placeholder, Col, Card, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import ImageHeader from "../../contents/ImageHeader";
import test from "../../../assets/imageheaderphotos/test.JPG";
import { listStaffs } from "../../../actions/staffsActions";
import Message from "../../contents/Message";
import Meta from "../../contents/Meta";
import { BASE_URL } from "../../../api";
import defaultImage from "../../../assets/default/default-loading.png";

const Section1 = styled.div`
  margin-bottom: 80px;
  h3 {
    font-weight: 700;
    color: rgb(1, 34, 55);
    position: relative;
    font-size: 50px;
    text-align: center;
    margin: 50px;
  }
`;

const NoStaffs = styled.div`
  font-size: 28px;
  margin: 150px;
  text-align: center;
`;

const Staffs = () => {
  const availableStaffs = useSelector((state) => state.availableStaffs);
  const { loading, staffs, error } = availableStaffs;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listStaffs());
  }, [dispatch]);

  const StaffCardLoader = () => {
    return (
      <Col lg={4} xl={4} md={6}>
        <Card style={{ height: "100%" }}>
          <Card.Img
            style={{ height: "100%" }}
            variant="top"
            src={defaultImage}
            alt="default"
          />

          <Card.Body style={{ padding: "13px" }}>
            <Card.Title>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Card.Title>
            <Card.Text>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <Meta title="HA Family | Staffs" />
      <ImageHeader mtitle="HA Family" title="Staffs" image={test} />
      <Section1 className="container">
        <h3>HA STAFFS</h3>
        {loading ? (
          <Row className="g-4 p-4 m-4">
            <StaffCardLoader />
            <StaffCardLoader />
            <StaffCardLoader />
          </Row>
        ) : error ? (
          <Message varaint="danger">{error}</Message>
        ) : (
          <>
            {staffs && staffs.length === 0 && (
              <NoStaffs>
                There was an error while fetching the data. Try Again Later
              </NoStaffs>
            )}
            <Row className="g-4 p-4 m-4">
              {staffs &&
                staffs.map((staff) => (
                  <Col lg={4} xl={4} md={6} key={staff._id}>
                    <Card style={{ height: "100%" }}>
                      {staff.image ? (
                        <Card.Img
                          style={{ height: "100%" }}
                          variant="top"
                          src={`${BASE_URL}${staff.image}`}
                          alt={staff.fullName}
                        />
                      ) : (
                        <img src={test} alt="sdf" />
                      )}
                      <Card.Body style={{ padding: "13px" }}>
                        <Card.Title className="mb-3">
                          Name: {staff.fullName}
                        </Card.Title>
                        <Card.Text>
                          <p>Postion: {staff.position}</p>
                          <p>Email: {staff.email}</p>
                          <p>Phone No: {staff.phone}</p>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </>
        )}
      </Section1>
    </>
  );
};

export default Staffs;

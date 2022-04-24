import React, { useEffect } from "react";
import styled from "styled-components";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { useDispatch, useSelector } from "react-redux";

import { Card } from "react-bootstrap";
import { listTeams } from "../../actions/teamsActions";
import Message from "../contents/Message";
import { BASE_URL } from "../../api";

const Team = styled.div`
  background-color: #111;
  padding: 100px;
  margin-bottom: -120px;
`;

const Title = styled.div`
  color: #fff;
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
  @media (max-width: 700px) {
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 20px;
  }
`;

const Heartland = styled.div`
  img {
    height: 200px;
  }
`;

const Teams = () => {
  const addedTeams = useSelector((state) => state.addedTeams);
  const { loading, teams, error } = addedTeams;

  const responsive = {
    0: { items: 1 },
    568: { items: 3 },
    1024: { items: 4 },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTeams());
  }, [dispatch]);

  return (
    <>
      <Team>
        <Title>Heatland Executive Team</Title>
      </Team>

      {loading ? (
        <h1>{loading}</h1>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <AliceCarousel
          mouseTracking
          responsive={responsive}
          controlsStrategy="alternate"
          autoPlay
          autoPlayStrategy="none"
          autoPlayInterval={2000}
          animationDuration={2000}
          animationType="fadeout"
          disableButtonsControls
          infinite
        >
          {teams &&
            teams.map((team) => (
              <Heartland key={team._id}>
                <Card style={{ width: "14rem", margin: "20px" }}>
                  <Card.Img variant="top" src={`${BASE_URL}${team.image}`} />
                  <Card.Body>
                    <Card.Title>{team.fullName}</Card.Title>
                    <Card.Text>{team.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Heartland>
            ))}
        </AliceCarousel>
      )}
    </>
  );
};

export default Teams;

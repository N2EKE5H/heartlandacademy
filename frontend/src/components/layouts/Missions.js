import React from "react";

import { Row, Col, Container } from "react-bootstrap";
import ReusableCard from "../contents/ReusableCard";

const missions = [
  {
    id: 1,
    url: "fas fa-graduation-cap",
    name: "PHILOSOPHY",
    desc: "Education and training for social cohesion, human & economic development. Providing opportunities based on non-violent, practical education for all relevant and significant levels of community.",
  },
  {
    id: 2,
    url: "fas fa-binoculars",
    name: "OUR VISION",
    desc: "To be a premier college for the provision of quality education, training and research for sustainable national and global development.",
  },
  {
    id: 3,
    url: "fab fa-telegram-plane",
    name: "OUR MOTTO",
    desc: "Knowledge is Power Creating opportunity through Education",
  },
  {
    id: 4,
    url: "fas fa-crosshairs",
    name: "OUR MISSION",
    desc: "To generate, preserve and share knowledge for effective leadership in higher education, training, research and outreach through nurturing an intellectual culture that integrates theory with practice & innovation.",
  },
];

const Mission = () => {
  return (
    <Container className="missionWhole">
      <Row>
        {missions.map((mission) => (
          <Col key={mission.id} lg={4} sm={12} xl={3} md={6}>
            <ReusableCard
              url={mission.url}
              name={mission.name}
              desc={mission.desc}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Mission;

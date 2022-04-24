import React, { useEffect } from "react";
import styled from "styled-components";
import { Tab, Row, Col, Nav, Placeholder } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { useDispatch, useSelector } from "react-redux";
import Message from "../../contents/Message";

import ImageHeader from "../../contents/ImageHeader";
import test from "../../../assets/imageheaderphotos/test.JPG";
import Back from "../../../assets/others/Background.jpg";
import Meta from "../../contents/Meta";
import { listStudentsTestimonials } from "../../../actions/testimonialsActions";
import { BASE_URL } from "../../../api";

const Section1 = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: justify;
  line-height: 30px;
  p {
    color: #111;
    font-weight: 500;
    font-size: 20px;
    line-height: 35px;
  }
  span {
    color: rgb(0, 148, 68);
  }
`;

const Section2 = styled.div`
  padding: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  line-height: 30px;
  text-align: justify;
  h3 {
    color: #3459e6;
  }
`;

const Section3 = styled.div`
  margin-top: 30px;
  background-position: center;
  background-image: url(${Back});
`;

const MainMessage = styled.div`
  background-color: rgba(24, 43, 73);
  opacity: 0.98;
  display: flex;
  padding: 80px 30px;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  flex: 1;
  line-height: 100px;
  h4 {
    color: #fff;
    font-size: 40px;
    line-height: 60px;
  }
  h5 {
    margin-top: 20px;
    color: #fff;
  }
  button {
    font-size: 23px;
  }
  span {
    color: rgb(0, 148, 68);
  }
`;

const VideoSection = styled.div`
  flex: 1;
`;

const MessageCard = styled.div`
  margin: 30px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f16101;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  color: #fff;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -5px;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    border: 1px solid #f16101;
  }
`;

const Msg = styled.div`
  font-size: 16px;
  line-height: 34px;
  font-weight: 500;
  padding-bottom: 30px;
  margin: 0 0 40px;
  border-bottom: 1px solid #f1f1f1;
  text-align: center;
`;

const Profile = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;
`;

const ImageCard = styled.div`
  img {
    width: 58px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
`;

const Name = styled.div`
  font-size: 18px;
  color: #012237;
  font-weight: 600;
  line-height: 1em;
  margin: 0 0 10px;
`;

const Desc = styled.div`
  margin: 0;
  line-height: 1em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #81868a;
`;

const Section6 = styled.div`
  h3 {
    color: #111;
    line-height: 35px;
    font-weight: 700;
    max-width: 550px;
    font-size: 35px;
    margin: 30px auto 30px;
    text-align: center;
  }
`;

const School = () => {
  const addedStudentsTestimonials = useSelector(
    (state) => state.addedStudentsTestimonials
  );
  const { loading, studentsTestimonials, error } = addedStudentsTestimonials;

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listStudentsTestimonials());
  }, [dispatch]);

  const SchoolTestimonialsLoader = () => {
    return (
      <MessageCard>
        <Top>
          <i className="fas fa-quote-left"></i>
        </Top>

        <Msg>
          <Placeholder as="h2" animation="glow">
            <Placeholder xs={6} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={5} /> <Placeholder xs={7} />
          </Placeholder>
        </Msg>

        <Placeholder as="h4" animation="wave">
          <Placeholder xs={2} />
        </Placeholder>

        <Desc>
          <Placeholder as="p" animation="wave">
            <Placeholder xs={4} size="lg" />
          </Placeholder>
        </Desc>
      </MessageCard>
    );
  };

  return (
    <>
      <Meta title="School" />
      <ImageHeader mtitle="School" title="School" image={test} />
      <Section1 className="container">
        <p>
          <strong>Heartland Academy (HA)</strong> is an internationally
          supported higher secondary school. HA, being the first Nepalese school
          practicing democracy in a true sense, is a center of excellence where
          the students will have a chance to grow academically as well as other
          aspects. Our major focus is definitely an academic excellence however;
          we also help them excel in social arena through our special outreach
          programs. The school is equipped with labs, enough library materials
          and all the necessary equipments.
        </p>
      </Section1>
      <Section2 className="card container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    <i className="fas fa-arrow-right"></i> What we do?
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">
                    <i className="fas fa-arrow-right"></i> Why Us?
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">
                    <i className="fas fa-arrow-right"></i> Strength
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <h3>What we do?</h3>
                  Participate in research, innovation and dissemination of
                  knowledge Provide online tutoring through YourTutor English,
                  Biology, Chemistry, Physics and Maths Mobilize the Heartland
                  fraternity to bring awareness about social and environmental
                  problems Provide a program-level quality enhancement
                  initiative which utilizes a student survey to identify
                  strengths and potential areas of development Develop a model
                  of a broadly based teaching and learning environment
                  influencing the development of generic capacities Promote
                  student centered learning.
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <h3>Why Us?</h3>
                  Democratic education - Non-violent environment - Project based
                  learning - Child centered learning - Tech savvy classrooms -
                  Resourceful library - Trained teaching staff - Peaceful
                  location - Passion for excellence
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <h3>Strength...</h3>
                  The main strength of this democratic and violence-free school
                  is to help produce manpower needed for the challenging world.
                  For that, the CLCR (The Center of Learning and Children’s
                  Rights) Australia has been remained as the backbone of the
                  school. Not only the CLCR has been assisting to train the
                  staff members but also providing financial as well as resource
                  materials for the overall development of the school.
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Section2>
      <Section3>
        <MainMessage>
          <Info>
            <h4>
              <span>MESSAGE</span> FROM THE CEO OF CLCR AUSTRALIA
            </h4>
            <h5>Mr. Patrick Frank Price</h5>
            <h5>(CEO of CLCR Australia / HA Project Director)</h5>
            <button className="btn btn-warning">More Videos</button>
          </Info>
          <VideoSection>Video Section</VideoSection>
        </MainMessage>
      </Section3>
      <Section6>
        <h3>Lets See What Our Valuable Students Think About Us. </h3>

        {loading ? (
          <AliceCarousel
            mouseTracking
            responsive={responsive}
            controlsStrategy="alternate"
            autoPlay
            autoPlayStrategy="none"
            autoPlayInterval={2000}
            animationDuration={2000}
            animationType="fadeout"
            infinite
          >
            <SchoolTestimonialsLoader />
            <SchoolTestimonialsLoader />
            <SchoolTestimonialsLoader />
          </AliceCarousel>
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
            {studentsTestimonials &&
              studentsTestimonials.students.map((student) => (
                <MessageCard>
                  <Top>
                    <i className="fas fa-quote-left"></i>
                  </Top>
                  <Msg>"{student.message}"</Msg>
                  <Profile>
                    <ImageCard>
                      <img src={`${BASE_URL}${student.image}`} alt="student" />
                    </ImageCard>
                    <Name>{student.fullName}</Name>
                    <Desc>{student.desc}</Desc>
                  </Profile>
                </MessageCard>
              ))}
          </AliceCarousel>
        )}
      </Section6>
    </>
    //   <div>
    //   <h2>About</h2>
    //   <h2>Mission/Vision</h2>
    //   <h2>Message from BOD</h2>
    //   <h2>Message fom PP</h2>
    //   <h2>Partnership</h2>
    //   <h2>Facilities</h2>
    // </div>
  );
};

export default School;

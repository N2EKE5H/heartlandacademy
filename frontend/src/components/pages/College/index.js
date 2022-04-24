import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Placeholder } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { useDispatch, useSelector } from "react-redux";
import ProgramModal from "../../contents/ProgramModal";

import Message from "../../contents/Message";
import Meta from "../../contents/Meta";
import { listVisitorsTestimonials } from "../../../actions/testimonialsActions";

import college from "../../../assets/imageheaderphotos/college.jpg";
import ImageHeader from "../../contents/ImageHeader";
import scienceImage from "../../../assets/collegePrograms/sciencelab.jpg";
import managementImage from "../../../assets/collegePrograms/management.jpg";
import educationImage from "../../../assets/collegePrograms/education.jpg";
import "./index.css";
import { BASE_URL } from "../../../api";

const Section1 = styled.div`
  padding: 20px 5px;
  h3 {
    color: #222222;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 5px;
    position: relative;
  }
  p {
    margin-top: 20px;
    font-size: 18px;
    line-height: 28px;
    text-align: justify;
    color: #111;
    font-weight: 400;
  }
`;

const MainMessage = styled.div`
  padding: 27px 30px;
`;

const Title = styled.div`
  color: #444444;
  max-width: 420px;
  margin: auto;
  font-weight: 600;
  position: relative;
  font-size: 30px;
  text-align: center;
  &:before {
    position: absolute;
    content: "";
    background: #05ab90;
    width: 75px;
    height: 1px;
    bottom: -18px;
    left: 50%;
    margin-left: -45px;
  }
  &:after {
    position: absolute;
    content: "";
    background: #05ab90;
    width: 75px;
    height: 1px;
    bottom: -22px;
    left: 50%;
    margin-left: -30px;
  }
`;

const MessageCard = styled.div`
  transition: 0.3s ease;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-top: 3px solid #e5e5e5;
  padding: 16px 25px 25px;
  border-radius: 12px;
  margin: 60px 20px 0px 20px;
  &:hover {
    border-color: #05ab90;
  }
`;

const Msg = styled.div`
  text-align: center;
  font-size: 16px;
  color: #969696;
`;

const Profile = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  img {
    margin-top: 7px;
    max-width: 90px;
    max-height: 70px;
    border-radius: 50%;
    vertical-align: middle;
    @media (max-width: 770px) {
      margin: auto;
    }
  }
  @media (max-width: 770px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

const ProfileDesc = styled.div`
  h6 {
    margin-top: 10px;
    font-weight: 600;
  }
  p {
    font-size: 12px;
  }
`;

const ProgramTitle = styled.h1`
  font-weight: 700;
  color: rgb(1, 34, 55);
  font-size: 50px;
  text-align: center;
  padding: 10px;
`;

const CollegeProgram = styled.div`
  margin-bottom: 50px;
  h2 {
    text-align: center;
    color: #333366;
    font-size: 40px;
  }
  p {
    font-size: 20px;
    text-align: center;
  }
`;

const College = () => {
  const [scienceModalShow, setScienceModalShow] = useState(false);
  const [managementModalShow, setManagementModalShow] = useState(false);
  const [educationModalShow, setEducationModalShow] = useState(false);

  const addedVisitorsTestimonials = useSelector(
    (state) => state.addedVisitorsTestimonials
  );
  const { loading, visitorsTestimonials, error } = addedVisitorsTestimonials;

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listVisitorsTestimonials());
  }, [dispatch]);

  const VisitorTestimonialLoader = () => {
    return (
      <MessageCard>
        <Msg>
          <Placeholder as="h4" animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={4} />
          </Placeholder>
        </Msg>
        <ProfileDesc>
          <h6>
            <Placeholder as="h5" animation="glow">
              <Placeholder xs={3} />
            </Placeholder>
          </h6>
          <p>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
          </p>
        </ProfileDesc>
      </MessageCard>
    );
  };
  return (
    <>
      <Meta title="College" />
      <ImageHeader mtitle="College" title="About" image={college} />
      <Section1 className="container">
        <h3>Welcome To Heartland College</h3>
        <p>
          The Heartland College to be a premier institution for the provision of
          quality education, training and research for sustainable national and
          global development. It targets to generate, preserve and share
          knowledge for effective leadership in higher education, training,
          research and outreach through nurturing an intellectual culture that
          integrates theory with practice and innovation for social cohesion,
          human and economic development. It aims non-violent, practical
          education based on providing opportunities for all levels of community
          that is relevant and significant to Nepal. The students can have
          multiple choices to select the subjective programs of Science,
          Management and Education as per self-interest and ability with the
          following mandates:
          <ul>
            <li>
              Provision of higher education, knowledge and skills to citizens of
              Nepal.
            </li>
            <li>
              Participation in the discovery, transmission, preservation and
              enhancement of knowledge.
            </li>
            <li>
              Stimulation of economic, social, cultural, scientific and
              technological development of Nepal.
            </li>
            <li>
              Provision of university education, conferment of degrees and award
              of diplomas and certificates in order to contribute to manpower
              development.
            </li>
            <li>
              Creating proposals for new faculties, schools, institutes,
              departments, resource and research centers, degree programs and
              courses of study.
            </li>
          </ul>
        </p>
      </Section1>
      <ProgramTitle>I'm looking for....</ProgramTitle>
      <CollegeProgram className="container">
        <Row className="text-center py-3">
          <div className="col-md-4 card-container">
            <div className="card-flip">
              <div className="card front">
                <img
                  src={scienceImage}
                  alt="Science"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <h3>Science</h3>
              </div>
              <div className="card back">
                <div className="card-block p-4">
                  <h3 className="card-title">Science</h3>
                  <p className="card-text">
                    English, Nepali, Social/Mathematics, Physics, Chemistry,
                    Biology, Computer Science, STEM project, Startup Project,
                    Internship Program
                  </p>
                  <button
                    className="btn btn-info"
                    onClick={() => setScienceModalShow(true)}
                  >
                    Readmore
                  </button>
                  <ProgramModal
                    show={scienceModalShow}
                    onHide={() => setScienceModalShow(false)}
                    title="Science"
                    desc="English, Nepali, Social/Mathematics, Physics, Chemistry,
                    Biology, Computer Science, STEM project, Startup Project, 
                    Internship Program"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 card-container">
            <div className="card-flip">
              <div className="card front">
                <img
                  src={managementImage}
                  alt="Management"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <h3>Management</h3>
              </div>
              <div className="card back">
                <div className="card-block p-4">
                  <h3 className="card-title">Management</h3>
                  <p className="card-text">
                    English, Nepali, Social, Accountancy, Economics, Computer
                    Science, Hotel Management, Startup Project, Internship
                    Program
                  </p>
                  <button
                    className="btn btn-info"
                    onClick={() => setManagementModalShow(true)}
                  >
                    Readmore
                  </button>
                  <ProgramModal
                    show={managementModalShow}
                    onHide={() => setManagementModalShow(false)}
                    title="Management"
                    desc="English, Nepali, Social, Accountancy, Economics, Computer
                    Science, Hotel Management, Startup Project, Internship Program"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 card-container">
            <div className="card-flip">
              <div className="card front">
                <img
                  src={educationImage}
                  alt="Education"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <h3>Education</h3>
              </div>
              <div className="card back">
                <div className="card-block p-4">
                  <h3 className="card-title">Education</h3>
                  <p className="card-text">
                    English, Nepali, Social, Child Development and Learning,
                    Major English, Computer Science, Instructional Pedagogy &
                    Evaluation, Teaching practice, Startup Project, Internship
                    Program
                  </p>
                  <button
                    className="btn btn-info"
                    onClick={() => setEducationModalShow(true)}
                  >
                    Readmore
                  </button>
                  <ProgramModal
                    show={educationModalShow}
                    onHide={() => setEducationModalShow(false)}
                    title="Education"
                    desc="English, Nepali, Social, Child Development and Learning,
                    Major English, Computer Science, Instructional Pedagogy & Evaluation,
                    Teaching practice, Startup Project, Internship Program"
                  />
                </div>
              </div>
            </div>
          </div>
        </Row>
      </CollegeProgram>
      <MainMessage>
        <Title>Some Awesome Words From Our Visitors</Title>
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
            <VisitorTestimonialLoader />
            <VisitorTestimonialLoader />
            <VisitorTestimonialLoader />
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
            {visitorsTestimonials &&
              visitorsTestimonials.visitors.map((visitor) => (
                <MessageCard key={visitor._id}>
                  <Msg>"{visitor.message}"</Msg>
                  <Profile>
                    <img src={`${BASE_URL}${visitor.image}`} alt="student" />
                    <ProfileDesc>
                      <h6>{visitor.fullName}</h6>
                      <p>{visitor.desc}</p>
                    </ProfileDesc>
                  </Profile>
                </MessageCard>
              ))}
          </AliceCarousel>
        )}
      </MainMessage>
    </>
  );
};

export default College;

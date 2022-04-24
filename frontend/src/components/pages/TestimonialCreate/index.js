import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import StudentsModal from "../../contents/StudentsModal";
import VisitorsModal from "../../contents/VisitorsModal";
import Message from "../../contents/Message";
import Loader from "../../contents/Loader";

import { deleteTeams, listTeams } from "../../../actions/teamsActions";
import TeamsModal from "../../contents/TeamsModal";
import {
  TEAMS_CREATE_RESET,
  TESTIMONIALS_STUDENTS_CREATE_RESET,
  TESTIMONIALS_VISITORS_CREATE_RESET,
} from "../../../actions/types";
import {
  deleteStudentsTestimonials,
  listStudentsTestimonials,
  listVisitorsTestimonials,
  deleteVisitorsTestimonials,
} from "../../../actions/testimonialsActions";
import { BASE_URL } from "../../../api";

const Section = styled.div`
  padding: 30px 40px;
  min-height: 100vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  h3 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
    margin-top: 10px;
  }
  h4 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const ButtonContent = styled.div`
  margin-top: 10px;
`;

const TeamsContainer = styled.div`
  margin: 20px 0;
  h2 {
    margin-bottom: 30px;
  }
`;

const NoContent = styled.div`
  margin: 20px 0;
  h5 {
    text-align: center;
    font-size: 27px;
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const Heartland = styled.div`
  img {
    height: 200px;
  }
  span {
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 20px;
  }
`;

const MessageCard = styled.div`
  margin: 30px;
  span {
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 20px;
  }
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
  margin-bottom: 20px;
`;

const ImageCard = styled.div`
  img {
    margin-bottom: 20px;
    width: 55px;
    height: 54px;
    border-radius: 50%;
    vertical-align: middle;
  }
`;

const Name = styled.div`
  font-size: 18px;
  color: ${(props) => (props.darkmode ? "#fff" : "#012237")};
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

const VisitorProfile = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  img {
    margin-top: 7px;
    max-width: 55px;
    max-height: 52px;
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
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  p {
    font-size: 12px;
  }
`;

const VisitorMsg = styled.div`
  text-align: center;
  font-size: 16px;
  color: #969696;
`;

const VisitorMessageCard = styled.div`
  transition: 0.3s ease;
  background: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  border: ${(props) =>
    props.darkmode ? "1px solid #202124" : "1px solid #e5e5e5"};
  border-top: 3px solid #e5e5e5;
  padding: 16px 25px 25px;
  border-radius: 12px;
  margin: 30px 20px 0px 20px;
  span {
    display: flex;
    justify-content: center;
    font-size: 20px;
    padding: 10px 0;
    cursor: pointer;
  }
  &:hover {
    border-color: #05ab90;
  }
`;

const TestimonialCreate = ({ history }) => {
  const [modalShow, setModalShow] = useState(false);
  const [studentModalShow, setStudentModalShow] = useState(false);
  const [visitorModalShow, setVisitorModalShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const addedTeams = useSelector((state) => state.addedTeams);
  const { loading: addTeamLoading, teams, error: addErrorLoading } = addedTeams;

  const teamsCreate = useSelector((state) => state.teamsCreate);
  const { success: teamCreateSuccess, error: teamCreateError } = teamsCreate;

  const teamsDelete = useSelector((state) => state.teamsDelete);
  const { success: teamDeleteSuccess, error: teamDeleteError } = teamsDelete;

  const addedStudentsTestimonials = useSelector(
    (state) => state.addedStudentsTestimonials
  );
  const {
    loading: studentLoading,
    error: studentError,
    studentsTestimonials,
  } = addedStudentsTestimonials;

  const studentsTestimonialsCreate = useSelector(
    (state) => state.studentsTestimonialsCreate
  );
  const { success: studentCreateSuccess, error: studentCreateError } =
    studentsTestimonialsCreate;

  const studentsTestimonialsDelete = useSelector(
    (state) => state.studentsTestimonialsDelete
  );
  const { success: studentDeleteSuccess, error: studentDeleteError } =
    studentsTestimonialsDelete;

  const addedVisitorsTestimonials = useSelector(
    (state) => state.addedVisitorsTestimonials
  );
  const {
    loading: visitorLoading,
    error: visitorError,
    visitorsTestimonials,
  } = addedVisitorsTestimonials;

  const visitorsTestimonialsCreate = useSelector(
    (state) => state.visitorsTestimonialsCreate
  );
  const { success: visitorCreateSuccess, error: visitorCreateError } =
    visitorsTestimonialsCreate;

  const visitorsTestimonialsDelete = useSelector(
    (state) => state.visitorsTestimonialsDelete
  );
  const { success: visitorDeleteSuccess, error: visitorDeleteError } =
    visitorsTestimonialsDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(listTeams());
      dispatch(listStudentsTestimonials());
      dispatch(listVisitorsTestimonials());
      if (teamDeleteSuccess) {
        dispatch(listTeams());
      }
      if (studentDeleteSuccess) {
        dispatch(listStudentsTestimonials());
      }
      if (visitorDeleteSuccess) {
        dispatch(listVisitorsTestimonials());
      }
      if (teamCreateSuccess) {
        dispatch(listTeams());
        dispatch({ type: TEAMS_CREATE_RESET });
        setModalShow(false);
      }
      if (studentCreateSuccess) {
        dispatch(listStudentsTestimonials());
        dispatch({ type: TESTIMONIALS_STUDENTS_CREATE_RESET });
        setStudentModalShow(false);
      }
      if (visitorCreateSuccess) {
        dispatch(listVisitorsTestimonials());
        dispatch({ type: TESTIMONIALS_VISITORS_CREATE_RESET });
        setVisitorModalShow(false);
      }
    } else {
      history.push("/admin/login");
    }
  }, [
    dispatch,
    history,
    userInfo,
    teamDeleteSuccess,
    studentDeleteSuccess,
    visitorDeleteSuccess,
    teamCreateSuccess,
    studentCreateSuccess,
    visitorCreateSuccess,
  ]);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const teamResponsive = {
    0: { items: 1 },
    568: { items: 1 },
    924: { items: 2 },
    1024: { items: 3 },
  };

  const teamDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteTeams(id));
      toast.success("Team Deleted Successfully");
    }
  };

  const visitorDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteVisitorsTestimonials(id));
      toast.success("Testimonial Deleted Successfully");
    }
  };

  const studentDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      console.log(id);
      dispatch(deleteStudentsTestimonials(id));
      toast.success("Testimonial Deleted Successfully");
    }
  };

  return (
    <Section className="container">
      <TeamsContainer>
        <Title darkmode={darkMode}>
          <h3>Teams</h3>
          <ButtonContent>
            <Button
              onClick={() => setModalShow(true)}
              className={darkMode ? "btn-dark" : "btn-primary"}
            >
              <i className="fas fa-plus"></i> New
            </Button>
          </ButtonContent>
          <TeamsModal show={modalShow} onHide={() => setModalShow(false)} />
        </Title>

        {teamCreateError && (
          <Message variant="danger">{teamCreateError}</Message>
        )}
        {teamDeleteError && (
          <Message variant="danger">{teamDeleteError}</Message>
        )}
        {addTeamLoading ? (
          <Loader />
        ) : addErrorLoading ? (
          <Message variant="danger">{addErrorLoading}</Message>
        ) : (
          <>
            {teams && teams.length === 0 && (
              <NoContent darkmode={darkMode}>
                <h5>Team Section is Empty......</h5>
              </NoContent>
            )}
            <AliceCarousel
              mouseTracking
              responsive={teamResponsive}
              controlsStrategy="alternate"
              disableButtonsControls
            >
              {teams &&
                teams.map((team) => (
                  <Heartland key={team._id}>
                    <Card style={{ width: "15rem", margin: "20px" }}>
                      <Card.Img
                        variant="top"
                        src={`${BASE_URL}${team.image}`}
                      />
                      <Card.Body
                        style={{
                          backgroundColor: darkMode ? "#202124" : "#fff",
                        }}
                      >
                        <Card.Title>{team.fullName}</Card.Title>
                        <Card.Text>
                          <p>{team.desc}</p>
                          <span onClick={() => teamDeleteHandler(team._id)}>
                            <i class="fas fa-trash"></i>
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Heartland>
                ))}
            </AliceCarousel>
          </>
        )}
      </TeamsContainer>

      <div>
        <Title darkmode={darkMode}>
          <h3>Students</h3>
          <ButtonContent>
            <Button
              onClick={() => setStudentModalShow(true)}
              className={darkMode ? "btn-dark" : "btn-primary"}
            >
              <i className="fas fa-plus"></i> New
            </Button>
          </ButtonContent>
          <StudentsModal
            show={studentModalShow}
            onHide={() => setStudentModalShow(false)}
          />
        </Title>

        {studentCreateError && (
          <Message variant="danger">{studentCreateError}</Message>
        )}
        {studentDeleteError && (
          <Message variant="danger">{studentDeleteError}</Message>
        )}
        {studentLoading ? (
          <Loader />
        ) : studentError ? (
          <Message variant="danger">{studentError}</Message>
        ) : (
          <>
            {studentsTestimonials &&
              studentsTestimonials.students.length === 0 && (
                <NoContent darkmode={darkMode}>
                  <h5>Students Testimonial is Empty......</h5>
                </NoContent>
              )}

            <AliceCarousel
              mouseTracking
              responsive={responsive}
              controlsStrategy="alternate"
              disableButtonsControls
            >
              {studentsTestimonials &&
                studentsTestimonials.students.map((student) => (
                  <MessageCard key={student._id}>
                    <Top>
                      <i className="fas fa-quote-left"></i>
                    </Top>
                    <Msg>{student.message}</Msg>
                    <Profile>
                      <ImageCard>
                        <img
                          src={`${BASE_URL}${student.image}`}
                          alt="student"
                        />
                      </ImageCard>
                      <Name darkmode={darkMode}>{student.fullName}</Name>
                      <Desc>{student.desc}</Desc>
                    </Profile>
                    <span onClick={() => studentDeleteHandler(student._id)}>
                      <i class="fas fa-trash"></i>
                    </span>
                  </MessageCard>
                ))}
            </AliceCarousel>
          </>
        )}
      </div>
      <div>
        <Title darkmode={darkMode}>
          <h3>Visitors</h3>
          <ButtonContent>
            <Button
              onClick={() => setVisitorModalShow(true)}
              className={darkMode ? "btn-dark" : "btn-primary"}
            >
              <i className="fas fa-plus"></i> New
            </Button>
          </ButtonContent>
          <VisitorsModal
            show={visitorModalShow}
            onHide={() => setVisitorModalShow(false)}
          />
        </Title>

        {visitorCreateError && (
          <Message variant="danger">{visitorCreateError}</Message>
        )}
        {visitorDeleteError && (
          <Message variant="danger">{visitorDeleteError}</Message>
        )}
        {visitorLoading ? (
          <Loader />
        ) : visitorError ? (
          <Message variant="danger">{visitorError}</Message>
        ) : (
          <>
            {visitorsTestimonials &&
              visitorsTestimonials.visitors.length === 0 && (
                <NoContent darkmode={darkMode}>
                  <h5>Visitors Testimonial is Empty......</h5>
                </NoContent>
              )}

            <AliceCarousel
              mouseTracking
              responsive={responsive}
              controlsStrategy="alternate"
              disableButtonsControls
            >
              {visitorsTestimonials &&
                visitorsTestimonials.visitors.map((visitor) => (
                  <VisitorMessageCard darkmode={darkMode} key={visitor._id}>
                    <VisitorMsg>{visitor.message}</VisitorMsg>
                    <VisitorProfile>
                      <img src={`${BASE_URL}${visitor.image}`} alt="student" />
                      <ProfileDesc darkmode={darkMode}>
                        <h6>{visitor.fullName}</h6>
                        <p>{visitor.desc}</p>
                      </ProfileDesc>
                    </VisitorProfile>
                    <span onClick={() => visitorDeleteHandler(visitor._id)}>
                      <i class="fas fa-trash"></i>
                    </span>
                  </VisitorMessageCard>
                ))}
            </AliceCarousel>
          </>
        )}
      </div>
    </Section>
  );
};

export default TestimonialCreate;

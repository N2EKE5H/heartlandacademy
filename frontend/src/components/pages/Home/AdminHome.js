import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

import { useSelector, useDispatch } from "react-redux";
import { listNews } from "../../../actions/newsActions";
import { listNotices } from "../../../actions/noticesActions";
import { listStaffs } from "../../../actions/staffsActions";
import { listGalleryAlbums } from "../../../actions/galleryActions";
import {
  deleteRegistration,
  listRegistrations,
} from "../../../actions/registrationActions";
import Loader from "../../contents/Loader";
import Message from "../../contents/Message";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import {
  REGISTRATION_DELETE_RESET,
  REGISTRATION_DETAILS_RESET,
} from "../../../actions/types";

const Section = styled.div`
  margin: 60px 10px;
`;

const DetailsCard = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeCard = styled.div`
  margin: 20px 30px;
  background: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 15px 20px;
  width: 380px;
  border-radius: 20px;
  @media (max-width: 730px) {
    width: auto;
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  h3 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  span {
    color: ${(props) => (props.darkmode ? "#111" : "#111")};
  }
`;

const Info = styled.p`
  font-size: 30px;
  font-weight: 600;
`;

const ClockSection = styled.div`
  background: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 10px 30px;
  border-radius: 20px;
  margin-top: 15px;
`;

const NotificationSection = styled.div`
  background: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 30px;
  margin: 20px 30px;
  border-radius: 20px;
  height: 500px;
  h4 {
    padding-bottom: 10px;
    border-bottom: 2px solid #111;
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  span {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 85px;
    i {
      @media (max-width: 570px) {
        font-size: 80px;
      }
    }
    p {
      font-size: 28px;
      padding-top: 20px;
      font-weight: 500;
      @media (max-width: 570px) {
        font-size: 20px;
      }
    }
  }
`;

const AllNotifications = styled.div`
  padding-top: 5px;
  overflow-y: auto;
  height: 410px;
  &::-webkit-scrollbar-track {
    border-radius: 30px;
  }
  &::-webkit-scrollbar {
    width: 7px;
    background-color: ${(props) => (props.darkmode ? "#202124" : "#f5f5f5")};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const RegistrationBody = styled.div`
  background: ${(props) => (props.darkmode ? "#303134" : "#fff")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  word-break: break-all;
  padding: 10px 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  i {
    font-size: 25px;
    cursor: pointer;
  }
  p {
    margin: 0;
  }
  h5 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
    cursor: pointer;
  }
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const Description = styled.div`
  background: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 30px;
  margin: 50px 30px;
  border-radius: 20px;
  p {
    font-weight: 500;
    font-size: 20px;
    text-align: justify;
  }
  @media (max-width: 570px) {
    display: none;
  }
`;

const AdminHome = () => {
  const [value, setValue] = useState(new Date());

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const availableStaffs = useSelector((state) => state.availableStaffs);
  const { staffs } = availableStaffs;

  const newsList = useSelector((state) => state.newsList);
  const { news } = newsList;

  const availableNotices = useSelector((state) => state.availableNotices);
  const { notices } = availableNotices;

  const galleryAlbums = useSelector((state) => state.galleryAlbums);
  const { albums } = galleryAlbums;

  const submittedRegistrations = useSelector(
    (state) => state.submittedRegistrations
  );

  const registrationsDelete = useSelector((state) => state.registrationsDelete);
  const { success: deleteSuccess, error: deleteError } = registrationsDelete;

  const { loading, registrations, error } = submittedRegistrations;

  const dispatch = useDispatch();

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(listNews());
      dispatch(listStaffs());
      dispatch(listNotices());
      dispatch(listGalleryAlbums());
      dispatch(listRegistrations());
    }
    if (deleteSuccess) {
      dispatch(listRegistrations());
      dispatch({ type: REGISTRATION_DETAILS_RESET });
      dispatch({ type: REGISTRATION_DELETE_RESET });
    }

    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, userInfo, deleteSuccess]);

  function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);

    // Enumerate number abbreviations
    var abbrev = ["k", "m", "b", "t"];

    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3);

      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round((number * decPlaces) / size) / decPlaces;

        // Handle special case where we round up to the next abbreviation
        if (number === 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }

        // Add the letter for the abbreviation
        number += abbrev[i];

        // We are done... stop
        break;
      }
    }

    return number;
  }

  const registrationDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteRegistration(id));
      toast.success("Registration Deleted Successfully");
    }
  };

  return (
    <>
      <Section>
        <DetailsCard>
          <HomeCard darkmode={darkMode}>
            <Head darkmode={darkMode}>
              <h3>Total Staffs</h3>
              <span className="fa-stack fa-2x">
                <i className="fas fa-circle fa-stack-2x"></i>
                <i className="fas fa-users fa-stack-1x fa-inverse"></i>
              </span>
            </Head>
            <Info>{abbrNum(staffs && staffs.length, 2)}</Info>
          </HomeCard>
          <HomeCard darkmode={darkMode}>
            <Head darkmode={darkMode}>
              <h3>Total News</h3>
              <span className="fa-stack fa-2x">
                <i className="fas fa-circle fa-stack-2x"></i>
                <i className="far fa-newspaper fa-stack-1x fa-inverse"></i>
              </span>
            </Head>
            <Info>{abbrNum(news && news.length, 2)}</Info>
          </HomeCard>
          <HomeCard darkmode={darkMode}>
            <Head darkmode={darkMode}>
              <h3>Total Notices</h3>
              <span className="fa-stack fa-2x">
                <i className="fas fa-circle fa-stack-2x"></i>
                <i className="fas fa-flag fa-stack-1x fa-inverse"></i>
              </span>
            </Head>
            <Info>{abbrNum(notices && notices.length, 2)}</Info>
          </HomeCard>
          <HomeCard darkmode={darkMode}>
            <Head darkmode={darkMode}>
              <h3>Total Albums</h3>
              <span className="fa-stack fa-2x">
                <i className="fas fa-circle fa-stack-2x"></i>
                <i className="fas fa-images fa-stack-1x fa-inverse"></i>
              </span>
            </Head>
            <Info>{abbrNum(albums && albums.length, 2)}</Info>
          </HomeCard>
          <ClockSection darkmode={darkMode}>
            <Clock value={value} />
          </ClockSection>
        </DetailsCard>
      </Section>
      <NotificationSection darkmode={darkMode}>
        <h4>
          Notifications <i className="fas fa-bell"></i>
        </h4>
        <AllNotifications darkmode={darkMode}>
          {deleteError && <Message variant="danger">{deleteError}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {registrations.length === 0 && (
                <span>
                  <i className="far fa-bell fa-9x"></i>
                  <p>
                    You're all caught up! <br />
                    Check back for new notifications :(
                  </p>
                </span>
              )}
              {registrations.map((registration) => (
                <RegistrationBody darkmode={darkMode}>
                  <div>
                    <LinkContainer
                      to={`/admin/home/registration/${registration._id}`}
                    >
                      <h5>
                        New Registration from {registration.firstName}{" "}
                        {registration.lastName}
                      </h5>
                    </LinkContainer>
                    <p>
                      {new Date(registration.createdAt).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </p>
                  </div>
                  <div>
                    <i
                      onClick={() =>
                        registrationDeleteHandler(registration._id)
                      }
                      className="fas fa-times"
                    ></i>
                  </div>
                </RegistrationBody>
              ))}
            </>
          )}
        </AllNotifications>
      </NotificationSection>

      <Description darkmode={darkMode}>
        <p>
          Heartland Academy (HA) is an internationally supported higher
          secondary school. HA, being the first Nepalese school practicing
          democracy in a true sense, is a center of excellence where the
          students will have a chance to grow academically as well as other
          aspects. Our major focus is definitely an academic excellence however;
          we also help them excel in social arena through our special outreach
          programs. The school is equipped with labs, enough library materials
          and all the necessary equipments.
        </p>
      </Description>
    </>
  );
};

export default AdminHome;

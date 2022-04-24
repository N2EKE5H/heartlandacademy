import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import ImageHeader from "../../contents/ImageHeader";
import calendar from "../../../assets/others/calendar.jpg";
import { Card, Placeholder } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../contents/Message";
import Meta from "../../contents/Meta";
import { Pagination } from "../../contents/Pagination";
import { listEvents } from "../../../actions/eventsActions";

const Section1 = styled.div`
  h3 {
    font-weight: 700;
    color: rgb(1, 34, 55);
    position: relative;
    font-size: 50px;
    text-align: center;
    margin: 25px;
  }
`;

const EventSection = styled.div`
  p {
    padding: 150px 60px;
    text-align: center;
    color: #111;
  }
`;

const NoEvents = styled.p`
  font-size: 23px;
`;

const AllEvents = styled.div`
  padding: 20px 30px;
  h4 {
    color: red;
  }
`;

const EventCard = styled.div`
  margin-bottom: 30px;
  &:hover {
    -webkit-transform: scale(1.01);
    transform: scale(1.01);
    cursor: pointer;
  }
`;

const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);

  const upcomingEvents = useSelector((state) => state.upcomingEvents);
  const { loading, events, error } = upcomingEvents;

  const indexOfLastEvents = currentPage * eventsPerPage;
  const indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvents, indexOfLastEvents);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);

  const EventCardLoader = () => {
    return (
      <EventCard className="card">
        <Card.Body>
          <h4>
            <Placeholder as="h4" animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </h4>
          <h5>
            <Placeholder as="h5" animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
          </h5>
          <h6>
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </h6>
        </Card.Body>
      </EventCard>
    );
  };

  return (
    <>
      <Meta title="Heartland Events" />
      <ImageHeader mtitle="Events" title="Events" image={calendar} />
      <Section1>
        <h3>Heartland Events</h3>
        <EventSection>
          <AllEvents className="container">
            {loading ? (
              <AllEvents>
                <EventCardLoader />
                <EventCardLoader />
                <EventCardLoader />
              </AllEvents>
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
                {events && events.length === 0 ? (
                  <NoEvents>
                    Sorry we couldn't find any upcoming Events. Please stay
                    updated.
                  </NoEvents>
                ) : (
                  ""
                )}
                {events &&
                  currentEvents.map((event) => (
                    <EventCard className="card">
                      <Card.Body>
                        <h4>
                          <i className="far fa-calendar-alt"></i>{" "}
                          {event.date &&
                            moment(event.date).format("DD-MMM-YYYY")}
                        </h4>
                        <h5>{event.title}</h5>
                        <h6>{event.description}</h6>
                      </Card.Body>
                    </EventCard>
                  ))}
              </>
            )}
            <Pagination
              itemsPerPage={eventsPerPage}
              total={events && events.length}
              paginate={paginate}
            />
          </AllEvents>
        </EventSection>
      </Section1>
    </>
  );
};

export default Events;

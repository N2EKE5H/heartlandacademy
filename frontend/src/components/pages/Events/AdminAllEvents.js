import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../contents/Loader";
import Message from "../../contents/Message";
import { deleteEvents, listEventsAdmin } from "../../../actions/eventsActions";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Pagination } from "../../contents/Pagination";

const NewsContainer = styled.div`
  padding: 10px 50px;
  i {
    cursor: pointer;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  h2 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const EventTitle = styled.h4`
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
`;

const NoEvents = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-top: 200px;
  text-align: center;
`;

const ButtonContent = styled.div`
  margin: 20px 40px;
`;

const AllEvents = styled.div`
  min-height: 100vh;
  i {
    font-size: 20px;
    &:hover {
      color: red;
    }
  }
`;

const OutdatedBox = styled.div`
  padding: 5px 10px;
  margin: 15px 0;
  border-radius: 18px;
`;

const AdminAllEvents = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(10);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const dispatch = useDispatch();

  const upcomingAdminEvents = useSelector((state) => state.upcomingAdminEvents);
  const { loading, events, error } = upcomingAdminEvents;

  const indexOfLastEvents = currentPage * eventsPerPage;
  const indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
  const currentEvents =
    events && events.slice(indexOfFirstEvents, indexOfLastEvents);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const eventsDelete = useSelector((state) => state.eventsDelete);
  const { success: deleteSuccess } = eventsDelete;

  useEffect(() => {
    dispatch(listEventsAdmin());
    if (deleteSuccess) {
      dispatch(listEventsAdmin());
      toast.success("Event Deleted Successfully");
    }
  }, [dispatch, deleteSuccess]);

  const deleteEventsHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteEvents(id));
    }
  };

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <NewsContainer className="container">
      <Title darkmode={darkMode}>
        <h2>Upcoming Events</h2>

        <ButtonContent>
          <LinkContainer to={"/admin/events"}>
            <Button className={darkMode ? "btn-dark" : "btn-primary"}>
              <i className="fas fa-arrow-left "></i>
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      <AllEvents>
        {events && events.length === 0 ? (
          <NoEvents>
            Sorry we couldn't find any upcoming Events. Please stay updated.
            <div>
              <Link to="/admin/events">
                <button
                  className={
                    darkMode ? "btn btn-dark mt-4" : "btn btn-primary mt-4"
                  }
                >
                  Add Some
                </button>
              </Link>
            </div>
          </NoEvents>
        ) : (
          ""
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <ListGroup>
            {events &&
              currentEvents.map((e) => (
                <ListGroup.Item
                  className={
                    darkMode
                      ? "d-flex justify-content-between align-items-start bg-dark text-white"
                      : "d-flex justify-content-between align-items-start bg-light text-dark"
                  }
                  key={e._id}
                >
                  <div
                    className="ms-2 me-auto"
                    style={{ overflow: "hidden", wordWrap: "break-word" }}
                  >
                    <div className="fw-bold">
                      <EventTitle darkmode={darkMode}>{e.title}</EventTitle>
                    </div>
                    <div>
                      <p style={{ margin: 0, textDecoration: "underline" }}>
                        {new Date(e.date).toLocaleDateString("en-US", options)}
                      </p>
                    </div>
                    {e.description && e.description.substring(0, 299)}.......
                    {e.isOutdated && (
                      <OutdatedBox className="bg-warning">
                        Outdated Event. Delete it
                      </OutdatedBox>
                    )}
                  </div>
                  <i
                    style={{ marginLeft: "15px" }}
                    className="fas fa-trash"
                    onClick={() => deleteEventsHandler(e._id)}
                  ></i>
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
        <Pagination
          itemsPerPage={eventsPerPage}
          total={events && events.length}
          paginate={paginate}
        />
      </AllEvents>
    </NewsContainer>
  );
};

export default AdminAllEvents;

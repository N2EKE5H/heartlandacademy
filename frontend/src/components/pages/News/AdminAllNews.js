import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteNews, listNews } from "../../../actions/newsActions";
import Loader from "../../contents/Loader";
import Message from "../../contents/Message";
import { LinkContainer } from "react-router-bootstrap";
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

const NoNews = styled.div`
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

const AllNews = styled.div`
  min-height: 100vh;
  i {
    &:hover {
      color: red;
    }
  }
`;

const AdminAllNews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const dispatch = useDispatch();

  const newsList = useSelector((state) => state.newsList);
  const { loading, news, error } = newsList;

  const newsDelete = useSelector((state) => state.newsDelete);
  const { success: deleteSuccess } = newsDelete;

  useEffect(() => {
    dispatch(listNews());
    if (deleteSuccess) {
      dispatch(listNews());
    }
  }, [dispatch, deleteSuccess]);

  const deleteNewsHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteNews(id));
      toast.success("News Deleted Successfully");
    }
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <NewsContainer className="container">
      <Title darkmode={darkMode}>
        <h2>Added News</h2>
        <ButtonContent>
          <LinkContainer to={"/admin/news"}>
            <Button className={darkMode ? "btn-dark" : "btn-primary"}>
              <i className="fas fa-arrow-left "></i>
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      <AllNews>
        {news && news.length === 0 && (
          <NoNews>
            Sorry we couldn't find any latest news. Please stay updated.
            <div>
              <button
                className={
                  darkMode ? "btn btn-dark mt-4" : "btn btn-primary mt-4"
                }
              >
                Add Some
              </button>
            </div>
          </NoNews>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <ListGroup as="ol" numbered>
            {news &&
              currentNews.map((n) => (
                <ListGroup.Item
                  className={
                    darkMode
                      ? "d-flex justify-content-between align-items-start bg-dark text-white"
                      : "d-flex justify-content-between align-items-start bg-light text-dark"
                  }
                  key={n._id}
                >
                  <div
                    className="ms-2 me-auto"
                    style={{ overflow: "hidden", wordWrap: "break-word" }}
                  >
                    <div className="fw-bold">{n.title}</div>
                    <p>
                      {n.description && n.description.substring(0, 299)}.......
                    </p>
                  </div>
                  <LinkContainer to={`/admin/news/${n._id}/edit`}>
                    <i className="fas fa-pencil-alt" />
                  </LinkContainer>
                  <i
                    style={{ marginLeft: "15px" }}
                    className="fas fa-trash"
                    onClick={() => deleteNewsHandler(n._id)}
                  ></i>
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
        <Pagination
          itemsPerPage={newsPerPage}
          total={news.length}
          paginate={paginate}
        />
      </AllNews>
    </NewsContainer>
  );
};

export default AdminAllNews;

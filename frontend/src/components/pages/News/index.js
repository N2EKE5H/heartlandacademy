import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Placeholder, Row, Col, Card } from "react-bootstrap";

import newspaper from "../../../assets/others/newspaper.jpg";
import BlogPicture from "../../../assets/others/blogpicture.jpg";
import ImageHeader from "../../contents/ImageHeader";
import { listNews } from "../../../actions/newsActions";
import Message from "../../contents/Message";
import Meta from "../../contents/Meta";
import { Pagination } from "../../contents/Pagination";
import defaultImage from "../../../assets/default/default-loading.png";
import "./index.css";
import { BASE_URL } from "../../../api";

const Title = styled.h2`
  font-weight: 700;
  color: rgb(1, 34, 55);
  position: relative;
  font-size: 50px;
  text-align: center;
  margin: 25px;
`;

const Section2 = styled.div`
  margin: 20px 5px;
`;

const SearchBox = styled.div`
  text-align: right;
  input {
    padding: 10px 20px;
  }
`;

const NoNews = styled.p`
  font-size: 23px;
  text-align: center;
  padding: 60px 0px 100px 0px;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    color: #111;
    font-style: italic;
    font-weight: 600;
  }
`;

const News = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(6);

  const dispatch = useDispatch();

  const newsList = useSelector((state) => state.newsList);
  const { loading, news, error } = newsList;

  useEffect(() => {
    dispatch(listNews());
  }, [dispatch]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredNews = news.filter((n) => {
        return Object.values(n)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredNews);
    } else {
      setFilteredResults(news);
    }
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const NewsCardLoader = () => {
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
            <CardInfo>
              <p>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={2} />
                </Placeholder>
              </p>
              <p>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={2} />
                </Placeholder>
              </p>
            </CardInfo>
            <Card.Title>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Card.Title>
            <Card.Text>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={9} />
              </Placeholder>
            </Card.Text>

            <Placeholder.Button variant="primary" xs={5} />
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <Meta title="Heartland News" />
      <ImageHeader mtitle="News" title="News" image={newspaper} />
      <Title>Heartland News</Title>

      <SearchBox className="container">
        <input
          type="text"
          placeholder="Search news . . . . ."
          onChange={(e) => searchItems(e.target.value)}
        />
      </SearchBox>

      {loading ? (
        <Row className="g-4 p-4 m-4">
          <NewsCardLoader />
          <NewsCardLoader />
          <NewsCardLoader />
        </Row>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Section2>
          {news && news.length === 0 && (
            <NoNews>
              Sorry we couldn't find any latest News. Please stay updated.
            </NoNews>
          )}
          <Row className="g-4 p-4 m-4">
            {searchInput.length > 1
              ? filteredResults.map((n) => (
                  <Col lg={4} xl={4} md={6} key={n._id}>
                    <Card style={{ height: "100%" }}>
                      {n.image ? (
                        <Card.Img
                          style={{ height: "100%" }}
                          variant="top"
                          src={`${BASE_URL}${n.image}`}
                          alt="sdf"
                        />
                      ) : (
                        <img src={BlogPicture} alt="111" />
                      )}
                      <Card.Body style={{ padding: "13px" }}>
                        <CardInfo>
                          <p>
                            <i className="fas fa-calendar-alt"></i>{" "}
                            {n.createdAt && n.createdAt.substring(0, 10)}
                          </p>
                          <p>
                            <i className="far fa-user"></i> {n.author}
                          </p>
                        </CardInfo>
                        <Card.Title>{n.title}</Card.Title>
                        <Card.Text>
                          {n.description && n.description.substring(0, 299)}
                          .......
                        </Card.Text>
                        <LinkContainer to={`/news/${n._id}`}>
                          <button className="btn btn-warning">Read More</button>
                        </LinkContainer>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : news &&
                currentNews.map((n) => (
                  <Col lg={4} xl={4} md={6} key={n._id}>
                    <Card style={{ height: "100%" }}>
                      {n.image ? (
                        <Card.Img
                          style={{ height: "100%" }}
                          variant="top"
                          src={`${BASE_URL}${n.image}`}
                          alt="sdf"
                        />
                      ) : (
                        <img src={BlogPicture} alt="sdf" />
                      )}
                      <Card.Body style={{ padding: "13px" }}>
                        <CardInfo>
                          <p>
                            <i className="fas fa-calendar-alt"></i>{" "}
                            {n.createdAt && n.createdAt.substring(0, 10)}
                          </p>
                          <p>
                            <i className="far fa-user"></i> {n.author}
                          </p>
                        </CardInfo>
                        <Card.Title>{n.title}</Card.Title>
                        <Card.Text>
                          {n.description && n.description.substring(0, 299)}
                          .......
                        </Card.Text>
                        <LinkContainer to={`/news/${n._id}`}>
                          <button className="btn btn-warning">Read More</button>
                        </LinkContainer>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
          </Row>
          <div className="mx-5 px-2">
            <Pagination
              itemsPerPage={newsPerPage}
              total={news.length}
              paginate={paginate}
            />
          </div>
        </Section2>
      )}
    </>
  );
};

export default News;

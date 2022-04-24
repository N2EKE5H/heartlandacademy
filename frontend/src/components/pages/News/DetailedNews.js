import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, Row, Col, Placeholder, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { listLatestNews, listNewsDetails } from "../../../actions/newsActions";
import Message from "../../contents/Message";
import Newspaper from "../../../assets/others/newspaper.jpg";
import ImageHeader from "../../contents/ImageHeader";
import defaultImage from "../../../assets/default/default-loading.png";
import Meta from "../../contents/Meta";
import { BASE_URL } from "../../../api";

const Title = styled.h2`
  margin-bottom: 28px;
  font-size: 50px;
  font-weight: 700;
  color: #012237;
  @media (max-width: 510px) {
    font-size: 30px;
    font-weight: 500;
  }
`;

const ImageContainer = styled.div`
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 80%;
    max-height: 80%;
  }
`;

const NewsInfo = styled.div`
  padding-left: 10px;
  h4 {
    font-size: 18px;
    color: blue;
  }
  h5 {
    padding-top: 10px;
    float: right;
    color: red;
  }
`;

const NewsDetails = styled.p`
  color: #111;
  line-height: 30px;
  text-align: justify;
  font-size: 20px;
  overflow: hidden;
  word-wrap: break-word;
  @media (max-width: 510px) {
    font-size: 14px;
    font-weight: 500;
  }
`;

const LatestPostCard = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

const LatestPostImage = styled.div`
  img {
    height: 80px;
    width: 80px;
  }
`;

const LatestPostTitle = styled.div`
  h4 {
    color: #012237;
    font-size: 18px;
    margin-top: 2px;
    cursor: pointer;
  }
`;

const DetailedNews = ({ match }) => {
  const dispatch = useDispatch();

  const newsDetails = useSelector((state) => state.newsDetails);
  const { loading, singleNews: news, error } = newsDetails;

  const latestNews = useSelector((state) => state.latestNews);
  const { loading: latestLoading, newsLatest, error: latestError } = latestNews;

  useEffect(() => {
    dispatch(listNewsDetails(match.params.id));
    dispatch(listLatestNews());
  }, [dispatch, match]);

  const LatestLoader = () => {
    return (
      <LatestPostCard className="pt-3">
        <LatestPostImage>
          <Image src={defaultImage} alt="default" fluid />
        </LatestPostImage>
        <LatestPostTitle style={{ width: "75%" }}>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={6} size="lg" />
          </Placeholder>
        </LatestPostTitle>
      </LatestPostCard>
    );
  };

  return (
    <>
      <ImageHeader mtitle="News" title="News Details" image={Newspaper} />
      <Meta title={`News | ${news.title}`} />
      <Link to="/news">
        <Button className="btn btn-primary mt-4 ml-5">
          <i className="fas fa-caret-left"></i> Back
        </Button>
      </Link>

      {loading ? (
        <Row style={{ padding: 0, margin: 0 }}>
          <Col md={8} className="my-5">
            <Title className="text-center my-4">
              <Placeholder as="h1" animation="glow">
                <Placeholder xs={8} size="lg" />
              </Placeholder>
            </Title>
            <ImageContainer>
              <Image src={defaultImage} alt="default" fluid />
            </ImageContainer>
            <NewsInfo className="m-5">
              <h4>
                <Placeholder as="h4" animation="glow">
                  <Placeholder xs={4} size="lg" />
                </Placeholder>
              </h4>
              <NewsDetails>
                <Placeholder as="h3" animation="glow">
                  <Placeholder xs={12} /> <Placeholder xs={3} />{" "}
                  <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                  <Placeholder xs={6} /> <Placeholder xs={8} />{" "}
                </Placeholder>
              </NewsDetails>
              <Placeholder as="p" animation="glow" style={{ width: "25%" }}>
                <Placeholder xs={8} size="lg" />
              </Placeholder>
            </NewsInfo>
          </Col>
          <Col md={3} className="my-5">
            <h4>
              <Placeholder as="h3" animation="glow">
                <Placeholder xs={5} size="lg" />
              </Placeholder>
            </h4>
            <LatestLoader />
            <LatestLoader />
            <LatestLoader />
          </Col>
        </Row>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row style={{ padding: 0, margin: 0 }}>
          <Col md={8} className="my-4">
            <Title className="text-center my-4">{news.title}</Title>
            <ImageContainer>
              {news.image && (
                <img src={`${BASE_URL}${news.image}`} alt="sdfsdf" />
              )}
            </ImageContainer>
            <NewsInfo className="m-5">
              <h4>16th Auguest</h4>
              <NewsDetails>{news.description}</NewsDetails>
              <h5>{news.author}</h5>
            </NewsInfo>
          </Col>
          <Col md={3} className="my-4">
            <h4>Latest Post</h4>
            {latestLoading ? (
              <>
                <LatestLoader />
                <LatestLoader />
                <LatestLoader />
              </>
            ) : latestError ? (
              <Message variant="danger">{latestError}</Message>
            ) : (
              <>
                {newsLatest &&
                  newsLatest.map((news) => (
                    <LatestPostCard>
                      <LatestPostImage>
                        {news.image ? (
                          <img src={news.image} alt="Latest" />
                        ) : (
                          <img src={Newspaper} alt="Latest" />
                        )}
                      </LatestPostImage>
                      <LinkContainer to={`/news/${news._id}`}>
                        <LatestPostTitle>
                          <h4>{news.title}</h4>
                        </LatestPostTitle>
                      </LinkContainer>
                    </LatestPostCard>
                  ))}
              </>
            )}
            {/* <Section>
              <h4>Section</h4>
              <ListGroup style={{ cursor: "pointer" }}>
                <ListGroup.Item>
                  Preschool
                  <i className="fas fa-chevron-right" />
                </ListGroup.Item>
                <ListGroup.Item>
                  Primary
                  <i className="fas fa-chevron-right" />
                </ListGroup.Item>
                <ListGroup.Item>
                  Lower Secondary
                  <i className="fas fa-chevron-right" />
                </ListGroup.Item>
                <ListGroup.Item>
                  Junior Higher Secondary
                  <i className="fas fa-chevron-right" />
                </ListGroup.Item>
                <ListGroup.Item>
                  Senior Higher Secondary
                  <i className="fas fa-chevron-right" />
                </ListGroup.Item>
              </ListGroup>
              
            </Section> */}
          </Col>
        </Row>
      )}
    </>
  );
};

export default DetailedNews;

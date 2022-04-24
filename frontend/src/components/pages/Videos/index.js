/* eslint-disable no-useless-escape */
import React, { useEffect } from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import Message from "../../contents/Message";
import Meta from "../../contents/Meta";
import ImageHeader from "../../contents/ImageHeader";
import { listGalleryVideos } from "../../../actions/galleryActions";
import CardLoader from "../../contents/CardLoader";
import test from "../../../assets/imageheaderphotos/test.JPG";

const Section = styled.div`
  padding: 40px 50px;
`;

const VideosSection = styled.div`
  h2 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  h3 {
    text-align: center;
    margin-bottom: 15px;
    display: ${(props) => (props.selected ? "block" : "none")};
  }
  span {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  button {
    background: ${(props) => (props.selected ? "red" : "black")};
    border-radius: 23px;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Title = styled.div`
  color: #444444;
  max-width: 420px;
  margin: auto;
  font-weight: 700;
  color: rgb(1, 34, 55);
  position: relative;
  font-size: 50px;
  text-align: center;
  margin-bottom: 50px;
  &:before {
    position: absolute;
    content: "";
    background: #3459e6;
    width: 75px;
    height: 1px;
    bottom: -18px;
    left: 50%;
    margin-left: -45px;
  }
  &:after {
    position: absolute;
    content: "";
    background: #3459e6;
    width: 75px;
    height: 1px;
    bottom: -22px;
    left: 50%;
    margin-left: -30px;
  }
`;

const EmptyVideo = styled.p`
  font-size: 28px;
  margin: 100px 0px;
`;

const Videos = () => {
  const galleryVideos = useSelector((state) => state.galleryVideos);
  const { loading: videoLoading, videos, error: videoError } = galleryVideos;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGalleryVideos());
  }, [dispatch]);

  return (
    <>
      <Meta title="Heartland Gallery | Videos" />
      <ImageHeader mtitle="Gallery" title="Videos" image={test} />

      <Section>
        <VideosSection className="container">
          <Title>Videos</Title>
          <Row className="text-center py-3">
            {videoLoading ? (
              <Cards>
                <CardLoader />
                <CardLoader />
                <CardLoader />
              </Cards>
            ) : videoError ? (
              <Message variant="danger">{videoError}</Message>
            ) : (
              <>
                {videos && videos.length === 0 ? (
                  <EmptyVideo>Sorry we couldn't find any videos.</EmptyVideo>
                ) : (
                  ""
                )}
                {videos.map((video) => (
                  <Col className="video-responsive mb-3" key={video._id}>
                    <iframe
                      width="400"
                      height="230"
                      src={`https://www.youtube.com/embed/${video.src}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                  </Col>
                ))}
              </>
            )}
          </Row>
        </VideosSection>
      </Section>
    </>
  );
};

export default Videos;

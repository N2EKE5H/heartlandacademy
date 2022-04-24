/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  addGalleryVideos,
  deleteGalleryVideos,
  listGalleryVideos,
} from "../../../actions/galleryActions";
import { GALLERY_VIDEOS_ADD_RESET } from "../../../actions/types";
import CardLoader from "../../contents/CardLoader";
import Message from "../../contents/Message";

const Section = styled.div`
  padding: 40px 50px;
`;

const VideosSection = styled.div`
  min-height: 100%;
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

const Title = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 479px) {
    flex-direction: column;
  }
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  @media (max-width: 764px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ButtonContent = styled.div`
  margin: 20px 40px;
`;

const EmptyVideo = styled.p`
  font-size: 28px;
  margin-top: 100px;
`;

const AdminVideos = () => {
  const [error, setError] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [select, setSelected] = useState(false);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const galleryVideos = useSelector((state) => state.galleryVideos);
  const { loading: videoLoading, videos, error: videoError } = galleryVideos;

  const galleryVideosCreate = useSelector((state) => state.galleryVideosCreate);
  const { success } = galleryVideosCreate;

  const galleryVideosDelete = useSelector((state) => state.galleryVideosDelete);
  const { success: deleteSuccess, error: deleteError } = galleryVideosDelete;

  const youtubeUrlChecker = (url) => {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGalleryVideos());
    if (success) {
      dispatch(listGalleryVideos());
      dispatch({ type: GALLERY_VIDEOS_ADD_RESET });
    }
    if (deleteSuccess) {
      dispatch(listGalleryVideos());
    }
  }, [dispatch, success, deleteSuccess]);

  const handleYoutube = (e) => {
    e.preventDefault();
    if (youtubeUrlChecker(videoUrl)) {
      dispatch(addGalleryVideos(getVideoId(videoUrl)));
      toast.success("Video Added Successfully");
      setError(false);
      setVideoUrl("");
    } else {
      setError(true);
    }
  };

  const selectHandler = (e) => {
    setSelected(!select);
    console.log("sdfsd");
  };

  const getVideoId = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const youtubeDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteGalleryVideos(id));
      toast.success("Video Deleted Successfully");
      setSelected(false);
    }
  };

  return (
    <Section>
      <Form onSubmit={handleYoutube} className="form-group">
        {error ? (
          <Alert variant="danger" onClose={() => setError(false)} dismissible>
            <Alert.Heading>Please provide valid Youtube URL</Alert.Heading>
          </Alert>
        ) : (
          ""
        )}

        <Row className="align-items-center">
          <Col xs={10}>
            <Form.Group controlId="formBasicVideoUrl">
              <Form.Label>Enter Youtube Video URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Paste Youtube Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide valid Youtube URL.
              </Form.Control.Feedback>
              <Form.Text className="text-muted hint">
                Please copy and paste Youtube Video URL
              </Form.Text>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button
              type="submit"
              className={darkMode ? "btn-dark mb-4" : "btn-primary mb-4"}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <VideosSection darkmode={darkMode} selected={select}>
        <Title>
          <h2>Uploaded Videos</h2>
          <ButtonContent>
            <Button
              onClick={selectHandler}
              selected={select}
              className={darkMode ? "btn-dark btn-lg" : "btn-primary btn-lg"}
            >
              {select ? "Cancel" : "Select"}
            </Button>
          </ButtonContent>
        </Title>

        <Row className="text-center py-3" style={{ minHeight: "100vh" }}>
          {deleteError ? <Message variant="danger">{deleteError}</Message> : ""}
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
                <EmptyVideo>
                  Please add some videos to change the view.{" "}
                  <i className="fas fa-angry"></i>
                </EmptyVideo>
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
                  <h3>
                    <span
                      className="fa-stack"
                      onClick={() => youtubeDeleteHandler(video._id)}
                    >
                      <i className="fas fa-circle fa-stack-2x"></i>
                      <i className="fas fa-trash fa-stack-1x fa-inverse"></i>
                    </span>
                  </h3>
                </Col>
              ))}
            </>
          )}
        </Row>
      </VideosSection>
    </Section>
  );
};

export default AdminVideos;

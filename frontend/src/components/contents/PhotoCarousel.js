import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import heartland from "../../assets/carousel/heartland.jpg";
import { LinkContainer } from "react-router-bootstrap";
import { listCarousel } from "../../actions/carouselActions";
import Message from "./Message";

import default2 from "../../assets/default/default2.png";

const fadeInTop = keyframes` 
  from {
        opacity: 0;
        transform: translateY(100%);
    }
    to { opacity: 1 }
`;

const fadeInBottom = keyframes`
0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Welcome = styled.div`
  animation-name: ${fadeInTop};
  animation-duration: 3s;
  button {
    width: 145px;
    height: 40px;
    text-align: center;
    padding: 11px;
    border-radius: 5px;
    font-size: 14px;
    color: rgb(255, 255, 255);
    border: none;
  }
`;

const AbtBtn = styled.button`
  background: linear-gradient(
    90deg,
    rgb(17, 182, 122) 0%,
    rgb(0, 148, 68) 100%
  );
  &:hover {
    background: rgb(0, 148, 68);
  }
`;

const ConBtn = styled.button`
  margin-left: 15px;
`;

const CarouselHead = styled.p`
  font-size: 18px;
  color: rgb(221, 221, 221);
  text-transform: uppercase;
  margin-bottom: 8px;
  animation-name: ${fadeInBottom};
  animation-duration: 2s;
`;

const CarouselInfo = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;
  animation-name: ${fadeInTop};
  animation-duration: 3s;
`;

const PhotoCarousel = () => {
  const availableCarousel = useSelector((state) => state.availableCarousel);
  const { loading, carousel, error } = availableCarousel;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCarousel());
  }, [dispatch]);

  const CarouselLoader = () => {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 slideImg"
            src={default2}
            alt="default"
          />
        </Carousel.Item>
      </Carousel>
    );
  };

  return (
    <>
      {loading ? (
        <CarouselLoader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel fade>
          <Carousel.Item interval={33300}>
            <img
              className="d-block w-100 slideImg"
              src={heartland}
              alt="First slide"
            />
            <Carousel.Caption>
              <CarouselHead>Welcome To Heartland Academy</CarouselHead>
              <CarouselInfo>
                Creating Opportunities Through Education
              </CarouselInfo>
              <Welcome>
                <LinkContainer to="/about">
                  <AbtBtn>About Us</AbtBtn>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <ConBtn className="bg-custom">Contact</ConBtn>
                </LinkContainer>
              </Welcome>
            </Carousel.Caption>
          </Carousel.Item>
          {carousel.map((c) => (
            <Carousel.Item interval={3300} key={c._id}>
              <img
                className="d-block w-100"
                src={c.image}
                alt="Carousel Images"
              />
              <Carousel.Caption>
                <CarouselHead>{c.title}</CarouselHead>
                <CarouselInfo>{c.description}</CarouselInfo>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default PhotoCarousel;

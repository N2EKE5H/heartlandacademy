import React from "react";
import styled, { keyframes } from "styled-components";

import clcr from "../../assets/Partners/clcr.png";
import chatswood from "../../assets/Partners/chatswood.jpg";
import gdg from "../../assets/Partners/gdg.png";
import LBW from "../../assets/Partners/LBW.webp";
import pilgrims from "../../assets/Partners/pilgrims.png";
import roomtoread from "../../assets/Partners/roomtoread.png";
import rotary from "../../assets/Partners/rotary.svg";
import ravenswood from "../../assets/Partners/ravenswood.png";
import currambena from "../../assets/Partners/currambena.png";
import mathletics from "../../assets/Partners/mathletics.png";

const Partner = styled.div`
  overflow: hidden;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Message = styled.h2`
  font-size: 30px;
  color: #fff;
  background-color: #111;
  padding: 90px;
  text-align: center;
  margin: 30px 0;
`;

const Title = styled.h2`
  color: #012237;
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
  padding: 20px;
  @media (max-width: 588px) {
    font-size: 40px;
    font-weight: 500;
  }
`;

const slideIn = keyframes`
from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
`;

const fadeIn = keyframes`
 0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Slider = styled.div`
  animation-name: ${slideIn};
  animation-duration: 30s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  white-space: nowrap;
  margin-bottom: 30px;
`;

const Logos = styled.div`
  width: 100%;
  display: inline-block;
  margin: 0px 0;
  img {
    width: calc(100% / 7);
    animation-name: ${fadeIn};
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    animation-fill-mode: forwards;
    color: #111;
    margin-right: 14px;
  }
`;

const Partners = () => {
  return (
    <>
      <Message>"Creating opportunity through Education"</Message>
      <Partner className="container">
        <Title>Heartland Global Partners</Title>
        <Slider>
          <Logos>
            <img src={clcr} alt="clcr" />
            <img src={chatswood} alt="chatswood" />
            <img src={gdg} alt="gdg" />
            <img src={LBW} alt="lbw" />
            <img src={pilgrims} alt="pilgrims" />
            <img src={roomtoread} alt="roomtoread" />
            <img src={ravenswood} alt="ravenswood" />
            <img src={rotary} alt="rotary" />
            <img src={currambena} alt="currambena" />
            <img src={mathletics} alt="mathletics" />

            <img src={clcr} alt="clcr" />
            <img src={chatswood} alt="chatswood" />
            <img src={gdg} alt="gdg" />
            <img src={LBW} alt="lbw" />
            <img src={pilgrims} alt="pilgrims" />
            <img src={roomtoread} alt="roomtoread" />
            <img src={ravenswood} alt="ravenswood" />
            <img src={rotary} alt="rotary" />
            <img src={currambena} alt="currambena" />
            <img src={mathletics} alt="mathletics" />
          </Logos>
          {/* <Logos>
            <img src={clcr} alt="clcr" />
            <img src={chatswood} alt="chatswood" />
            <img src={gdg} alt="gdg" />
            <img src={LBW} alt="lbw" />
            <img src={pilgrims} alt="pilgrims" />
            <img src={roomtoread} alt="roomtoread" />
            <img src={ravenswood} alt="ravenswood" />
            <img src={rotary} alt="rotary" />
            <img src={currambena} alt="currambena" />
            <img src={mathletics} alt="mathletics" />
          </Logos> */}
        </Slider>
      </Partner>
    </>
  );
};

export default Partners;

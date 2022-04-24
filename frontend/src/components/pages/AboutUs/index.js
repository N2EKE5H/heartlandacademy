import React from "react";
import styled from "styled-components";

import ImageHeader from "../../contents/ImageHeader";
import Meta from "../../contents/Meta";
import School4 from "../../../assets/others/School4.jpg";
import Missions from "../../layouts/Missions";

const Section1 = styled.div`
  margin-top: 30px;
  p {
    text-align: justify;
    color: #111;
    font-weight: 500;
    font-size: 20px;
  }
`;

const Section2 = styled.div`
  margin-top: 30px;
`;

const Section3 = styled.div`
  text-align: justify;
  color: #111;
  margin-bottom: 30px;
  h2 {
    font-weight: 700;
    color: rgb(1, 34, 55);
    font-size: 50px;
    text-align: center;
  }
  p {
    text-align: justify;
    color: #111;
    font-weight: 500;
    font-size: 20px;
  }
`;

const AboutUs = () => {
  return (
    <>
      <Meta title="About Us" />
      <ImageHeader mtitle="Heartland" title="About" image={School4} />
      <Section1 className="container">
        <p>
          <strong>Heartland Academy (HA)</strong> is an internationally
          supported democratic school practicing non-violent and child centered
          education. With the motto,
          <strong>"Creating opportunity Through Education"</strong>. Heartland
          Academy has been expanded into Higher Secondary Education up to class
          12 delivering quality education in Science, Management, Education
          Stream. Our educational Project at Heartland is supported by CLCR
          Australia & Nepal, Global Development Group (GDG), Rotary
          International, Rotary Club of Lane Cove, Sydney Australia, Rotary Club
          of Kathmandu West, The LBW Trust, Australia and its global partners
          from UK, New Zealand, Australia, Nepal and other countries. Each day,
          we thrive to cater to each individual learning and developmental needs
          in a violence fee and child friendly environment. Our vision is to
          develop our school as a model school in line with The United Nations
          Sustainable Development Goals. We will keep thriving to enhance
          practical and skill based education through the provision of our
          expansive environment, outstanding facilities, curricula, resources
          and system of International standards.
        </p>
      </Section1>
      <Section2>
        <Missions />
      </Section2>
      <Section3 className="container">
        <h2>Our Core Features</h2>
        <p>
          Heartland Academy is strongly guided by the principle and perspective,
          childhood is short, let children enjoy being children and enjoy their
          learning. It is a proven fact that the best way to learn is by
          following our own curiosity and interests. In HA, we have tried to
          create a free, self-motivated learning environment where natural
          curiosity is not smothered, but nurtured. The result: motivated,
          innovative, lifelong learners as our activities are built around a
          carefully considered curriculum developed on a global scale. Our
          school has an emergent curriculum which aims for both breadth and
          balance and with high aspiration and expectation for all children. A
          key aspect of the HA educational approach and teaching style is a
          commitment to allowing children to develop at their own pace. In the
          context of the carefully considered educational environment, we are
          conﬁdent that children will engage with and develop conﬁdence and
          competence over a wide range of important skills. It is important for
          us to be clear that this means that we will not push a child into
          development of any particular skill if the child is not ready. As part
          of the HA continuous observation and assessment approach, we will
          always be aware of the details of each child development, and be in a
          position to discuss with parents our recommendations.
        </p>
      </Section3>
    </>
  );
};

export default AboutUs;

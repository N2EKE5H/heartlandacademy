import React from "react";
import styled from "styled-components";

import ImageHeader from "../../contents/ImageHeader";
import hand from "../../../assets/alumni/hand.jpg";
import test from "../../../assets/imageheaderphotos/test.JPG";
import Meta from "../../contents/Meta";

const Section1 = styled.div`
  p {
    color: #111;
    text-align: justify;
    font-size: 20px;
    margin-bottom: 80px;
  }
  img {
    margin: 20px 0px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  color: rgb(1, 34, 55);
  font-size: 40px;
  padding: 40px 0px;
`;

const Alumni = () => {
  return (
    <>
      <Meta title="Alumni" />
      <ImageHeader mtitle="Alumni" title="Alumni" image={test} />
      <Section1 className="container">
        <Title>Heartland Alumni Network Division (HAND)</Title>
        <p>
          HAND is legally established youth organization that works for the
          welfare of mental health of children. To begin, our motive is to
          connect all the individual relating to Heartland or sharing similar
          motive so that convenient way can be developed to open up problems of
          mental health that one individual child is suffering. We very much
          believe that children are the future of any nation so the physical or
          mental fitness of child is very important. The main motive of HAND is
          to work on child&#39;s psychology, behaviors &amp; morals. In general,
          we can say child&#39;s mental health to improve and solve
          psychological issues that adults frequently does. Well, HAND had
          conducted numerous projects &amp; activities. Recently, we conducted
          awareness program about corona pandemic through post on Facebook page
          &amp; virtual zoom session where experts gave beneficial suggestions
          on specific topics. Here, we discussed on 3 powerful topics like
          Understanding Depression, Healthy Eating &amp; Healthy Thinking and
          Google Classroom. The overall session went outstanding with huge
          participation.
          <br />
          <img src={hand} alt="hand" />
          <br /> To begin, after we named organization as HAND, we have
          conducted useful activities based on child&#39;s psychology. We had
          kept stall on the occasion of science exhibition to promote HAND and
          as well to inform people about our motive. Similarly, to know the
          behaviors, thoughts, interests and morals of students we managed
          Homework Helping Club for 3 months. Thus, it was fantastic. Next is,
          we also had launched some projects outside the valley. Few members of
          HAND went to Dhading for children career counselling. And in
          Okhaldhunga HAND participated actively to establish library. It was
          highly appreciated by the people of okhaldhunga. Therefore, in coming
          days we will have more programs that would work for the betterment of
          child mental health.
        </p>
      </Section1>
    </>
  );
};

export default Alumni;

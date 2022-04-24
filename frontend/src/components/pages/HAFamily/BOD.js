import React from "react";
import styled from "styled-components";

import ImageHeader from "../../contents/ImageHeader";
import director from "../../../assets/BOD/director.png";
import principal from "../../../assets/BOD/principal.png";
import president from "../../../assets/BOD/president.png";
import executive from "../../../assets/BOD/executive.png";
import test from "../../../assets/imageheaderphotos/test.JPG";
import { Container } from "react-bootstrap";
import Meta from "../../contents/Meta";

const Message0 = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 30px 60px;
  margin-top: 60px;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  h3 {
    color: rgb(0, 148, 68);
  }
  h5 {
    color: #444488;
  }
  p {
    text-align: justify;
    color: #111;
    font-weight: 500;
  }
  img {
    height: 300px;
    float: left;
    margin-right: 20px;
    @media (max-width: 600px) {
      height: 200px;
      margin-bottom: 20px;
    }
  }
`;

const Message1 = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 30px 60px;
  margin-top: 60px;
  background: rgb(0, 148, 68);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  h3 {
    color: #ffffff;
  }
  h5 {
    color: #444488;
  }
  p {
    text-align: justify;
    color: #111;
    font-weight: 500;
  }
  img {
    height: 300px;
    float: right;
    margin-left: 20px;
    @media (max-width: 600px) {
      height: 200px;
      margin-bottom: 20px;
    }
  }
`;

const Message2 = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 30px 60px;
  margin-top: 60px;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  h3 {
    color: rgb(0, 148, 68);
  }
  h5 {
    color: #444488;
  }
  p {
    text-align: justify;
    color: #111;
    font-weight: 500;
  }
  img {
    height: 300px;
    float: left;
    margin-right: 20px;
    @media (max-width: 600px) {
      height: 200px;
      margin-bottom: 20px;
    }
  }
`;

const Message3 = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 30px 60px;
  margin: 60px 0px;
  background: rgb(0, 148, 68);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  h3 {
    color: #ffffff;
  }
  h5 {
    color: #444488;
  }
  p {
    text-align: justify;
    color: #111;
    font-weight: 500;
  }
  img {
    height: 300px;
    float: right;
    margin-left: 20px;
    @media (max-width: 600px) {
      height: 200px;
      margin-bottom: 20px;
    }
  }
`;

const BOD = () => {
  return (
    <>
      <Meta title="HA Family | BOD" />
      <ImageHeader mtitle="HA Family" title="BOD" image={test} />
      <Container>
        <Message0>
          <img src={director} alt="BOD" />
          <h3>Message from Project Director</h3>
          <h5>Mr. Patrick Price</h5>
          <p>(CEO of CLCR Australia / HA Project Director)</p>
          <p>
            “Dear Heartland school community. I want to pay tribute to all
            staff, students and the entire community for managing this most
            difficult period of times impacted by the pandemic sweeping the
            world. Photos of individual student engagement, teaching and
            learning from our dedicated staff and home learning activities
            performed in partnership with our families have been inspirational.
            To add to this, we have seen glimpses of student&#39;s brilliance
            throughout Nursery, to grade 10 and into our college years. I want
            to recognise all of you as you have been able to continue to keep
            learning at the centre of your activities throughout this period. We
            have seen fantastic college enrolments thus far and it is exciting
            to see the year 12 exams just come to a close after much delay. We
            wish these alumni well as they journey onto brilliant careers in
            their chosen fields. Not to forget the brilliant work performed by
            our HAND alumni team, continuing to provide community support and
            individualised programs to support Nepal&#39;s youth. As things
            start to open up, I have been encouraged at the news that our major
            canteen development is now back up and running with building and
            purchases now recommencing and to be able to share our new upgraded
            IT labs with the community in a face-to-face capacity.
          </p>
        </Message0>
        <Message1>
          <img src={principal} alt="BOD" />
          <h3>Message from our Principal</h3>
          <h5>Mr. Karan Singh Goyala</h5>
          <p>HA Principal</p>
          <p>
            Dear Parents, Guardians, and Heartland School Community, As the
            Principal of Heartland Academy High School, I am very fortunate to
            work with many dedicated, innovative and caring staff members,
            parents and students. Each day is filled with new experience,
            learning for all and the ability to make hundreds of the learners
            day better; makes me proudly satisfied. Our School’s curriculum and
            practices are consistently reviewed to ensure that we are following
            the most updated best practices, meeting all regulations and
            addressing the future needs of our students. Our staff consistently
            follows current trends and in collaboration with administration,
            creates a plan of action to incorporate those trends that are most
            appropriate into the classrooms. One of the largest areas of growth
            is the increased use of technology in our classrooms. Each student
            is assigned a conceptual framework to input own effort in real
            learning throughout the allocated time. The students at Heartland
            School are offered many opportunities to explore their interests and
            investigate new ideas. We offer many departmental facilities and
            activities that our students can participate in.  Many of our
            students are involved in a variety of co-curricular and
            extracurricular activities that allow them the opportunity to
            develop their skill and ability in solving future challenges
            proactively. We pride ourselves in a personal approach and focus on
            the development of character and moral values of each learner. And,
            it is our belief that our children of today are our leaders of
            tomorrow that they lead and serve to our community. I consider
            myself very fortunate to be a team member of Heartland School. Each
            day I am amazed by the little things the people of our school
            community do for one another.  It is these daily reminders that make
            our school nationally unique and special.
          </p>
        </Message1>
        <Message2>
          <img src={president} alt="BOD" />
          <h3>President of CLCR Nepal</h3>
          <h5>Mr. Man Bahadur Ale</h5>
          <p>
            Education and training at Heartland &quot;Education is not the
            filling of a pail, but the lighting of a fire&quot;. Education is
            one of the most powerful things in life. It allows us to find the
            meaning behind everything and helps improve lives in a massive way.
            Education provides us an understanding of the world around us and
            offers us an opportunity to use that knowledge wisely. Heartland has
            been providing Education and training packages to SEE graduated
            students in Nepal for a number of years now. One of the main driving
            forces of the school is to produce skilled manpower in the field of
            education and higher education. We have been supporting students
            with a practical approach to becoming a high-quality teacher and
            after completion of studies can easily transition into their
            teaching career. The school provides an education mentor to support
            students in lesson planning, resource development, project work
            designing, portfolio update and behaviour management. Including
            education training at Heartland, we also have developed the concept
            to extend the program throughout the whole country. We have been
            working with different institutions in Kathmandu and out of the
            valley. Education is the basic component of a human life. It is the
            process of importing knowledge, skills, and judgement. Besides
            education, people engage in various kinds of training as well. Both
            of these aspects help to attain employment opportunities in human
            life. Our graduate students are very competent in both teaching
            practice and ICT as both are strong practical elements weaved into
            our programs practices.
          </p>
        </Message2>
        <Message3>
          <img src={executive} alt="BOD" />
          <h3>Karuna Trust & CLCR Nepal Executive</h3>
          <h5>Mr. Ram PD. Upadhaya</h5>
          <p>
            The COVID -19 pandemic has led to a dramatic loss of human life
            worldwide and presents an unprecedented challenge to public health,
            food systems and the world of work. The economic and social
            disruption caused by the pandemic is devastating: tens of millions
            of people are at risk of falling into extreme poverty. Nepal is also
            suffering badly. The situation of hospitals has further worsened due
            to the pandemic. COVID patients have had difficulties to get oxygen
            due to its high demand across the country and chronic health care
            shortages. So, Heartland family is highly conscious to follow safety
            protocols in this pandemic situation. We have targeted virtual
            teaching learning practices to avoid Covid contamination. We also
            have been able to get vaccination for Heartland teachers and staff
            members and that will minimize COVID -19 risk among the school to
            plan and work physically for its community.
          </p>
        </Message3>
      </Container>
    </>
  );
};

export default BOD;

import React from "react";
import styled from "styled-components";

import ImageHeader from "../../contents/ImageHeader";
import School from "../../../assets/others/School4.jpg";
import Meta from "../../contents/Meta";

const Section1 = styled.div``;

const Honorary = () => {
  return (
    <>
      <Meta title="HA Family | Honorary Advisors" />
      <ImageHeader mtitle="HA Family" title="Honorary" image={School} />
      <Section1 className="container">
        <h2>Message</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
          error ut provident vel repellendus nihil atque possimus aliquam,
          mollitia tempora neque voluptate debitis illum veniam.Numquam
          blanditiis dignissimos laboriosam illum ut officia. Nam aperiam autem
          nesciunt perferendis id. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Quas nulla sequi pariatur quam animi ipsum molestias
          assumenda cumque.
        </p>
      </Section1>
    </>
  );
};

export default Honorary;

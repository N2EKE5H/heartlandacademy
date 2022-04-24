import React from "react";
import styled from "styled-components";

import ImageHeader from "../../contents/ImageHeader";
import test from "../../../assets/imageheaderphotos/test.JPG";
import Meta from "../../contents/Meta";

const Section1 = styled.div`
  h4 {
    padding: 100px 0px;
    text-align: justify;
  }
`;

const Scholarship = () => {
  return (
    <>
      <Meta title="Scholarship" />
      <ImageHeader mtitle="Scholarship" title="Scholarship" image={test} />
      <Section1>
        <h4 className="container">
          Heartland is the school not for profit with service orientation and
          providing scholarship opportunities to the underprivileged families
          across the country. The families are informed to apply for scholarship
          and they submit required documents in right format along with their
          local government recommendation letter. The collected documents are
          verified with scholarship committee at Heartland and needy documents
          are sent to CLCR for final approval. The selected students are given
          100% scholarship to study at Heartland up to year 12. Also, those
          students are supported with 2 pairs of school uniform each year along
          with stationery materials and educational tours throughout the year as
          they need.
        </h4>
      </Section1>
    </>
  );
};

export default Scholarship;

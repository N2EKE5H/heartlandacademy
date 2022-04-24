import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Heartland Academy",
  description: "Creating Opportunity Through Education",
  keywords: "school, heartland, academy, bafal, education, college, clcr",
};

export default Meta;

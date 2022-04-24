import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <Alert className="m-3" variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaltProps = {
  variant: "info",
};

export default Message;

import Alert from "emerald-ui/lib/Alert";
import React from "react";
const AlertShowError = ({ message, color="info" }) => {
  return (
    <Alert color={color}>
      <p style={{ padding: "10px 0", margin: 0 }}>{message}</p>
    </Alert>
  );
};

export default AlertShowError;

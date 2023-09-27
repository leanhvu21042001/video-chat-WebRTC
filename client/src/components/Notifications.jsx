import React from "react";

import { Button } from "@mui/material";

import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { answerCall, call, callAccepted } = React.useContext(SocketContext);

  return (
    <React.Fragment>
      {call.isReceivedCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{call.name} is calling: </h1>

          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Notifications;

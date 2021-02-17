import React from "react";

// Saving and deleting appointments is asynchronous.
//  We need to indicate to the user that the operation
//  is in progress --> a status message with CSS animation
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
};
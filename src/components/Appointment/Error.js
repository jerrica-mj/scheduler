import React from "react";

// We need to be able to handle any cases where
//  something fails in our app. We want to show an
//  error message to the user, that can be dismissed.
export default function Error(props) {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">Could not delete appointment</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
      />
    </main>
  );
};
import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";


export default function Appointment(props) {
  // the mode constants -- for useVisualMode hook
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  // destructure our useVisualMode hook and use to render components based on mode value
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {/* Render the appointment component conditionally */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />}
      {/* TODO: Update interviewers to the fetched API array */}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={() => console.log("Clicked save button")}
        onCancel={() => back()}
      />}
    </article>
  );
};
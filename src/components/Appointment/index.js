import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";


export default function Appointment(props) {
  // the mode constants -- for useVisualMode hook
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  // destructure our useVisualMode hook and use to render components based on mode value
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  /**
   * Creates a new interview appointment object from form input.
   * @param {String} name Name of the student interviewee.
   * @param {Object} interviewer Object with the interview details.
   */
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  /**
   * Deletes the interview object with the current props.id value by calling the cancelInterview function, then changes the mode using the back function.
   */
  function deletion() {

    props.cancelInterview(props.id);

    transition(EMPTY);
  }


  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {/* Render the appointment component conditionally */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={deletion}
      />}
      {/* TODO: Update interviewers to the fetched API array */}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
};
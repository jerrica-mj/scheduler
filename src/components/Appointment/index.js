import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


export default function Appointment(props) {
  // mode constants -- for useVisualMode hook
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  /**
   * Deletes the interview object with the current props.id value by calling the cancelInterview function, then changes the mode using the back function.
   */
  function deletion() {

    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }


  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}></Header>
      {/* Render the appointment component conditionally */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
      />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === EDIT && <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onCancel={() => back()}
        onConfirm={deletion}
      />}
      {mode === ERROR_SAVE && <Error
        message="An error occured while saving this interview. Try again."
        onClose={() => back()}
      />}
      {mode === ERROR_DELETE && <Error
        message="An error occured while deleting this interview. Try again."
        onClose={() => back()}
      />}
    </article>
  );
};
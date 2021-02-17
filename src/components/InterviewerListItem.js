import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  // const visibleName = props.selected ? props.name : undefined;

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
      >
      <img
        // key={props.id} // each key already set in parent list
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};
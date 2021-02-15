import React from "react";

import "components/Button.scss";

export default function Button(props) {
  let buttonClass = "button";

  // Add relevant CSS classes to the button
  if (props.confirm) {
    buttonClass += " button--confirm";
  } else if (props.danger) {
    buttonClass += " button--danger";
  }


  return (
    <>
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >{props.children}
      </button>
    </>);
}

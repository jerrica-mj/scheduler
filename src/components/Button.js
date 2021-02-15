import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  // Add relevant CSS classes to the button, using classnames library
  //  to add 'button' to all, and other classes conditionally (on truthy)
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });


  return (
    <>
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >{props.children}
      </button>
    </>
  );
}

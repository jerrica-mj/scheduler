import React from "react";
import classNames from "classnames";

export default function DayListItem(props) {
  const listItemClass = classNames({
    "item--selected": props.selected
  });

  return (
    <li
      className={listItemClass}
      onClick={() => props.setDay(props.name)}
      disabled={props.spots < 1}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
};
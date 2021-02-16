import React from "react";
// import classNames from "classnames";

import DayListItem from "components/DayListItem";

// import "components/DayList.scss";

export default function DayList(props) {
  // iterate over the days array to create a list item for each
  // check if selected day matched current object/day name
  // * Remember to use a key prop to uniquely id list items in React
  const dayListItems = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return (
    <ul>
      {dayListItems}
    </ul>
  );
};
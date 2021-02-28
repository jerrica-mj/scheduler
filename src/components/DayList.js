import React from "react";

import DayListItem from "components/DayListItem";


export default function DayList(props) {
  // iterate over the days array to create a list item for each
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
import React from "react";


// By default, if there are no appointments scheduled, the component
//  will appear empty with a button to add an interview onClick
export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};
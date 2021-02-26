import React from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


// mock Appointment data --> no bookings in 'last' appointment
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Hermione Granger",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg"
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm"
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Harry Potter",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png"
//       }
//     }
//   },
//   {
//     id: "last",
//     time: "5pm",
//   }
// ];


export default function Application(props) {
  // import state from the useApplicationData hook
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // use a helper function to get an array of Appointment objects
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // use a selector to get an array of interviewer object for the day
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // iterate over the appointments array to create elements for each
  // spread the props to create props with matching object keys and prop names --> "name={appointment.name}"
  const allAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            // update day to clicked element/day name
            setDay={setDay}
            data-testid="day-list"
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {allAppointments}
        <Appointment key="last" time="5pm" /* hardcode the end of the day 'appointment' */ />
      </section>
    </main>
  );
}

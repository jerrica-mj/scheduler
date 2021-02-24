import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";


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
  // use a hook to update the combined state for day, days, and
  //  appointments as an object --> 'lifted' up to the
  //  Application component for use with various components
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // define functions to update each combined state property
  const setDay = day => setState({...state, day});
  // // pass a function with prev state to setState to remove the
  // //  useEffect dependency on state (would re-render each change)
  // const setDays = days => setState(prev => ({...prev, days}));
  // const setAppointments = appointments => setState({...state, appointments});

  // use an effect to make a GET request and update 'days'
  useEffect(() => {
    // routes to fetch data from the API
    const GET_DAYS = "http://localhost:8001/api/days";
    const GET_APPOINTMENTS = "http://localhost:8001/api/appointments";
    const GET_INTERVIEWERS = "http://localhost:8001/api/interviewers";

    // fetch API data all at once with Promise.all
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS)
    ]).then((all) => {
      // console.log(all);
      setState(prev => ({...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    });
  }, []);

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


  /**
   * Createa  new appointment object, which will update the state
   * @param {Number} id Number that uniquely identifies the interview.
   * @param {Object} interview Object containing the interview details.
   */
  function bookInterview(id, interview) {
    console.log(id, interview);

    // create an appointment object from the existing appointment with matching id, and updatee with interview object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // update the corresponding record in the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // update the API with the appointment data
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      // update state object appointments record with above
        setState({
          ...state,
          appointments
        });
      })
      // .catch(() => {setState({...state})});
  }


  function cancelInterview(id) {
    console.log(id);

    // create an appointment with 'null' interview
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    // create updated appointments object, with updated appointment
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // delete the interview from the API, then update state
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => setState({...state, appointments}))
    // .catch(() => setState({...state}));
  }


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

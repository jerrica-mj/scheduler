import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "./Appointment";


// mock Appointment data --> no bookings in 'last' appointment
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Hermione Granger",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  },
  {
    id: 4,
    time: "3pm"
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Harry Potter",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },
  {
    id: "last",
    time: "5pm",
  }
];


export default function Application(props) {
  // use a hook to update the combined state for day, days, and
  //  appointments as an object --> 'lifted' up to the
  //  Application component for use with various components
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  // use an effect to make a GET request and update 'days'
  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    axios.get(daysURL).then((res) => {
      console.log(res.data);
      setDays(res.data);
    });
  }, []);

  // iterate over the appointments array to create elements for each
  // spread the props to create props with matching object keys and prop names --> "name={appointment.name}"
  const allAppointments = appointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
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
      </section>
    </main>
  );
}

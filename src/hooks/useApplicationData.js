// A custom hook responsible for loading the initial data from the API, managing state, and causing the Application component to render.

import {useState, useEffect} from "react";
import axios from "axios";


export default function useApplicationData() {
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



  /**
   * Create a new appointment object, which will update the state
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
    .then(() => setState({...state, appointments}));
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
    .then(() => setState({...state, appointments}));
  }



  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  };
};
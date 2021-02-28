// A custom hook responsible for loading the initial data from the API, managing state, and causing the Application component to render.

import {useState, useEffect} from "react";
import axios from "axios";


export default function useApplicationData() {
  // track and set multiple states for use across various components in the Application
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // define functions to update each combined state property
  const setDay = day => setState({...state, day});

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
    .then(() => setState({...state, appointments}))
    // fetch the udpated days (spots) data from the API
    .then(() => axios.get("http://localhost:8001/api/days"))
    // update local state's appointments and spots/days data
    .then(response => setState(prev => ({...prev,
      days: response.data
    })));
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
    // fetch the udpated days (spots) data from the API
    .then(() => axios.get("http://localhost:8001/api/days"))
    // update local state's appointments and spots/days data
    .then(response => setState(prev => ({...prev,
      days: response.data,
      appointments
    })));;
  }



  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  };
};
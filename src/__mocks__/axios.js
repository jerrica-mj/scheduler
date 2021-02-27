// MOCK AXIOS LIBRARY DATA FOR JEST TESTING
// using the same name as the library we are mocking, Jest will replace any axios import with this mock module instead


// a fixture is reusable static data that is imported or embedded into a test file. We need to have accurate data that matches the server data schema.
const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 }
    },
    "4": { id: 4, time: "3pm", interview: null }
  },
  interviewers: {
    "1": {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png"
    },
    "4": {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg"
    }
  }
};


// MOCK FUNCTIONS FOR API PARTS WE ARE USING
export default {

  // GET REQUESTS
  get: jest.fn(url => {
    if (url === "http://localhost:8001/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.days
      });
    }

    if (url === "http://localhost:8001/api/appointments") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.appointments
      });
    }

    if (url === "http://localhost:8001/api/interviewers") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.interviewers
      });
    }
  }),


  // PUT REQUESTS
  put: jest.fn((url, appointment) => {
    if (url) {
      // update fixture data
      const {id, interview} = appointment;
      fixtures.appointments[id] = {...fixtures.appointments[id], interview};
      const [day] = fixtures.days.filter(day => day.appointments.includes(id));
      day.spots--;

      return Promise.resolve({
        status: 204,
        statusText: "No Content"
      });
    }
  })

}
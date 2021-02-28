/**
 * Filters the days data object received from the API to return an array of appointments for the given day.
 * @param {Object} state The data received from the API.
 * @param {String} day The day for which to filter the data.
 */
export function getAppointmentsForDay(state, day) {
  const allDays = state.days;
  const allAppointments = state.appointments;
  // filter the API data array to selected day
  const theDay = allDays.filter(dayObj => dayObj.name === day);

  // return [] if day not found, or missing days
  if (!theDay.length) {
    return [];
  }

  const dayApptIds = theDay[0].appointments;
  const dayAppointments = dayApptIds.map(id => allAppointments[id]);

  return dayAppointments;
};

/**
 * Returns an object containing the interview data if passed an object that contains an interviewer. Returns null if no interviewer contained in received object.
 * @param {Object} state Object of current state with data from the API.
 * @param {Object} interview The particular interview object to transform.
 */
export function getInterview(state, interview) {
  if (!interview || !interview.interviewer) return null;

  const allInterviewers = state.interviewers;
  const interviewer = allInterviewers[interview.interviewer];

  return {...interview, interviewer}
};


export function getInterviewersForDay(state, day) {
  const allDays = state.days;
  const allInterviewers = state.interviewers;

  // filter the days array objects to the day specified
  const daySchedule = allDays.filter(dayObj => dayObj.name === day);

  // returh [] if day not found or no days passed
  if (!daySchedule.length) {
    return [];
  }

  // get this day's array of interviewer objects
  const interviewersIDs = daySchedule[0].interviewers;
  const interviewersForDay = interviewersIDs.map(id => allInterviewers[id]);

  return interviewersForDay;
};
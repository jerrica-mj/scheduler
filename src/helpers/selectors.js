/**
 * Filters the days data object received from the API to return an array of appointments for the given day.
 * @param {*} state The data received from the API.
 * @param {*} day The day for which to filter the data.
 */
export function getAppointmentsForDay(state, day) {
  const allDays = state.days;
  const allAppointments = state.appointments;
  // filter the API response data array to only have
  //  the day specified
  const theDay = allDays.filter(dayObj => dayObj.name === day);

  // return [] if day not found, or missing days
  if (!theDay.length) {
    return [];
  }

  const dayApptIds = theDay[0].appointments;

  // create an array of the appointment objects from
  //  allAppointments that match theDay's appointments
  const dayAppointments = dayApptIds.map(id => allAppointments[id]);

  return dayAppointments;
};

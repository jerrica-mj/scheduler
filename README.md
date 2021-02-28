# Interview Scheduler

## Project Description

The Interview Scheduler is a single page application (SPA) for booking and tracking student interviews. It uses built-in and custom React hooks to allow the user to add, edit, and delete appointments, while maintaining persistent data in the API using a PostgreSQL database. The project follows Test Driven Development practices, with components tested in isolation and end-to-end.

### Day view

The app initializes with a view of the Monday schedule of appointments. The currently selected day is highlighted with a white background. The user can hover over another day, displaying a red background, and click to see another day's schedule.

!["screenshot of the app page displaying the Monday schedule"](https://github.com/jerrica-mj/scheduler/blob/master/docs/images/DayView.png?raw=true)

!["screenshot of the app page displaying the Thursday schedule"](https://github.com/jerrica-mj/scheduler/blob/master/docs/images/DayView2.png?raw=true)

### Booking a new appointment

The user can click the large plus symbol add button to show the form to book a new appointment. In the form, they input a name and select and interviewer. Upon clicking the save button, a saving status wheel will display while the appointment is being saved to the API, then the new appoitnment will be displayed.

!["screenshot of the appointment booking form with input added"](https://github.com/jerrica-mj/scheduler/blob/master/docs/images/BookAppointment2.png?raw=true)

!["screenshot of the saving status component"](https://github.com/jerrica-mj/scheduler/blob/master/docs/images/BookAppointmentSaving.png?raw=true)

!["screenshot of the day schedule view with the new appointment added"](https://github.com/jerrica-mj/scheduler/blob/master/docs/images/BookAppointmentSaved.png?raw=true)

### Deleting an existing appointment

The user can hover over an existing appointment to see the edit and delete buttons. Clicking the delete button will prompt a confirmation window and clicking confirm will display the deleting status wheel while the appointment is deleted from the API, then the day schedule will be displayed without the deleted appoitnment.

!["screenshot of an appointment hovered to display the edit and delete buttons"](https://github.com/jerrica-mj/scheduler/blob/master/docs/images/HoverAppointment.png?raw=true)

!["screenshot of the appointment deletion confirmation window"](https://github.com/jerrica-mj/scheduler/blob/master/docs/images/DeleteAppointmentConfirm.png?raw=true)

!["screenshot of the deleting status component"](https://github.com/jerrica-mj/scheduler/blob/master/docs/images/DeleteAppointmentDeleting.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

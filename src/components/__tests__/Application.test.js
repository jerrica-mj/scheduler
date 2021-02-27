import React from "react";

import { render, cleanup, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);


describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    // render (making an async axios request) and check that day is set to Monday, once the app has rendered (wait for Monday element)
    const {getByText} = render(<Application />);
    // use waitForElement to return a Promise to make our test async
    // waitForElement returns a truthy value if the DOM node is found, or rejects if not found after a time out
    return waitForElement(() => getByText("Monday"))
    // fire the click event on the 'Tuesday' menu button and verify the text 'Leopold Silvers' is in the document
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      })
  });


  it("loads data, books an interview, and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application--getByText() will be used from import
    const {container, debug} = render(<Application />);

    // Wait until "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // search to access the first apppointment in the container
    const appointments = getAllByTestId(container, "appointment"); // array
    const appointment = appointments[0];

    // Click the "Add" button on the first empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter "Lydia Miller-Jones" into the input with placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });

    // Click the first interviewer in the list --> interviewers' images' alt text = interviewer names
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // CLick the "Save" buton
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait until the element with "Lydia Miller-Jones" is displayed
    //  could use waitForElementToBeRemoved with "Saving"
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // Check that the "Monday" DayListItem is displayed and has the text "no spots remaining"
    const days = getAllByTestId(container, "day");
    // queryByText will return 'null' for each iteration where the text is not found, and continue, whereas getByText would throw an error if the text is not found at the first iteration
    const day = days.find(day => queryByText(day, "Monday"));

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const {container} = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, /are you sure you would like to delete?/i)).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining" --> since the appointment added from the last test persisted.
    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday"));
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

});
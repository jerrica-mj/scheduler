import React from "react";

import { render, cleanup, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

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
    const {container} = render(<Application />);

    // Wait until "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container)); // app HTML once loaded

    // search to access the first apppointment in the container
    const appointments = getAllByTestId(container, "appointment"); // array
    const appointment = appointments[0];
    // console.log(prettyDOM(appointment))

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

    console.log(prettyDOM(appointment));

    // Check that the element with "Saving" is displayed

    // Wait until the element with "Lydia Miller-Jones" is displayed

    // Check that the "Monday" DayListItem is displayed and has the text "no spots remaining"

  });

});
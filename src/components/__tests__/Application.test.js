import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

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


});
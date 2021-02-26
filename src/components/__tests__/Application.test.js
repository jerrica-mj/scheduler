import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// it("renders without crashing", () => {
//   render(<Application />);
// });

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  // get days from 'axios', render and check that day is set to Monday
});

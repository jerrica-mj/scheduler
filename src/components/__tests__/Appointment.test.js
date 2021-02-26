// import React to render <Aplication />
import React from "react";

// import our helper functions from the react-testing-library
// 'render' lets us render components
import {render} from "@testing-library/react";

// import the component to be tested
import Application from "components/Application";

// TESTS
// use 'describe()' to group tests with text describing the tested component
// use 'it()' or 'test()' (aliases) to declare each test
describe("Application", () => {

  it("renders without crashing", () => {
    render(<Application />);
  });


});
const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointments", () => {


  it("should book an interview", () => {
    cy.visit("/");
    // make sure data is loaded --> use built-in retry of contains
    cy.contains("Monday");
  });


});
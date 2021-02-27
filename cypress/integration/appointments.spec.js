const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointments", () => {


  it("should book an interview", () => {
    cy.visit("/");
    // Ensure data is loaded --> built-in retry of contains
    cy.contains("Monday");

    // Click the "Add" button in the second appoitnment
    cy.get("[alt=Add]")
      .first() // use first because there is a hidden Add button in the last appointment, and Cypress can only click a single element
      .click();
  });


});
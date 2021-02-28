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

    // Enter the student name in the form input field
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
  });


});
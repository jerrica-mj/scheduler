const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointments", () => {


  it("should book an interview", () => {
    // Reset the server state and go to the root
    cy.request("GET", "/api/debug/reset");
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

    // Choose (click) an interviewer - "Sylvia Palmer"
    cy.get("[alt='Sylvia Palmer']")
      .click();

    // Click the "Save" button
    cy.contains("Save")
      .click();
  });


});
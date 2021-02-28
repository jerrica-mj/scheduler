const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointments", () => {

  beforeEach(() => {
    // Reset the server state and go to the root
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    // Ensure data is loaded --> built-in retry of contains
    cy.contains("Monday");
  });


  it("should book an interview", () => {
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

    // Wait until the "Show" component displays with student and interviewer names. Look for the correct names within an element with class ".appointment__card--show"
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  it("should edit an interview", () => {
    // Use force property of click to click the hidden Edit button
    cy.get("[alt=Edit]")
      .first()
      .click({force:true});

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Harry Potter");

    cy.get("[alt='Tori Malcolm']")
      .click();

    cy.contains("Save")
      .click();

    // Verify changes appear
    cy.contains(".appointment__card--show", "Harry Potter");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });


  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({force:true});

    cy.contains("Confirm")
      .click();

    // Check that the deleting indicator is shown
    cy.contains("Deleting")
      .should("exist");
    // Check that the deleting indicator is removed
    cy.contains("Deleting")
      .should("not.exist");

    // Check that the deleted appointment no longer exists
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});
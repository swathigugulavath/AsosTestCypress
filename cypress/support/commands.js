// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('checkFieldValidity', ($el, errorElement, errorMessage, validationState) => {
  const visibility = validationState ? 'not.be.visible' : 'be.visible';
  cy.wrap($el[0].checkValidity()).should('eq', validationState);
  cy.get(errorElement).should(visibility).then($errorElement => {
    if(visibility === 'be.visible') {
      cy.wrap($errorElement).invoke('text').should('eq', errorMessage);
    }
  })
});

Cypress.Commands.add('checkSubmission', () => {
  cy.get('#submitButton').click();
  cy.url().should('eq', 'https://www.asos.com/discover/students/asos-on-campus/student-validation/');
})
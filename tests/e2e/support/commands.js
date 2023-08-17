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
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add('auth', ({ email='Antonette', phone='010-692-6593 x09125'}) => {
  cy.visit('/')
  cy
    .get(':nth-child(2) > .form__input')
    .clear()
    .type(email)
  cy
    .get(':nth-child(3) > .form__input')
    .clear()
    .type(phone)

  cy.get('form')
    .submit()
})
Cypress.Commands.add('authAndLoad', ({ email='Antonette', phone='010-692-6593 x09125'}) => {
  cy.server()
  cy.route('GET', 'https://jsonplaceholder.typicode.com/todos', 'fixture:todos').as('load-todos')
  cy.route('GET', 'https://jsonplaceholder.typicode.com/users', 'fixture:users').as('load-users')
  cy.auth({ email, phone })
  cy.wait('@load-todos')
  cy.wait('@load-users')
})
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

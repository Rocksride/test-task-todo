// https://docs.cypress.io/api/table-of-contents

describe('route coverage', () => {
  it('should render auth form', () => {
    cy.visit('/')
    cy.contains('h2', 'description')
  })
  it('should not allow accessing /user-todos for unregistered users', () => {
    cy.visit('/user-todos')
    cy.contains('h2', 'description')
  })

})

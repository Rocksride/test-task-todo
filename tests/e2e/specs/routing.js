describe('route coverage', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  })
  it('should render auth form', () => {
    cy.visit('/')
    cy.url().should('include', '/auth')
  })
  it('should not allow accessing /user-todos for unregistered users', () => {
    cy.visit('/user-todos')
    cy.url().should('include', '/auth')
  })
  it('should redirect to "/ if route * and not logined', () => {
    cy.visit('/custom-path')
    cy.url().should('include', '/auth')
  })
  it('should redirect to "/user-todos if route * and logined', () => {
    cy.auth({})
    cy.visit('/custom-path')
    cy.url().should('include', '/user-todos')
  })
})

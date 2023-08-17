describe('Auth flow', () => {
  it('should login with success', () => {
    cy.authAndLoad({})
    cy.url().should('include', '/user-todos')
    cy.then(() => {
      console.log({ ...localStorage })
      expect(sessionStorage.getItem('isLogined')).to.equal('true')
    })
  })
})
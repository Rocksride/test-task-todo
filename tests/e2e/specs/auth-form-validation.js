describe('Form Validation', () => {
  it('should show name required warning', () => {
    cy.visit('/')
    cy.get(':nth-child(2) > .form__input').clear()
    cy.get('.form__title').click()
    cy.get('#username-error-required').should('have.text', 'Please enter username')

    cy.get(':nth-child(2) > .form__input').clear().type('111')
    cy.get('.form__title').click()
    cy.get('#username-error-validation').should('have.text', 'Only letters are allowed')

    cy.get(':nth-child(3) > .form__input').clear()
    cy.get('.form__title').click()
    cy.get('#phone-error-required').should('have.text', 'Please enter phone number')

    cy.get(':nth-child(3) > .form__input').clear().type('aaa')
    cy.get('.form__title').click()
    cy.get('#phone-error-validation').should('have.text', 'Only numbers and special symbols are allowed')

  })
})
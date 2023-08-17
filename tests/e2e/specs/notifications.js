describe('Notifications', () => {
  it('should show success login "welcome" message', () => {
    cy.auth({
      name: 'Antonette',
      phone: '010-692-6593 x09125'
    })
    cy.contains('.notification-item--success > .notification-item__text', 'Antonette, welcome back!')
  })
  it('should show warning login "user does not exist" message', () => {
    cy.auth({
      name: 'aaa',
      phone: '010'
    })
    cy.contains('.notification-item--warning > .notification-item__text', '404: User does not exist. Please check your inputs')
  })
  it('should show error validation message', () => {
    cy.visit('/')
    cy.get(':nth-child(3) > .form__input').clear()
    cy.get('form').submit()
    cy.contains('.notification-item--error > .notification-item__text', 'Please check if all data are correct')
  })
  it('should close notification by close button', () => {
    cy.auth({})
    cy.get('.notification-item__close-button').click()
    cy.timeout(500)
    cy.get('.notification-item--success > .notification-item__text').should('not.exist')
  })
  it('notification should dissapear after default timeout', () => {
    cy.auth({})
    cy.timeout(3500)
    cy.get('.notification-item--success > .notification-item__text').should('not.exist')
  })
})
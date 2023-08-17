describe('Filter/Search functionality', () => {
  beforeEach(() => {
    cy.auth({})
  })
  it('should search correct todos by searching title', () => {
    cy.get('.search-input').type('totam')
    cy.get('.list>li').should('have.length', 4)

    cy.get('.status-select').select('completed')
    cy.get('.list>li').should('have.length', 1)

    cy.get('.status-select').select('all')
    cy.get(':nth-child(1) > .con-like > .like')
    cy.get(':nth-child(2) > .con-like > .like')
    cy.get(':nth-child(3) > .con-like > .like')
    cy.get('.status-select').select('favorite')
    cy.get('.list>li').should('have.length', 3)

    cy.get('.status-select').select('all')
    cy.get('.list>li').should('have.length', 4)

    cy.get('.search-input').clear()
    cy.get('.list>li').should('have.length', 20)

    cy.get('.status-select').select('completed')
    cy.get('.list>li').should('have.length', 8)

    cy.get('.status-select').select('uncomplete')
    cy.get('.list>li').should('have.length', 12)

    cy.get('.search-input').type('su')
    cy.get('.list>li').should('have.length', 2)


  })
})
describe('Toggling favorites todo flow', () => {
  it('should fetch', () => {
    cy.authAndLoad({})
    cy.get(':nth-child(1) > .con-like > .like')
      .click()
    cy.get(':nth-child(2) > .con-like > .like')
      .click()
    cy.then(() => {
      expect(localStorage.getItem('todos')).to.not.equal(null)
      expect(JSON.parse(localStorage.getItem('todos'))).to.deep.equal([
          {
            "userId": 2,
            "id": 21,
            "title": "suscipit repellat esse quibusdam voluptatem incidunt",
            "completed": false,
            "favorite": true
          },
          {
            "userId": 2,
            "id": 22,
            "title": "distinctio vitae autem nihil ut molestias quo",
            "completed": true,
            "favorite": true
          }
      ])
    })
  })
})
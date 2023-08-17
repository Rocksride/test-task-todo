describe("New todo", () => {
  beforeEach(() => {
    cy.authAndLoad({});
    cy.server();
    cy.get(".search-input").type("new todo");
  })
  it("should add new todo and show success message", () => {
    cy.route("POST", "/todos", {
      userId: 2,
      title: "new todo",
      completed: true,
      id: 201
    }).as("post-todo");
    cy.get(".add-todo-button").click();
    cy.wait('@post-todo')
    cy.contains('.notification-item--info > .notification-item__text', 'Todo with id: 201 has been added')
    
  })
  it("should make new todo completed", () => {
    cy.route("POST", "/todos", {
      userId: 2,
      title: "new todo",
      completed: true,
      id: 201
    }).as("post-todo");
    cy.get(".add-todo-button").click();

    cy.get(':nth-child(3) > .title > .material-checkbox > .checkmark').click()
    cy.wait('@post-todo')
    cy.then(() => {
      expect(JSON.parse(localStorage.getItem('todos'))[2]).to.deep.equal({
        userId: 2,
        title: "new todo",
        id: 201,
        "completed": true,
        "favorite": false
      })
    })
  })
  it("should show an error message in case 500 server error", () => {
    cy.route({
      method: "POST",
      url: "/todos",
      status: 500,
      response: {}
    }).as("post-todo-error");
    cy.get(".add-todo-button").click();
    cy.wait('@post-todo-error')
    cy.get('.notification-item--error > .notification-item__text').should('have.text', 'AxiosError: Request failed with status code 500')
  })
  it("should add new todo make it favorite", () => {
    cy.route("POST", "/todos", {
      userId: 2,
      title: "new todo",
      completed: false,
      id: 201
    }).as("post-todo");
    cy.get(".add-todo-button").click();

    cy.get(':nth-child(3) > .con-like > .like').click()
    cy.wait('@post-todo')
    cy.then(() => {
      expect(JSON.parse(localStorage.getItem('todos'))[2]).to.deep.equal({
        userId: 2,
        title: "new todo",
        id: 201,
        "completed": false,
        "favorite": true
      })
    })
  })
  it('if trying to add new todo without choosing user show warning', () => {
    cy.get('.id-select').select('all')
    cy.get(".add-todo-button").click();
    cy.contains('.notification-item--warning > .notification-item__text', 'Please choose appropriate user id')

  })
});

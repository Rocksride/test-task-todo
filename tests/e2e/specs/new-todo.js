describe("New todo", () => {
  beforeEach(() => {
    cy.authAndLoad({});
    cy.server();
    cy.get(".search-input").type("new todo");
  })
  it.only("should make new todo completed", () => {
    cy.route("POST", "https://jsonplaceholder.typicode.com/todos", {
      userId: 2,
      title: "new todo",
      completed: true,
      id: 201
    }).as("post-todo");
    cy.get(".add-todo-button").click();

    cy.get(':nth-child(3) > .title > .material-checkbox > .checkmark').click()
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
  it("should add new todo make it favorite", () => {
    cy.route("POST", "https://jsonplaceholder.typicode.com/todos", {
      userId: 2,
      title: "new todo",
      completed: false,
      id: 201
    }).as("post-todo");
    cy.get(".add-todo-button").click();

    cy.get(':nth-child(3) > .con-like > .like').click()
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
});

import UserService from "@/services/UserService";

describe("UserService", () => {
  it("users array should not be empty", async () => {
    const data = await UserService.getUsers();
    expect(data.data).not.toHaveLength(0)
  });
  it("todos array should not be empty", async () => {
    const data = await UserService.getTodos();
    expect(data.data).not.toHaveLength(0)
  });
  it("should post new todo item", async () => {
    const data = await UserService.addNewTodo({
      "userId": 9,
      "title": "sed ut vero sit molestiae123",
      "completed": true
    });
    expect(+data.data.userId).toEqual(9)
  });
});

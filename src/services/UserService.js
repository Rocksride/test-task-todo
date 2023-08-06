import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async getUsers() {
    const data = await apiClient.get(`/users`);
    return data;
  },
  async getTodos() {
    const data = await apiClient.get("/todos");
    return data;
  },
  async addNewTodo(newTodo) {
    const data = await apiClient.post('/todos', newTodo)
    return data;
  },
  async updateTodo(newTodo) {
    const data = await apiClient.put(`/todos/${newTodo.id}`, newTodo)
    return data;
  }
};

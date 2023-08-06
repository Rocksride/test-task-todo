import UserService from "@/services/UserService.js";
import * as types from "@/store/mutationTypes";
const state = {
  currentUser: null,
  currentUser: getSavedState(localStorage, "currentUser"),
  isLoggedIn: getSavedState(sessionStorage, "isLogined"),
  users: [],
  todos: []
};

const mutations = {
  [types.SET_USERS](state, users) {
    state.users = users;
  },
  [types.SET_IS_LOGINED](state, bool) {
    state.isLoggedIn = bool;
    saveState(sessionStorage, 'isLogined', bool)
  },
  [types.SET_TODOS](state, todos) {
    state.todos = todos
  },
  [types.SET_NEW_TODO_STATUS](state, todo) {
    state.todos = state.todos.map(el => {
      if (+el.id === +todo.id) return todo;
      return el
    })
    saveState(localStorage, 'todos', state.todos)
  },
  [types.SET_NEW_FAVORITE_STATUS](state, todo) {
    const newTodo = {...todo, favorite: !todo.favorite}
    state.todos = state.todos.map(el => {
      if (+el.id === +todo.id) return newTodo;
      return el
    })
    saveState(localStorage, 'todos', state.todos)
  },
  [types.SET_CURRENT_USER](state, user) {
    state.currentUser = user;
    saveState(localStorage, "currentUser", user);
  },
  [types.ADD_NEW_TODO](state, newTodo) {
    const todo = {...newTodo, favorite: false}
    state.todos.push(todo);
    saveState(localStorage, 'todos', state.todos)
  }
};

const getters = {
  // Whether the user is currently logged in.
  isLoggedIn(state) {
    return state.isLoggedIn;
  },
  currentUser(state) {
    return state.currentUser;
  },
  users(state) {
    return state.users
  },
  allTodos(state) {
    return state.todos
  }
};

const actions = {
  async getUsers({ commit }) {
    const users = await UserService.getUsers();
    commit(types.SET_USERS, users.data);
  },
  async getTodos({ commit }) {
    const localTodos = getSavedState(localStorage, 'todos')
    const todos = await UserService.getTodos()
    const payload = todos.data.map(todo => {
      const existingTodo = localTodos ? localTodos.find(({id }) => +id === +todo.id) : null
      return {
        ...todo, favorite: existingTodo ? existingTodo.favorite : false
      }
    })
    commit(types.SET_TODOS, payload);
  },
  // Logs in the current user.
  login({ commit, dispatch, state }, { userName, phoneNumber } = {}) {
    const user = state.users.find((el) => el.phone === phoneNumber && el.username === userName);
    if (user) {
      commit(types.SET_CURRENT_USER, user);
      commit(types.SET_IS_LOGINED, true);
      dispatch(
        "notification/pushNotification",
        { message: `${user.username}, welcome back!`, type: "success" },
        { root: true }
      );
      return true
    } else {
      dispatch(
        "notification/pushNotification",
        {
          message: "404: User does not exist. Please check your inputs",
          type: "warning",
        },
        { root: true }
      );
      return false
    }
  },
  // Logs out the current user.
  logout({ commit, dispatch }) {
    commit(types.SET_IS_LOGINED, false);
    commit(types.SET_CURRENT_USER, null);
    dispatch(
      "notification/pushNotification",
      { message: "You have been succesfully logged out", type: "info" },
      { root: true }
    );
  },
  setCurrentUserById({ commit, state }, newId) {
    if (newId === 'all') {
      commit(types.SET_CURRENT_USER, null)
      return;
    }
    const newUser = state.users.find(el => +el.id === +newId)
    if (newUser) {
      commit(types.SET_CURRENT_USER, newUser)
    }
  },
  async changeTodoStatus({ commit, dispatch }, todo) {
    try {
      const data = await UserService.updateTodo(todo);
      const newTodo = data.data;
      const localTodos = getSavedState(localStorage, 'todos');
      const localTodo = localTodos.find(({ id }) => +id === +newTodo.id)
      commit(types.SET_NEW_TODO_STATUS, {
        ...newTodo,
        favorite: localTodo.favorite
      })
      
      dispatch(
        "notification/pushNotification",
        { message: `Todo with id: ${newTodo.id} has been updated`, type: "info" },
        { root: true }
      );
    } catch(err) {
      dispatch(
        "notification/pushNotification",
        { message: err, type: "error" },
        { root: true }
      );
    }
  },
  toggleFavoriteStatus({ commit }, item) {
    commit(types.SET_NEW_FAVORITE_STATUS, item)
  },
  async addNewTodo({ commit, dispatch }, todo) {
    try {
      const data = await UserService.addNewTodo(todo);
      const newTodo = data.data
      commit(types.ADD_NEW_TODO, newTodo)
      dispatch(
        "notification/pushNotification",
        { message: `Todo with id: ${newTodo.id} has been added`, type: "info" },
        { root: true }
      );
    } catch(err) {
      dispatch(
        "notification/pushNotification",
        { message: err, type: "error" },
        { root: true }
      );
    }
  }
};

export default {
  state, mutations, getters, actions, namespaced: true
}

function getSavedState(storage, key) {
  return JSON.parse(storage.getItem(key));
}

function saveState(storage, key, state) {
  storage.setItem(key, JSON.stringify(state));
}

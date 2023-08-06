<template>
  <div class="container">
    <section class="user-control-buttons">
      <div class="search-input-wrapper">
        <input
          class="search-input"
          type="text"
          v-model="searchStr"
          placeholder="Search todo by title..."
        />
        <button v-if="!!searchStr" @click="addNewTodo" class="add-todo-button" title="add new todo for this user id">+</button>
      </div>
      <label>
        <span>Status: </span>
        <select class="status-select" v-model="todosStatus">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncomplete">Uncompleted</option>
          <option value="favorite">Favorite</option>
        </select>
      </label>
      <label>
        <span>User id: </span>
        <select
          class="id-select"
          v-model="userId"
          @change="changeSelectedUser($event.target.value)"
        >
          <option value="all">All</option>
          <option :value="user.id" v-for="user in users" :key="user.id">
            {{ user.id }}
          </option>
        </select>
      </label>
    </section>
 
    <ul class="list" v-if="visibleTodos.length">
      <TodoItem v-for="item in visibleTodos" :item="item" />
    </ul>
    <p v-else class="no-results">No todos</p>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      searchStr: null,
      todosStatus: "all",
      userId: this.$store.getters["user/currentUser"].id
    };
  },
  computed: {
    users() {
      return this.$store.getters["user/users"];
    },
    todos() {
      return this.$store.getters["user/allTodos"];
    },
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    userTodos() {
      if (this.userId === "all") return this.todos;
      return this.todos.filter(
        (el) => +el.userId === +this.currentUser.id
      );
    },
    visibleTodos() {
      var regex = new RegExp(this.searchStr, "i");
      return this.userTodos
        .filter((el) => {
          if (!!this.searchStr) return regex.test(el.title);
          return true
        })
        .filter((el) => {
          switch (this.todosStatus) {
            case "completed": {
              return el.completed
            }
            case "uncomplete": {
              return !el.completed
            }
            case "favorite": {
              return el.favorite
            }
            default: {
              return true;
            }
          }
        });
    },
    isAddingTodoValid() {
      return !!this.searchStr &&
        this.userId !== 'all'
    }
  },
  methods: {
    addNewTodo() {
      if (this.isAddingTodoValid) {
        const newTodo = {
          userId: this.userId,
          title: this.searchStr
        }
        this.$store.dispatch("user/addNewTodo", newTodo)
        this.searchStr = null;
      } else {
        this.$store.dispatch("notification/pushNotification", { message: `Please choose appropriate user id`, type: "warning" });
      }
    },
    changeSelectedUser(userId) {
      this.$store.dispatch("user/setCurrentUserById", userId);
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss';
.container {
  margin: 0 auto;
  width: 70%;

  @include respond(tab-port) {
    width: 90%;
  }
}
.list {
  padding: 20px;
  color: #d1d5d8;
  background-color: #3c424a;
  overflow-y: auto;
  border-radius: 5px;
  max-height: 60vh;
  border: 1px solid black;

  overflow-y: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
}

.user-control-buttons {
  width: 100%;
  margin-bottom: 20px;
  display: flex;

  @include respond(tab-port) {
    flex-direction: column;
  }
}
.search-input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  overflow: hidden;
  margin-right: 10px;

  @include respond(tab-port) {
    margin-right: 0;
  }
}
.search-input {
  width: 100%;
  padding: 8px;
  font-size: 18px;
  background-color: #343a40;
  border-radius: 5px;
  border: 1px solid black;
  color: white;
  box-shadow: $box-shadow-heavy;
  outline: none;
}

.add-todo-button {
  transition: all 0.1s;
  position: absolute;
  font-size: 20px;
  line-height: 1;
  right: 0;
  background-color: #519945;
  color: white;
  border-left: 1px solid white;
  cursor: pointer;
  border: none;
  outline: none;
  height: 100%;
  width: 38px;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  &[disabled] {
    background-color: #4b5158;;
    cursor: not-allowed;
  }
}
select {
  border-radius: 5px;
  font-size: 14px;
  background-color: #3c424a;
  color: white;
  border: 1px solid black;
  min-width: 50px;

  @include respond(tab-port) {
    flex: 1;
  }
}
.status-select {
  margin-right: 10px;

  @include respond(tab-port) {
    margin-right: 0;
  }
}
label {
  display: flex;
  align-items: stretch;

  @include respond(tab-port) {
    margin-top: 5px;
    height: 38px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;
    margin-right: 5px;

    @include respond(tab-port) {
      width: 50px;
    }
  }
}

.no-results {
  font-size: 22px;
  color: white;
  font-weight: 500;
}
</style>

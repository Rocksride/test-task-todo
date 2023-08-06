<template>
  <div class="wrapper">
    <h1 class="heading" >{{ userName }} todos</h1>
    <TodoList />
    <NotificationBar />
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar";
import TodoList from "@/components/TodoList";

export default {
  components: {
    NotificationBar,
    TodoList
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    userName() {
      if (this.currentUser) {
        return `${this.currentUser.username}'s'`
      }
      return 'All'
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss';

.wrapper {
  display: flex;
  flex-direction: column;
  padding: 50px;
  background-color: #f06292;

  @include respond(tab-port) {
    padding: 10px;
  }
}
.heading {
  color: white;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 20px;
}
</style>
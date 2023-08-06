<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('user/getUsers')
    this.$store.dispatch('user/getTodos')
  }
}
</script>
<style lang="scss">
@import "~normalize.css/normalize.css";
@import "~nprogress/nprogress.css";
@import "@/scss";

#app {
  width: 100%;
  height: 100vh;
}
</style>

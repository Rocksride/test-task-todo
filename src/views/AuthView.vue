<template>
  <div class="wrapper">
    <header class="header">&nbsp;</header>
    <main>
      <AuthForm />
    </main>
    <footer class="footer">&nbsp;</footer>
    <NotificationBar />
  </div>
</template>

<script>
import AuthForm from "@/components/AuthForm";
import NotificationBar from "@/components/NotificationBar";

export default {
  components: {
    AuthForm,
    NotificationBar,
  },
};
</script>

<style lang="scss">
@import '@/scss';

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
$backColor: #474747;
.header {
  width: 100%;
  height: 60px;
  background-color: $backColor;

  @include respond(tab-land) {
    height: 30px;
  }
  @include respond(phone) {
    display: none;
  }
}
.footer {
  width: 100%;
  height: 270px;
  background-color: $backColor;

  @include respond(desktop) {
    height: 100px;
  }
  @include respond(tab-land) {
    height: 100px;
  }
  @include respond(phone) {
    display: none;
  }
}


</style>
<template>
  <div class="notification-bar">
    <keep-alive>
      <transition-group name="list" tag="div">
        <Notification
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
        ></Notification>
      </transition-group>
    </keep-alive>
  </div>
</template>

<script>
import Notification from "@/components/Notification";
import { mapState } from "vuex";
export default {
  components: {
    Notification
  },
  computed: mapState({
    notifications: (state) => state.notification.notifications,
  }),
};
</script>

<style lang="scss" scoped>
@import "@/scss";

.notification-bar {
  margin: 1rem;
  width: 80%;
  position: fixed;
  z-index: $layer-tooltip-z-index;
  // overflow-y: auto;
  max-height: 90%;
  top: 0;
  left: 0;
}
</style>

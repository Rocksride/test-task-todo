<template>
  <li class="list-item">
    <label class="title">
      <Checkbox :value="item.completed" @toggle="toggleStatus(item)">
        <p>{{ item.title }}</p>
      </Checkbox>
    </label>
    <HeartCheckbox :value="item.favorite" @toggle="toggleFavorite(item)" />
  </li>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue";
import HeartCheckbox from "@/components/HeartCheckbox.vue";
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  components: {
    Checkbox,
    HeartCheckbox,
  },
  methods: {
    toggleFavorite(item) {
      this.$store.dispatch("user/toggleFavoriteStatus", item);
    },
    toggleStatus(item) {
      this.$store.dispatch("user/changeTodoStatus", {...item, completed: !item.completed});
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  user-select: none;
  margin-bottom: 16px;
  // padding: 1px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
}
.title {
  margin-right: 10px;
}
.checkbox-status {
  background-color: #595d63;
  color: white;
  margin-right: 10px;
}
</style>

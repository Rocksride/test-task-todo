<template>
  <label class="material-checkbox">
    <input type="checkbox" :checked="value" @change="$emit('toggle')"/>
    <span class="checkmark"></span>
    <slot>Title</slot>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss';
.material-checkbox {
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;

  @include respond(tab-port) {
    font-size: 14px;
  }
}

.material-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  border: 1px solid #000;
  border-radius: 4px;
  transition: all 0.3s;
}

.material-checkbox input[type="checkbox"]:checked ~ .checkmark {
  // background-color: #2f3300;
  border-color: #000;
}

.material-checkbox input[type="checkbox"]:checked ~ .checkmark:after {
  content: "";
  position: absolute;
  top: 4px;
  left: 7px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.material-checkbox:hover input[type="checkbox"] ~ .checkmark {
  border-color: #000;
}

</style>

<template>
  <div class="con-like">
  <input title="like" type="checkbox" class="like" :checked="value" @change="$emit('toggle')">
  <div class="checkmark">
    <svg viewBox="0 0 24 24" class="outline" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
    </svg>
    <svg viewBox="0 0 24 24" class="filled" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
    </svg>
    <svg class="celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="10,10 20,20" class="poly"></polygon>
      <polygon points="10,50 20,50" class="poly"></polygon>
      <polygon points="20,80 30,70" class="poly"></polygon>
      <polygon points="90,10 80,20" class="poly"></polygon>
      <polygon points="90,50 80,50" class="poly"></polygon>
      <polygon points="80,80 70,70" class="poly"></polygon>
    </svg>
  </div>
</div>
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

<style lang="scss" scoped>
*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}
html,
body {
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color: #e8e8e8;
}
.con-like {
  --red: rgb(192, 90, 111);
  position: relative;
  width: 20px;
  height: 20px;
}

.con-like .like {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 20;
  cursor: pointer;
}

.con-like .checkmark {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.con-like .outline,
.con-like .filled {
  fill: var(--red);
  position: absolute;
}

.con-like .filled {
  animation: kfr-filled 0.5s;
  display: none;
}

.con-like .celebrate {
  position: absolute;
  animation: kfr-celebrate 0.5s;
  animation-fill-mode: forwards;
  display: none;
}

.con-like .poly {
  stroke: var(--red);
  fill: var(--red);
}

.con-like .like:checked ~ .checkmark .filled {
  display: block
}

.con-like .like:checked ~ .checkmark .celebrate {
  display: block
}

@keyframes kfr-filled {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes kfr-celebrate {
  0% {
    transform: scale(0);
  }

  50% {
    opacity: 0.8;
  }

  100% {
    transform: scale(1.2);
    opacity: 0;
    display: none;
  }
}
</style>
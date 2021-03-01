<template>
  <div>
    <p>svg</p>
    <SnakeSvg style="fill: red" width="200" height="200" />
    <MsgSvg />
    <!-- <Sub /> -->
    <!-- <svg style="fill: red"><use :href="`#${SnakeSvg}`"></use></svg> -->
  </div>
</template>

<script lang="ts">
import SnakeSvg from "./assets/snake.svg";
import MsgSvg from "./assets/msg.svg";

import Sub from "./Sub.vue";

export default {
  name: "App",
  components: {
    SnakeSvg,
    MsgSvg,
    Sub,
  },
  data() {
    return {
      // SnakeSvg,
    };
  },
};
</script>

<style>
.svg-container-1 {
  fill: red;
  color: red;
}
</style>

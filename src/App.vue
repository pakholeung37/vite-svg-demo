<template>
  <div>
    <p>svg</p>
    <SnakeSvg
      style="display: inline-block; width: 30px; height: 30px; fill: red"
    />
    <Sub />
    <!-- <svg style="fill: red"><use :href="`#${SnakeSvg}`"></use></svg> -->
  </div>
</template>

<script lang="ts">
import SnakeSvg from "./assets/snake.svg";
import Sub from "./Sub.vue";

console.log(SnakeSvg);
export default {
  name: "App",
  components: {
    SnakeSvg,
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

<template>
  <div>
    <allBasicShape />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import allBasicShape from "@/components/allBasicShape.vue"; // @ is an alias to /src

export default defineComponent({
  name: "allBasicShapeView",
  components: {
    allBasicShape,
  },
});
</script>

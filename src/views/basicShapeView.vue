<template>
  <div>
    <basicShape />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import basicShape from "@/components/basicShape.vue"; // @ is an alias to /src

export default defineComponent({
  name: "basicShapeView",
  components: {
    basicShape,
  },
});
</script>

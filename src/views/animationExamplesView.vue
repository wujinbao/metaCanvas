<template>
  <div>
    <animationExamples />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import animationExamples from "@/components/animationExamples.vue"; // @ is an alias to /src

export default defineComponent({
  name: "animationExamplesView",
  components: {
    animationExamples,
  },
});
</script>

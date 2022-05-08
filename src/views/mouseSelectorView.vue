<template>
  <div>
    <mouseSelector />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mouseSelector from "@/components/mouseSelector.vue"; // @ is an alias to /src

export default defineComponent({
  name: "mouseSelectorView",
  components: {
    mouseSelector,
  },
});
</script>

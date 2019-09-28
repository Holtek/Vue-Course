<template>
  <div>
    <p>Counter is: {{ counter }}</p>
    <p>Number of clicks: {{ clicks }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // We don't need this computed cuz we imported mapGetters
  // computed: { ...mapGetters(["doubleCounter", "stringCounter"]) }

  computed: {
    counter() {
      return this.$store.getters.doubleCounter;
    },
    clicks() {
      return this.$store.getters.stringCounter;
    }
  }
};
</script>
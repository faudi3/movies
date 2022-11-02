<template>
  <div class="filters">
    <NuxtLink
      v-for="option in optionsList"
      :key="option"
      :to="`${option === 'best' ? '/' : option}`"
      ><div
        class="button"
        :class="getClasses(option)"
        @click="changeRoute(option)"
      >
        {{ option }}
      </div></NuxtLink
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Filters",
  data() {
    return {
      isActive: null,
    };
  },
  computed: {
    ...mapState(["optionsList", "selected"]),
  },
  methods: {
    ...mapMutations(["changeSelected"]),
    changeRoute(option) {
      this.changeSelected(option);
    },
    getClasses(option) {
      let a;
      if (option === "best" && this.$route.name === "index") {
        if (this.$store.state.mode === "light") {
          a = "light selected";
        } else {
          a = "selected";
        }
      } else if (this.$route.name === option) {
        if (this.$store.state.mode === "light") {
          a = "light selected";
        } else {
          a = "selected";
        }
      } else {
        if (this.$store.state.mode === "light") {
          a = "light";
        } else {
          a = "";
        }
      }

      return a;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.button {
  border: 3px solid transparent;
  width: 120px;
  text-align: center;
  font-size: 24px;
}
.filters {
  display: flex;
  color: white;
  text-decoration: none;
  justify-content: flex-end;
  gap: 15px;
  padding-top: 60px;
  padding-right: 30px;
}
.selected {
  border: 3px solid #b0aeae;
}

.link {
  text-decoration: none;
  color: inherit;
}
</style>

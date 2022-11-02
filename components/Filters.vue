<template>
  <div class="filters">
    <NuxtLink
      v-for="option in optionsList"
      :key="option"
      :to="`${option === 'best' ? '/' : option}`"
      :class="getClasses(option)"
      ><div class="option" @click="changeRoute(option)">
        <p>{{ option }}</p>
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
        a = "selected option";
      } else if (this.$route.name === option) {
        a = "selected option";
      } else {
        a = "option";
      }

      return a;
    },
  },
  mounted() {},
};
</script>

<style scoped>
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
.option {
  margin: 0;
  font-size: 28px;
  background-color: #343434;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  color: white;
}
.option.light {
  background-color: rgb(11, 0, 20);
}
.option p {
  opacity: 0.7;
  transition: all 0.5s ease;
}
.option p:hover {
  opacity: 1;
  transform: scale(1.1);
}
.link {
  text-decoration: none;
  color: inherit;
}
</style>

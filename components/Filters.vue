<template>
  <div class="filters">
    <NuxtLink
      v-for="option in optionsList"
      :key="option"
      :to="`${option === 'new' ? '/' : option}`"
      ><div
        class="option"
        :class="getClasses(option)"
        @click="changeRoute(option)"
      >
        <p>{{ option }}</p>
        <p>{{ $route.name }}</p>
      </div></NuxtLink
    >
    <!--
    :class="`${$route.name === '/' ? 'selected link' : 'link'}`"
-->

    <!--    <NuxtLink to="/genres" class="link"
      ><div class="option"><p>Жанры</p></div></NuxtLink
    >
    <NuxtLink to="/countries" class="link"
      ><div class="option"><p>Страны</p></div></NuxtLink
    >
    <NuxtLink to="/years" class="link"
      ><div class="option"><p>Годы</p></div></NuxtLink
    >-->
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
      console.log(option, this.$route.name);
      if (option === "new" && this.$route.name === "index") {
        a = "selected link";
      } else if (this.$route.name === option) {
        a = "selected link";
      } else {
        a = "link";
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
}
.selected {
  border: 1px solid red;
}
.option {
  margin: 0 20px;
  font-size: 26px;
  background-color: #343434;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.option p {
  opacity: 0.7;
  transition: all 0.5s ease;
}
.option p:hover {
  opacity: 1;
}
.link {
  text-decoration: none;
  color: inherit;
}
</style>

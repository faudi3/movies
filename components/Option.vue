<template>
  <div class="options-wrap">
    <NuxtLink class="button" :to="{ name: 'index' }"> Back </NuxtLink>
    <Filters class="filters" />
    <h1>{{ props }}</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      genres: [],
      countries: [],
      years: [],
    };
  },
  name: "Option",
  props: ["props"],
  methods: {
    async getGenres() {
      const data = axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=7f4ad19f252b1ae55f0f975a95aba17e&language=en-US"
      );
      const result = await data;
      result.data.genres.forEach((genre) => {
        this.genres.push(genre);
      });
    },
  },
  mounted() {
    this.getGenres();
  },
};
</script>

<style scoped>
.options-wrap {
  padding-top: 50px;
}
h1 {
  color: white;
}
</style>

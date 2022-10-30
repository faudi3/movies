<template>
  <!-- Loading -->
  <Loading v-if="$fetchState.pending" />

  <!-- Movie Info -->
  <div v-else class="single-movie container">
    <div class="movie-info">
      <div class="movie-img">
        <img :src="`${movie.posterUrl}`" alt="movie pic" />
      </div>
      <div class="movie-content">
        <h1>Title: {{ movie.nameRu }}</h1>
        <p v-show="movie.slogan" class="movie-fact tagline">
          <span>Tagline:</span> "{{ movie.slogan }}"
        </p>
        <p class="movie-fact">
          <span>Released:</span>
          {{ movie.year }}
        </p>
        <p class="movie-fact">
          <span>Duration:</span> {{ movie.filmLength }} minutes
        </p>

        <p class="movie-fact"><span>Overview:</span> {{ movie.description }}</p>
      </div>
    </div>
    <NuxtLink class="button" :to="{ name: 'index' }"> Back </NuxtLink>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "singleMovie",

  async fetch() {
    await this.getSingleMovie();
  },

  head() {
    return {
      title: this.movie.nameEn,
    };
  },

  data() {
    return {
      movie: "",
    };
  },
  methods: {
    async getSingleMovie() {
      const data = axios.get(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${this.$route.params.movieid}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "0ffafc09-256e-44f5-94cf-4db298e8a8a6",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await data;
      console.log(result);
      this.movie = result.data;
    },
  },
};
</script>

<style scoped>
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 82px 16px;
}
.single-movie .button {
  align-self: flex-start;
  margin-bottom: 32px;
}
.single-movie .movie-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  color: #fff;
}
@media (min-width: 800px) {
  .single-movie .movie-info {
    flex-direction: row;
    align-items: flex-start;
  }
}
.single-movie .movie-info .movie-img img {
  max-height: 500px;
  width: 100%;
}
@media (min-width: 800px) {
  .single-movie .movie-info .movie-img img {
    max-height: 700px;
    width: initial;
  }
}
.single-movie .movie-info .movie-content h1 {
  font-size: 56px;
  font-weight: 400;
}
.single-movie .movie-info .movie-content .movie-fact {
  margin-top: 12px;
  font-size: 20px;
  line-height: 1.5;
}
.single-movie .movie-info .movie-content .movie-fact span {
  font-weight: 600;
  text-decoration: underline;
}
.single-movie .movie-info .movie-content .tagline {
  font-style: italic;
}
.single-movie .movie-info .movie-content .tagline span {
  font-style: normal;
}
</style>

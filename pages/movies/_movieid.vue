<template>
  <!-- Loading -->
  <Loading v-if="$fetchState.pending" />

  <!-- Movie Info -->
  <div v-else class="single-movie container">
    <NuxtLink class="button" :to="{ name: 'index' }"> Back </NuxtLink>
    <div class="movie-info">
      <div class="movie-img">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt="movie pic"
        />
      </div>
      <div class="movie-content">
        <h1>Title: {{ movie.title }}</h1>
        <p v-show="movie.tagline" class="movie-fact tagline">
          <span>Tagline:</span> "{{ movie.tagline }}"
        </p>
        <p class="movie-fact">
          <span>Released:</span>
          {{
            new Date(movie.release_date).toLocaleString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Duration:</span> {{ movie.runtime }} minutes
        </p>
        <p class="movie-fact">
          <span>Revenue:</span>
          {{
            movie.revenue.toLocaleString("en-us", {
              style: "currency",
              currency: "USD",
            })
          }}
        </p>
        <p class="movie-fact"><span>Overview:</span> {{ movie.overview }}</p>
      </div>
    </div>
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
      title: this.movie.title,
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
        `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}?api_key=7f4ad19f252b1ae55f0f975a95aba17e&language=en-US`
      );
      const result = await data;
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
  padding: 32px 16px;
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

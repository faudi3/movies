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
        <h1>
          Название:
          {{
            movie.nameRu || movie.nameEn || movie.nameOriginal || "Кривое АПИ"
          }}
        </h1>
        <p v-show="movie.slogan" class="movie-fact tagline">
          <span>Цитата:</span> "{{ movie.slogan }}"
        </p>
        <p class="movie-fact">
          <span>Дата выхода:</span>
          {{ movie.year }}
        </p>
        <p class="movie-fact">
          <span>Хронометраж:</span> {{ movie.filmLength }} минут
        </p>

        <p class="movie-fact"><span>Описание:</span> {{ movie.description }}</p>
      </div>
    </div>
    <button class="button" :class="$store.state.mode" @click="back">
      Назад
    </button>
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
    back() {
      this.$router.go(-1);
    },
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
  color: inherit !important;
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
  color: inherit !important;
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
}
.single-movie .movie-info .movie-content .tagline {
  font-style: italic;
}
.single-movie .movie-info .movie-content .tagline span {
  font-style: normal;
}
</style>

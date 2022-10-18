<template>
  <div class="home">
    <Hero />

    <div class="container search">
      <input
        @keyup.enter="$fetch"
        type="text"
        placeholder="Search"
        v-model.lazy="searchInput"
      />
      <button @click="clearSearch" class="button" v-show="searchInput !== ''">
        Clear Search
      </button>
    </div>

    <div class="container movies">
      <div v-if="searchInput === ''" id="movie-grid" class="movies-grid">
        <div class="movie" v-for="(movie, index) in movies" :key="index">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25) }}
              <span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released :
              {{
                new Date(movie.release_date).toLocaleDateString("en-us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </p>
            <NuxtLink
              class="button button-light"
              :to="{ name: 'movies-movieid', params: { movieid: movie.id } }"
            >
              Get More Info
            </NuxtLink>
          </div>
        </div>
      </div>
      <div id="movie-grid" class="movies-grid">
        <div
          class="movie"
          v-for="(movie, index) in searchedMovies"
          :key="index"
        >
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25) }}
              <span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released :
              {{
                new Date(movie.release_date).toLocaleDateString("en-us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </p>
            <NuxtLink
              class="button button-light"
              :to="{ name: 'movies-movieid', params: { movieid: movie.id } }"
            >
              Get More Info
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      movies: [],
      searchedMovies: [],
      searchInput: "",
    };
  },
  async fetch() {
    if (this.searchInput === "") {
      await this.getMovies();
      return;
    }

    await this.searchMovies();
  },
  methods: {
    async getMovies() {
      const data = axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=7f4ad19f252b1ae55f0f975a95aba17e&language=en-US&page=1"
      );
      const result = await data;
      result.data.results.forEach((movie) => {
        this.movies.push(movie);
      });
    },
    async searchMovies() {
      const data = axios.get(`
      https://api.themoviedb.org/3/search/movie?api_key=7f4ad19f252b1ae55f0f975a95aba17e&page=1&language=en-US&query=${this.searchInput}`);
      const result = await data;
      result.data.results.forEach((movie) => {
        this.searchedMovies.push(movie);
      });
      console.log(this.searchedMovies);
    },
    clearSearch() {
      this.searchInput = "";
      this.searchedMovies = [];
    },
  },
};
</script>
<style>
.home .loading {
  padding-top: 120px;
  align-items: flex-start;
}
.home .search {
  display: flex;
  padding: 32px 16px;
}
.home .search input {
  max-width: 350px;
  width: 100%;
  padding: 12px 6px;
  font-size: 14px;
  border: none;
}
.home .search input:focus {
  outline: none;
}
.home .search .button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.home .movies {
  padding: 32px 16px;
}
.home .movies .movies-grid {
  display: grid;
  column-gap: 32px;
  row-gap: 64px;
  grid-template-columns: 1fr;
}
@media (min-width: 500px) {
  .home .movies .movies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 750px) {
  .home .movies .movies-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1100px) {
  .home .movies .movies-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.home .movies .movies-grid .movie {
  position: relative;
  display: flex;
  flex-direction: column;
}
.home .movies .movies-grid .movie .movie-img {
  position: relative;
  overflow: hidden;
}
.home .movies .movies-grid .movie .movie-img:hover .overview {
  transform: translateY(0);
}
.home .movies .movies-grid .movie .movie-img img {
  display: block;
  width: 100%;
  height: 100%;
}
.home .movies .movies-grid .movie .movie-img .review {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #c92502;
  color: #fff;
  border-radius: 0 0 16px 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.home .movies .movies-grid .movie .movie-img .overview {
  line-height: 1.5;
  position: absolute;
  bottom: 0;
  background-color: rgba(201, 38, 2, 0.9);
  padding: 12px;
  color: #fff;
  transform: translateY(100%);
  transition: 0.3s ease-in-out all;
}
.home .movies .movies-grid .movie .info {
  margin-top: auto;
}
.home .movies .movies-grid .movie .info .title {
  margin-top: 8px;
  color: #fff;
  font-size: 20px;
}
.home .movies .movies-grid .movie .info .release {
  margin-top: 8px;
  color: #c9c9c9;
}
.home .movies .movies-grid .movie .info .button {
  margin-top: 8px;
}
</style>

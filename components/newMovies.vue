<template>
  <div class="container">
    <div v-if="!active" id="movie-grid" class="movies-grid">
      <div class="movie" v-for="(movie, index) in props" :key="index">
        <div class="movie-img">
          <img :src="`${movie.posterUrl}`" alt="" />
          <p class="review">{{ index + 1 }}</p>
        </div>
        <div class="info">
          <p class="title">
            {{ movie.nameEn }}
          </p>
          <p class="release">
            Released :
            {{ movie.year }}
          </p>
          <div v-show="$store.state.isLogged == true">
            <button
              v-if="!checkInList(movie)"
              class="button"
              @click="addFilm(movie)"
            >
              like
            </button>
            <button v-else class="button" @click="deleteFilm(movie)">
              delete from favourite
            </button>
            <!--            <button class="button" @click="checkInList(movie)">test</button>-->
          </div>

          <NuxtLink
            v-if="$route.name === 'index'"
            class="button button-light"
            :to="{ name: 'movies-movieid', params: { movieid: movie.filmId } }"
          >
            Get More Info
          </NuxtLink>
          <button @click="saveFilm(movie)" class="button" v-else>
            More Info
          </button>
        </div>
      </div>
    </div>
    <div v-else class="backgr single-movie">
      <div class="movie-info">
        <div class="movie-img">
          <img
            :src="`https://image.tmdb.org/t/p/w500/${savedFilm.poster_path}`"
            alt="movie pic"
          />
        </div>
        <div class="movie-content">
          <h1>Title: {{ savedFilm.title }}</h1>

          <p class="movie-fact">
            <span>Released:</span>
            {{ savedFilm.release_date }}
          </p>

          <p class="movie-fact">
            <span>Overview:</span> {{ savedFilm.overview }}
          </p>
        </div>
      </div>
      <button @click="active = false" class="button">Close</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "movies",
  props: ["props"],
  data() {
    return {
      active: false,
      savedFilm: {},
      favList: this.$store.state.favList,
    };
  },
  methods: {
    addFilm(movie) {
      let c = this.$store.state.user.email;
      this.$store.dispatch("addInList", { c, movie });
    },
    saveFilm(obj) {
      this.active = !this.active;
      this.savedFilm = obj;
      window.scrollTo(0, 0);
    },
    deleteFilm(movie) {
      let c = this.$store.state.user.email;
      let id = movie.filmId;
      this.$store.dispatch("delete", { id, c });
    },
    checkInList(movie) {
      let s = this.$store.state.favList;
      for (let i = 0; i < s.length; i++) {
        if (s[i].filmId === movie.filmId) {
          return true;
        }
      }
    },
  },
};
</script>

<style scoped>
.single-movie {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 82px 16px;
  background-color: #272626;
  min-height: 70%;
  width: 100%;
  position: absolute;
  z-index: 3;
  top: 50px;
  left: 0;
}
.single-movie button {
  width: 250px;
  margin: 30px;
}
.movie-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  color: #fff;
}
@media (min-width: 800px) {
  .movie-info {
    flex-direction: row;
    align-items: flex-start;
  }
}
.movie-info .movie-img img {
  max-height: 500px;
  width: 100%;
}
@media (min-width: 800px) {
  .movie-info .movie-img img {
    max-height: 700px;
    width: initial;
  }
}
.movie-info .movie-content h1 {
  font-size: 56px;
  font-weight: 400;
}
.movie-info .movie-content .movie-fact {
  margin-top: 12px;
  font-size: 20px;
  line-height: 1.5;
}
.movie-info .movie-content .movie-fact span {
  font-weight: 600;
  text-decoration: underline;
}
.movie-info .movie-content .tagline {
  font-style: italic;
}
.movie-info .movie-content .tagline span {
  font-style: normal;
}

.movies-grid {
  display: grid;
  column-gap: 32px;
  position: relative;
  row-gap: 64px;
  grid-template-columns: 1fr;
}
@media (min-width: 500px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 750px) {
  .movies-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1100px) {
  .movies-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.movies-grid .movie {
  position: relative;
  display: flex;
  flex-direction: column;
}
.movies-grid .movie .movie-img {
  position: relative;
  overflow: hidden;
}
.movies-grid .movie .movie-img:hover .overview {
  transform: translateY(0);
}
.movies-grid .movie .movie-img img {
  display: block;
  width: 100%;
  height: 100%;
}
.movies-grid .movie .movie-img .review {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: rgba(98, 84, 81, 0.9);
  color: #fff;
  border-radius: 0 0 16px 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.movies-grid .movie .movie-img .overview {
  line-height: 1.5;
  position: absolute;
  bottom: 0;
  background-color: rgba(98, 84, 81, 0.9);
  padding: 12px;
  color: #fff;
  transform: translateY(100%);
  transition: 0.5s ease-in-out all;
}
.movies-grid .movie .info {
  margin-top: auto;
}
.movies-grid .movie .info .title {
  margin-top: 8px;
  color: #fff;
  font-size: 20px;
}
.movies-grid .movie .info .release {
  margin-top: 8px;
  color: #c9c9c9;
}
.movies-grid .movie .info .button {
  margin-top: 8px;
}
</style>

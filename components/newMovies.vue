<template>
  <div class="container">
    <div v-if="!active" id="movie-grid" class="movies-grid">
      <div class="movie" v-for="(movie, index) in props" :key="index">
        <div class="movie-img">
          <img :src="`${movie.posterUrl}`" alt="" />
          <p class="review" :class="$store.state.mode">{{ index + 1 }}</p>
        </div>
        <div class="info">
          <p class="title">
            {{
              movie.nameRu || movie.nameEn || movie.nameOriginal || "кривой апи"
            }}
          </p>
          <p class="release">
            Дата выпуска :
            {{ movie.year }}
          </p>
          <div
            v-show="
              $store.state.isLogged === 'true' || $store.state.isLogged === true
            "
          >
            <button
              v-if="!checkInList(movie)"
              class="button"
              @click="addFilm(movie)"
              :class="$store.state.mode"
            >
              добавить в избранное
            </button>
            <button
              v-else
              class="button red"
              :class="$store.state.mode"
              @click="deleteFilm(movie)"
            >
              удалить из избранных
            </button>
            <!--            <button class="button" @click="checkInList(movie)">test</button>-->
          </div>
          <keep-alive>
            <router-view :key="$route.fullPath"></router-view>
            <NuxtLink
              class="button button-light"
              :class="$store.state.mode"
              :to="{
                name: 'movies-movieid',
                params: { movieid: movie.filmId },
              }"
            >
              Больше
            </NuxtLink>
          </keep-alive>

          <!--          <button @click="saveFilm(movie)" class="button" v-else>
            More Info
          </button>-->
        </div>
      </div>
    </div>
    <div v-else class="backgr single-movie">
      <div class="movie-info">
        <div class="movie-img">
          <img :src="`${savedFilm.posterUrl}`" alt="movie pic" />
        </div>
        <div class="movie-content">
          <h1>
            Название:
            {{
              savedFilm.nameRu ||
              savedFilm.En ||
              savedFilm.nameOriginal ||
              "кривой апи"
            }}
          </h1>

          <p class="movie-fact">
            <span>Выход:</span>
            {{ savedFilm.year }}
          </p>

          <p class="movie-fact">
            <span>Страны:</span> {{ savedFilm.countries[0].country }}
          </p>
          <p class="movie-fact">
            <span>Жанр:</span>
            {{ savedFilm.genres[0].genre }}
          </p>
          <p class="movie-fact">
            <span>Рейтинг кинопоиска:</span>
            {{ savedFilm.ratingKinopoisk }}
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
  async beforeMount() {
    let c = this.$store.state.user.email;
    await this.$store.dispatch("showList", { c });
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
  min-height: 150%;
  width: 100%;
  position: absolute;
  z-index: 3;
  top: 50px;
  left: 0;
}
.red {
  background-color: red;
}
.red:hover {
  background-color: #fc5555;
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
  color: inherit !important;
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
  color: inherit !important;
  border-radius: 0 0 16px 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.movies-grid .movie .movie-img .review.light {
  background-color: rgb(44, 69, 82);
}
.movies-grid .movie .movie-img .overview {
  line-height: 1.5;
  position: absolute;
  bottom: 0;
  background-color: rgba(98, 84, 81, 0.9);
  padding: 12px;
  color: inherit !important;
  transform: translateY(100%);
  transition: 0.5s ease-in-out all;
}

.movies-grid .movie .info {
  margin-top: auto;
}
.movies-grid .movie .info .title {
  margin-top: 8px;
  color: inherit !important;
  font-size: 20px;
}
.movies-grid .movie .info .release {
  margin-top: 8px;
  color: inherit !important;
}
.movies-grid .movie .info .button {
  margin-top: 8px;
}
</style>

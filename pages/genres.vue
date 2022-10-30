<template>
  <div>
    <Option :props="props" />
    <div class="container genres">
      <div
        v-if="props.title === 'genres'"
        class="genre-wrap"
        v-for="(genre, idx) in genres"
      >
        <p @click="getGenre(genre.id, idx)" :class="getClass(idx)">
          {{ genre.genre }}
        </p>
      </div>
      <div class="container movies">
        <div @click="scrollUp" class="scrollToTop">up</div>
        <h2 v-if="props.title === 'genres'" class="genre__name">
          {{ selectedGenre }}
        </h2>
        <newMovies :props="props.list"></newMovies>
        <div ref="observerGenres" class="observer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { genresList } from "@/assets/genresList.js";
export default {
  name: "genres",
  data() {
    return {
      props: { title: "genres", list: [] },
      activeIdx: 0,
      page: 1,
      genres: [],
      showOptions: true,
      selectedGenre: "триллер",
      selectedGenreId: 1,
      help: 1,
    };
  },
  methods: {
    getClass(idx) {
      if (idx === this.activeIdx) {
        return "selecGenre genre";
      } else {
        return "genre";
      }
    },
    scrollUp() {
      window.scrollTo(0, 0);
    },
    async getGenres() {
      genresList.forEach((genre) => {
        this.genres.push(genre);
      });
      await this.getGenre(this.selectedGenreId, 0);
    },
    async getGenre(fid, idx) {
      this.activeIdx = idx;
      if (this.help !== fid) {
        this.page = 1;
        this.props.list = [];
      }
      let a = this.genres.find((genre) => genre.id === fid);
      this.selectedGenre = a.genre;
      this.selectedGenreId = a.id;
      const data = axios.get(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${fid}&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${this.page}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "0ffafc09-256e-44f5-94cf-4db298e8a8a6",
            "Content-Type": "application/json",
          },
        }
      );

      this.page += 1;
      const result = await data;
      console.log(result);
      result.data.items.forEach((genre) => {
        this.props.list.push(genre);
      });
      this.help = fid;
    },
  },
  mounted() {
    this.getGenres();
    let options = {
      rootMargin: "0px",
      thresold: 1.0,
    };
    let callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.getGenre(this.selectedGenreId, this.activeIdx);
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observerGenres);
  },
};
</script>

<style scoped>
.selecGenre {
  border: 4px solid white;
}
.genres {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.genre {
  font-size: 30px;
  color: white;
  opacity: 0.6;
  border-radius: 10px;
  margin-top: 15px;
  cursor: pointer;
  padding: 10px;
  margin-right: 15px;
  background-color: #434242;
  transition: all 0.5s ease;
}
.genre:hover {
  opacity: 1;
}
.container {
  width: 80vw;
  align-items: center;
  text-align: center;
  margin-top: 20px;
}

.genre__name {
  color: white;
  font-size: 44px;
  margin: 20px auto;
}
</style>

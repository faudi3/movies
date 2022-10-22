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
          {{ genre.name }}
        </p>
      </div>
      <div class="container movies">
        <div @click="scrollUp" class="scrollToTop">up</div>
        <h2 v-if="props.title === 'genres'" class="genre__name">
          {{ selectedGenre }}
        </h2>
        <Movies :props="props.list"></Movies>
        <div ref="observerGenres" class="observer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "genres",
  data() {
    return {
      props: { title: "genres", list: [] },
      activeIdx: 0,
      page: 1,
      genres: [],
      showOptions: true,
      selectedGenre: "Action",
      selectedGenreId: 28,
      help: 28,
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
      this.props.list = [];
      const data = axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=7f4ad19f252b1ae55f0f975a95aba17e&language=en-US"
      );
      const result = await data;
      result.data.genres.forEach((genre) => {
        this.genres.push(genre);
      });
      await this.getGenre(this.selectedGenreId, 0);
    },
    async getGenre(id, idx) {
      this.activeIdx = idx;
      console.log(this.activeIdx);
      if (this.help !== id) {
        this.page = 1;
        this.props.list = [];
      }

      let a = this.genres.find((genre) => genre.id === id);
      this.selectedGenre = a.name;
      this.selectedGenreId = a.id;

      const data = axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=7f4ad19f252b1ae55f0f975a95aba17e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.page}&with_genres=${id}&with_watch_monetization_types=flatrate`
      );
      this.page += 1;

      const result = await data;
      result.data.results.forEach((genre) => {
        this.props.list.push(genre);
      });
      this.help = id;
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
        console.log("here");
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

<template>
  <div class="options-wrap">
    <Filters class="filters" />
    <NuxtLink :to="{ name: 'index' }">
      <button class="button opt-back">Back</button>
    </NuxtLink>
    <h1>{{ props.title.toUpperCase() }}</h1>
    <div class="container">
      <div
        v-if="props.title === 'genres'"
        v-show="showOptions"
        class="genre-wrap"
        v-for="genre in genres"
      >
        <p @click="getGenre(genre.id)" class="genre">
          {{ genre.name }}
        </p>
      </div>
      <div v-show="!showOptions" class="container movies">
        <button class="button" @click="resetSelected">Back to genres</button>
        <div @click="scrollUp" class="scrollToTop">up</div>

        <h2 class="genre__name">{{ selectedGenre }}</h2>
        <Movies :props="props.list"></Movies>
        <div ref="observerGenres" class="observer"></div>
      </div>
      <div v-if="props.title === 'countries'" class="genre-wrap">
        <input
          type="text"
          v-model="inputVal"
          class="input"
          placeholder="Enter a country"
        />
        <div class="country__under">
          <p v-for="country in countries">{{ country }}</p>
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
      page: 1,
      genres: [],
      countries: [],
      years: [],
      inputVal: "",
      showOptions: true,
      selectedGenre: -1,
      selectedGenreId: 0,
    };
  },
  name: "Option",
  props: ["props"],
  methods: {
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
    },
    async getGenre(id) {
      if (this.page === 1) {
        this.props.list = [];
      }

      /*    let a = this.props.list.find((elem) => elem.id === id);
      this.selectedGenre = a.title;*/
      const data = axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=7f4ad19f252b1ae55f0f975a95aba17e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.page}&with_genres=${id}&with_watch_monetization_types=flatrate`
      );
      this.page += 1;

      const result = await data;
      result.data.results.forEach((genre) => {
        this.props.list.push(genre);
      });
      this.showOptions = false;
      let a = this.genres.find((genre) => genre.id === id);
      this.selectedGenre = a.name;
      this.selectedGenreId = a.id;
    },

    async getCountries() {
      this.props.list = [];
      const data = axios.get(
        "https://api.themoviedb.org/3/configuration/countries?api_key=7f4ad19f252b1ae55f0f975a95aba17e"
      );
      const result = await data;
      result.data.forEach((country) => {
        this.countries.push(country["english_name"]);
      });
    },
    resetSelected() {
      this.showOptions = true;
      this.selectedGenre = "";
      this.page = 1;
    },
  },

  mounted() {
    if (this.props.title === "genres") {
      this.getGenres();
    } else if (this.props.title === "countries") {
      this.getCountries();
    }
    let options = {
      rootMargin: "0px",
      thresold: 1.0,
    };
    let callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.getGenre(this.selectedGenreId);
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observerGenres);
  },
};
</script>

<style scoped>
.options-wrap {
  padding-top: 50px;
}
h1 {
  color: white;
  font-size: 52px;
  text-align: center;
  margin-top: 20px;
}
.opt-back {
  max-width: 150px;
  max-height: 60px;
  margin-left: 20px;
}
.container {
  width: 80vw;
  align-items: center;
  text-align: center;
  margin-top: 20px;
}
.genre {
  font-size: 30px;
  color: white;
  border: 1px solid white;
  cursor: pointer;
}
.genre__name {
  color: white;
  font-size: 44px;
  margin: 20px auto;
}
.input {
  width: 500px;
  padding: 12px 6px;
  font-size: 24px;
  border: 2px solid blue;
}
.input:focus {
  outline: none;
}
.country__under {
  background-color: white;
  width: 500px;
  margin: 0 auto;
  height: 300px;
  overflow: scroll;
}
p {
  border-bottom: 1px solid black;
  cursor: pointer;
}
.button {
  height: 50px;
  width: 120px;
}
</style>

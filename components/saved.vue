<template>
  <div class="options-wrap">
    <Filters class="filters" />
    <NuxtLink :to="{ name: 'index' }">
      <button class="button opt-back">Back</button>
    </NuxtLink>
    <h1>{{ props.title.toUpperCase() }}</h1>
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
      <div v-if="props.title === 'years'">
        <div>
          Input before
          <input
            v-model.lazy="inputBefore"
            @keyup.enter="saveInputB"
            type="text"
            placeholder="1980"
          />
        </div>
        <div>
          Input after
          <input
            @keyup.enter="saveInputA"
            v-model.lazy="inputAfter"
            type="text"
            placeholder="2015"
          />
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
      activeIdx: 0,
      page: 1,
      genres: [],
      countries: [],
      years: [],
      inputVal: "",
      showOptions: true,
      selectedGenre: "Action",
      selectedGenreId: 28,
      inputBefore: "",
      inputAfter: "",
      convertedInputA: "",
      convertedInputB: "",
      filter: "",
      whichInput: "",
      help: 28,
    };
  },
  name: "Option",
  props: ["props"],
  methods: {
    getClass(idx) {
      if (idx === this.activeIdx) {
        return "selecGenre genre";
      } else {
        return "genre";
      }
    },
    saveInputA() {
      this.convertredInputA = `${this.inputAfter}-01-01`;
      this.filter = "gte";
      this.whichInput = this.convertredInputA;
      this.getYear();
    },
    saveInputB() {
      this.convertredInputB = `${this.inputBefore}-12-31`;
      this.filter = "lte";
      this.whichInput = this.convertredInputB;
      this.getYear();
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
    async getYear() {
      if (this.page === 1) {
        this.props.list = [];
      }

      const data = axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=7f4ad19f252b1ae55f0f975a95aba17e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.page}&release_date.${this.filter}=${this.whichInput}&with_watch_monetization_types=flatrate`
      );
      this.page += 1;

      const result = await data;
      console.log(result);
      /*result.data.results.forEach((genre) => {
        this.props.list.push(genre);
      });*/
      /*  this.showOptions = false;
      let a = this.genres.find((genre) => genre.id === id);
      this.selectedGenre = a.name;
      this.selectedGenreId = a.id;*/
    },
  },
  mounted() {
    if (this.props.title === "genres") {
      this.getGenres();
    } else if (this.props.title === "countries") {
      this.getCountries();
    } else if (this.props.title === "years") {
    }
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

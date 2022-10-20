<template>
  <div class="home" ref="home">
    <!-- Hero -->
    <Hero />
    <!-- Search -->
    <div @click="scrollUp" class="scrollToTop">up</div>
    <!-- Search + filters -->
    <div class="genres-wrap">
      <div class="search">
        <input
          @keyup.enter="$fetch"
          type="text"
          placeholder="Search"
          v-model="searchInput"
        />
        <button @click="$fetch" class="button" v-show="searchInput !== ''">
          Search
        </button>
        <button @click="clearSearch" class="button" v-show="searchInput !== ''">
          Clear Search
        </button>
      </div>
      <Filters />
    </div>
    <!-- Loading -->
    <Loading v-if="$fetchState.pending" />
    <!-- Movies -->
    <div class="container movies">
      <!-- new Movies -->
      <Movies v-if="searchInput === ''" :props="movies"> </Movies>
      <!--  searched Movies -->
      <Movies :props="searchedMovies"> </Movies>
    </div>
    <div ref="observerRef" class="observer"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  head() {
    return {
      title: "Movies Nuxt",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "latest movies in cinemas & online",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "movies, stream,streaming, film,films",
        },
      ],
    };
  },
  data() {
    return {
      movies: [],
      searchedMovies: [],
      searchInput: "",
      page: 0,
    };
  },
  watch: {
    searchInput() {
      if (this.searchInput === "") {
        this.searchedMovies = [];
      }
    },
  },
  async fetch() {
    if (this.searchInput === "") {
      this.searchedMovies = [];
      await this.getMovies();
      return;
    }

    await this.searchMovies();
  },
  methods: {
    async getMovies() {
      this.page += 1;
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=7f4ad19f252b1ae55f0f975a95aba17e&language=en-US&page=${this.page}`
      );
      const result = await data;
      result.data.results.forEach((movie) => {
        this.movies.push(movie);
      });
    },

    async searchMovies() {
      this.searchedMovies = [];
      const data = axios.get(`
      https://api.themoviedb.org/3/search/movie?api_key=7f4ad19f252b1ae55f0f975a95aba17e&page=1&language=en-US&query=${this.searchInput}`);
      const result = await data;
      result.data.results.forEach((movie) => {
        this.searchedMovies.push(movie);
      });
    },
    clearSearch() {
      this.searchInput = "";
      this.searchedMovies = [];
    },
    scrollUp() {
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    let options = {
      rootMargin: "0px",
      thresold: 1.0,
    };
    let callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        console.log("peresek");
        this.getMovies();
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observerRef);
  },
};
</script>
<style>
.genres-wrap {
  display: flex;
  border: 1px solid yellow;
  align-items: center;
  justify-content: space-between;
}
.scrollToTop {
  background-color: white;
  border: none;
  border-radius: 50%;
  color: black;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  line-height: 48px;
  height: 50px;
  width: 48px;
  position: fixed;
  z-index: 101;
  right: 5px;
}
.observer {
  border: 1px solid red;
  color: white;
  font-size: 32px;
  text-align: center;
  background-color: green;
}
.home .loading {
  padding-top: 120px;
  align-items: flex-start;
}
.home .search {
  display: flex;
  padding: 32px 4px;
}
.home .search input {
  width: 500px;
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
  margin: 0 10px;
}
.home .movies {
  padding: 32px 16px;
}
</style>

<template>
  <div class="home" ref="home">
    <!-- Hero -->
    <Hero />
    <!--    <p v-if="this.$store.state.user !== null">
      {{ this.$store.state.user.email }}
    </p>
    <p v-else>not logged</p>-->
    <!-- Search -->
    <div @click="scrollUp" class="scrollToTop">up</div>
    <!-- Search + filters -->
    <div class="genres-wrap">
      <div class="search">
        <input
          @keyup.enter="$fetch"
          type="text"
          placeholder="Искать..."
          v-model="searchInput"
        />
        <button @click="$fetch" class="button" v-show="searchInput !== ''">
          Поиск
        </button>
        <button @click="clearSearch" class="button" v-show="searchInput !== ''">
          Очистить поиск
        </button>
      </div>
      <Filters class="filters1" />
    </div>
    <h2 class="heading" v-if="searchInput === ''">250 Лучших Фильмов</h2>
    <h2 class="heading" v-else>
      Запрос по <span class="span">{{ searchInput }}</span>
    </h2>
    <!-- Loading -->
    <Loading v-if="$fetchState.pending" />
    <!-- Movies -->
    <div class="container movies">
      <!-- new Movies -->
      <newMovies v-if="searchInput === ''" :props="movies"> </newMovies>
      <!--  searched Movies -->
      <newMovies :props="searchedMovies"> </newMovies>
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
      pageSearch: 0,
      link: 1,
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
    this.searchedMovies = [];
    this.pageSearch = 0;
    await this.searchMovies();
  },
  methods: {
    async getMovies() {
      this.page += 1;
      const data = axios.get(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${this.page}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "0ffafc09-256e-44f5-94cf-4db298e8a8a6",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await data;

      result.data.films.forEach((movie) => {
        this.movies.push(movie);
      });
    },
    async searchMovies() {
      if (this.pageSearch === 0) {
        this.searchedMovies = [];
      }
      this.pageSearch += 1;

      const data = axios.get(
        `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${this.searchInput}&page=${this.pageSearch}`,
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
      result.data.films.forEach((movie) => {
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
        if (this.searchedMovies.length > 0 && this.pageSearch === 0) {
          this.searchMovies();
        } else {
          this.getMovies();
        }
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
  width: 80%;
  align-items: center;

  justify-content: space-between;
  margin: 0 auto;
}
.filters1 {
  padding: 0 !important;
  margin: 0;
}

.observer {
  color: white;
  font-size: 32px;
  border: 1px solid green;
  text-align: center;
  background-color: inherit;
}
.span {
  color: red;
  font-style: italic;
}
.home {
  color: inherit !important;
}
.home .loading {
  padding-top: 120px;
  align-items: flex-start;
}
.home .search {
  display: flex;
  padding: 32px 4px;
}
@media screen and (max-width: 670px) {
  .search {
    padding: 16px 2px;
    flex-direction: column;
  }
  .genres-wrap {
    width: 90%;
    flex-direction: column;
  }
  input {
    margin: 0;
    max-width: 400px;
  }
}
@media screen and (max-width: 410px) {
  .search {
    padding: 16px 2px;
    flex-direction: column;
  }
  .genres-wrap {
    width: 90%;
    flex-direction: column;
  }
  input {
    margin: 0;
    width: 250px;
  }
}
.home .search input {
  width: 500px;
  padding: 12px 6px;
  font-size: 14px;
  border: 1px solid white;
  color: inherit !important;
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

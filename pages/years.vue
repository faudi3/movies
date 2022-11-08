<template>
  <div>
    <Option :props="props" />
    <div class="years__wrap">
      <div class="input">
        <p>До какого года</p>
        <input
          v-model.lazy="inputBefore"
          @keyup.enter="saveInputB"
          type="text"
          placeholder="1980"
        />
      </div>
      <div class="input">
        <p>После какого года</p>
        <input
          @keyup.enter="saveInputA"
          v-model.lazy="inputAfter"
          type="text"
          placeholder="2015"
        />
      </div>
      <button
        @click="searchWithTwo"
        class="button btn"
        :class="this.$store.state.mode"
      >
        искать
      </button>
    </div>
    <div @click="scrollUp" class="scrollToTop">up</div>

    <div v-if="years.length > 0" class="movies-wrap">
      <Loading v-if="this.load" />

      <newMovies v-else :props="years"></newMovies>
    </div>
    <div ref="observerYears" class="observer"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "years",
  data() {
    return {
      props: { title: "years", list: [] },
      page: 1,
      years: [],
      inputVal: "",
      inputBefore: "",
      inputAfter: "",
      convertedInputA: "",
      convertedInputB: "",
      filter: "",
      whichInput: "",
      load: false,
    };
  },
  methods: {
    searchWithTwo() {
      this.convertredInputA = `${this.inputAfter}`;
      this.convertredInputB = `${this.inputBefore}`;
      this.filter = `yearFrom=${this.convertredInputA}&yearTo=${this.convertredInputB}`;
      this.getYear();
      this.years = [];
      this.page = 1;

      this.inputAfter = "";
      this.inputBefore = "";
    },

    saveInputA() {
      this.convertredInputA = `${this.inputAfter}`;
      this.filter = `yearFrom=${this.convertredInputA}&yearTo=3000`;
      this.whichInput = this.convertredInputA;
      this.getYear();
      this.years = [];
      this.page = 1;

      this.inputAfter = "";
    },
    saveInputB() {
      this.convertredInputB = `${this.inputBefore}`;
      this.filter = `yearFrom=1000&yearTo=${this.convertredInputB}`;
      this.whichInput = this.convertredInputB;
      this.getYear();
      this.years = [];
      this.page = 1;
      this.inputBefore = "";
    },

    scrollUp() {
      window.scrollTo(0, 0);
    },
    async getYear() {
      console.log(this.filter);
      this.load = true;
      if (this.page === 1) {
        this.props.list = [];
      }
      const data = axios.get(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&${this.filter}&page=${this.page}`,
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
      result.data.items.forEach((res) => {
        this.years.push(res);
      });
      this.years.forEach((post) => (post.filmId = post.kinopoiskId));
      this.load = false;
    },
  },
  mounted() {
    let options = {
      rootMargin: "0px",
      thresold: 1.0,
    };
    let callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.filter) {
        this.getYear();
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observerYears);
  },
};
</script>

<style scoped>
.observer {
  color: white;
  font-size: 32px;
  border: 1px solid black;
  text-align: center;
  background-color: inherit;
}
.movies-wrap {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
input {
  max-width: 500px;
  padding: 12px 6px;
  font-size: 24px;
  border: 1px solid white;
  color: inherit !important;
}
.input {
  color: inherit;
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
}
input:focus {
  outline: none;
}
.years__wrap {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input > p {
  margin-bottom: 10px;
}
.btn {
  width: 100px;
  align-self: center;
  margin-top: 30px;
}
@media screen and (max-width: 768px) {
  .years__wrap {
  }
}
</style>

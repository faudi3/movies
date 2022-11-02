<template>
  <div>
    <Option :props="props" />
    <div class="years__wrap">
      <div class="input">
        До какого года
        <input
          v-model.lazy="inputBefore"
          @keyup.enter="saveInputB"
          type="text"
          placeholder="1980"
        />
      </div>
      <div class="input">
        После какого года
        <input
          @keyup.enter="saveInputA"
          v-model.lazy="inputAfter"
          type="text"
          placeholder="2015"
        />
      </div>
      <button @click="searchWithTwo" class="button btn">искать</button>
    </div>
    <div @click="scrollUp" class="scrollToTop">up</div>

    <div v-if="years.length > 0" class="movies-wrap">
      <new-movies :props="years"></new-movies>
    </div>
    <div ref="observerYears" class="observer">Больше</div>
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
      help: 28,
    };
  },
  methods: {
    searchWithTwo() {
      this.convertredInputA = `${this.inputAfter}`;
      this.convertredInputB = `${this.inputBefore}`;
      this.filter = `yearFrom=${this.convertredInputA}&yearTo=${this.convertredInputB}`;
      this.getYear();
      this.years = [];
      this.inputAfter = "";
      this.inputBefore = "";
    },

    saveInputA() {
      this.convertredInputA = `${this.inputAfter}`;
      this.filter = `yearFrom=${this.convertredInputA}&yearTo=3000`;
      this.whichInput = this.convertredInputA;
      this.getYear();
      this.years = [];
      this.inputAfter = "";
    },
    saveInputB() {
      this.convertredInputB = `${this.inputBefore}`;
      this.filter = `yearFrom=1000&yearTo=${this.convertredInputB}`;
      this.whichInput = this.convertredInputB;
      this.getYear();
      this.years = [];

      this.inputBefore = "";
    },

    scrollUp() {
      window.scrollTo(0, 0);
    },
    async getYear() {
      if (this.page === 1) {
        this.props.list = [];
      }
      const data = axios.get(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&${this.filter}&page=1`,
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
    },
  },
  mounted() {
    console.log(this.years);
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
  border: none !important;
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
  color: white;
}
.input {
  color: white;
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

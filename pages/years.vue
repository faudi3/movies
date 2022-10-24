<template>
  <div>
    <Option :props="props" />
    <div class="years__wrap">
      <div class="input">
        Input before
        <input
          v-model.lazy="inputBefore"
          @keyup.enter="saveInputB"
          type="text"
          placeholder="1980"
        />
      </div>
      <div class="input">
        Input after
        <input
          @keyup.enter="saveInputA"
          v-model.lazy="inputAfter"
          type="text"
          placeholder="2015"
        />
      </div>
    </div>
    <div @click="scrollUp" class="scrollToTop">up</div>

    <div v-if="years.length > 0" class="movies-wrap">
      <Movies :props="years"></Movies>
    </div>
    <div ref="observerYears" class="observer">More</div>
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
    saveInputA() {
      this.convertredInputA = `${this.inputAfter}-01-01`;
      this.filter = "gte";
      this.whichInput = this.convertredInputA;
      this.getYear();
      this.years = [];
      this.inputAfter = "";
    },
    saveInputB() {
      this.convertredInputB = `${this.inputBefore}-12-31`;
      this.filter = "lte";
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
        `https://api.themoviedb.org/3/discover/movie?api_key=7f4ad19f252b1ae55f0f975a95aba17e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.page}&release_date.${this.filter}=${this.whichInput}&with_watch_monetization_types=flatrate`
      );
      this.page += 1;
      const result = await data;
      result.data.results.forEach((res) => {
        this.years.push(res);
      });
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
  width: 500px;
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
}
</style>

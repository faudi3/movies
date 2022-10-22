<template>
  <div>
    <Option :props="props" />
    <div class="years__wrap">
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
</template>

<script>
import axios from "axios";

export default {
  name: "years",
  data() {
    return {
      props: { title: "years", list: [] },
      activeIdx: 0,
      page: 1,
      years: [],
      inputVal: "",
      showOptions: true,
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
    /*let options = {
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
    observer.observe(this.$refs.observerGenres);*/
  },
};
</script>

<style scoped>
input {
  width: 500px;
  padding: 12px 6px;
  font-size: 24px;
  border: 2px solid blue;
}
input:focus {
  outline: none;
}
.years__wrap {
  margin: 0 auto;
  border: 1px solid red;
  width: 80%;
  display: flex;
}
</style>

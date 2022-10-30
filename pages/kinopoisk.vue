<template>
  <div class="home" ref="home">
    <Hero />

    <Filters class="filters1" />

    <div class="container movies">
      <h1>250 best films</h1>
      <NewMovies :props="arr" />
      <div @click="scrollUp" class="scrollToTop">up</div>
    </div>

    <div ref="kinopoisk" class="observer"></div>
  </div>
</template>

<script>
export default {
  name: "kinoposik",
  data() {
    return {
      arr: [],
      page: 1,
      searchInput: "",
    };
  },
  methods: {
    scrollUp() {
      window.scrollTo(0, 0);
    },
    getData() {
      fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${this.page}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "0ffafc09-256e-44f5-94cf-4db298e8a8a6",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        /*
        .then((json) => console.log(json))
*/

        .then((json) => json.films.forEach((film) => this.arr.push(film)));
      console.log(this.arr);
      this.page++;
    },
  },
  mounted() {
    this.getData();
    let options = {
      rootMargin: "0px",
      thresold: 1.0,
    };
    let callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.getData(this.page);
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.kinopoisk);
  },
  beforeMount() {
    /*   this.getData();*/
  },
};
</script>

<style scoped>
h1 {
  font-size: 54px;
  text-align: center;
  font-weight: 900;
  color: white;
}
.filters1 {
  padding: 0 !important;
  margin: 0;
}
.genres-wrap {
  display: flex;
  width: 80%;
  align-items: center;

  justify-content: space-between;
  margin: 0 auto;
}
</style>

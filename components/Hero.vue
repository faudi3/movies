<template>
  <div class="hero">
    <img src="../assets/imgs/8857_.png" alt="" />
    <div class="text-container">
      <div class="text">
        <span class="mini-heading">Искать фильмы</span>
        <h1><span>online </span>База фильмов</h1>
        <a href="#movie-grid" class="button" :class="this.$store.state.mode"
          >изучить фильмы</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style scoped>
.hero {
  height: 400px;
  position: relative;
}
@media (min-width: 750px) {
  .hero {
    height: 500px;
  }
}

.hero::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text-container {
  z-index: 99;
  position: absolute;
  top: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text {
  padding: 0 16px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
.mini-heading {
  font-weight: 600;
  font-size: 18px;
  text-transform: uppercase;
  color: #c92502;
  margin-bottom: 8px;
}
@media (min-width: 750px) {
  .mini-heading {
    font-size: 22px;
  }
}
h1 {
  color: #fff;
  font-size: 50px;
  font-weight: 200;
  margin-bottom: 8px;
}
@media (min-width: 750px) {
  h1 {
    font-size: 84px;
  }
  span {
    font-weight: 500;
  }
}

.button {
  font-size: 20px;
  align-self: flex-start;
}
</style>

<template>
  <div class="filters">
    <div class="option"><p>Новинки</p></div>
    <div class="option"><p>Жанры</p></div>
    <div class="option"><p>Страны</p></div>
    <div class="option"><p>Годы</p></div>
  </div>
</template>

<script>
export default {
  name: "Filters",
};
</script>

<style scoped>
.filters {
  display: flex;
  color: white;
}
.option {
  margin: 0 20px;
  font-size: 26px;
  background-color: #343434;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.option p {
  opacity: 0.7;
  transition: all 0.5s ease;
}
.option p:hover {
  opacity: 1;
}
</style>

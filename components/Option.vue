<template>
  <div>
    <Filters class="filters" />
    <NuxtLink :to="{ name: 'index' }">
      <button class="button opt-back" :class="$store.state.mode">назад</button>
    </NuxtLink>
    <h1>{{ props.title.toUpperCase() }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "Option",
  props: ["props"],
};
</script>

<style scoped>
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
  margin-top: 20px;
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

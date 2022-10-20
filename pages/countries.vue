<template>
  <div>
    <Option :props="title" />
  </div>
</template>

<script>
export default {
  name: "countries",
  data() {
    return {
      title: "countries",
    };
  },
};
</script>

<style scoped></style>

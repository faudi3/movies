<template>
  <div>
    <Option :props="props" />
  </div>
</template>

<script>
export default {
  name: "genres",
  data() {
    return {
      props: { title: "genres", list: [] },
    };
  },
};
</script>

<style scoped></style>

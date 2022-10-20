<template>
  <div>
    <Option :props="props" />
  </div>
</template>

<script>
export default {
  name: "years",
  data() {
    return {
      props: { title: "years", list: [] },
    };
  },
};
</script>

<style scoped></style>

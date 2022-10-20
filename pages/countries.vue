<template>
  <div>
    <Option :props="props" />
  </div>
</template>

<script>
export default {
  name: "countries",
  data() {
    return {
      props: { title: "countries", list: [] },
    };
  },
};
</script>

<style scoped></style>

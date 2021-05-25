<template>
  <keep-alive include='protocols'>
    <router-view> </router-view>
  </keep-alive>
</template>

<script>
export default {
  name: "homes1",
  data() {
    return {};
  },
  mounted() {
    console.log("123456");
  },
  methods: {}
};
</script>

<style>
.asdas {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
}
</style>

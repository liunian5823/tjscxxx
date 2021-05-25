<template>
  <div class="bgBorderTwo">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <span class="iconfont icon-dangqianweizhi weizhi"></span>
      <el-breadcrumb-item v-for="(lists, index) in list" :key="index">当前位置：{{
        lists
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      list: []
    };
  },
  mounted() {
    var b = this.$route.meta.title.split("/");
    this.list = b;
  },
  computed: {},
  methods: {},
  watch: {
    $route: function(newVal) {
      var b = newVal.meta.title.split("/");
      // console.log(b)
      this.list = b;
    }
  },
  created() {}
};
</script>

<style scoped>
.tags {
  height: 64px;
  background: #ffffff;
}
.el-breadcrumb {
  font-size: 16px !important;
  font-family: MicrosoftYaHei !important;
  color: #000000 !important;
  line-height: 30px !important;
  letter-spacing: 1px !important;
  padding-left: 0px !important;
}
.el-breadcrumb__inner {
  cursor: pointer !important;
}

.weizhi {
  float: left;
  color: #2db7f5;
  padding-right: 10px;
}
</style>

<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box">
      <div class="bgBorders"></div>
      <div class="content">
        <v-tags v-if="path != '/index'"></v-tags>
        <router-view>
          <transition name="move" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <!-- <el-backtop target=".content"></el-backtop> -->
        <Modificationpwd></Modificationpwd>
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from "../components/Header";
import vSidebar from "../components/Sidebar";
import vTags from "../components/Tags.vue";
import Modificationpwd from "../views/modificationpwd/modificationpwd.vue";
export default {
  name: "Home",
  data() {
    return {
      path: "",
      heigth: "",
      hiegthH: ""
    };
  },
  components: {
    vHeader,
    vSidebar,
    vTags,
    Modificationpwd
  },
  mounted() {
    this.path = this.$route.path;

    this.underlyingType();
  },
  methods: {
    // 查询标的类别
    underlyingType() {
      var _this = this;
      if (this.$store.state.underlyingType == "") {
        _this.httpsapi
          .POST(_this.apis + "/trade/scene/queryReClassTree", {})
          .then(result => {
            if (result.code == 200) {
              this.$store.commit("underlyingType", result.data);
            }
          });
      }
    }
  },
  computed: {},
  watch: {
    "$route.path": function(newVal) {
      this.path = newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.bgBorders {
  background-color: #ffffff;
  margin: 15px 15px 0px 15px;
  min-width: 1024px;
}
</style>

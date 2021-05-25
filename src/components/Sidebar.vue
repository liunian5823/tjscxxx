<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#002446"
      text-color="rgba(255,255,255,0.5)"
      active-text-color="#FFFFFF"
      unique-opened
      @select="handleSelect"
    >
      <template v-for="item in items">
        <template v-if="item.children.length != '0'">
          <el-submenu :index="item.url" :key="item.url">
            <template #title>
              <i :class="item.icon" style="padding: 0px 10px"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-menu-item :index="subItem.url">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.url" :key="item.url">
            <i :class="item.icon" style="padding: 0px 10px"></i>
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import bus from "../common/bus";
export default {
  data() {
    return {
      items: []
    };
  },
  mounted() {
    // console.log(this.$store.state.menuList)
    this.items = this.$store.state.menuList;
  },
  computed: {
    onRoutes() {
      var a = this.$route.path.replace("/", "");
      var b = a.split("/");
      return b[0];
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (keyPath.length != "1") {
        this.$router.push({ name: keyPath[1] });
      } else {
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  background: #002446;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 200px;
  background: #001428 !important;
}

.el-menu-item.is-active {
  background-color: #1890ff !important;
  color: #fff;
}
</style>

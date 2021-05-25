import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);
var vuexLocal = new VuexPersistence({
  storage: window.localStorage
});
export default new Vuex.Store({
  state: {
    tagsList: [],
    collapse: false,
    menuList: [],
    xiugai: false,
    singlist: [],
    logininformation: [],
    singlists: [],
    underlyingType: []
  },
  plugins: [vuexLocal.plugin],
  mutations: {
    // 判断是竞买人详情还是单笔报价详情
    bidderType(state, data) {
      state.bidderType = data;
    },
    underlyingType(state, data) {
      state.underlyingType = data;
    },
    menuList(state, data) {
      state.menuList = data;
    },
    xiugai(state, data) {
      state.xiugai = data;
    },
    singlist(state, data) {
      state.singlist = data;
    },
    singlists(state, data) {
      state.singlists = data;
    },
    singlistss(state, data) {
      state.singlistss = data;
    },
    logininformation(state, data) {
      // console.log(data)
      state.logininformation = data;
    },
    delTagsItem(state, data) {
      state.tagsList.splice(data.index, 1);
    },
    setTagsItem(state, data) {
      state.tagsList.push(data);
    },
    clearTags(state) {
      state.tagsList = [];
    },
    closeTagsOther(state, data) {
      state.tagsList = data;
    },
    closeCurrentTag(state, data) {
      for (var i = 0, len = state.tagsList.length; i < len; i++) {
        var item = state.tagsList[i];
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(state.tagsList[i + 1].path);
          } else if (i > 0) {
            data.$router.push(state.tagsList[i - 1].path);
          } else {
            data.$router.push("/");
          }
          state.tagsList.splice(i, 1);
          break;
        }
      }
    },
    // 侧边栏折叠
    hadndleCollapse(state, data) {
      state.collapse = data;
    }
  },
  actions: {},
  modules: {}
});

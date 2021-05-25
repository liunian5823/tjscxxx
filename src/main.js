import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Vueaxios from "vue-axios";
import httpsapi from "./request/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css'  
import cookie from 'vue-cookie'
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import exports from "./request/wenjianxiazai.js"
import searchui from './views/Search/Search.vue';
import confirm from './views/components/confirm.vue';
import tableTwo from './views/table/tableTwo.vue';
import uploading from "./request/wenjianshangchuan.js";
import msgBox from './assets/js/messageBox.js';
import 'default-passive-events'//防止element滚动事件引起bug
Vue.component('searchui', searchui)
Vue.component('confirm', confirm)
Vue.component('tableTwo', tableTwo)

// Vue.use(VueQuillEditor)
Vue.use(cookie)
Vue.use(ElementUI);
Vue.config.silent = true
Vue.use(Vueaxios, axios)
Vue.prototype.exports = exports
Vue.prototype.Home = '/api'
Vue.prototype.tuurl = "https://106.39.82.13:8443/"

if (process.env.VUE_APP_CURRENTMODE == 'production') {
  Vue.prototype.apis = "http://10.10.3.42:8080"
} else {
  //  Vue.prototype.apis = 'http://10.10.9.177:8081'
  //  Vue.prototype.apis = 'http://10.10.9.175:8080'
   Vue.prototype.apis = 'http://10.10.3.42:8080'
  //  Vue.prototype.apis = 'http://39.107.43.235:8080'
  //  Vue.prototype.apis = 'http://10.10.9.165:8081'
  //  Vue.prototype.apis = 'http://10.10.9.176:8080'   //爱松
}


Vue.prototype.msgBox = msgBox
Vue.prototype.uploading = uploading
Vue.prototype.httpsapi = httpsapi
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
// import promise from 'es6-promise';
import router from "../router/index.js";
// promise.polyfill();
var IESA;
if (navigator.userAgent.indexOf("MSIE 9.0") != "-1") {
  IESA = "1";
} else {
  IESA = "0";
}
axios.interceptors.response.use(
  response => {
    return new Promise((resolve, reject) => {
      if (IESA == "1") {
        console.log(response.data);
        var res = response.data;
        //判断是不是文件流
        if (res.code == "200") {
          resolve(res);
        } else if (res.code == "500") {
          // Message.error(res.message)
          // Message({
          //   showClose: true,
          //   offset: 400,
          //   message: res.message,
          //   type: "error"
          // });
          resolve(res);
        } else if (res.code == "403") {
          Message.error("您没有权限，请联系管理员");
          resolve(res);
        } else if (res.code == "404") {
          Message.error("找不到路径,请联系管理员");
          resolve(res);
        } else if (res.code == "401") {
          resolve(res);
          router.push("/login");
          // Message.error("登录超时，请重新登陆");
          return;
        }
      } else if (IESA == "0") {
        if (response.data instanceof Blob) {
          //文件流不判断状态
          var res = response;
          resolve(res);
        } else {
          var res = response.data;

          if (res.code == "200") {
            resolve(res);
          } else if (res.code == "500") {
            // Message.error(res.message)
            resolve(res);
          } else if (res.code == "403") {
            Message.error("您没有权限，请联系管理员");
            resolve(res);
          } else if (res.code == "404") {
            Message.error("找不到路径,请联系管理员");
            resolve(res);
          } else if (res.code == "401") {
            // console.log("-------------------------");
            router.push("/login");
            // Message.error("登录超时，请重新登陆");
            resolve(res);
            return;
          }
        }
      }
    });
  },
  error => {
    var status = error.response.status;
    switch (status) {
      case 500:
        // MessageBox.error("内部服务器错误")
        Message({
          showClose: true,
          offset: 400,
          message: "内部服务器错误",
          type: "error"
        });
        break;
      case 404:
        Message({
          showClose: true,
          offset: 400,
          message: "请求的网页不存在",
          type: "error"
        });
        // MessageBox.error("请求的网页不存在 ")
        break;
      case 401:
        Message({
          showClose: true,
          offset: 400,
          message: "未授权",
          type: "error"
        });
        // MessageBox.error("未授权:")
        break;
      default:
        console.log(error);
    }
    return Promise.reject(error);
  }
);
export default {
  //get请求
  GET(url, params = {}) {
    return new Promise((resolve, reject) => {
      var Authorization;
      Authorization = localStorage.getItem("certificate");
      if (Authorization == null) {
        Authorization = "";
      }
      axios.defaults.headers.common["Authorization"] = Authorization;
      axios
        .get(url, {
          params: params
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
          if(err.response.data.message != ''){
            Message({
              showClose: true,
              offset: 400,
              message: err.response.data.message,
              type: "error"
            });
          }
          
        });
    });
  },

  //qs.stringify()
  //POST请求
  POST(url, params) {
    return new Promise((resolve, reject) => {
      var Authorization;
      Authorization = localStorage.getItem("certificate");
      if (Authorization == null) {
        Authorization = "";
      }
      axios.defaults.headers.common["Authorization"] = Authorization;
      axios
        .post(url, qs.parse(params))
        .then(res => {
          console.log(res)
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err.response);
          if(err.response.data.message != ''){
            Message({
              showClose: true,
              offset: 400,
              message: err.response.data.message,
              type: "error"
            });
          }
        });
    });
  },
  POST3(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.parse(params))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err.response);
          if(err.response.data.message != ''){
            Message({
              showClose: true,
              offset: 400,
              message: err.response.data.message,
              type: "error"
            });
          }
        });
    });
  },
  POST2(url, params) {
    return new Promise((resolve, reject) => {
      var Authorization;
      Authorization = localStorage.getItem("certificate");
      if (Authorization == null) {
        Authorization = "";
      }
      axios.defaults.headers.common["Authorization"] = Authorization;
      // axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
      axios
        .post(url, qs.stringify(params), {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err.response);
          if(err.response.data.message != ''){
            Message({
              showClose: true,
              offset: 400,
              message: err.response.data.message,
              type: "error"
            });
          }
        });
    });
  },
  //PUT请求
  PUT(url, params) {
    return new Promise((resolve, reject) => {
      var Authorization;
      Authorization = localStorage.getItem("certificate");
      if (Authorization == null) {
        Authorization = "";
      }
      axios.defaults.headers.common["Authorization"] = Authorization;
      axios
        .put(url, qs.parse(params))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err.response);
          if(err.response.data.message != ''){
            Message({
              showClose: true,
              offset: 400,
              message: err.response.data.message,
              type: "error"
            });
          }
        });
    });
  },
  //DELETE请求
  DELETE(url, params = {}) {
    if (Authorization == null) {
      var Authorization = "";
    }

    return new Promise((resolve, reject) => {
      var Authorization = localStorage.getItem("certificate");
      axios.defaults.headers.common["Authorization"] = Authorization;
      axios
        .delete(url, {
          params: params
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
          console.log(err);
          if(err.response.data.message != ''){
            Message({
              showClose: true,
              offset: 400,
              message: err.response.data.message,
              type: "error"
            });
          }
        });
    });
  },
  File(url, params) {
    return new Promise((resolve, reject) => {
      var Authorization;
      Authorization = localStorage.getItem("certificate");
      if (Authorization == null) {
        Authorization = "";
      }
      var a = { responseType: "blob" };
      axios.defaults.headers.common["Authorization"] = Authorization;
      axios
        .post(url, qs.parse(params), a)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err.response);
          if(err.response.data.message != ''){
            Message({
              showClose: true,
              offset: 400,
              message: err.response.data.message,
              type: "error"
            });
          }
        });
    });
  },
  File1(url, params) {
    return new Promise((resolve, reject) => {
      var Authorization;
      Authorization = localStorage.getItem("certificate");
      if (Authorization == null) {
        Authorization = "";
      }
      var a = { responseType: "blob" };
      axios.defaults.headers.common["Authorization"] = Authorization;
      axios
        .post(url, qs.stringify(params), a ,{
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err.response);
          if(err.response.data.message != ''){
            Message({
              showClose: true,
              offset: 400,
              message: err.response.data.message,
              type: "error"
            });
          }
        });
    });
  }
};

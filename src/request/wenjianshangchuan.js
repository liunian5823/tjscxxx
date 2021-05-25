import axios from "axios";
import { Message } from "element-ui";
export default {
  uploading(e, size, format, thanada, srcs) {
    const sizes = e.target.files[0].size;
    if (sizes / 1024 / 1024 > size) {
      Message({
        showClose: true,
        offset: 400,
        message: "请上传小于" + size + "M的文件",
        type: "error"
      });
      return;
    }
    var a = e.target.files[0].name.split(".");
    // console.log(format.search(a[1]))
    if (format.search(a[1]) == "-1") {
      Message({
        showClose: true,
        offset: 400,
        message: "请上传" + format + "的文件",
        type: "error"
      });
      return;
    }

    var formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("multipartFile", e.target.files[i]);
    }
    axios({
      method: "POST",
      url: thanada.apis + "/fastdfs/upload-file",
      data: formData,
      header: {
        Authorization: localStorage.getItem("certificate")
      }
    })
      .then(res => {
        if (res.code == "200") {
          if (typeof srcs == "string") {
            thanada.src[srcs] = res.data;
          } else if (typeof srcs == "function") {
            srcs(res.data);
          }
          Message({
            showClose: true,
            offset: 400,
            message: res.message,
            type: "success"
          });
        } else {
          Message({
            showClose: true,
            offset: 400,
            message: res.message,
            type: "error"
          });
        }
      })
      .catch(error => {
        Message({
          showClose: true,
          offset: 400,
          message: error.message,
          type: "error"
        });
      });
  }
};

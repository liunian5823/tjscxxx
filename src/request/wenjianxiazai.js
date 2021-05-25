import httpsapi from "../request/index.js";

export default {
  exports(url, param) {
    console.log();
    httpsapi
      .File(url, param)
      .then(response => {
        var a = response.headers["content-disposition"].split(
          "filename*=UTF-8''"
        )[1];
        var title = decodeURIComponent(a);
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        link.style.display = "none";
        link.href = url;

        link.setAttribute("download", title);
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {
        console.log(err);
      });
  },
  exports1(url,param){
    httpsapi
    .File1(url, param)
    .then(response => {
      
      var a = response.headers["content-disposition"].split(
        'fileName="'
      )[1];
      var a = a.split(
        '"'
      )[0];

    
      // return
      var title = decodeURIComponent(a);
      var url = window.URL.createObjectURL(new Blob([response.data]));
      var link = document.createElement("a");
      link.style.display = "none";
      link.href = url;

      link.setAttribute("download", title);
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => {
      console.log(err);
    });
  }
};

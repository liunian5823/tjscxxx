export default {
  msgBoxOpen(_this, opject) {
    var _showInput, _btnText;
    opject.showInput == undefined || opject.showInput == false
      ? (_showInput = false)
      : (_showInput = true);
    if (opject.btnText == undefined || opject.btnText == "") {
      _btnText = "确 定";
    } else {
      if (opject.btnText.length < 3) {
        _btnText = opject.btnText.split("").join(" ");
      } else {
        _btnText = opject.btnText;
      }
    }
    _this.$msgbox({
      title: "提示",
      message: opject.message,
      confirmButtonText: _btnText,
      showInput: _showInput, //是否显示输入框
      cancelButtonText: "取 消",
      dangerouslyUseHTMLString: true,
      showCancelButton: true,
      confirmButtonClass: "el-blueColor",
      cancelButtonClass: "el-noColor",
      center: true,
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          opject.success(opject.btnText);
        } else if (action === "cancel") {
        }
        done();
      }
    });
  }
};

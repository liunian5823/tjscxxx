<template>
  <div class="password_w">
    <div class="password_w_title">
      找回密码 <span class="el-icon-close" @click="close"></span>
    </div>
    <div class="password_w_from">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            type="text"
            v-model="ruleForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input placeholder="请输入您的验证码" v-model="ruleForm.code">
            <template #append>
              <span @click="Hcode" v-if="counts == '1'">{{ count }}</span>
              <span v-else-if="counts == '0'">{{ count }}</span>
              <span v-else>{{ count }}</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Pass">
          <el-input
            type="password"
            v-model="ruleForm.Pass"
            autocomplete="off"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="width: 100%"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="tankuang">
      <el-dialog title="选择登陆公司" v-model="dialogTableVisible">
        <el-radio
          v-model="radio"
          :label="citys.id"
          v-for="(citys, index) in city"
          :key="index"
          >{{ citys.name }}</el-radio
        >
        <el-button type="primary" @click="denglu">确定</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkPhonesss = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        //console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入11位手机号"));
        }
      }
    };
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.Pass) {
        //console.log(value);
        //console.log(this.ruleForm);
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: "",
        Pass: "",
        checkPass: "",
        code: "",
      },
      rules: {
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入11位手机号", trigger: "blur" },
          { validator: checkPhonesss, trigger: "blur" },
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 32,
            message: "长度在 8 到 32 个字符",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
        Pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 32,
            message: "长度在 8 到 32 个字符",
            trigger: "blur",
          },
        ],
      },
      count: "获取验证码",
      dialogTableVisible: false,
      radio: "",
      codes: "",
      counts: "1",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.counts = "0";
          var than = this;
          var url = this.apis + "/getFws/" + this.ruleForm.phone;
          var obj = {};
          this.httpsapi
            .GET(url, obj)
            .then((response) => {
              if (response.code == "200") {
                //console.log(response.data);
                this.city = response.data;
                this.radio = response.data[0].id;
                this.denglusss();
                if (response.data.length > "1") {
                  than.dialogTableVisible = true;
                }
              } else {
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "error",
                });
                this.counts = "1";
              }
            })
            .catch((err) => {
              //console.log(err);
              this.$message({
                showClose: true,
                offset: 400,
                message: err.message,
                type: "error",
              });
              this.counts = "1";
            });
          // -------------------------------------
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    denglusss() {
      var url = this.apis + "/backPassword";
      var obj = {
        code: this.ruleForm.code,
        password: this.ruleForm.checkPass,
        phone: this.ruleForm.phone,
        spId: this.radio,
      };
      this.httpsapi
        .PUT(url, obj)
        .then((response) => {
          if (response.code == "200") {
            //console.log(response.data);
            this.$message({
              showClose: true,
              offset: 400,
              message: response.message,
              type: "success",
            });
            this.$emit("getdata", false);
          } else {
            this.$message({
              showClose: true,
              offset: 400,
              message: response.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            offset: 400,
            message: err.message,
            type: "error",
          });
        });
    },
    close() {
      this.$emit("getdata", false);
    },
    Hcode() {
      //console.log('123')
      this.counts = "0";
      var than = this;
      var url = this.apis + "/getFws/" + this.ruleForm.phone;
      var obj = {};
      this.httpsapi
        .GET(url, obj)
        .then((response) => {
          if (response.code == "200") {
            //console.log(response.data);
            this.city = response.data;
            this.radio = response.data[0].id;
            this.huoquyanzhengma();
            if (response.data.length > "1") {
              than.dialogTableVisible = true;
            }
          } else {
            this.$message({
              showClose: true,
              offset: 400,
              message: response.message,
              type: "error",
            });
            this.counts = "1";
          }
        })
        .catch((err) => {
          //console.log(err);
          this.$message({
            showClose: true,
            offset: 400,
            message: err.message,
            type: "error",
          });
          this.counts = "1";
        });
    },
    huoquyanzhengma() {
      this.counts = "0";
      var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg_tel.test(this.ruleForm.phone)) {
        this.$message({
          showClose: true,
          offset: 400,
          message: "请输入正确手机号",
          type: "error",
        });
      } else {
        var url = this.apis + "/getBackCode/" + this.ruleForm.phone;
        var obj = {};
        this.httpsapi
          .GET(url, obj)
          .then((response) => {
            if (response.code == "200") {
              this.$message({
                showClose: true,
                offset: 400,
                message: response.message,
                duration: "5000",
                type: "success",
              });
              var TIME_COUNT = 60;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    this.count = "重新获取验证码";
                    this.counts = "1";
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
              this.codess = response.data;
              this.codes = response.data;
            } else {
              this.$message({
                showClose: true,
                offset: 400,
                message: response.message,
                duration: "5000",
                type: "success",
              });
              this.counts = "1";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style>
.password_w {
  width: 100%;
}
.password_w_title {
  padding: 0px 15px;
  height: 49px;
  line-height: 49px;
  font-size: 18px;
  background: rgba(0, 0, 0, 0.04);
}
.password_w_title span {
  float: right;
  line-height: 49px;
}
.password_w_from {
  margin-top: 30px;
  width: 80%;
  margin: 0 auto;
  padding-top: 43px;
}
.el-input-group__append {
  cursor: pointer;
}
</style>

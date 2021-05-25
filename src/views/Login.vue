<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">
        铁建商城 | <span style="color: #2db7f5">服务商管理系统</span>
      </div>
      <div class="Tabs">
        <span @click="Clickwire('0')" :class="wire == 0 ? 'wires' : ''"
          >账户密码登录
          <div class="wire" v-if="wire == '0'"></div>
        </span>
        <span @click="Clickwire('1')" :class="wire == 1 ? 'wires' : ''"
          >手机号验证码登录
          <div class="wire" v-if="wire == '1'"></div>
        </span>
      </div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input
            v-model="param.username"
            placeholder="请输入您的手机号"
            class="input"
            @input="shoujihao"
          >
          </el-input>
        </el-form-item>
        <div  v-if="wire == '0'" :key="0">
          <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入您的密码"
            v-model="param.password"
          >
          </el-input>
        </el-form-item>
        </div>
        <div  v-if="wire == '1'" :key="1">
           <el-form-item prop="code">
          <el-input placeholder="请输入您的验证码" v-model="param.code">
            <template #append>
              <span @click="Hcode" v-if="Hcodess == '0'">{{ count }}</span>
              <span  v-else>{{ count }}</span>
            </template>
          </el-input>
        </el-form-item>
        </div>
        
       
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips" style="cursor: pointer" @click="Cpassword">
          忘记密码
        </p>
      </el-form>
    </div>
    <div class="ms-logins" v-if="pwd">
      <div class="ms-logins_div">
        <PassWord @getdata="receive" />
      </div>
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
import { Message } from "element-ui";
import PassWord from "../views/password";
import { JSEncrypt } from "jsencrypt";
export default {
  components: {
    PassWord
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (reg.test(value)) {
          //console.log("123");
          callback();
        } else {
          //console.log("456");
          return callback(new Error("请输入11位手机号"));
        }
      }
    };
    return {
      pwd: false,
      activeName: "first",
      wire: "0",
      param: {
        username: "",
        password: "",
        code: ""
      },
      radio: "",
      rules: {
        username: [
          { required: true, message: "请输入正确的手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 32,
            message: "长度在 8 到 32 个字符",
            trigger: "blur"
          }
        ]
      },
      dialogTableVisible: false,
      city: "",
      count: "获取验证码",
      codess: "",
      Hcodess: "0",
      rsa: ""
    };
  },
  mounted() {
    console.log(JSEncrypt);
  },
  created() {
    this.$store.commit("clearTags");
    localStorage.removeItem("certificate");
  },
  methods: {
    submitForm() {
      var than = this;
      this.$refs.login.validate(valid => {
        if (valid) {
          var url = this.apis + "/getFws/" + this.param.username;
          var obj = {};
          this.httpsapi
            .GET(url, obj)
            .then(response => {
              if (response.code == "200") {
                //console.log(response.data);
                this.city = response.data;
                this.radio = response.data[0].id;
                this.denglus();
                if (response.data.length > "1") {
                  than.dialogTableVisible = true;
                }
              } else {
                console.log('123')
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log("123");
              console.log(err);
            });
        } else {
          this.$message.error("请输入账号和密码");
          return false;
        }
      });
    },
    huoqucaidan() {
      var than = this;

      var url = this.apis + "/getRouters";
      var obj = {};
      this.httpsapi
        .GET(url, obj)
        .then(response => {
          if (response.code == "200") {
            //console.log("123");
            this.$store.commit("menuList", response.data);
            than.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    Clickwire(e) {
      //console.log(e);
      var than = this;
      than.wire = e;
    },
    Hcode() {
      var url = this.apis + "/getFws/" + this.param.username;
      var obj = {};
      this.httpsapi
        .GET(url, obj)
        .then(response => {
          if (response.code == "200") {
            //console.log(response.data);
            this.city = response.data;
            this.radio = response.data[0].id;

            this.Hcodesss();
            if (response.data.length > "1") {
              this.dialogTableVisible = true;
            }
          } else {
            this.$message({
              showClose: true,
              offset: 400,
              message: response.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    Hcodesss() {
      var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg_tel.test(this.param.username)) {
        Message.error("请输入正确手机号");
      } else {
        var url = this.apis + "/getCode/" + this.param.username;
        var obj = {};
        this.httpsapi
          .GET(url, obj)
          .then(response => {
            // Message.success(response.PromptMsg);
            //console.log(response);
            if (response.code == "200") {
              this.Hcodess = "1";
              this.$message({
                showClose: true,
                offset: 400,
                message: response.message,
                type: "success"
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
                    this.Hcodess = "0";
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            } else {
              this.Hcodess = "1";
              this.$message({
                showClose: true,
                offset: 400,
                message: response.message,
                type: "success"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    Cpassword() {
      var than = this;
      than.pwd = true;
    },
    receive(e) {
      var than = this;
      than.pwd = e;
    },
    denglu() {
      var than = this;
      var url = this.apis + "/login";
      var encryptor = new JSEncrypt();
      var obj;
      var password = this.param.password;
      encryptor.setPublicKey(this.rsa);
      var passwords = encryptor.encrypt(password);
      if (this.wire == "0") {
        obj = {
          password: passwords,
          phone: this.param.username,
          spId: this.radio,
          type: this.wire
        };
      } else {
        obj = {
          code: this.param.code,
          phone: this.param.username,
          spId: this.radio,
          type: this.wire
        };
      }
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);
          if (response.code == "200") {
            localStorage.setItem("certificate", response.data);
            than.huoqucaidan();
          } else {
             this.$message({
                showClose: true,
                offset: 400,
                message: response.message,
                type: "error "
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    denglus() {
      var url = this.apis + "/getPublicKey";
      var obj = {};
      this.httpsapi
        .POST2(url, obj)
        .then(response => {
          console.log(response);
          this.rsa = response.data;
          this.denglu();
        })
        .catch(err => {
          console.log(err);
        });
    },
    shoujihao() {
      this.param.password = "";
      this.param.code = "";
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/background.png");
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 120px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  margin-top: 15px;
}
.ms-login {
  position: absolute;
  left: 80%;
  top: 50%;
  height: 500px;
  width: 390px;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 14px;
  line-height: 30px;
  color: #fff;
  text-align: center;
}
.Tabs {
  width: 70%;
  margin-left: 15%;
  padding-bottom: 36px;
  height: 28px;
}
.Tabs span {
  display: block;
  float: left;
  width: 50%;
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  cursor: pointer;
}
.wire {
  color: #30a2ec;
  border-bottom: 1px solid #30a2ec;
  width: 65%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.wires {
  color: #30a2ec !important;
}
.el-form ::v-deep .el-input__inner {
  -webkit-appearance: none;
  background-color: rgba(255, 255, 255, 0.1) !important;
  background-image: none;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

}
.ms-login ::v-deep .ms-content {
  margin-left: 10%;
  width: 70%;
}
.ms-login ::v-deep.el-form-item {
  margin-bottom: 35px;
}
.ms-logins {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}
.ms-logins_div {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 450px;
  width: 30%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
}
.tankuang ::v-deep.el-overlay .el-dialog {
  /* width: 20% !important;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%); */
  margin-top: 40vh !important;
  width: 20% !important;
}
.tankuang {
  width: 100%;
}
.tankuang ::v-deep.el-overlay .el-dialog .el-radio {
  display: block;
  margin: 0 auto 30px auto;
}
.tankuang ::v-deep.el-overlay .el-dialog .el-button {
  float: right;
  margin: -18px 0px;
}
</style>

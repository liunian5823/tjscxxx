<template>
  <div class="div">
    <div class="" v-if="xian == '1'">
       <img src="../../assets/img/background1.png" alt="" class="background" />
      <div class="imglogos">
        <img src="../../assets/img/logo.png" alt="" class="imglogo" />
      </div>
      
      <div class="title">{{ title }}</div>
      <div class="biaodan">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm biaoges"
        >
          <el-form-item prop="pass" class="biaandai">
            <el-input
              type="input"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" class="biaandai">
            <el-input placeholder="请输入内容" v-model="ruleForm.checkPass">
              <template slot="append">
                <span @click="yanzhengma">{{ count }}</span></template
              >
            </el-input>
          </el-form-item>
          <el-form-item class="biaandai">
            <el-button
              class="buttons"
              type="primary"
              @click="submitForm('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="background1" v-else>
      <div class="saasda">{{ xiangqing.buyerCompanyName }}看货会</div>
      <span class="saasda1">{{ xiangqing.contacts }}</span>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "qrcode",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      title: "",
      count: "获取验证码",
      xiangqing: "",
      xian: "1",
    };
  },
  mounted() {
    console.log();
    console.log(this.$route.query.id);
    if (document.cookie) {
      var a = document.cookie.split("=");
      console.log(a);
      this.huoqutitle2(a[1]);
    } else {
      this.huoqutitle();
    }
  },
  methods: {
    huoqutitle() {
      var url = this.apis + "/reSceneSign/getBySceneId/" + this.$route.query.id;
      var obj = {};
      this.httpsapi
        .POST3(url, obj)
        .then((response) => {
          console.log(response.code);
          // if(response.da)

          this.title = response.data.title + "看货会";
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url =
            this.apis +
            "/reSceneSign/codeSignIn/" +
            this.$route.query.id +
            "/" +
            this.ruleForm.pass +
            "/" +
            this.ruleForm.checkPass;
          var obj = {};
          this.httpsapi
            .POST3(url, obj)
            .then((response) => {
              console.log(response.code);
              if (response.code == "200") {
                var a = new Date(response.data.updateTime);
                console.log(a);
                this.$cookie.set("phone", this.ruleForm.pass, a);
                this.xiangqing = response.data;
                this.xian = "2";
              }
            })
            .catch((err) => {
              //console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    yanzhengma() {
      console.log(this.ruleForm.pass);
      var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

      if (!reg_tel.test(this.ruleForm.pass)) {
        Message.error("请输入正确手机号");
      } else {
        var url =
          this.apis +
          "/reSceneSign/getPhoneCode/" +
          this.$route.query.id +
          "/" +
          this.ruleForm.pass;
        var obj = {};
        this.httpsapi
          .POST3(url, obj)
          .then((response) => {
            // Message.success(response.PromptMsg);
            //console.log(response);
            if (response.code == "200") {
              this.$message({
                showClose: true,
                offset: 400,
                message: response.message,
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
                    this.Hcodess = "0";
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            } else {
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    huoqutitle2(e) {
      var url =
        this.apis +
        "/reSceneSign/getBySceneState/" +
        this.$route.query.id +
        "/" +
        e;
      var obj = {};
      this.httpsapi
        .POST3(url, obj)
        .then((response) => {
          console.log(response);
          if (response.code == "200") {
            this.xiangqing = response.data;
            this.xian = "2";
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.background {
position: absolute;
top: 0;
left: 0;
  width: 100%;
  height: 100%;
}
.div {

}
.imglogos {
  position: relative;
  z-index: 1000;
width: 100%;
text-align: center;
}
.imglogo {
  margin: 10px auto;
}
.title {
  position: absolute;
  top: 16%;
  text-align: center;
  font-size: 21px;
  color: #fff;
  width: 100%;
}
.biaodan {
  margin:65% auto;
  width: 80%;
}
.qiandao {
  position: relative;
  display: block;
  width: 120px;
  height: 47px;
  background: #004197;
  border-radius: 10px 10px 30px 30px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 41px;
  text-align: center;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
}
.biaoges {
  height: 100%;
}
.biaandai {
  margin: 35px;
}
.buttons {
  width: 100%;
}
.background1 {
  background-image: url("../../assets/img/backgruond2.png");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
.saasda {
  position: absolute;
  top: 39%;
  left: 16%;
  width: 72%;
}
.saasda1 {
  position: absolute;
  top: 82%;
  text-align: center;
  width: 100%;
  color: #fff;
  font-size: 12px;
}
</style>

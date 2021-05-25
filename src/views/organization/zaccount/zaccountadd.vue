<template>
  <div>
    <div class="bgBorderTwo">
      <label for="" class="title">账号信息</label>

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="90px"
        class="demo-ruleForm biaoge"
      >
        <el-form-item label="头像" class="biaoge_zi imgs">
          <input type="file" class="files" @change="shangchuang2($event)" />
          <img :src="src3" alt="" />
          <div class="shuming1">
            上传个人头像
            <br />
            <span>请上传格式为jpg、png体积小于2MB的图片</span>
          </div>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name" class="biaoge_zi" required>
          <el-input v-model="form.name" class="shurukuangi"></el-input>

          <el-select
            v-model="sda"
            placeholder="请选择性别"
            class="xialakuang"
            @change="xingbie"
          >
            <el-option
              :label="sexs.name"
              :value="sexs.id"
              v-for="(sexs, index) in sex"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email" class="biaoge_zi" required>
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone" class="biaoge_zi" required>
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="通讯地址" class="biaoge_zi">
          <el-select
            v-model="form.region"
            placeholder="请选择省"
            @change="provinceF"
          >
            <el-option
              :label="provinces.provinceName"
              :value="provinces.provinceCode"
              v-for="(provinces, index) in province"
              :key="index"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.region1"
            class="sada"
            placeholder="请选择市"
            @change="cityF"
          >
            <el-option
              :label="citys.cityName"
              :value="citys.cityCode"
              v-for="(citys, index) in city"
              :key="index"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.region2"
            class="sada"
            placeholder="请选择区/县"
          >
            <el-option
              :label="districts.areaName"
              :value="districts.areaCode"
              v-for="(districts, index) in district"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" class="biaoge_zi">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" class="biaoge_zi" required>
          <el-radio v-model="radioX" :label="1">身份证</el-radio>
          <el-radio v-model="radioX" :label="2">护照</el-radio>
          <el-radio v-model="radioX" :label="3">其他</el-radio>
        </el-form-item>
        <div v-if="radioX == '1'">
          <el-form-item
            label="身份证号"
            prop="cardType"
            class="biaoge_zi"
            required
          >
            <el-input v-model="form.cardType"></el-input>
          </el-form-item>
          <el-form-item class="biaoge_zi" required>
            <input
              type="file"
              class="files"
              @change="shangchuang1($event)"
              @mouseover="asdas('src2')"
            />
            <img :src="src2" alt="" class="shenfenz" />
            <div
              class="shenfenzs"
              v-if="src2.length < '200' && asdas1s == '1' && asdas1ss == 'src2'"
              @mouseout="asdas1"
            >
              <div
                class="iconfont icon-chakan tubiao"
                @click="chakan(src2)"
              ></div>
              <div
                class="iconfont icon-shanchu1 tubiao1"
                @click="shanchu('src2')"
              ></div>
            </div>
            <div class="shuming2">
              上传身份证正面
              <br />
              <span
                >请上传格式为jpg、png体积小于2MB的图片
                请确认图片各项内容清晰可见以便审核</span
              >
            </div>
          </el-form-item>
          <el-form-item class="biaoge_zi" required>
            <input
              type="file"
              class="files"
              @change="shangchuang($event)"
              @mouseover="asdas('src1')"
            />
            <img :src="src1" alt="" class="shenfenz" />
            <div
              class="shenfenzs"
              v-if="src1.length < '200' && asdas1s == '1' && asdas1ss == 'src1'"
              @mouseout="asdas1"
            >
              <div
                class="iconfont icon-chakan tubiao"
                @click="chakan(src1)"
              ></div>
              <div
                class="iconfont icon-shanchu1 tubiao1"
                @click="shanchu('src1')"
              ></div>
            </div>
            <div class="shuming2">
              上传身份证反面
              <br />
              <span
                >请上传格式为jpg、png体积小于2MB的图片
                请确认图片各项内容清晰可见以便审核</span
              >
            </div>
          </el-form-item>
        </div>
        <div v-else-if="radioX == '2'">
          <el-form-item
            label="护照"
            prop="cardType1"
            class="biaoge_zi"
            required
          >
            <el-input v-model="form.cardType1"></el-input>
          </el-form-item>
          <el-form-item class="biaoge_zi" required>
            <input type="file" class="files" @change="shangchuang3($event)" />
            <img :src="src2" alt="" class="shenfenz" />
            <div class="shuming2">
              上传护照
              <br />
              <span
                >请上传格式为jpg、png体积小于2MB的图片
                请确认图片各项内容清晰可见以便审核</span
              >
            </div>
          </el-form-item>
        </div>
        <div v-else-if="radioX == '3'">
          <el-form-item
            label="其他"
            prop="cardType1"
            class="biaoge_zi"
            required
          >
            <input type="file" class="files" @change="shangchuang4($event)" />
            <el-input v-model="form.cardType1"></el-input>
          </el-form-item>
          <el-form-item class="biaoge_zi" required>
            <img :src="src2" alt="" class="shenfenz" />

            <div class="shuming2">
              上传其他图片
              <br />
              <span
                >请上传格式为jpg、png体积小于2MB的图片
                请确认图片各项内容清晰可见以便审核</span
              >
            </div>
          </el-form-item>
        </div>
        <el-form-item label="账号有效期" class="biaoge_zi">
          <el-radio v-model="radios" :label="0" @change="youxiaoqi('0')"
            >长期有效</el-radio
          >
          <el-radio v-model="radios" :label="1" @change="youxiaoqi('1')"
            >设置有效期</el-radio
          >
        </el-form-item>
        <el-form-item
          label="有效期至"
          class="biaoge_zi"
          required
          v-if="radios == '1'"
        >
          <el-date-picker
            v-model="form.validityType"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <div class="bgBorderTwo">
      <tableTwo
        :table="table"
        @tableFuncCellback="tableFuncCellback"
      ></tableTwo>
    </div>
    <div class="bgBorderTwo">
      <div style="text-align: center">
        <el-button type="primary" @click="onSubmits" v-if="xiugai == '1'"
          >修改</el-button
        >
        <el-button type="primary" @click="onSubmit" v-else>立即创建</el-button>
        <el-button @click="quxiao">返回</el-button>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <img :src="srcc" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
var token = localStorage.getItem("certificate");

export default {
  name: "zaccountadd",
  data() {
    var checkEmail = (rule, value, callback) => {
      var mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    var checkPhone = (rule, value, callback) => {
      var phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    const idCardValidity = (rule, code, callback) => {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 ",
      };
      var tip = "";
      var pass = true;
      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          code
        )
      ) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        // tip = "地址编码错误"
        tip = "身份证输入错误";
        pass = false;
      } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
          code = code.split("");
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          // 校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          console.log(last);
          if (parity[sum % 11] != code[17] && "x" != code[17]) {
            // tip = "校验位错误"
            tip = "身份证输入错误";
            pass = false;
          }
        }
      }
      if (!pass) {
        callback(new Error(tip));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        region: "",
        region1: "",
        region2: "",
        email: "",
        phone: "",
        delivery: false,
        address: "",
        cardType: "",
        cardType1: "",
        validityType: "2500-12-31 23:59:59",
      },
      headers: { Authorization: token },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 70, message: "请输入少于35个汉字", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        cardType: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: idCardValidity, trigger: "blur" },
        ],
        cardType1: [
          { required: true, message: "请输入证件号", trigger: "blur" },
        ],
      },
      sex: [
        { name: "男", id: 1 },
        { name: "女", id: 2 },
        // { name: "其他", id: 3 },
      ],
      imageUrl: require("../../../assets/img/tupian.png"),
      radioX: "1",
      radios: "0",
      province: "",
      city: "",
      district: "",
      sda: "",
      rgkrfjoi: "",
      sadasitji: "",
      table: {
        // 表格操作数组
        operationList: [],
        // 操作块儿是否显示
        isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "180",
        // 表头数组
        header: [
          { name: "序号", prop: "projectNum", width: "auto" },
          { name: "项目编号", prop: "projectNum", width: "auto" },
          { name: "委托企业", prop: "companyName", width: "auto" },
          { name: "委托项目部", prop: "projectName", width: "auto" },
          {
            name: "选择角色",
            prop: "id13",
            width: "auto",
            type: "select",
            option: [],
          },
        ],
      },
      jpEntrustStaff: [],
      xiugai: "",
      id: "",
      list: "",
      src1: require("../../../assets/img/tupian.png"),
      src2: require("../../../assets/img/tupian.png"),
      src3: require("../../../assets/img/todo-3.png"),
      src: [],
      asdas1s: "0",
      dialogVisible: false,
      srcc: "",
      asdas1ss: "",
    };
  },
  mounted() {
    //console.log(this.$route.query.id);
    if (this.$route.query.id != undefined) {
      this.details(this.$route.query.id);
      this.id = this.$route.query.id;
      this.xiugai = this.$route.query.xiugai;
    } else {
      this.radioX = 1;
      this.radios = 0;
    }
    this.huoqudiqu();
  },
  methods: {
    details(e) {
      var url = this.apis + "/system/jp-sys-user/" + e;
      var obj = {};
      this.httpsapi
        .GET(url, obj)
        .then((response) => {
          if (response.code == "200") {
            // console.log(response);
            this.list = response.data;
            this.form.name = response.data.realName;
            this.form.region = response.data.provinceName;
            this.form.region1 = response.data.cityName;
            this.form.region2 = response.data.countyName;
            this.form.email = response.data.email;
            this.form.phone = response.data.phone;
            this.form.address = response.data.address;
            // if (response.data.sex == "1") {
            //   this.sda = "男";
            // } else if (response.data.sex == "2") {
            //   this.sda = "女";
            // } else {
            //   this.sda = "其他";
            // }
            this.sda = response.data.sex;
            this.radioX = response.data.cardType;
            if (this.radioX == "1") {
              this.form.cardType = response.data.cardNum;
            } else {
              this.form.cardType1 = response.data.cardNum;
            }

            this.radios = response.data.validityType;
            this.form.validityType = response.data.validityDate;
            if (
              response.data.cardImgBack != null &&
              response.data.cardImgBack != ""
            ) {
              this.src1 = this.tuurl + response.data.cardImgBack;
            }
            console.log(response.data.cardImgPositive);
            if (
              response.data.cardImgPositive != null &&
              response.data.cardImgPositive != ""
            ) {
              this.src2 = this.tuurl + response.data.cardImgPositive;
            }
            if (response.data.headImg != null && response.data.headImg != "") {
              this.src3 = this.tuurl + response.data.headImg;
            }
            // headImg
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    onSubmit() {
      //   console.log(this.src.src1)
      // return
      // /system/jp-sys-user

      this.$refs["form"].validate((valid) => {
        if (valid) {
          var provinceName = "";
          for (var i = 0; i < this.province.length; i++) {
            if (this.province[i].provinceCode == this.form.region) {
              provinceName = this.province[i].provinceName;
            }
          }
          //console.log(provinceName);
          var cityName = "";
          for (var i = 0; i < this.city.length; i++) {
            if (this.city[i].cityCode == this.form.region1) {
              cityName = this.city[i].cityName;
            }
          }
          var countyName = "";
          for (var i = 0; i < this.district.length; i++) {
            if (this.district[i].areaCode == this.form.region2) {
              countyName = this.district[i].areaName;
            }
          }
          // console.log(this.sda)
          // return
          var date = [];
          if (this.form.validityType != "2500-12-31 00:00:00") {
            var a = new Date(this.form.validityType);
            var b = a.getFullYear();
            if (a.getMonth() < "9") {
              var c = "0" + (a.getMonth() + 1);
            } else {
              var c = a.getMonth() + 1;
            }
            if (a.getDate() < "10") {
              var d = "0" + a.getDate();
            } else {
              var d = a.getDate();
            }
            var datetime = b + "-" + c + "-" + d + " " + "23:59:59";
            date.push(datetime);
          } else {
            date.push(this.form.validityType);
          }

          this.sadasitji = date;

          var url = this.apis + "/system/jp-sys-user";
          var jpSysUser = {
            address: this.form.address,
            // cardImgBack: this.src.src1.url,
            // cardImgPositive: this.src.src2.url,
            cardType: this.radioX,

            cityId: this.form.region1,
            cityName: cityName,
            countyId: this.form.region2,
            countyName: countyName,
            email: this.form.email,
            // isRoot: "1",
            jobNumber: this.list.jobNumber,
            phone: this.form.phone,
            provinceId: this.form.region,
            provinceName: provinceName,
            realName: this.form.name,
            sex: this.sda,
            status: "1",
            validityType: this.radios,
            spId: localStorage.getItem("spid"),
            validityDate: this.sadasitji[0],
          };
          if (this.radioX == "1") {
            jpSysUser["cardNum"] = this.form.cardType;
          } else {
            jpSysUser["cardNum"] = this.form.cardType1;
          }
          if (this.src.src1) {
            jpSysUser["cardImgBack"] = this.src.src1.url;
          }
          if (this.src.src2) {
            jpSysUser["cardImgPositive"] = this.src.src2.url;
          }
          if (this.src.src3) {
            jpSysUser["headImg"] = this.src.src3.url;
          }
          var obj = {
            jpEntrustStaff: this.jpEntrustStaff,
            jpSysUser: jpSysUser,
          };

          this.httpsapi
            .POST(url, obj)
            .then((response) => {
              if (response.code == "200") {
                //console.log(response.data);
                this.province = response.data;
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "success",
                });
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
              //console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    xingbie() {
      //console.log(this.sda);
    },
    sad() {},
    huoqudiqu() {
      var url = this.apis + "/ec/province-city-area/searchProvince";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          if (response.code == "200") {
            //console.log(response.data);
            this.province = response.data;
            this.provinceF();

            if (this.xiugai == "1") {
              this.clientlistX();
            } else {
              this.clientlist();
            }
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    provinceF() {
      var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (!reg.test(this.form.region)) {
        this.form.region1 = "";
        this.form.region2 = "";
      }
      var url = this.apis + "/ec/province-city-area/searchCity";
      var obj = {
        provinceCode: this.form.region,
      };
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          if (response.code == "200") {
            //console.log(response.data);
            this.city = response.data;
            this.cityF();
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    cityF() {
      var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (!reg.test(this.form.region)) {
        this.form.region2 = "";
      }

      var url = this.apis + "/ec/province-city-area/searchArea";
      var obj = {
        cityCode: this.form.region1,
      };
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          if (response.code == "200") {
            this.district = response.data;
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    clientlist() {
      // /system/jp-entrust/search/{page}/{size}
      var url = this.apis + "/system/jp-entrust/search/1/10000";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          if (response.code == "200") {
            //console.log(response.data);
            for (var i = 0; i < response.data.records.length; i++) {
              response.data.records[i].id13 = "";
              if (response.data.records[i].projectName.length >= "50") {
                response.data.records[i].projectName =
                  response.data.records[i].projectName.slice(0, 20) +
                  "..." +
                  response.data.records[i].projectName.slice(
                    response.data.records[i].projectName.length - 28,
                    -1
                  );
              }
              if (response.data.records[i].companyName == null) {
                response.data.records[i].companyName = "";
              }
              if (response.data.records[i].companyName.length >= "20") {
                response.data.records[i].companyName =
                  response.data.records[i].companyName.slice(0, 3) +
                  "..." +
                  response.data.records[i].companyName.slice(
                    response.data.records[i].companyName.length - 16,
                    -1
                  );
              }
            }
            // //console.log(response.data.records)
            this.table.Dataorigin = response.data.records;
            this.clientlists();
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    clientlists() {
      var url = this.apis + "/system/jp-entrust/queryRoleList";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          if (response.code == "200") {
            for (var i = 0; i < response.data.length; i++) {
              var a = {};
              a.value = response.data[i].id;
              response.data[i].value = response.data[i].id;
            }

            this.table.header[4].option = response.data;
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    clientlistX() {
      var url =
        this.apis + "/system/jp-sys-user/entrustStaffList/1/10/" + this.id;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          if (response.code == "200") {
            //console.log(response.data.records);
            for (var i = 0; i < response.data.records.length; i++) {
              response.data.records[i].id13 =
                response.data.records[i].updateUserId;
            }
            // //console.log(response.data.records)
            this.table.Dataorigin = response.data.records;
            this.clientlists();
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    tableFuncCellback(e, index) {
      //console.log(e);
      //console.log(e.companyName);
      var a = {};
      if (this.xiugai == "1") {
        a.companyName = e[0].companyName;
        a.id = e[0].id;
        a.projectName = e[0].projectName;
        a.projectNum = e[0].projectNum;
        a.roleId = e[0].id13;
        a.spId = localStorage.getItem("spid");
        this.jpEntrustStaff[index].push(a);
      } else {
        a.companyName = e[0].companyName;
        a.entrustId = e[0].id;
        a.projectName = e[0].projectName;
        a.projectNum = e[0].projectNum;
        a.roleId = e[0].id13;
        a.spId = localStorage.getItem("spid");
        this.jpEntrustStaff[index] = a;
      }
      console.log(this.jpEntrustStaff);
    },
    onSubmits() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          var provinceName = "";
          for (var i = 0; i < this.province.length; i++) {
            if (this.province[i].provinceCode == this.form.region) {
              provinceName = this.province[i].provinceName;
            }
          }
          //console.log(provinceName);
          var cityName = "";
          for (var i = 0; i < this.city.length; i++) {
            if (this.city[i].cityCode == this.form.region1) {
              cityName = this.city[i].cityName;
            }
          }
          var countyName = "";
          for (var i = 0; i < this.district.length; i++) {
            if (this.district[i].areaCode == this.form.region2) {
              countyName = this.district[i].areaName;
            }
          }
          var date = [];
          // if(this.form.validityType)
          if (this.form.validityType != "2500-12-31 23:59:59") {
            var a = new Date(this.form.validityType);
            var b = a.getFullYear();
            if (a.getMonth() < "9") {
              var c = "0" + (a.getMonth() + 1);
            } else {
              var c = a.getMonth() + 1;
            }
            if (a.getDate() < "10") {
              var d = "0" + a.getDate();
            } else {
              var d = a.getDate();
            }
            var datetime = b + "-" + c + "-" + d + " " + "00:00:00";
            date.push(datetime);
          } else {
            date.push(this.form.validityType);
          }

          this.sadasitji = date;
          var url = this.apis + "/system/jp-sys-user";
          var jpSysUser = {
            address: this.form.address,
            // cardImgBack: this.src.src1.url,
            // cardImgPositive: this.src.src2.url,
            cardType: this.radioX,

            email: this.form.email,
            // isRoot: "1",
            jobNumber: this.list.jobNumber,
            phone: this.form.phone,
            realName: this.form.name,
            sex: this.sda,
            status: "1",
            validityType: this.radios,
            spId: localStorage.getItem("spid"),
            validityDate: this.sadasitji[0],
            id: this.id,
          };

          if (this.radioX == "1") {
            jpSysUser["cardNum"] = this.form.cardType;
          } else {
            jpSysUser["cardNum"] = this.form.cardType1;
          }
          //           : this.form.region1,
          // cityName: cityName,
          // countyId: this.form.region2,
          // countyName: countyName,
          // provinceId: this.form.region,
          // provinceName: provinceName,
          var obj = {};
          var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
          if (reg.test(this.form.region1)) {
            console.log(this.list);
            obj["cityId"] = this.list.cityId;
            obj["cityName"] = this.list.cityName;
            obj["countyId"] = this.list.countyId;
            obj["countyName"] = this.list.countyName;
            obj["provinceId"] = this.list.provinceId;
            obj["provinceName"] = this.list.provinceName;
          } else {
            obj["cityId"] = this.form.region1;
            obj["cityName"] = cityName;
            obj["countyId"] = this.form.region2;
            obj["countyName"] = countyName;
            obj["provinceId"] = this.form.region;
            obj["provinceName"] = provinceName;
          }
          if (this.src.src1) {
            jpSysUser["cardImgBack"] = this.src.src1.url;
          }
          if (this.src.src2) {
            jpSysUser["cardImgPositive"] = this.src.src2.url;
          }
          if (this.src.src3) {
            jpSysUser["headImg"] = this.src.src3.url;
          }
          var obj = {
            jpEntrustStaff: this.jpEntrustStaff,
            jpSysUser: jpSysUser,
          };
          this.httpsapi
            .PUT(url, obj)
            .then((response) => {
              if (response.code == "200") {
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "success",
                });
              }
            })
            .catch((err) => {
              //console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    quxiao() {
      this.$router.go(-1);
    },
    youxiaoqi(e) {
      if (e == "0") {
        this.form.validityType = "2500-12-31 23:59:59";
      } else {
        this.form.validityType = "";
      }
    },
    shangchuang(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        that.src1 = this.result;
      };
      this.uploading.uploading(e, "2", "jpg/png", that, "src1");
    },
    shangchuang1(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        that.src2 = this.result;
      };
      this.uploading.uploading(e, "2", "jpg/png", that, "src2");
    },
    shangchuang2(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        that.src3 = this.result;
      };
      this.uploading.uploading(e, "2", "jpg/png", that, "src3");
    },
    shangchuang3(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        that.src2 = this.result;
      };
      this.uploading.uploading(e, "2", "jpg/png", that, "src2");
    },
    asdas(e) {
      this.asdas1s = "1";
      this.asdas1ss = e;
    },
    asdas1() {
      this.asdas1s = "0";
      this.asdas1ss = "";
    },
    chakan(e) {
      (this.dialogVisible = true), (this.srcc = e);
      console.log(e);
    },
    shanchu(e) {
      if (e == "src1") {
        this.src1 = require("../../../assets/img/tupian.png");
      } else if (e == "src2") {
        this.src2 = require("../../../assets/img/tupian.png");
        var a = {
          url: "",
        };
        this.src["src2"] = a;
      } else if (e == "src3") {
        this.src3 = require("../../../assets/img/tupian.png");
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>
<style scoped>
.title {
  width: 77px;
  height: 24px;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #000000;
  line-height: 24px;
  letter-spacing: 1px;
}
.biaoge {
  margin-top: 50px;
  width: 1024px;
}
.biaoge_zi {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: #e51d27;
  line-height: 21px;
  font-weight: bold;
  display: block;
  width: 900px;
}
.imgs {
  height: 54px !important;
  line-height: 54px !important;
}
.imgs img {
  width: 60px !important;
  height: 60px !important;
  background: #d8d8d8 !important;
  border: 1px solid #979797 !important;
}
.shuming1 {
  height: 19px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #000000;
  line-height: 19px;
  width: 245px;
  position: absolute;
  left: 74px;
  top: 12px;
}
.shuming1 span {
  width: 216px;
  height: 15px;
  font-size: 11px;
  font-family: MicrosoftYaHei;
  color: rgba(0, 0, 0, 0.5);
  line-height: 15px;
}
.shenfenz {
  width: 210px;
  height: 126px;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.shenfenzs {
  position: absolute;
  top: 0;
  width: 210px;
  height: 126px;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0.9;
  z-index: 10000000000000;
}
.shuming2 {
  height: 19px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #000000;
  line-height: 19px;
  width: 245px;
  position: absolute;
  left: 230px;
  top: 46px;
}
.shuming2 span {
  width: 216px;
  height: 15px;
  font-size: 11px;
  font-family: MicrosoftYaHei;
  color: rgba(0, 0, 0, 0.5);
  line-height: 15px;
}
.sada {
  margin-left: 10px !important;
}
.shurukuangi {
  width: 78% !important;
  float: left;
}
.xialakuang {
  width: 20% !important;
  float: left;
  margin-left: 12px;
}
.avatar-uploader /deep/.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 60px !important;
  height: 60px !important;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
.files {
  position: absolute;
  width: 25%;
  height: 87%;
  opacity: 0;
  cursor: pointer;
}

.tubiao {
  position: absolute;
  top: 40%;
  color: #fff;
  font-size: 17px;
  left: 36%;
}
.tubiao1 {
  position: absolute;
  top: 40%;
  color: #fff;
  font-size: 17px;
  left: 50%;
}
</style>

<template>
  <div>
    <div class="bgBorderTwo">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"
          ><span class="title">账号信息</span>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="chongzhimima_l">
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="xiugai"
            >
            </el-switch>
          </div>
        </el-col>
        <div class="chongzhimima_2">
          <span class="chongzhimima" @click="chongzhi">重置密码</span>
        </div>
      </el-row>
      <el-row :gutter="10" style="margin-top: 30px">
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <img :src="src1" alt="" class="image" />
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="xinxi1">
          <div>员工姓名：{{ xiangqing.realName }}</div>
          <div>
            员工性别：<span v-if="xiangqing.sex == '1'">先生</span
            ><span v-else-if="xiangqing.sex == '2'">女士</span
            ><span v-else-if="xiangqing.sex == '3'">其他</span>
          </div>
          <div>
            <span v-if="xiangqing.cardType == '1'">身份证号：</span
            ><span v-else-if="xiangqing.cardType == '2'">护照：</span
            ><span v-else>其他：</span> {{ xiangqing.cardNum }}
            <span style="color: #33b7f5" @click="chakan">查看证件</span>
          </div>
          <div>创建日期：{{ xiangqing.createTime }}</div>
        </el-col>
        <el-col :xs="15" :sm="15" :md="15" :lg="15" :xl="15" class="xinxi1">
          <div>电子邮箱：{{ xiangqing.email }}</div>
          <div>手机号码：{{ xiangqing.phone }}</div>
          <div>
            通讯地址：{{ xiangqing.provinceName }}{{ xiangqing.cityName
            }}{{ xiangqing.countyName }}{{ xiangqing.address }}
          </div>
          <div>
            账号有效期：<span v-if="xiangqing.validityType == '0'"
              >长期有效</span
            ><span v-else>{{ xiangqing.validityDate }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bgBorderTwo">
      <el-row :gutter="10">
        <el-col :span="12"
          ><span
            style="line-height: 44px; font-size: 19px"
            :class="xuanzes == '0' ? 'wenzis' : 'wenzi'"
            @click="xuanze('0')"
            >岗位信息</span
          >
          <span
            style="line-height: 44px; font-size: 19px; margin-left: 20px"
            :class="xuanzes == '1' ? 'wenzis' : 'wenzi'"
            @click="xuanze('1')"
            >操作日志</span
          >
        </el-col>
      </el-row>
      <div v-show="xuanzes == '0'">
        <tables
          :MHeight="MHeight"
          :Dataorigin="Dataorigin"
          :header="header"
          :isoperation="isoperation"
          :operationW="operationW"
          :condition="condition"
        ></tables>
      </div>
      <div v-show="xuanzes == '1'">
        <tables
          :MHeight="MHeight1"
          :Dataorigin="Dataorigin1"
          :header="header1"
          :operationW="operationW1"
          :condition="condition1"
        ></tables>
      </div>
    </div>
    <div class="bgBorderThree">
      <div class="el-b">
        <el-button class="el-noColor" @click="fanhui">返回</el-button>
      </div>
    </div>
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <img :src="src2" alt="" style="width: 100%" />
        <img :src="src3" alt="" style="width: 100%" />
      </el-dialog>
  </div>
</template>

<script>
import Tables from "../../table/table.vue";
export default {
  name: "xiangqing",
  data() {
    return {
      dialogVisible: false,
      id: "",
      xiangqing: "",
      xuanzes: "0",
      MHeight: "auto",
      searchFormArr: [
        {
          fieldName: "员工",
          type: "input",
          field: "name",
          placeholder: "请输入角色名称"
        },
        {
          fieldName: "创建时间",
          type: "date",
          field: "phone",
          placeholder: "姓名/手机号/邮箱"
        },
        {
          fieldName: "处理结果",
          type: "select",
          field: "state1",
          option: [
            { id: "1", text: "启用" },
            { id: "0", text: "禁用" }
          ]
        }
      ],
      isAccording: false,

      isoperation: false,
      Dataorigin: [],
      condition: false,
      operationW: "180",

      header: [
        {
          name: "项目编号",
          prop: "project_num"
        },
        {
          name: "委托企业",
          prop: "company_name"
        },
        {
          name: "委托项目部",
          prop: "project_name"
        },
        {
          name: "选择角色",
          prop: "name"
        }
      ],
      MHeight1: "auto",

      Dataorigin1: [],
      condition1: false,
      operationW1: "180",

      header1: [
        {
          name: "登录ip",
          prop: "operationIp"
        },
        {
          name: "事件",
          prop: "operationEvent"
        },
        {
          name: "操作时间",
          prop: "createTime"
        }
      ],
      value: true,
      src1: require("../../../assets/img/todo-3.png"),
      src2: "",
      src3: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.gwlist();
  },
  components: {
    Tables
  },
  methods: {
    xinxi() {
      //
      var url = this.apis + "/system/jp-sys-user/gwList/" + this.id;
      var that = this;
      var obj = {};
      this.httpsapi
        .GET(url, obj)
        .then(response => {
          //console.log(response);

          this.Dataorigin = response.data;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    xuanze(e) {
      this.xuanzes = e;
    },
    gwlist() {
      var url = this.apis + "/system/jp-sys-user/" + this.id;
      var obj = {};
      this.httpsapi
        .GET(url, obj)
        .then(response => {
          //console.log(response);
          if (response.data.headImg != null && response.data.headImg != "") {
            this.src1 = this.tuurl + response.data.headImg;
          }
          if (
            response.data.cardImgBack != null &&
            response.data.cardImgBack != ""
          ) {
            this.src2 = this.tuurl + response.data.cardImgBack;
          }
          console.log(response.data.cardImgPositive);
          if (
            response.data.cardImgPositive != null &&
            response.data.cardImgPositive != ""
          ) {
            this.src3 = this.tuurl + response.data.cardImgPositive;
          }
          if (response.data.status == "0") {
            this.value = false;
          } else {
            this.value = true;
          }
          this.xiangqing = response.data;
          this.xinxi();
          this.xinxi1();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    xinxi1() {
      var url = this.apis + "/log/jp-sys-operation-log/search/1/10";
      var obj = {
        createUserId: this.id
      };
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          //console.log(response.data.records);
          this.Dataorigin1 = response.data.records;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    fanhui() {
      this.$router.go(-1);
    },
    xiugai(e) {
      console.log(e);
      this.$confirm("确认关闭？")
        .then(res => {
          var statuss = "";
          if (e == false) {
            statuss = "0";
          } else if (e == true) {
            statuss = "1";
          }
          var url = this.apis + "/system/jp-sys-user/updateStatus";
          var obj = {
            id: this.id,
            status: statuss
          };
          this.httpsapi
            .PUT(url, obj)
            .then(response => {
              ////console.log(response);
            })
            .catch(err => {});
        })
        .catch(() => {
          this.gwlist();
        });
    },
    chongzhi() {
      this.$confirm(
        "密码将随机生成并发送至于账号绑定的手机号为" +
          this.xiangqing.phone +
          "的手机上",
        "确认重置密码吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      )
        .then(() => {
          var url = this.apis + "/resetPassword";
          var obj = {
            id:this.id,
            phone:this.xiangqing.phone
          };
          this.httpsapi
            .POST2(url, obj)
            .then(response => {
              this.$message({
                showClose: true,
                offset: 400,
                message: response.message,
                type: "success"
              });
            })
            .catch(err => {
              //console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    chakan(e) {
      this.dialogVisible = true;
    }
  }
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
.chongzhimima {
  width: 84px;
  height: 32px;
  background: #2db7f5;
  border-radius: 4px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #ffffff;
  line-height: 19px;
  padding: 10px;
  cursor: pointer;
}
.chongzhimima_l {
  position: absolute;
  right: 0;
  top: 2px;
}
.chongzhimima_2 {
  position: absolute;
  right: 0;
  top: 60px;
  z-index: 100000;
}
.image {
  width: 64px;
  height: 64px;
}
.xinxi1 div {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #333333;
  line-height: 34px;
}
.wenzi {
  width: 64px;
  height: 21px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: #000000;
  line-height: 21px;
  cursor: pointer;
}
.wenzis {
  width: 64px;
  height: 21px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: #2db7f5;
  line-height: 21px;
  cursor: pointer;
}
</style>

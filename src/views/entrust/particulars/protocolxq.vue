<template>
  <div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">委托订单号：{{xiangqing.entrustInforNum}}</div>
        <div class="theTitle el-pull-left" style="float: right">
          <div class="title_right">
            <div class="title_right_text">{{ xiangqing.status }}</div>
          </div>
        </div>
      </div>
      <!-- 详情 -->
      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托企业</span>：</label>
          <div class="tCon">
            {{ xiangqing.enterName }}
            <div class="theTitle el-pull-left" style="float: right">
              <div class="title_right">
                <div
                  class="title_right_butt"
                  @click="xiazai(xiangqing.contractUrl)"
                >
                  下载合同
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托项目部</span>：</label>
          <div class="tCon">{{ xiangqing.projectName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托工单号</span>：</label>
          <div class="tCon">{{ xiangqing.entrustNumber }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>签署方式</span>：</label>
          <div class="tCon">{{ xiangqing.signType }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>创建人</span>：</label>
          <div class="tCon">{{ xiangqing.realName }} {{ xiangqing.phone }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>创建时间</span>：</label>
          <div class="tCon">
            {{ xiangqing.createTime }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>乙方签章人</span>：</label>
          <div class="tCon">
            {{ xiangqing.bLegalRepresentative }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>乙方签章时间</span>：</label>
          <div class="tCon">{{ xiangqing.effectiveDate }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>甲方签章人</span>：</label>
          <div class="tCon">{{ xiangqing.aLegalRepresentative }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>生效时间</span>：</label>
          <div class="tCon">{{ xiangqing.effectiveDate }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>处置期限</span>：</label>
          <div class="tCon">{{ xiangqing.dealDate }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>清运期限</span>：</label>
          <div class="tCon">{{ xiangqing.dealwithDate }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>详细说明</span>：</label>
          <div class="tCon">{{ xiangqing.detailedExplain }}</div>
        </div>
      </div>
    </div>
    <div class="bgBorderTwo">
      <el-menu
        :default-active="handleSelects"
        text-color="#000"
        class="el-menu-demo el-menu-color"
        mode="horizontal"
      >
        <el-menu-item index="0">日志</el-menu-item>
      </el-menu>
      <tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationW="operationW"
        :condition="condition"
        @operationsss="operationsss"
        v-if="xiangqings == '0'"
      ></tables>
    </div>
  </div>
</template>

<script>
import Tables from "../../table/table.vue";

export default {
  name: "orderPa",
  data() {
    return {
      xiangqing: [],
      MHeight: "auto",
      isoperation: false,
      Dataorigin: [],
      condition: false,
      operationW: "180",

      header: [
        { name: "时间", prop: "createTime" },
        { name: "操作人", prop: "createUserName" },
        { name: "事件", prop: "remark" },
        { name: "备注", prop: "content" }
      ],
      id: "",
      xiangqings: "0",
      dijia: "",
      nppage: 1,
      size: 10,
      total: 0,
      handleSelects: "0"
    };
  },
  components: {
    Tables
  },
  mounted() {
    this.id = this.$route.query.id;
    this.huoqulist();
    this.rizhi();
  },
  methods: {
    operationsss(e) {
      console.log(e);
    },
    huoqulist() {
      var url =
        this.apis +
        "/entrust/jp-entrust-agreement/queryAgreementById/" +
        this.id;
      var obj = {};
      // return;
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);
          if (response.data.signType == "1") {
            response.data.signType = "线上签署";
          } else if (response.data.signType == "2") {
            response.data.signType = "线下签约";
          }
          if (response.data.status == "1") {
            response.data.status = "待签章";
          } else if (response.data.status == "2") {
            response.data.status = "待生效";
          }else if (response.data.status == "3") {
            response.data.status = "已生效";
          }else if (response.data.status == "4") {
            response.data.status = "作废";
          }
          this.xiangqing = response.data;

          //   this.listing();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    rizhi() {
      // /entrust/jp-entrust-agreement/queryLogByAgreementNum
      var url =
        this.apis +
        "/entrust/jp-entrust-agreement/queryLogByAgreementNum/" +
        this.id;
      var obj = {};
      // return;
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].createUserName =
              response.data[i].createUserName +
              " " +
              response.data[i].jobNumber;
          }
          this.Dataorigin = response.data;
          this.total = response.count;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    xiazai(e) {
      console.log(e);
      window.open(this.tuurl + e);
      // let a = document.createElement('a')
      // a.href = this.tuurl + e // 这里的请求方式为get，如果需要认证，接口上需要带上token
      // a.click()
      // window.location.href = this.tuurl + e;
    }
  }
};
</script>

<style scoped>
.el-title {
  margin: 15px 0;
}
.theTitle {
  height: 42px;
  font-size: 20px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
  line-height: 30px;
}
.theBtn .el-button {
  width: 84px;
  height: 32px;
  padding: 0;
  background: #fa9912;
  border: 1px solid #fa9912 !important;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}

.el-detail-item {
  line-height: 25px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 25px;
  margin: 12px 0;
}
.el-detail-item label {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}
.el-detail-item .tCon {
  margin-left: 135px;
  word-break: break-all;
  word-wrap: break-word;
}
.el-detail-item label span {
  width: 120px;
  text-align: justify;
  text-align-last: justify;
  display: inline-block;
}
.el-detail-2 {
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #cfcfcf;
}

.Cord-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 25px;
  line-height: 40px;
  font-weight: bold;
  font-size: 14px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  color: #000000;
}
.Cord-header .el-button {
  margin-top: 5px;
  min-width: 88px;
}
.table {
  margin: 15px;
  padding-top: 15px;
  padding-bottom: 30px;
  max-width: 100%;
}

.el-b {
  padding: 15px 0;
  text-align: center;
}
.title_right_butt {
  width: 84px;
  height: 32px;
  background: #2db7f5;
  border-radius: 4px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #ffffff;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
.title_right_text {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: #2db7f5;
  line-height: 21px;
}
</style>

<template>
  <div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">保证金管理</div>
      </div>
      <!-- 详情 -->
      <div class="el-detail el-detail-2">
        <div class="theTitle el-pull-left">{{ data.title }}</div>
        <div class="theBtn el-pull-right">
          <el-button>{{ data.statusName }}</el-button>
        </div>
      </div>
      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>竞价单号</span>：</label>
          <div class="tCon">{{ data.code }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托单位</span>：</label>
          <div class="tCon">{{ data.saleCompanyName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托项目部</span>：</label>
          <div class="tCon">{{ data.saleDeptName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>询价联系人</span>：</label>
          <div class="tCon">{{ data.contacts }} {{ data.contactsTel }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>报名截止时间</span>：</label>
          <div class="tCon">{{ data.signEndTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>竞价开始日期</span>：</label>
          <div class="tCon">{{ data.offerStartTime }}</div>
        </div>
      </div>
      <div class="el-detail el-detail-2">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>是否缴纳保证金</span>：</label>
          <div class="tCon">{{ data.bondType }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>保证金金额</span>：</label>
          <div class="tCon">{{ data.bondAmt }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>收款账户名</span>：</label>
          <div class="tCon">{{ data.account }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>保证金收款账户</span>：</label>
          <div class="tCon">{{ data.accountNo }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>开户行</span>：</label>
          <div class="tCon">{{ data.openBank }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>来款备注</span>：</label>
          <div class="tCon">{{ data.bondRemark }}</div>
        </div>
      </div>

      <div class="bgBorderThree">
        <div class="Cord-header el-clearfix">
          <span>竞买人名单</span>
        </div>
        <div class="table" style="width: 98%">
          <tables
            :MHeight="MHeight"
            :Dataorigin="Dataorigin"
            :header="header"
            :isoperation="isoperation"
            :operationList="ioperationList"
            :operationW="operationW"
            :condition="condition"
            @operationsss="operationsss"
            @states="states"
          ></tables>
        </div>
      </div>
      <div class="bgBorderThree">
        <div class="el-b">
          <el-button class="el-blueColor">关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tables from "../../table/table.vue";
export default {
  name: "needDetail",
  data() {
    return {
      // 表格组件--开始

      // 表格操作数组
      ioperationList: [
        { name: "查看日志" },
        { name: "沉没" },
        { name: "退还" }
      ],
      // 操作块儿是否显示
      isoperation: true,
      // 数据数组
      Dataorigin: [],
      // 右侧操作宽度
      operationW: "80",
      // 表头数组
      header: [
        { name: "竞买人", prop: "buyerCompanyName" },
        { name: "联系方式", prop: "payUserTel" },
        { name: "报名日期", prop: "signEndTime" },
        { name: "缴纳方式", prop: "payWay" },
        { name: "保证金状态", prop: "status" },
        { name: "处置状态", prop: "name" },
        { name: "缴纳时间", prop: "payTime" },
        { name: "确认记录", prop: "confirmUserName" },
        { name: "汇款凭证", prop: "confirmTime" }
      ],
      // 表格组件--结束
      note: "", //备注
      id: "",
      data: ""
    };
  },
  components: {
    Tables
  },
  mounted() {
    this.id = this.$route.query.id;
    this.huoquuxiangqing();
  },
  methods: {
    huoquuxiangqing() {
      // /deposit/jp-re-bond/queryRebondDetailById
      var url =
        this.apis +
        "/deposit/jp-re-bond/queryRebondDetailById/" +
        this.id
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);

          // { id: "10", text: "未缴纳" },
          //   { id: "20", text: "未确认" },
          //   { id: "30", text: "已确认" },
          //   { id: "40", text: "未退还" },
          //   { id: "50", text: "已退还" },
          //   { id: "60", text: "已没收" },

           if (response.data.bondType == "1") {
            response.data.bondType = "无需缴纳";
          } else if (response.data.bondType == "2") {
            response.data.bondType = "线上";
          } else if (response.data.bondType == "3") {
            response.data.bondType = "线下";
          }
          this.data = response.data;
          this.listx();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    download1() {
      // this.table1.Dataorigin = [{xuhao:'1',code:'123132132',name:'zhang',nameZ:'zhang22'}]
    },
    // 列表1回调
    tableFuncCellback1(data) {
      //console.log(data)
    },

    // 备注失去焦点事件
    elTextarea() {
      // //console.log('少时诵诗书')
      //console.log(this.note)
    },
    listx() {
      // /deposit/jp-re-bond/auctionNameList
      var url =
        this.apis + "/deposit/jp-re-bond/auctionNameList/" + this.id ;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            if (response.data.status == "10") {
              response.data.status = "未缴纳";
            } else if (response.data.status == "20") {
              response.data.status = "未确认";
            } else if (response.data.status == "30") {
              response.data.status = "已确认";
            } else if (response.data.status == "40") {
              response.data.status = "未退还";
            } else if (response.data.status == "50") {
              response.data.status = "已退还";
            } else if (response.data.status == "60") {
              response.data.status = "已没收";
            }
          }

          this.Dataorigin = response.data;
        })
        .catch(err => {
          //console.log(err);
        });
    }
  }
};
</script>

<style space>
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
  margin-left: 118px;
  word-break: break-all;
  word-wrap: break-word;
}
.el-detail-item label span {
  width: 98px;
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
/* .el-textarea__inner {
  border:0;
  padding: 2px 0;
  height: 100px;
  min-height: 100px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
} */
</style>

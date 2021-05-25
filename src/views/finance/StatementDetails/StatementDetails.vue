<template>
  <div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">
          结算单单号:{{ xiangqings.takeCode }}
        </div>
        <div class="theTitle el-pull-left" style="float: right">
          <div class="title_right">
            <div class="title_right_text">{{ status }}</div>
          </div>
        </div>
      </div>
      <!-- 详情 -->
      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>订单单号</span>：</label>
          <div class="tCon">{{ xiangqings.orderCode }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>提货单号</span>：</label>
          <div class="tCon">{{ xiangqings.takeCode }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>创建时间</span>：</label>
          <div class="tCon">{{ xiangqings.takeCode }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>完成日期</span>：</label>
          <div class="tCon">{{ xiangqings.finishDateEnd }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托单位</span>：</label>
          <div class="tCon">{{ xiangqings.companyName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托部门</span>：</label>
          <div class="tCon">{{ xiangqings.projectName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>提货单位</span>：</label>
          <div class="tCon">{{ xiangqings.buyerCompanyName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>业务类型</span>：</label>
          <div class="tCon">{{ types }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>结算金额</span>：</label>
          <div class="tCon">{{ xiangqings.settlementAmount }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>结算金额(大写)</span>：</label>
          <div class="tCon">{{ Jiesuan }}</div>
        </div>
      </div>
    </div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">付款信息</div>
        <div class="theTitle el-pull-left" style="float: right">
          <div class="title_right">
            <div class="title_right_text">查看收款账户</div>
          </div>
        </div>
      </div>
      <!-- 详情 -->
      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>付款人</span>：</label>
          <div class="tCon">123456</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>付款方式</span>：</label>
          <div class="tCon">{{ xiangqings.payWay }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>付款时间</span>：</label>
          <div class="tCon">123456</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>付款说明</span>：</label>
          <div class="tCon">123456</div>
        </div>
      </div>
    </div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">发票</div>
      </div>
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
      <!-- <div class="paging">
        <el-pagination
          background="false"
          :page-size="size"
          pager-count="8"
          :current-page="page"
          layout="total, prev, pager, next,sizes,jumper"
          :total="total"
          @size-change="tablePageSize"
          @current-change="tableCurrentChange"
          @prev-click="tableCurrentChange"
          @next-click="tableCurrentChange"
        >
        </el-pagination>
      </div> -->
    </div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">结算日志</div>
      </div>
      <el-table :data="tableDatas" style="width: 100%">
        <el-table-column prop="name" label="操作人" width="180">
        </el-table-column>
        <el-table-column prop="date" label="操作时间" width="180">
        </el-table-column>
        <el-table-column prop="address" label="事件说明"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Tables from "../../table/table.vue";
import zhuanhua from "../../../views/Numberzhuanhua/idnex.js";
export default {
  name: "StatementDetails",
  data() {
    return {
      id: "",
      xiangqings: "",
      Jiesuan: "",
      status: "",
      types: "",
      MHeight: "auto",
      isoperation: true,
      Dataorigin: [],
      condition: false,
      operationW: "180",
      ioperationList: [
        {
          name: "查看"
        }
      ],
      header: [
        {
          name: "业务类型",
          prop: "type"
        },
        {
          name: "发票类型",
          prop: "invType"
        },
        {
          name: "上传日期",
          prop: "openInvoiceTime"
        },
        {
          name: "发票代码",
          prop: "invCode"
        },
        {
          name: "发票号",
          prop: "invNo"
        },
        {
          name: "开票主体",
          prop: "createCompanyName"
        },
        {
          name: "收票主体",
          prop: "receiveCompanyName"
        },
        {
          name: "金额",
          prop: "amount"
        },
        {
          name: "税率",
          prop: "taxRates"
        },
        {
          name: "税额",
          prop: "tax"
        },
        {
          name: "税价合计",
          prop: "totalTax"
        },
        {
          name: "开票时间",
          prop: "openInvoiceTime"
        }
      ],
      uuid: "",
      tableDatas: [
        {
          date: "2016-05-02",
          name: "1",
          address: "2"
        },
        {
          date: "2016-05-02",
          name: "1",
          address: "2"
        },
        {
          date: "2016-05-02",
          name: "1",
          address: "2"
        },
        {
          date: "2016-05-02",
          name: "1",
          address: "2"
        }
      ]
    };
  },
  components: {
    Tables
  },
  mounted() {
    this.id = this.$route.query.id;
    this.uuid = this.$route.query.uuid;
    this.xiangqing();
  },
  methods: {
    xiangqing() {
      //   /system/re-settlement/searchSettlement/{id}
      var url = this.apis + "/system/re-settlement/searchSettlement/" + this.id;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);
          this.xiangqings = response.data;
          this.Jiesuan = zhuanhua.smallToBig(response.data.settlementAmount);
          if (response.data.status == "10") {
            this.status = "待结算";
          } else if (response.data.status == "20") {
            this.status = "结算中";
          } else if (response.data.status == "30") {
            this.status = "结算完成";
          } else if (response.data.status == "100") {
            this.status = "失效作废";
          }
          if (response.data.type == "1") {
            this.types = "预付货";
          } else if (response.data.type == "2") {
            this.types = "货款支付";
          } else if (response.data.type == "3") {
            this.types = "货款退款";
          } else if (response.data.type == "4") {
            this.types = "服务费";
          }
          this.invoice();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    invoice() {
      var url = this.apis + "/system/re-settlement/invoiceList/" + this.uuid;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);
          this.Dataorigin = response.data;
        })
        .catch(err => {
          //console.log(err);
        });
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
.title_right {
  width: 74px;
  height: 32px;
  background: #2db7f5;
  border-radius: 4px;
}
.title_right_text {
  width: 100%;
  height: 19px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #ffffff;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
</style>

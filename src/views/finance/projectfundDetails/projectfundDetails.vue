<template>
  <div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">
          结算单单号:{{ xiangqings.settlementCode }}
        </div>
        <div class="theTitle el-pull-left" style="float: right">
          <div class="title_right">
            <div class="title_right_text">
              {{ xiangqings.settlementStatus }}
            </div>
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
          <div class="tCon">{{ xiangqings.deliveryCode }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>对账单编号</span>：</label>
          <div class="tCon">{{ xiangqings.accountNum }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>创建时间</span>：</label>
          <div class="tCon">{{ xiangqings.createTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>完成日期</span>：</label>
          <div class="tCon">{{ xiangqings.finishTimeStart }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>对账周期</span>：</label>
          <div class="tCon">
            {{ xiangqings.startDate }}至{{ xiangqings.endDate }}
          </div>
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
          <label class="el-pull-left"><span>对账状态</span>：</label>
          <div class="tCon">{{ xiangqings.accountStatus }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>业务类型</span>：</label>
          <div class="tCon">{{ xiangqings.settlementType }}</div>
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
          <div class="tCon">{{ fukuan.name }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>付款方式</span>：</label>
          <div class="tCon">{{ fukuan.payWay }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>付款时间</span>：</label>
          <div class="tCon">{{ fukuan.payTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>付款说明</span>：</label>
          <div class="tCon">{{ fukuan.remark }}</div>
        </div>
      </div>
    </div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">开票信息</div>
      </div>
      <!-- 详情 -->
      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>发票类型</span>：</label>
          <div class="tCon">{{ xiangqings.invoiceType }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>发票抬头</span>：</label>
          <div class="tCon">{{ xiangqings.title }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>纳税人识别号</span>：</label>
          <div class="tCon">{{ xiangqings.taxpayerNumber }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>地址</span>：</label>
          <div class="tCon">{{ xiangqings.address }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>开户行</span>：</label>
          <div class="tCon">{{ xiangqings.bankName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>帐号</span>：</label>
          <div class="tCon">{{ xiangqings.bankAccount }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>开票电话</span>：</label>
          <div class="tCon">{{ xiangqings.billingPhone }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>收票人</span>：</label>
          <div class="tCon">{{ xiangqings.payeeName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>收票地址</span>：</label>
          <div class="tCon">{{ xiangqings.payeeAddress }}</div>
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
        <el-table-column prop="userName" label="操作人" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" width="180">
        </el-table-column>
        <el-table-column prop="remark" label="事件说明"> </el-table-column>
      </el-table>
    </div>
    <div class="bgBorderThree">
      <div class="el-b">
        <el-button class="el-noColor" @click="back">返回</el-button>
      </div>
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
      ],
      fukuan: ""
    };
  },
  components: {
    Tables
  },
  mounted() {
    this.id = this.$route.query.id;
    this.uuid = this.$route.query.no;
    this.xiangqing();
  },
  methods: {
    xiangqing() {
      //   /system/re-settlement/searchSettlement/{id}
      var url = this.apis + "/system/jp-billing/searchBilling/" + this.id;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);

          this.Jiesuan = zhuanhua.smallToBig(response.data.settlementAmount);
          if (response.data.settlementStatus == "10") {
            response.data.settlementStatus = "待结算";
          } else if (response.data.settlementStatus == "20") {
            response.data.settlementStatus = "结算中";
          } else if (response.data.settlementStatus == "30") {
            response.data.settlementStatus = "结算完成";
          } else if (response.data.settlementStatus == "100") {
            response.data.settlementStatus = "失效作废";
          }
          if (response.data.settlementType == "1") {
            response.data.settlementType = "预付货";
          } else if (response.data.settlementType == "2") {
            response.data.settlementType = "货款支付";
          } else if (response.data.settlementType == "3") {
            response.data.settlementType = "货款退款";
          } else if (response.data.settlementType == "4") {
            response.data.settlementType = "服务费";
          }
          if (response.data.accountStatus == "1") {
            response.data.accountStatus = "余额支付";
          } else if (response.data.accountStatus == "2") {
            response.data.accountStatus = "转账汇款";
          } else if (response.data.accountStatus == "3") {
            response.data.accountStatus = "银联支付";
          }
          //   invoiceType
          if (response.data.invoiceType == "1") {
            response.data.invoiceType = "增值税专用发票";
          } else if (response.data.invoiceType == "2") {
            response.data.invoiceType = "增值税普通发票";
          } else if (response.data.invoiceType == "3") {
            response.data.invoiceType = "其他";
          }
          this.xiangqings = response.data;
          this.invoice();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    invoice() {
      var url = this.apis + "/system/jp-billing/searchPayInfo/" + this.id;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);
          this.fukuan = response.data;
          this.fapiao();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    fapiao() {
      var url = this.apis + "/system/jp-billing/searchInvoice/" + this.uuid;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          //   console.log(response.data);
          var array = [];
          for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].invoice);
            array.push(response.data[i].invoice);
          }
          this.Dataorigin = array;
          this.rizhi();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    rizhi() {
      var url = this.apis + "/system/jp-billing/searchBillingLog/" + this.id;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);
          this.tableDatas = response.data;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    back() {
      this.$router.go(-1);
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

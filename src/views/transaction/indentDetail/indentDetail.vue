<template>
  <div id="indentDetail">
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">订单号：{{ information.code }}</div>
        <div class="theBtn el-pull-right">
          <!-- 10.待确认，15.已驳回，20.待审批，30.执行中，50.已完成，100.失效作废") -->
          <el-button v-if="information.status == 10">待 确 认</el-button>
          <el-button v-if="information.status == 15">已 驳 回</el-button>
          <el-button v-if="information.status == 20">待 审 批</el-button>
          <el-button v-if="information.status == 30">执 行 中</el-button>
          <el-button v-if="information.status == 50">已 完 成</el-button>
          <el-button v-if="information.status == 100">失效/作废</el-button>
          <!-- amt -->
        </div>
      </div>
      <!-- 详情 -->
      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>订单来源</span>：</label>
          <div class="tCon">
            <span v-if="information.source == 1">竞价</span>
            <span v-if="information.source == 2">供求（废弃）</span>
            <span v-if="information.source == 3">供应</span>
            <span v-if="information.source == 4">求购</span>
            （{{ information.sceneCode }}）
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>订单金额</span>：</label>
          <div class="tCon fontWidhetRed">{{ information.amt }}元</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>创建日期</span>：</label>
          <div class="tCon">{{ information.createTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托单位</span>：</label>
          <div class="tCon">{{ information.companyName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托项目部</span>：</label>
          <div class="tCon">{{ information.projectName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>销方联系人</span>：</label>
          <div class="tCon">
            {{ information.contacts + " " + information.contactsTel }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>买受人</span>：</label>
          <div class="tCon">{{ information.buyerCompanyName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>买方联系人</span>：</label>
          <div class="tCon">
            {{ information.offerContacts + " " + information.offerContactsTel }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>清运期限</span>：</label>
          <div class="tCon">{{ information.takeDeliveryDate }}</div>
        </div>
        <br />
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>付款方式</span>：</label>
          <div class="tCon" v-if="information.payWay == 1">现金</div>
          <div class="tCon" v-if="information.payWay == 2">票据</div>
          <div class="tCon" v-if="information.payWay == 3">无要求</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>付款时间</span>：</label>
          <div class="tCon">成交后 {{ information.payTime }} 日内</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>货品所在地</span>：</label>
          <div class="tCon">{{ information.goodsAddr }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>税率</span>：</label>
          <div class="tCon">{{ information.taxRates }}</div>
        </div>
      </div>
    </div>
    <div class="bgBorderTwo" style="margin-bottom: 0;">
      <el-menu :default-active="0" text-color="#000" class="el-menu-demo el-menu-color" mode="horizontal" @select="handleSelect">
        <el-menu-item :index="0">标的信息</el-menu-item>
        <el-menu-item :index="1">审批信息</el-menu-item>
        <el-menu-item :index="2">提货单/磅单</el-menu-item>
        <el-menu-item :index="3">结算单</el-menu-item>
        <el-menu-item :index="4">订单日志</el-menu-item>
      </el-menu>
    </div>
    <div class="bgBorderThree" v-show="istabList == '0'">
      <div class="Cord-header el-clearfix">
        <span>标的物清单</span>
        <el-button class="el-blueColor el-pull-right" @click="exportList"
          >导出清单</el-button
        >
      </div>
      <div class="table">
        <tableTwo
          :table="table1"
          @tableFuncCellback="tableFuncCellback1"
        ></tableTwo>
      </div>
      <div class="bgBorderTwo widTab1">
        <div class="el-detail el-detail-1">
          <el-row>
            <el-col :span="16">
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>处置/计价方式</span>：</label>
                <div class="tCon">
                  {{matter.pricingMethod == 1? "按批次计价": matter.pricingMethod == 2? "按重量计价": ""}}
                </div>
              </div>
              <div class="el-detail-item el-clearfix" v-if="matter.pricingMethod == 2">
                <label class="el-pull-left"><span>单位价格</span>：</label>
                <div class="tCon">{{ matter.unitPriceTotal }}/吨</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left">
                  <span>税额（{{ matter.pricingMethod }}%）</span>：</label>
                <div class="tCon fontWidhetRed">{{ matter.taxAmount }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>金额</span>：</label>
                <div class="tCon fontWidhetRed">￥{{ matter.priceTotal }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>税价合计</span>：</label>
                <div class="tCon fontWidhetRed">{{ matter.taxAllTotal }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="bgBorderThree" v-show="istabList == '1'">
      <div class="Cord-header el-clearfix">
        <span>审批记录</span>
      </div>
      <div class="table">
        <div class="el-detail el-detail-1">
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>审批方式</span>：</label>
            <div class="tCon">{{ approvalArr.approvalType }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>模版名称</span>：</label>
            <div class="tCon">{{ approvalArr.tempName }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>审批金额</span>：</label>
            <div class="tCon">{{ approvalArr.amt }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>审批机制</span>：</label>
            <div class="tCon">{{ approvalArr.mode }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>审批附件</span>：</label>
            <div class="tCon">{{ approvalArr.approvalFile }}</div>
          </div>
        </div>
        <tableTwo
          :table="table2"
          @tableFuncCellback="tableFuncCellback2"
        ></tableTwo>
      </div>
    </div>
    <div class="bgBorderThree" v-show="istabList == '2'">
      <div class="Cord-header el-clearfix">
        <span>提货单/磅单</span>
        <el-button class="el-blueColor el-pull-right" @click="dawnloadB"
          >下载磅单</el-button
        >
      </div>
      <div class="table">
        <tableTwo
          :table="table3"
          @tableFuncCellback="tableFuncCellback3"
        ></tableTwo>
      </div>
    </div>
    <div class="bgBorderThree" v-show="istabList == '3'">
      <div class="Cord-header el-clearfix">
        <span>结算单</span>
      </div>
      <div class="table">
        <tableTwo
          :table="table4"
          @tableFuncCellback="tableFuncCellback4"
        ></tableTwo>
      </div>
    </div>
    <div class="bgBorderThree widTab2" v-show="istabList == '4'">
      <div class="Cord-header el-clearfix">
        <span>订单日志</span>
      </div>
      <div class="table" style="width: 670px;">
        <tableTwo
          :table="table5"
          @tableFuncCellback="tableFuncCellback5"
        ></tableTwo>
      </div>
    </div>

    <div class="bgBorderThree" style="margin-top: 15px;">
      <div class="el-b">
        <el-button class="el-noColor">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indentDetail",
  data() {
    return {
      istabList: "0",
      // 主体信息
      information: {
        source: "",
        createTime: "",
        createCompanyId: "",
        companyName: "",
        projectId: "",
        projectName: "",
        contacts: "",
        contactsTel: "",
        buyerCompanyName: "",
        offerContacts: "",
        offerContactsTel: "",
        takeDeliveryDate: "",
        paymentMethod: "",
        payTime: "",
        goodsAddr: "",
        taxRates: "",
        status: ""
      },
      // 表格组件--开始
      table1: {
        // 表格操作
        operationList: ["查看附件"],
        // 操作块儿显示类型
        isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "110",
        // 表头数组
        header: [
          { name: "标的名称", prop: "goodsName", width: "200" },
          { name: "规格", prop: "spec", width: "200" },
          { name: "品牌", prop: "brand", width: "200" },
          { name: "标的描述", prop: "desc", width: "200" },
          { name: "采购数量", prop: "num", width: "200" },
          { name: "金额/单价", prop: "uuids", width: "300" },
          { name: "税额", prop: "taxAmount", width: "300" },
          { name: "单位价格", prop: "unitPrice", width: "300" },
          { name: "税价合计", prop: "taxTotal", width: "300" }
        ]
      },
      table2: {
        // 表格操作
        operationList: [],
        // 操作块儿显示类型
        // isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "170",
        // 表头数组
        header: [
          { name: "审批次序", prop: "uuids", width: "120" },
          { name: "职务", prop: "uuids", width: "100" },
          { name: "审批人", prop: "approvalUserId", width: "100" },
          { name: "审批时间", prop: "approvalTime", width: "200" },
          { name: "审批状态", prop: "statusFlag", width: "100" },
          { name: "审批意见", prop: "remarks", width: "300" }
        ]
      },
      table3: {
        // 表格操作
        operationList: ["查看"],
        // 操作块儿显示类型
        isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "80",
        // 表头数组
        header: [
          { name: "提货单编号", prop: "orderCode", width: "300" },
          { name: "登记人", prop: "userName", width: "200" },
          { name: "登记时间", prop: "confirmTime", width: "200" },
          { name: "完成时间", prop: "finishTime", width: "200" },
          { name: "总量", prop: "takeTotalCount", width: "300" },
          { name: "总金额", prop: "takeAmt", width: "200" },
          { name: "状态", prop: "statusName", width: "200" },
          { name: "创建时间", prop: "createTime", width: "200" }
        ]
      },
      table4: {
        // 表格操作
        operationList: ["查看"],
        // 操作块儿显示类型
        isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "80",
        // 表头数组
        header: [
          { name: "结算单号", prop: "settlementNo", width: "200" },
          { name: "业务类型", prop: "typeName", width: "110" },
          { name: "结算金额", prop: "settlementAmount", width: "120" },
          { name: "状态", prop: "statusName", width: "100" },
          { name: "创建时间", prop: "createTime", width: "200" },
          { name: "完成日期", prop: "updateTime", width: "200" }
        ]
      },
      table5: {
        // 表格操作
        operationList: [],
        // 操作块儿显示类型
        // isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "170",
        // 表头数组
        header: [
          { name: "操作人", prop: "userName", width: "120" },
          { name: "操作时间", prop: "createTime", width: "200" },
          { name: "事件说明", prop: "remark", width: "350" }
        ]
      },
      // 表格组件--结束
      // 标的物
      matter: {
        pricingMethod: "",
        unitPriceTotal: "",
        priceTotal: "",
        taxAllTotal: ""
      },
      // 审批信息
      approvalArr: {
        approvalType: "",
        tempName: "",
        amt: "",
        mode: "",
        approvalFile: ""
      },
      dialogFormVisible: false,
      dialogFormVisibleActive: false,
      indentId: "", //单条数据的id
      indentUuids: ""
    };
  },
  mounted() {
    this.indentId = this.$route.query.id;
    this.ReverseVideo();
  },
  methods: {
    // tab查询
    handleSelect(index) {
      var that = this;
      that.istabList = index;
      if(index == 0){
        // 查询标的物
        that.subjectMatter();
      }else if(index == 1){
        // 审批信息
        that.approval();
      }else if(index == 2){
        // 提货单/榜单
        that.ladingList();
      }else if(index == 3){
        // 结算单
        that.statements();
      }else if(index == 4){
        // 订单日志
        that.orderLog();
      }
    },
    // 查询详情
    ReverseVideo(data) {
      var that = this;
      that.httpsapi
        .POST(that.apis + "/system/re-order/searchOrder/" + that.indentId)
        .then(result => {
          console.log(result)
          if (result.code == 200) {
            that.information = result.data;
            that.indentUuids = result.data.uuids;
            // 查询标的物
            that.subjectMatter();
          }
        });
    },
    // 查询标的物
    subjectMatter() {
      var that = this;
      that.httpsapi
        .POST( that.apis + "/system/re-order/searchGoodsList/" + that.indentUuids)
        .then(result => {
          console.log(result);
          if (result.code == 200) {
            that.matter = result.data;
            that.table1.Dataorigin = that.matter.list;
          }
        });
    },
    // 审批信息
    approval() {
      var that = this;
      that.httpsapi
        .POST(
          that.apis + "/system/re-order/searchApprovalList/" + that.indentUuids
        )
        .then(result => {
          // console.log(result)
          if (result.code == 200) {
            that.approvalArr = result.data;
            that.table2.Dataorigin = that.approvalArr.executeList;
          }
        });
    },
    // 提货单/榜单
    ladingList() {
      var that = this;
      that.httpsapi
        .POST(that.apis + "/system/re-order/searchTakeList/" + that.indentUuids)
        .then(result => {
          // console.log(result)
          if (result.code == 200) {
            result.data.forEach((item, index) => {
              if (item.status == "10") {
                item.statusName = "待确认";
              } else if (item.status == "20") {
                item.statusName = "已驳回";
              } else if (item.status == "30") {
                item.statusName = "已完成";
              } else if (item.status == "100") {
                item.statusName = "失效作废";
              }
            });
            that.table3.Dataorigin = result.data;
          }
        });
    },
    // 结算单
    statements() {
      var that = this;
      that.httpsapi
        .POST(
          that.apis + "/system/re-order/searchSettlementList/" + that.indentId
        )
        .then(result => {
          // console.log(result)
          if (result.code == 200) {
            result.data.forEach((item, index) => {
              if (item.type == "1") {
                item.typeName = "预付货";
              } else if (item.type == "2") {
                item.typeName = "货款支付";
              } else if (item.type == "3") {
                item.typeName = "货款退款";
              } else if (item.type == "4") {
                item.typeName = "服务费";
              }
              if (item.status == "10") {
                item.statusName = "待结算";
              } else if (item.status == "20") {
                item.statusName = "结算中";
              } else if (item.status == "30") {
                item.statusName = "结算完成";
              } else if (item.status == "100") {
                item.statusName = "失效作废";
              }
            });
            that.table4.Dataorigin = result.data;
          }
        });
    },
    // 订单日志
    orderLog() {
      var that = this;
      that.httpsapi
        .POST(that.apis + "/system/re-order/searchLogList/" + that.indentUuids)
        .then(result => {
          // console.log(result)
          if (result.code == 200) {
            that.table5.Dataorigin = result.data;
          }
        });
    },
    // 导出标的清单
    exportList() {
      var that = this;
      if (that.indentUuids == "") {
        that.$message({
          showClose: true,
          offset: 400,
          message: "导出失败，没有查询到订单信息",
          duration: "5000",
          type: "error"
        });
      }
      that.exports.exports(
        that.apis + "/system/re-order/expExcelGoods/" + that.indentUuids,
        {}
      );
    },
    dawnloadB() {
      var that = this;
      if (that.indentUuids == "") {
        that.$message({
          showClose: true,
          offset: 400,
          message: "下载失败，没有查询到订单信息",
          duration: "5000",
          type: "error"
        });
      }
      that.exports.exports(
        that.apis + "/system/re-order/expExcelTake/" + that.indentUuids,
        {}
      );
    },

    // 标的物清单
    tableFuncCellback1(data) {
      if(data[1] == '查看附件'){
        window.open(this.tuurl+data[0].filePath);
      }
    },
    tableFuncCellback2() {},
    tableFuncCellback3() {},
    tableFuncCellback4(data) {
      if (data[1] == "查看") {
        this.$router.push({
          name: "StatementDetails",
          query: {
            id: data[0].id
          }
        });
      }
    },
    tableFuncCellback5() {}
  }
};
</script>

<style space>
#indentDetail .el-title {
  margin: 15px 0;
}
#indentDetail .fontWidhetRed {
  font-size: 20px;
  font-weight: bold;
  color: #e02020;
}
#indentDetail .theTitle {
  height: 42px;
  font-size: 20px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
  line-height: 30px;
}
#indentDetail .theBtn .el-button {
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

#indentDetail .el-detail-item {
  line-height: 25px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 25px;
  margin: 12px 0;
}
#indentDetail .el-detail-item label {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}
#indentDetail .el-detail-item .tCon {
  margin-left: 104px;
  word-break: break-all;
  word-wrap: break-word;
}
#indentDetail .el-detail-item label span {
  width: 84px;
  text-align: justify;
  text-align-last: justify;
  display: inline-block;
}
#indentDetail .widTab1 .el-detail-item label span {
  width: 94px;
}

#indentDetail .bgBorderThree {
  margin: 0;
  margin-left: 15px;
}
#indentDetail .table {
  margin: 0 25px 0px 25px;
  /* padding-bottom: 30px; */
  max-width: 100%;
}
#indentDetail .el-b {
  padding: 15px 0;
  text-align: center;
}
#indentDetail .el-b .el-button {
  padding: 5px 15px;
  letter-spacing: 0px;
}
#indentDetail .subtitle {
  font-size: 12px;
  font-weight: 100;
  padding-left: 15px;
  color: #787878;
}
</style>

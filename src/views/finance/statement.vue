<template>
  <div>
    <searchui
      :searchFormArr="searchFormArr"
      @searchParma="searchParma"
      :isAccording="isAccording"
    ></searchui>
    <div class="bgBorderTwo">
      <el-menu
        :default-active="0"
        text-color="#000"
        class="el-menu-demo el-menu-color"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="0">全部</el-menu-item>
        <el-menu-item index="1">待结算</el-menu-item>
        <el-menu-item index="2">结算中</el-menu-item>
        <el-menu-item index="3">结算完成</el-menu-item>
        <el-menu-item index="4">失效作废</el-menu-item>

        <el-button
          class="el-pull-right Button-1 el-blueColor"
          size="medium"
          @click="needAdd()"
          >导出</el-button
        >
      </el-menu>
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
      <div class="paging">
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
      </div>
    </div>
  </div>
</template>

<script>
import Tables from "../table/table.vue";
export default {
  name: "statement",
  data() {
    return {
      searchFormArr: [
        {
          fieldName: "委托项目部",
          type: "select",
          field: "department",
          option: [
            // { id: "11", text: "个" },
            // { id: "22", text: "米" },
          ],
          placeholder: "请选择项目部"
        },
        {
          fieldName: "订单单号",
          type: "input",
          field: "enterprise",
          placeholder: "请搜索订单单号"
        },
        {
          fieldName: "委托公司",
          type: "input",
          field: "underlyingCode",
          placeholder: "请搜索销售单位名称"
        },
        {
          fieldName: "提货单单号",
          type: "input",
          field: "underlyingCode1",
          placeholder: "请搜索提货单单号"
        },
        {
          fieldName: "完成日期",
          type: "date",
          field: "time1",
          placeholder: ""
        },
        {
          fieldName: "结算单单号",
          type: "input",
          field: "underlyingCode2",
          placeholder: "请搜索结算单单号"
        },
        {
          fieldName: "创建日期",
          type: "date",
          field: "time2",
          placeholder: ""
        },
        {
          fieldName: "提货单位",
          type: "input",
          field: "underlyingCode3",
          placeholder: "请搜索采购单位名称"
        },
        {
          fieldName: "结算单状态",
          type: "selects",
          field: "cStatus",
          placeholder: "请选择",
          option: [
            { id: "10", text: "待结算" },
            { id: "20", text: "结算中" },
            { id: "30", text: "结算完成" },
            { id: "100", text: "失效/作废" }
          ]
        },
        {
          fieldName: "结算业务类型",
          type: "selects",
          field: "cStatus1",
          placeholder: "请选择",
          option: [
            { id: "1", text: "预付货" },
            { id: "2", text: "货款支付" },
            { id: "3", text: "货款退款" },
            { id: "4", text: "服务费" }
          ]
        },
        {
          fieldName: "登记人姓名",
          type: "input",
          field: "enterprise1",
          placeholder: "请搜索登记人姓名"
        }
      ],
      isAccording: true,
      MHeight: "auto",
      isoperation: true,
      Dataorigin: [],
      condition: false,
      operationW: "180",
      ioperationList: [
        {
          name: "查看详情"
        },
        {
          name: "付款"
        },
        {
          name: "查看收款账户"
        },
        {
          name: "重新支付"
        }
      ],
      header: [
        {
          name: "业务类型",
          prop: "orderCode"
        },
        {
          name: "提货单单号",
          prop: "takeCode"
        },
        {
          name: "结算单单号",
          prop: "settlementNo"
        },
        {
          name: "委托公司",
          prop: "companyName"
        },
        {
          name: "提货单位",
          prop: "buyerCompanyName"
        },
        {
          name: "付款方式",
          prop: "payWay"
        },
        {
          name: "结算金额",
          prop: "createUserId"
        },
        {
          name: "结算业务类型",
          prop: "settlementAmount"
        },
        {
          name: "状态",
          prop: "status"
        },
        {
          name: "登记人",
          prop: "realName"
        },
        {
          name: "创建时间",
          prop: "createTime"
        },
        {
          name: "完成时间",
          prop: "updateTime"
        }
      ],
      total: "",
      size: "10",
      page: "1",
      shuju: "",
      statuss: ""
    };
  },
  components: {
    Tables
  },
  mounted() {
    this.projectList();
    this.lists();
  },
  methods: {
    searchParma(e) {
      this.shuju = e;
      this.lists();
    },
    projectList() {
      var url = this.apis + "/system/jp-entrust-order/searchProjectList";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          this.searchFormArr[0].option = response.data;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    lists() {
      // console.log(zhuanhua.smallToBig('95486.566'))
      var e = this.shuju;
      var url =
        this.apis +
        "/system/re-settlement/search/" +
        this.page +
        "/" +
        this.size;
      var obj = {
        projectId: e.department,
        orderCode: e.enterprise,
        companyName: e.underlyingCode,
        takeCode: e.underlyingCode1,
        settlementNo: e.underlyingCode2,
        buyerCompanyName: e.underlyingCode3,
        status: this.statuss,
        // checkStatus: e.cStatus.join(","),
        // type: e.cStatus1.join(","),
        userName: e.enterprise1
      };
      if (e.cStatus) {
        obj["checkStatus"] = e.cStatus.join(",");
      }
      if (e.cStatus1) {
        obj["type"] = e.cStatus1.join(",");
      }
      if (e.time2) {
        obj["createTime"] = e.time2[0];
        obj["updateTime"] = e.time2[1];
      }
      if (e.time1) {
        obj["finishDateStart"] = e.time1[0];
        obj["finishDateEnd"] = e.time1[1];
      }
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);
          this.Dataorigin = response.data.records;
          this.total = response.data.total;
          this.size = response.data.size;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    handleSelect(e) {
      console.log(e);
      this.statuss = e;
    },
    needAdd() {
      this.exports.exports(
        this.apis + "/system/re-settlement/expExcelSettlement"
      );
    },
    operationsss(e, index) {
      // console.log('123')
      // console.log(e)
      // console.log(index)
      if (index == "查看详情") {
        this.particulars(e);
      }
    },
    particulars(e) {
      console.log(e.id);
      this.$router.push({
        name: "StatementDetails",
        query: { id: e.id, uuid: e.uuids }
      });
    }
  }
};
</script>

<style></style>

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
        <el-button
          class="el-pull-right Button-1 el-blueColor"
          size="medium"
          @click="needAdd()"
          >批量导入</el-button
        >
        <el-button
          class="el-pull-right Button-1 el-blueColor"
          size="medium"
          @click="daochu()"
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
    <fapiao
      :dialogVisibles="dialogVisibles"
      :shuju="shuju"
      @guanbi="guanbi"
    ></fapiao>
  </div>
</template>

<script>
import fapiao from "./fapiao.vue";
import Tables from "../table/table.vue";
export default {
  name: "invoice",
  data() {
    return {
      searchFormArr: [
        {
          fieldName: "业务类型",
          type: "select",
          field: "department",
          option: [
            { id: "1", text: "报名费" },
            { id: "2", text: "服务费" },
            { id: "3", text: "货款" },
            { id: "4", text: "沉默金发票" },
            { id: "5", text: "佣金发票" }
          ],
          placeholder: "请选择业务类型"
        },
        {
          fieldName: "发票类型",
          type: "select",
          field: "department1",
          option: [
            { id: "1", text: "增值税专用发票" },
            { id: "2", text: "增值税普通发票" },
            { id: "3", text: "其他" }
          ],
          placeholder: "请选择发票类型"
        },
        {
          fieldName: "完成日期",
          type: "date",
          field: "time1",
          placeholder: ""
        },
        {
          fieldName: "代码/发票号",
          type: "input",
          field: "enterprise",
          placeholder: "请搜索发票代码/发票号"
        },
        {
          fieldName: "开票主体",
          type: "input",
          field: "underlyingCode",
          placeholder: "请搜索开票主体"
        },
        {
          fieldName: "收票主体",
          type: "input",
          field: "underlyingCode1",
          placeholder: "请搜索收票主体"
        },
        {
          fieldName: "竞价单号/报价单号",
          type: "input",
          field: "underlyingCode2",
          placeholder: "请搜索竞价单号/报价单号"
        }
      ],
      isAccording: true,
      MHeight: "auto",
      isoperation: true,
      Dataorigin: [],
      condition: false,
      operationW: "180",
      ioperationList: {
        1: [
          {
            name: "查看"
          }
        ]
      },
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
          prop: "createTime"
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
      total: "",
      size: "10",
      page: "1",
      dialogVisibles: false,
      lists: ""
    };
  },
  components: {
    Tables,
    fapiao
  },
  mounted() {
    this.huoquleibiao();
  },
  methods: {
    huoquleibiao() {
      // /system/re-invoice/search/{page}/{size}
      var e = this.lists;
      var url =
        this.apis + "/system/re-invoice/search/" + this.page + "/" + this.size;
      var obj = {
        type: e.department,
        invType: e.department1,
        invNo: e.enterprise,
        createCompanyName: e.underlyingCode,
        receiveCompanyName: e.underlyingCode1,
        sceneCode: e.underlyingCode2
      };
      if (e.time1) {
        obj["createTimeStart"] = e.time1[0];
        obj["createTimeEnd"] = e.time1[1];
      }
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data.records);

          //  类型1报名费2：服务费3：货款4：沉默金发票5：佣金发票
          // 发票类型：1：增值税专用发票 ：2：增值税普通发票：3：其他"
          for (var i = 0; i < response.data.records.length; i++) {
            response.data.records[i]["status"] = "1";
            if (response.data.records[i].type == "1") {
              response.data.records[i].type = "报名费";
            } else if (response.data.records[i].type == "2") {
              response.data.records[i].type = "服务费";
            } else if (response.data.records[i].type == "3") {
              response.data.records[i].type = "货款";
            } else if (response.data.records[i].type == "4") {
              response.data.records[i].type == "沉默金发票";
            } else if (response.data.records[i].type == "5") {
              response.data.records[i].type = "佣金发票";
            }

            if (response.data.records[i].invType == "1") {
              response.data.records[i].invType = "增值税专用发票";
            } else if (response.data.records[i].invType == "2") {
              response.data.records[i].invType = "增值税普通发票";
            } else if (response.data.records[i].invType == "3") {
              response.data.records[i].invType = "其他";
            }
          }
          console.log(response.data.records);
          this.Dataorigin = response.data.records;
          this.total = response.data.total;
          this.size = response.data.size;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    daochu() {
      this.exports.exports(this.apis + "/system/re-invoice/expExcelInvoice");
    },
    tableCurrentChange(e) {
      this.page = e;
      this.huoquleibiao();
    },
    tablePageSize(e) {
      this.size = e;
      this.huoquleibiao();
    },
    operationsss(e) {
      console.log(e);
      this.shuju = e;
      this.dialogVisibles = true;
    },
    guanbi() {
      this.dialogVisibles = false;
    },
    searchParma(e) {
      console.log(e);
      this.lists = e;
      this.huoquleibiao();
    }
  }
};
</script>

<style></style>

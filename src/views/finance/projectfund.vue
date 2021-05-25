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
        @select="searchParma"
      >
        <el-menu-item index="0">全部</el-menu-item>
        <el-menu-item index="1">已开票</el-menu-item>
        <el-menu-item index="2">未开票</el-menu-item>
        <el-button class="el-pull-right Button-1 el-blueColor" size="medium"
          >批量导入</el-button
        >
        <input
          type="file"
          name=""
          id=""
          class="el-pull-right Button-1 el-blueColor filse"
          @change="needAdd($event)"
        />
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
        >
        </el-pagination>
      </div>
    </div>
    <fapiao :dialogVisibles="dialogVisibles" :shuju="shuju"></fapiao>
  </div>
</template>

<script>
import axios from "axios";
import Tables from "../table/table.vue";
export default {
  name: "projectfund",
  data() {
    return {
      searchFormArr: [
        {
          fieldName: "委托项目部",
          type: "select",
          field: "department",
          option: [],
          placeholder: "请选择项目部"
        },
        {
          fieldName: "订单单号",
          type: "input",
          field: "enterprise",
          placeholder: "请输入订单单号"
        },
        {
          fieldName: "委托公司",
          type: "input",
          field: "enterprise1",
          placeholder: "请输入委托公司"
        },
        {
          fieldName: "结算单单号",
          type: "input",
          field: "enterprise2",
          placeholder: "请输入结算单单号"
        },
        {
          fieldName: "完成日期",
          type: "date",
          field: "time1",
          placeholder: ""
        },
        {
          fieldName: "发票号",
          type: "input",
          field: "enterprise3",
          placeholder: "请搜索发票代码/发票号"
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
          field: "underlyingCode",
          placeholder: "请搜索提货单位"
        },
        {
          fieldName: "对账周期（起）",
          type: "date",
          field: "time3",
          placeholder: ""
        },
        {
          fieldName: "结算业务类型",
          type: "selects",
          field: "department1",
          option: [
            { id: "1", text: "预付货" },
            { id: "2", text: "货款支付" },
            { id: "3", text: "货款退款" },
            { id: "4", text: "服务费" }
          ],
          placeholder: "请选择结算业务类型"
        },
        {
          fieldName: "对账周期（止）",
          type: "date",
          field: "time4",
          placeholder: ""
        },
        {
          fieldName: "对账状态",
          type: "selects",
          field: "department2",
          option: [
            { id: "10", text: "待确认" },
            { id: "20", text: "已完成" },
            { id: "30", text: "已作废" }
          ],
          placeholder: "请选择对账状态"
        },
        {
          fieldName: "开票状态",
          type: "selects",
          field: "department3",
          option: [
            { id: "2", text: "已开票" },
            { id: "1", text: "未开票" }
          ],
          placeholder: "请选择开票状态"
        }
      ],
      isAccording: true,
      MHeight: "auto",
      isoperation: true,
      Dataorigin: [],
      condition: false,
      operationW: "180",
      ioperationList: {
        已开票: [
          {
            name: "查看"
          }
        ],
        未开票: [
          {
            name: "查看"
          },
          {
            name: "开具发票"
          }
        ]
      },
      header: [
        {
          name: "订单单号",
          prop: "orderCode"
        },
        {
          name: "结算单单号",
          prop: "settlementCode"
        },
        {
          name: "对账单编号",
          prop: "accountNum"
        },
        {
          name: "发票号",
          prop: "invoiceNo"
        },
        {
          name: "对账状态",
          prop: "accountAllStatus"
        },
        {
          name: "对账周期（起）",
          prop: "startDate"
        },
        {
          name: "对账周期（止）",
          prop: "endDate"
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
          prop: "settlementAmount"
        },
        {
          name: "结算业务类型",
          prop: "settlementType"
        },
        {
          name: "结算状态",
          prop: "settlementStatus"
        },
        {
          name: "开票状态",
          prop: "checkStatus"
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
          prop: "finishTime"
        }
      ],
      listAS: {},
      sStatus: "0",
      total: "",
      size: "10",
      page: "1",
      src: []
    };
  },
  components: {
    Tables
  },
  mounted() {
    this.huoqulist();
    this.huoquxingmu();
  },
  methods: {
    huoqulist() {
      var than = this;
      var url =
        than.apis + "/system/jp-billing/search/" + than.page + "/" + than.size;
      var obj = than.listAS;
      obj["settlementStatus"] = than.sStatus;

      than.httpsapi
        .POST(url, obj)
        .then(response => {
          for (var i = 0; i < response.data.records.length; i++) {
            if (response.data.records[i].status == "1") {
              response.data.records[i].status = "已开票";
            } else if (response.data.records[i].status == "2") {
              response.data.records[i].status = "未开票";
            }
          }
          console.log(response.data.records);
          than.Dataorigin = response.data.records;
          than.total = response.data.total;
          than.size = response.data.size;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    daochu() {
      this.exports.exports(this.apis + "/system/jp-billing/expExcelBilling");
    },
    huoquxingmu() {
      var url = this.apis + "/system/jp-entrust/searchProjectList";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);
          response.data.forEach(item => {
            this.searchFormArr[0].option.push({
              id: item.ecOrganizationId,
              text: item.projectName
            });
            // this.huoqulist()
          });
        })
        .catch(err => {
          //console.log(err);
        });
    },
    searchParma(e) {
      console.log(e);
      var obj = {
        projectId: e.department,
        orderCode: e.enterprise,
        companyName: e.enterprise1,
        settlementCode: e.enterprise2,
        invoiceNo: e.enterprise3,
        buyerCompanyName: e.underlyingCode,
        settlementAllType: e.department1.toString(),
        accountAllStatus: e.department2.toString(),
        checkStatus: e.department3.toString()
      };
      if (e.time1) {
        obj["finishTimeStart"] = e.time1[0];
        obj["finishTimeEnd"] = e.time1[1];
      }
      if (e.time2) {
        obj["createTime"] = e.time2[0];
        obj["updateTime"] = e.time2[1];
      }
      if (e.time3) {
        obj["startDateStart"] = e.time3[0];
        obj["startDateEnd"] = e.time3[1];
      }
      if (e.time4) {
        obj["endDateStart"] = e.time4[0];
        obj["endDateEnd"] = e.time4[1];
      }
      this.listAS = obj;
      this.huoqulist();
    },
    handleSelect(e) {
      console.log(e);
      this.sStatus = e;
      this.huoqulist();
    },
    tableCurrentChange(e) {
      this.page = e;
      this.huoqulist();
    },
    tablePageSize(e) {
      this.size = e;
      this.huoqulist();
    },
    operationsss(e, index) {
      console.log(index);
      if (index == "查看") {
        this.$router.push({
          name: "projectfundDetails",
          query: {
            id: e.id,
            no: e.invoiceNo
          }
        });
      } else if (index == "开具发票") {
        this.$router.push({
          name: "Inputinvoice",
          query: {
            id: e.id,
            no: e.invoiceNo
          }
        });
      }
    },
    needAdd(e) {
      var formData = new FormData();
      for (var i = 0; i < e.target.files.length; i++) {
        console.log(e.target.files[i]);
        formData.append("file", e.target.files[i]);
      }
      console.log(formData);
      axios({
        method: "POST",
        url: this.apis + "/system/re-invoice/importExcel",
        data: formData,
        header: {
          Authorization: localStorage.getItem("certificate")
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      //   var url = this.apis + "/system/re-invoice/importExcel";
      // // var obj = {
      // //   file: formData
      // // };
      // this.httpsapi
      //   .POST(url, formData)
      //   .then((response) => {
      //     console.log(response.data);

      //   })
      //   .catch((err) => {
      //     //console.log(err);
      //   });
    }
  }
};
</script>

<style scoped>
.filse {
  position: absolute;
  width: 7%;
  height: 87%;
  opacity: 0;
  cursor: pointer;
  right: -13px;
}
</style>

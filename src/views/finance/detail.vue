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
        <el-menu-item index="1">收入</el-menu-item>
        <el-menu-item index="2">支出</el-menu-item>
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
  </div>
</template>

<script>
import Tables from "../table/table.vue";
export default {
  name: "details",
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
          fieldName: "交易时间",
          type: "date",
          field: "time1",
          placeholder: ""
        },
        {
          fieldName: "流水号",
          type: "input",
          field: "enterprise",
          placeholder: "请搜索发票代码/发票号"
        },
        {
          fieldName: "金额范围",
          type: "input",
          field: "underlyingCode",
          placeholder: "请搜索开票主体"
        },
        {
          fieldName: "付款公司",
          type: "input",
          field: "underlyingCode1",
          placeholder: "请搜索收票主体"
        },
        {
          fieldName: "收款账户",
          type: "input",
          field: "underlyingCode2",
          placeholder: "请搜索竞价单号/报价单号"
        },
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
        }
      ],
      isAccording: true,
      MHeight: "auto",
      isoperation: false,
      Dataorigin: [],
      condition: false,
      operationW: "180",
      ioperationList: [
        {
          name: "查看"
        },
        {
          name: "开具发票"
        }
      ],
      header: [
        {
          name: "流水号",
          prop: "code"
        },
        {
          name: "业务类型",
          prop: "type"
        },
        {
          name: "付款公司",
          prop: "companyName"
        },
        {
          name: "收款账户",
          prop: "account"
        },
        {
          name: "交易类型",
          prop: "tradeTye"
        },
        {
          name: "资金用途",
          prop: "use"
        },
        {
          name: "金额",
          prop: "amt"
        },
        {
          name: "交易时间",
          prop: "tradeTime"
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
  mounted() {
    this.huoqulist();
  },
  components: {
    Tables
  },
  methods: {
    huoqulist() {
      //   /system/jp-billing/search/{page}/{size}
      var url = this.apis + "/system/re-invoice/outInAmtTest";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);
          this.Dataorigin = response.data;

          this.total = response.data.total;
          this.size = response.data.size;
        })
        .catch(err => {
          //console.log(err);
        });
    }
  }
};
</script>

<style></style>

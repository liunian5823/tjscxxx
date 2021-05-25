<template>
  <div>
    <searchui
      v-if="tableType == 'a'"
      :searchFormArr="searchFormArr1"
      @searchParma="searchParma"
      :isAccording="isAccording"
    ></searchui>
    <searchui
      v-if="tableType == 'b'"
      :searchFormArr="searchFormArr2"
      @searchParma="searchParma"
      :isAccording="isAccording"
    ></searchui>

    <div class="bgBorderTwo">
      <tableTwo
        :table="table1"
        @tableFuncCellback="tableFuncCellback1"
      ></tableTwo>
    </div>

    <div class="bgBorderTwo">
      <!-- 表格组件 -->
      <tableTwo
        :table="table"
        @tableFuncCellback="tableFuncCellback"
      ></tableTwo>
      <!-- 分页 -->
      <div class="paging">
        <el-pagination
          background="false"
          :page-size="pageSize"
          pager-count="8"
          :current-page="pageNum"
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
import downL from "../../../../request/wenjianxiazai.js";
export default {
  name: "CheckStatements",
  data() {
    return {
      isAccording: true,
      tableType: "a",
      tableStatus: 0,
      // 搜索组件数据
      searchFormArr1: [
        {
          fieldName: "委托单位",
          type: "input",
          field: "entrustProject",
          placeholder: "请选择"
        },
        {
          fieldName: "项目名称",
          type: "input",
          field: "title",
          placeholder: "请选择"
        },
        {
          fieldName: "委托订单号",
          type: "input",
          field: "workOrderNum",
          placeholder: "请选择"
        },
        {
          fieldName: "创建人",
          type: "input",
          field: "createUserName",
          placeholder: "请输入"
        },
        {
          fieldName: "创建时间",
          type: "date",
          field: "time1",
          placeholder: ""
        },
        { fieldName: "完成时间", type: "date", field: "time2", placeholder: "" }
      ],
      searchFormArr2: [
        {
          fieldName: "委托单位",
          type: "input",
          field: "entrustProject",
          placeholder: "请选择"
        },
        {
          fieldName: "项目名称",
          type: "input",
          field: "title",
          placeholder: "请选择"
        },
        {
          fieldName: "委托订单号",
          type: "input",
          field: "workOrderNum",
          placeholder: "请选择"
        },
        {
          fieldName: "对账单号",
          type: "input",
          field: "accountNum",
          placeholder: "请选择"
        },
        {
          fieldName: "创建人",
          type: "input",
          field: "createUserName",
          placeholder: "姓名/手机号"
        },
        {
          fieldName: "创建时间",
          type: "date",
          field: "time1",
          placeholder: ""
        },
        { fieldName: "完成时间", type: "date", field: "time2", placeholder: "" }
      ],
      // 表格组件--开始
      table: {
        // 表格操作数组
        operationList: ["查看"],
        // 操作块儿显示类型
        // isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "100",
        // 表头数组
        header: [
          {
            name: "委托订单编号",
            prop: "workOrderNum",
            width: "220",
            sortable: "custom"
          },
          {
            name: "委托部门",
            prop: "entrustProject",
            width: "150",
            sortable: "custom"
          },
          {
            name: "订单状态",
            prop: "statusCnsNo",
            width: "110",
            sortable: "custom"
          },
          {
            name: "创建人",
            prop: "createUserNameCnsNo",
            width: "110",
            sortable: "custom"
          },
          {
            name: "创建时间",
            prop: "createTime",
            width: "150",
            sortable: "custom"
          },
          {
            name: "完成时间",
            prop: "finishDate",
            width: "150",
            sortable: "custom"
          },
          {
            name: "累计处置金额",
            prop: "amountTotal",
            width: "150",
            sortable: "custom"
          },
          {
            name: "服务费金额",
            prop: "serviceAmt",
            width: "150",
            sortable: "custom"
          },
          {
            name: "订单笔数",
            prop: "accountOrderNum",
            width: "120",
            sortable: "custom"
          },
          {
            name: "沉没保证金",
            prop: "bondAmt",
            width: "120",
            sortable: "custom"
          },
          {
            name: "沉没笔数",
            prop: "bondNum",
            width: "120",
            sortable: "custom"
          }
        ]
      },
      table1: {
        // 表格操作数组
        operationList: [],
        // 操作块儿显示类型
        // isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        // operationW: "100",
        // 表头数组
        header: [
          {
            name: "",
            prop: "name",
            width: "100"
          },
          {
            name: "委托订单数（笔）",
            prop: "entrustTotal",
            width: "240"
          },
          {
            name: "结算金额合计（元）",
            prop: "reservePriceTotal",
            width: "240"
          },
          {
            name: "沉没保证金（元）",
            prop: "bondTotal",
            width: "240"
          }
        ]
      },
      // 表格组件--结束
      // 分页
      pageNum: 1,
      pageSize: 10,
      total: 0,
      param: {},
      search: {}
    };
  },
  mounted() {
    // 获取参数
    this.getPream();
    // 渲染表格
    this.QueryList();
  },
  methods: {
    // 获取参数
    // 获取参数
    getPream() {
      this.tableType = this.$route.query.tableType;
      this.param.status = this.$route.query.status;
      this.table1.Dataorigin = JSON.parse(localStorage.getItem("checkParmae"));
    },
    // 高级搜索
    searchParma(data) {
      var _this = this;
      var _obj = {};
      if (JSON.stringify(data) == "{}") {
        var item1, item2;
        for (item1 in _this.param) {
          for (item2 in _this.search) {
            if (item1 == item2) {
              delete _this.param[item2];
            }
          }
        }
      } else {
        if (data.hasOwnProperty("time1")) {
          data.createTime = data.time1[0];
          data.createTimeEnd = data.time1[1];
        }
        if (data.hasOwnProperty("time2")) {
          data.finishDate = data.time2[0];
          data.finishDateEnd = data.time2[1];
        }
        _obj = data;
        _this.search = data;
      }
      Object.assign(this.param, _obj);
      this.QueryList();
    },
    // 导出
    exportData() {
      downL.xiazai(
        this.apis + "/system/re-order/expExcelOrder",
        this.param,
        "订单"
      );
    },
    // 查询列表
    QueryList() {
      var that = this;
      var url =
        that.apis +
        "/statement/jp-account/queryAccountOrderTotalInfor/" +
        that.pageNum +
        "/" +
        that.pageSize;
      that.httpsapi
        .POST(url, this.param)
        .then(result => {
          console.log(result);
          if (result.code == 200) {
            var res = result.data.records;
            that.total = result.data.total;
            res.forEach(item => {
              item.createUserNameCnsNo =
                item.createUserName + " " + item.createUserPhone;
              if (item.status == 10) {
                item.statusCnsNo = "待确认";
              } else if (item.status == 20) {
                item.statusCnsNo = "已完成";
              } else if (item.status == 30) {
                item.statusCnsNo = "已作废";
              }
              item.amountTotal = !item.amountTotal
                ? "0元"
                : item.amountTotal + "元";
              item.serviceAmt = !item.serviceAmt ? "0" : item.serviceAmt + "元";
              item.accountOrderNum = !item.accountOrderNum
                ? "0元"
                : item.accountOrderNum + "笔";
              item.bondNum = !item.bondNum ? "0元" : item.bondNum + "笔";
            });

            that.table.Dataorigin = res;
            // var data2 = result.data2;
            // data2.forEach(item => {
            // 	item.createUserNameCnsNo = item.createUserName+' '+item.createUserPhone;
            // })
            // that.table4.Dataorigin = data2;
          }
        })
        .catch(err => {});
    },
    // 表格回调
    tableFuncCellback(data) {
      switch (data[1]) {
        case "查看":
          this.CheckDetails(data[0]);
          break;
        case "排序":
          this.sortingq(data[0]);
          break;
        default:
          break;
      }
    },
    // 表格回调
    tableFuncCellback1(data) {
      if (data[1] == "查看详情") {
        console.log(data);
        var _prem = "";
        if (data[0].name == "可结算") {
          _prem = "a";
        } else if (data[0].name == "已结算") {
          _prem = "b";
        } else if (data[0].name == "结算中") {
          _prem = "c";
        }
        this.$router.push({
          name: "",
          query: {
            tableType: _prem
          }
        });
      }
    },
    // 查看详情
    CheckDetails(data) {
      this.$router.push({
        name: "orderPa",
        query: {
          id: data.id
        }
      });
    },
    // 排序
    sortingq(data) {
      var reg = new RegExp("CnsNo", "g"),
        field;
      if (data.prop != null) {
        field = data.prop.replace(reg, "");
      } else {
        field = null;
      }
      this.param.orderBy = field;
      if (data.order == "descending") {
        var _order = 1;
      } else if (data.order == "ascending") {
        var _order = 2;
      } else {
        var _order = "";
      }
      this.param.descType = _order;
      this.QueryList();
    },
    // 当前页多少条发生改变时触发
    tablePageSize(val) {
      this.pageSize = val;
      this.QueryList();
    },
    // 当前页改变时触发
    tableCurrentChange(val) {
      this.pageNum = val;
      this.QueryList();
    }
  }
};
</script>

<style></style>

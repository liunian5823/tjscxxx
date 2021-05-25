<template>
  <div>
    <searchui
      :searchFormArr="searchFormArr"
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
      <el-menu
        :default-active="10"
        text-color="#000"
        class="el-menu-demo el-menu-color"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item :index="10">待确认</el-menu-item>
        <el-menu-item :index="20">已完成</el-menu-item>
        <el-menu-item :index="30">已作废</el-menu-item>
        <el-button
          class="el-pull-right Button-1 el-blueColor"
          size="medium"
          @click="cerateCheck"
          >创建对账单</el-button
        >
        <el-button
          class="el-pull-right Button-2 el-noColor"
          size="medium"
          @click="exportData"
          >导出</el-button
        >
      </el-menu>
      <!-- 表格组件 -->
      <!-- sortable -->
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
import downL from "../../request/wenjianxiazai.js";
export default {
  name: "checking",
  data() {
    return {
      isAccording: true,
      // 搜索组件数据
      searchFormArr: [
        {
          fieldName: "对账单号",
          type: "input",
          field: "accountNum",
          placeholder: "请选择"
        },
        {
          fieldName: "委托订单号",
          type: "input",
          field: "workOrderNum",
          placeholder: "请选择"
        },
        {
          fieldName: "状态",
          type: "selects",
          field: "checkStatus",
          placeholder: "请选择",
          option: [
            {
              id: 10,
              text: "待发布"
            },
            {
              id: 20,
              text: "已完成"
            },
            {
              id: 30,
              text: "已作废"
            }
          ]
        },
        {
          fieldName: "创建人",
          type: "input",
          field: "createUserName",
          placeholder: "姓名/手机号"
        },
        {
          fieldName: "员工编号",
          type: "input",
          field: "createUserCode",
          placeholder: "请输入"
        },
        {
          fieldName: "处理人姓名",
          type: "input",
          field: "handlerName",
          placeholder: "姓名/手机号"
        },
        {
          fieldName: "创建时间",
          type: "date",
          field: "time1",
          placeholder: ""
        },
        {
          fieldName: "对账周期起",
          type: "date",
          field: "time2",
          placeholder: ""
        },
        {
          fieldName: "对账周期止",
          type: "date",
          field: "time3",
          placeholder: ""
        }
      ],
      // 表格组件--开始
      table: {
        // 表格操作数组
        operationList: {
          "10": ["查看", "作废"],
          "20": ["查看"],
          "30": ["查看"]
        },
        // 操作块儿显示类型
        isoperation: true,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "100",
        // 表头数组
        header: [
          {
            name: "对账单号",
            prop: "accountNum",
            width: "220",
            sortable: "custom"
          },
          {
            name: "创建人",
            prop: "createUserNameCnsNo",
            width: "170",
            sortable: "custom"
          },
          {
            name: "创建时间",
            prop: "createTime",
            width: "150",
            sortable: "custom"
          },
          {
            name: "对账周期（起）",
            prop: "startDate",
            width: "170",
            sortable: "custom"
          },
          {
            name: "对账周期（止）",
            prop: "endDate",
            width: "170",
            sortable: "custom"
          },
          {
            name: "结算天数",
            prop: "accountDayCnsNo",
            width: "100",
            sortable: "custom"
          },
          {
            name: "结算订单",
            prop: "accountOrderNumCnsNo",
            width: "110",
            sortable: "custom"
          },
          {
            name: "状态",
            prop: "statusCnsNo",
            width: "80",
            sortable: "custom"
          },
          {
            name: "处理人",
            prop: "handlerIdCnsNo",
            width: "120",
            sortable: "custom"
          },
          {
            name: "完成日期",
            prop: "handleTime",
            width: "150",
            sortable: "custom"
          },
          {
            name: "结算金额",
            prop: "settlementAmt",
            width: "150",
            sortable: "custom"
          },
          {
            name: "佣金金额",
            prop: "commissionAmt",
            width: "150",
            sortable: "custom"
          },
          {
            name: "沉没保证金",
            prop: "bondAmt",
            width: "150",
            sortable: "custom"
          },
          {
            name: "沉没笔数",
            prop: "bondNumCnsNo",
            width: "150",
            sortable: "custom"
          }
        ]
      },
      table1: {
        // 表格操作数组
        operationList: ["查看详情"],
        // 操作块儿显示类型
        isoperation: false,
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
      param: {
        checkStatus: [10]
      },
      search: {}
    };
  },
  mounted() {
    // 渲染表格
    this.QueryList();
  },
  methods: {
    // 高级搜索
    searchParma(data) {
      // console.log(data)
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
        if (data.time1) {
          data.createTime = data.time1[0];
          data.createTimeEnd = data.time1[1];
        }
        if (data.time2) {
          data.startDate = data.time2[0];
          data.startDateEnd = data.time2[1];
        }
        if (data.time3) {
          data.endDate = data.time3[0];
          data.endDateEnd = data.time3[1];
        }
        _obj = data;
        _this.search = data;
      }
      Object.assign(this.param, _obj);
      this.QueryList();
    },
    // 创建对账单
    cerateCheck() {
      this.$router.push({
        name: "CheckAdd",
        query: {
          type: 1
        }
      });
    },
    // 导出
    exportData() {
      downL.exports(
        this.apis +
          "/statement/jp-account/exportExcel/" +
          this.pageNum +
          "/" +
          this.pageSize,
        this.param,
        "对账"
      );
    },
    // 查询列表
    QueryList() {
      var _this = this;
      var url =
        _this.apis +
        "/statement/jp-account/queryAccountByCondition/" +
        _this.pageNum +
        "/" +
        _this.pageSize;
      _this.httpsapi
        .POST(url, _this.param)
        .then(result => {
          console.log(result);
          if (result.code == 200) {
            var _result = result.data.records;
            _this.total = result.data.total;
            _result.forEach((item, index) => {
              for (var i = 0; i < _this.searchFormArr[2].option.length; i++) {
                if (item.status == _this.searchFormArr[2].option[i].id) {
                  _result[index].statusCnsNo =
                    _this.searchFormArr[2].option[i].text;
                }
              }
              item.createUserNameCnsNo =
                item.createUserName + " " + item.createUserPhone;
              item.accountDayCnsNo = item.accountDay + "天";
              item.accountOrderNumCnsNo =
                item.accountOrderNum == null
                  ? "0笔"
                  : item.accountOrderNum + "笔";
              item.bondNumCnsNo =
                item.bondNum == null ? "0笔" : item.bondNum + "笔";
              item.handlerIdCnsNo =
                item.handlerId == null
                  ? ""
                  : item.handlerId + " " + item.handlerIdPhone == null
                  ? ""
                  : item.handlerIdPhone;
            });
            _this.table.Dataorigin = _result;
            _this.table1.Dataorigin = result.data1;
          }
        })
        .catch(err => {});
    },
    // 点击tab导航搜索
    handleSelect(index) {
      this.param.checkStatus = [Number(index)];
      this.QueryList();
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
        case "作废":
          this.invalid(data[0]);
          break;
        default:
          break;
      }
    },
    // 表格回调
    tableFuncCellback1(data) {
      if (data[1] == "查看详情") {
        var _prem = "";
        var _status = 0;
        console.log(data[0]);
        localStorage.setItem("checkParmae", JSON.stringify([data[0]]));
        if (data[0].name == "可结算") {
          _prem = "a";
          _status = 0;
        } else if (data[0].name == "已结算") {
          _prem = "b";
          _status = 10;
        } else if (data[0].name == "结算中") {
          _prem = "b";
          _status = 20;
        }
        this.$router.push({
          name: "CheckStatements",
          query: {
            tableType: _prem,
            status: _status
          }
        });
      }
    },
    // 查看详情
    CheckDetails(data) {
      this.$router.push({
        name: "CheckAdd",
        query: {
          id: data.accountNum,
          type: 0
        }
      });
    },
    // 作废
    invalid(data) {
      var _this = this;
      _this.msgBox.msgBoxOpen(_this, {
        message: "确定要作废吗?",
        btnText: "作废",
        success: function() {
          var obj = {
            accountNum: data.accountNum,
            status: 30
          };
          _this.httpsapi
            .POST(_this.apis + "/statement/jp-account/updateZf", obj)
            .then(result => {
              if (result.code == 200) {
                _this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "3000",
                  type: "success"
                });
                _this.QueryList();
              } else {
                _this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "3000",
                  type: "error"
                });
              }
            })
            .catch(err => {});
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

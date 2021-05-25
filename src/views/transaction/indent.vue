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
        <el-menu-item :index="0">全部</el-menu-item>
        <el-menu-item :index="10">待确认</el-menu-item>
        <el-menu-item :index="15">已驳回</el-menu-item>
        <el-menu-item :index="20">审核中</el-menu-item>
        <el-menu-item :index="30">执行中</el-menu-item>
        <el-menu-item :index="50">已完成</el-menu-item>
        <el-menu-item :index="100">失效/作废</el-menu-item>
        <el-button
          class="el-pull-right Button-2 el-noColor"
          size="medium"
          @click="exportData()"
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
export default {
  name: "indent",
  data() {
    return {
      isAccording: true,
      // 搜索组件数据
      searchFormArr: [
        {
          fieldName: "委托项目部",
          type: "select",
          field: "saleDeptName",
          option: [],
          placeholder: "请选择",
        },
        {
          fieldName: "名称/单号",
          type: "input",
          field: "code",
          placeholder: "请输入",
        },
        {
          fieldName: "发布日期",
          type: "date",
          field: "time1",
          placeholder: "",
        },
        {
          fieldName: "竞价开始时间",
          type: "date",
          field: "time2",
          placeholder: "",
        },
        {
          fieldName: "报名截止时间",
          type: "date",
          field: "time3",
          placeholder: "",
        },
        {
          fieldName: "竞价结束时间",
          type: "date",
          field: "time4",
          placeholder: "",
        },
        {
          fieldName: "下单日期",
          type: "date",
          field: "time4",
          placeholder: "",
        },
        {
          fieldName: "竞价方式",
          type: "select",
          field: "bidWay",
          option: [
            { id: "1", text: "公开" },
            { id: "2", text: "邀请" },
          ],
          placeholder: "",
        },
        {
          fieldName: "订单状态",
          type: "selects",
          field: "status1",
          option: [
            { id: "10", text: "待确认" },
            { id: "15", text: "已驳回" },
            { id: "20", text: "待审批" },
            { id: "30", text: "执行中" },
            { id: "50", text: "已完成" },
            { id: "100", text: "失效作废" },
          ],
          placeholder: "",
        },
        // {
        //   fieldName: "竞价状态",
        //   type: "selects",
        //   field: "status1",
        //   placeholder: "请选择",
        //   option: [
        //     { id: "10", text: "待发布" },
        //     { id: "20", text: "审核中" },
        //     { id: "21", text: "待审核" },
        //     { id: "22", text: "已驳回" },
        //     { id: "30", text: "报名中" },
        //     { id: "40", text: "保证金" },
        //     { id: "41", text: "未确认" },
        //     { id: "42", text: "已确认" },
        //     { id: "50", text: "竞价中" },
        //     { id: "60", text: "待开标" },
        //     { id: "61", text: "待确认" },
        //     { id: "62", text: "待审核" },
        //     { id: "63", text: "已驳回" },
        //     { id: "70", text: "已完成" },
        //     { id: "71", text: "已成交" },
        //     { id: "72", text: "已流标" },
        //     { id: "100", text: "失效/作废" },
        //     { id: "101", text: "参与企业不足" },
        //     { id: "102", text: "中止" }
        //   ],
        // },
        {
          fieldName: "处置方式",
          type: "select",
          field: "pricingMethod",
          option: [
            { id: "1", text: "按批次计价" },
            { id: "2", text: "按重量计价" },
          ],
          placeholder: "",
        },
      ],
      // 表格组件--开始
      table: {
        // 表格操作数组
        operationList: {
          待确认: ["查看"],
          已驳回: ["查看"],
          审核中: ["查看"],
          执行中: ["查看", "结束订单"],
          已完成: ["查看"],
          "失效/作废": ["查看"],
        },
        // 操作块儿显示类型
        isoperation: true,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "100",
        // 表头数组
        header: [
          { name: "订单编号", prop: "code", width: "220", sortable: "custom" },
          { name: "公告名称", prop: "title", width: "380", sortable: "custom" },
          {
            name: "委托项目部",
            prop: "projectName",
            width: "230",
            sortable: "custom",
          },
          {
            name: "买受人",
            prop: "buyerCompanyName",
            width: "150",
            sortable: "custom",
          },
          {
            name: "订单金额",
            prop: "amtCnsNo",
            width: "100",
            sortable: "custom",
          },
          {
            name: "状态",
            prop: "status",
            width: "100",
            sortable: "custom",
          },
          {
            name: "订单来源",
            prop: "source",
            width: "110",
            sortable: "custom",
          },
          {
            name: "下单人",
            prop: "offerContactsCnsNo",
            width: "180",
            sortable: "custom",
          },
          {
            name: "创建时间",
            prop: "createTime",
            width: "120",
            sortable: "custom",
          },
          {
            name: "提货期限",
            prop: "takeDeliveryDate",
            width: "120",
            sortable: "custom",
          },
        ],
      },
      // 表格组件--结束
      // 分页
      page: 1,
      size: 10,
      total: 0,
      param: {},
      search: {},
    };
  },
  mounted() {
    // 渲染表格
    this.QueryList();
    // 查询委托项目部
    this.queryProject();
  },
  methods: {
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
        if (data.time1) {
          data.createTime = data.time1[0];
          data.updateTime = data.time1[1];
        }
        if (data.time2) {
          data.offerStartTimeStart = data.time2[0];
          data.offerStartTimeEnd = data.time2[1];
        }
        if (data.time3) {
          data.signEndTimeStart = data.time3[0];
          data.signEndTimeEnd = data.time3[1];
        }
        if (data.time4) {
          data.offerEndTimeStart = data.time4[0];
          data.offerEndTimeEnd = data.time4[1];
        }
        if (data.time5) {
          data.bidTimeStart = data.time5[0];
          data.bidTimeEnd = data.time5[1];
        }
        var st = "";
        if (data.status1) {
          data.status1.forEach((item) => {
            if (data.status1.length > "1") {
              if (st == "") {
                st = item;
              } else {
                st = st + "," + item;
              }
            } else {
              st = item;
            }
          });
          // data.status1 = st;
          data['statusStr'] = st
        }
        _obj = data;
        _this.search = data;
      }
      Object.assign(this.param, _obj);
      this.QueryList();
    },
    // 查询委托项目部
    queryProject() {
      var _this = this;
      var url = _this.apis + "/system/jp-entrust/searchProjectList";
      _this.httpsapi
        .POST(url, this.param)
        .then((result) => {
          var _result = result.data;
          if (result.code == "200") {
            _result.forEach((item) => {
              _this.searchFormArr[0].option.push({
                id: item.ecOrganizationId,
                text: item.projectName,
              });
            });
          }
        })
        .catch((err) => {});
    },
    // 导出
    exportData() {
      console.log(this.param);
      this.exports.exports(
        this.apis + "/system/re-order/expExcelOrder",
        this.param
      );
    },
    // 查询列表
    QueryList() {
      var _this = this;
      var url =
        _this.apis + "/system/re-order/search/" + _this.page + "/" + _this.size;
        let array = _this.param;
        
        delete array['status1']
        console.log(array)
      _this.httpsapi
        .POST(url, array)
        .then((result) => {
          console.log(result);
          if (result.code == 200) {
            var _result = result.data.records;
            _this.total = result.data.total;
            // 订单来源状态
            var _sourceCnsNo = [
              { id: "1", text: "竞价" },
              { id: "2", text: "供求（废弃）" },
              { id: "3", text: "供应" },
              { id: "4", text: "求购" },
            ];
            // 动态渲染状态
            _result.forEach((item, index) => {
              // 公告名称
              if (item.title.length > 20) {
                var tit = item.title;
                item.title =
                  tit.substring(0, 3) +
                  "..." +
                  tit.substring(tit.length - 16, tit.length);
              }
              // 委托项目部
              if (item.projectName.length > 50) {
                var sal = item.projectName;
                item.projectName =
                  sal.substring(0, 20) +
                  "..." +
                  sal.substring(sal.length - 28, sal.length);
              }
              // if(item.status){

              // }
              if (item.status == "10") {
                item.status = "待确认";
              } else if (item.status == "15") {
                item.status = "已驳回";
              } else if (item.status == "20") {
                item.status = "待审批";
              } else if (item.status == "30") {
                item.status = "执行中";
              } else if (item.status == "50") {
                item.status = "已完成";
              } else if (item.status == "100") {
                item.status = "失效作废";
              }
              if (item.source == "1") {
                item.source = "竞价";
              } else if (item.source == "2") {
                item.source = "供求（废弃）";
              } else if (item.source == "3") {
                item.source = "供应";
              } else if (item.source == "4") {
                item.source = "求购";
              }
              // item.sourceCnsNo = _sourceCnsNo[item.source - 1].text;
              item.amtCnsNo = item.amt + "元";
              item.offerContactsCnsNo =
                (item.offerContacts ? item.offerContacts : "") +
                "  " +
                (item.offerContactsTel ? item.offerContactsTel : "");
            });

            _this.table.Dataorigin = _result;
          }
        })
        .catch((err) => {});
    },
    // 点击tab导航搜索
    handleSelect(index, indexPath) {
      this.param.status = Number(index);
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
        case "结束订单":
          this.jieshudingdan(data[0]);
          break;
        default:
          break;
      }
    },
    // 查看详情
    CheckDetails(data) {
      this.$router.push({
        name: "indentDetail",
        query: {
          id: data.id,
        },
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
      this.param.descType = data.order;
      this.QueryList();
    },
    // 当前页多少条发生改变时触发
    tablePageSize(val) {
      this.size = val;
      this.QueryList();
    },
    // 当前页改变时触发
    tableCurrentChange(val) {
      this.page = val;
      this.QueryList();
    },
    jieshudingdan(val) {
      this.$confirm("确定结束订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          var url = this.apis + "/system/re-order/overOrder/" + val.id + "/50";
          var obj = {};
          this.httpsapi
            .POST(url, obj)
            .then((response) => {
              console.log(response);
              if (response.code == "200") {
                this.QueryList();
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "success",
                });
              } else {
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
      console.log(val);
    },
  },
};
</script>

<style></style>

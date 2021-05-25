<template>
  <div>
    <!-- 搜索组件 -->
    <searchui
      :searchFormArr="searchFormArr"
      @searchParma="searchParma"
      :isAccording="isAccording"
    ></searchui>

    <div class="bgBorderTwo">
      <el-menu
        :default-active="1"
        text-color="#000"
        class="el-menu-demo el-menu-color"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="0">全部</el-menu-item>
        <el-menu-item index="10">未缴纳</el-menu-item>
        <el-menu-item index="20">已缴纳</el-menu-item>
        <el-menu-item index="30">未退还</el-menu-item>
        <el-menu-item index="40">已沉没</el-menu-item>
        <el-menu-item index="50">沉没中</el-menu-item>
        <el-menu-item index="60">作废</el-menu-item>

        <el-button class="el-pull-right Button-2" size="medium" @click="daochu"
          >导出</el-button
        >
      </el-menu>
      <!-- 表格组件 -->
      <Tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
        @operationsss="operationsss"
        @paixu="paixus"
      >
      </Tables>
      <!-- 分页 -->
      <div class="paging">
        <el-pagination
          background="false"
          :page-size="10"
          pager-count="8"
          current-page="1"
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
    <!-- 提示对话框组件 -->
    <confirm
      :confirm="dialogVisible"
      :text="text"
      :dMText="dMText"
      @cancel="cancel()"
      @determine="determine()"
    ></confirm>
  </div>
</template>

<script>
import Tables from "../table/table.vue";
export default {
  name: "earnestmoney",
  data() {
    return {
      // 弹框组件--开始
      dialogVisible: false,
      text: '<b style="color:red">确定要这样吗？</b>',
      dMText: "11", //此参数不传，弹框的确定按钮默认文字为："确 定"
      // 弹框组件--结束
      isAccording: true,
      // 搜索组件数据
      searchFormArr: [
        {
          fieldName: "销售项目部",
          type: "select",
          field: "department",
          option: [
            // { id: "11", text: "个" },
            // { id: "22", text: "米" },
          ],
          placeholder: "请选择项目部",
        },
        {
          fieldName: "名称/单号",
          type: "input",
          field: "enterprise",
          placeholder: "请搜索名称或单号",
        },
        {
          fieldName: "采购单位",
          type: "input",
          field: "underlyingCode",
          placeholder: "请搜索招标方单位名称",
        },
        {
          fieldName: "竞价开始时间",
          type: "date",
          field: "time1",
          placeholder: "",
        },
        {
          fieldName: "发布日期",
          type: "date",
          field: "time2",
          placeholder: "",
        },
        {
          fieldName: "竞价结束时间",
          type: "date",
          field: "time3",
          placeholder: "",
        },
        {
          fieldName: "报名截止时间",
          type: "date",
          field: "time4",
          placeholder: "",
        },
        {
          fieldName: "竞价方式",
          type: "select",
          field: "department1",
          option: [
            { id: "1", text: "公开竞价" },
            { id: "2", text: "邀请竞价" },
          ],
          placeholder: "请选竞价方式",
        },
        {
          fieldName: "下单日期",
          type: "date",
          field: "time5",
          placeholder: "",
        },
        {
          fieldName: "保证金状态",
          type: "select",
          field: "state2	",
          option: [
            { id: "10", text: "未缴纳" },
            { id: "20", text: "已缴纳" },
            { id: "30", text: "未退还" },
            { id: "40", text: "已退还" },
            { id: "50", text: "已没收" },
            { id: "60", text: "罚款中" },
          ],
          placeholder: "请选择保证金状态",
        },
        {
          fieldName: "竞价状态",
          type: "select",
          field: "state1",
          option: [
            { id: "1", text: "待发布" },
            { id: "2", text: "报名中" },
            { id: "3", text: "保证金/待竞价" },
            { id: "4", text: "竞价中" },
            { id: "5", text: "待开标" },
            { id: "6", text: "已完成（成交）" },
            { id: "7", text: "已完成（流标）" },
            { id: "8", text: "失效作废" },
          ],
          placeholder: "请选择竞价状态",
        },
        {
          fieldName: "保证金处理状态",
          type: "select",
          field: "state3",
          option: [
            { id: "1", text: "待确认" },
            { id: "2", text: "已确认" },
            { id: "3", text: "待退还" },
            { id: "4", text: "已退还" },
            { id: "5", text: "强制退还" },
            { id: "6", text: "协商一致" },
            { id: "7", text: "待确认" },
            { id: "8", text: "拒绝" },
            { id: "9", text: "未缴纳" },
          ],
          placeholder: "请选择保证金处理状态",
        },
      ],
      // 表格组件--开始
      // 表格高度
      MHeight: "auto",
      // 右侧操作宽度
      operationW: "100",
      // 表格操作数组
      ioperationList: {
        未缴纳: [{ name: "查看" }],
        已缴纳: [{ name: "查看" }],
        未退还: [{ name: "查看" }, { name: "退还" }, { name: "沉没" }],
        已退还: [{ name: "查看" }],
        已没收: [{ name: "查看" }],
        罚款中: [{ name: "查看" }],
      },
      // 操作块儿是否显示
      isoperation: true,
      // 数据数组
      Dataorigin: [],
      // 表头数组
      header: [
        { name: "序号", prop: "index" },
        { name: "竞价编号", prop: "code" },
        { name: "竞买人企业名称", prop: "buyerCompanyName" },
        { name: "保证金金额", prop: "amt" },
        { name: "来款时间", prop: "payTime" },
        { name: "保证金状态", prop: "status" },
        { name: "处理状态", prop: "dealStatus" },
        { name: "处理时间", prop: "dealTime" },
        { name: "公告名称", prop: "title" },
        { name: "委托项目部", prop: "saleDeptName" },
        { name: "竞价状态", prop: "rsStatusName" },
        { name: "报名截止", prop: "signEndTime" },
        { name: "竞价开始", prop: "offerStartTime" },
        { name: "竞价结果", prop: "offerEndTime" },
        { name: "竞价方式", prop: "bidWay" },
      ],
      // 表格组件--结束
      page: "1",
      size: "10",
      total: "",
      data: [],
      lists: {},
      paixu: "",
    };
  },
  mounted() {
    this.earnestmoney();
    this.huoqulists();
  },
  methods: {
    earnestmoney(data) {
      console.log(this.paixu);
      this.lists = data;
      // /deposit/jp-re-bond/queryRebondByConditions/{page}/{size}
      var url =
        this.apis +
        "/deposit/jp-re-bond/queryRebondByConditions/" +
        this.page +
        "/" +
        this.size;
      if (data) {
        var obj = {
          saleDeptName: data.department,
          code: data.enterprise,
          buyerCompanyName: data.underlyingCode,
          bidWay: data.department1,
          status: data.state2,
          rsStatus: data.state1,
          dealStatus: data.state3,
        };
        if (data.time2) {
          obj["createTimeEnd"] = data.time2[1];
          obj["createTime"] = data.time2[0];
        }
        if (data.time1) {
          obj["offerStartTime"] = data.time1[0];
          obj["offerStartTimeEnd"] = data.time1[1];
        }
        if (data.time3) {
          obj["offerEndTimeEnd"] = data.time3[1];
          obj["offerEndTime"] = data.time3[0];
        }
        if (data.time4) {
          obj["signEndTimeEnd"] = data.time4[1];
          obj["signEndTime"] = data.time4[0];
        }
        if (data.time5) {
          obj["payTimeEnd"] = data.time5[1];
          obj["payTime"] = data.time5[0];
        }
      } else {
        var obj = {};
      }
      if (this.paixu) {
        obj["orderBy"] = this.paixu.prop;
        obj["descType"] = this.paixu.order;
      }
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          console.log(response);
          if (response.code == "200") {
            for (var i = 0; i < response.data.records.length; i++) {
              response.data.records[i]["index"] =
                (Number(this.page) - Number("1")) * 10 + Number(i);
              if (response.data.records[i].status == "10") {
                response.data.records[i].status = "未缴纳";
              } else if (response.data.records[i].status == "20") {
                response.data.records[i].status = "已缴纳";
              } else if (response.data.records[i].status == "30") {
                response.data.records[i].status = "未退还";
              } else if (response.data.records[i].status == "40") {
                response.data.records[i].status = "已退还";
              } else if (response.data.records[i].status == "50") {
                response.data.records[i].status = "已没收";
              } else if (response.data.records[i].status == "60") {
                response.data.records[i].status = "罚款中";
              }
              if (response.data.records[i].dealStatus == "10") {
                response.data.records[i].dealStatus = "待确认";
              } else if (response.data.records[i].dealStatus == "20") {
                response.data.records[i].dealStatus = "已确认";
              } else if (response.data.records[i].dealStatus == "30") {
                response.data.records[i].dealStatus = "待退还";
              } else if (response.data.records[i].dealStatus == "31") {
                response.data.records[i].dealStatus = "已退还";
              } else if (response.data.records[i].dealStatus == "32") {
                response.data.records[i].dealStatus = "强制退还";
              } else if (response.data.records[i].dealStatus == "40") {
                response.data.records[i].dealStatus = "强制罚没";
              } else if (response.data.records[i].dealStatus == "41") {
                response.data.records[i].dealStatus = "（罚没）协商一致";
              } else if (response.data.records[i].dealStatus == "50") {
                response.data.records[i].dealStatus = "（罚没）处理中";
              }
              // bidWay
              if (response.data.records[i].bidWay == "1") {
                response.data.records[i].bidWay = "公开";
              } else if (response.data.records[i].bidWay == "2") {
                response.data.records[i].bidWay = "邀请";
              }
              // buyerCompanyName
              if(response.data.records[i].buyerCompanyName.length >= "20"){
                  response.data.records[i].buyerCompanyName =
                response.data.records[i].buyerCompanyName.slice(0, 10) +
                "..." +
                response.data.records[i].buyerCompanyName.slice(
                  response.data.records[i].buyerCompanyName.length - 8,
                  -1
                );
              }
              if(response.data.records[i].title.length >= "50"){
                  response.data.records[i].title =
                response.data.records[i].title.slice(0, 20) +
                "..." +
                response.data.records[i].title.slice(
                  response.data.records[i].title.length - 28,
                  -1
                );
              }

              if(response.data.records[i].saleDeptName.length >= "50"){
                  response.data.records[i].saleDeptName =
                response.data.records[i].saleDeptName.slice(0, 20) +
                "..." +
                response.data.records[i].saleDeptName.slice(
                  response.data.records[i].saleDeptName.length - 28,
                  -1
                );
              }
            }
            console.log(response.data.records);
            this.Dataorigin = response.data.records;
            this.total = response.data.total;
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    huoqulists() {
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
          //console.log(_this.searchFormArr)
        })
        .catch((err) => {});
    },
    // 搜索子组件回调
    searchParma(data) {
      console.log(data);
      this.earnestmoney(data);
    },
    tianjia() {
      this.dialogVisible = true;
    },
    // 提示对话框确定按钮
    determine() {
      this.dialogVisible = false;
    },
    // 提示对话框关闭按钮
    cancel() {
      this.dialogVisible = false;
    },

    tablePageSize(e) {
      this.size = e;
      this.earnestmoney();
    },
    tableCurrentChange(e) {
      this.page = e;
      this.earnestmoney();
    },
    handleSelect(e) {
      console.log(this.lists);
      if (this.lists != undefined) {
        this.lists.state2 = e;
        this.earnestmoney(this.lists);
      } else {
        console.log(this.lists);
        var c = {};
        c["state2"] = e;
        this.lists = c;
        this.earnestmoney(this.lists);
      }
    },
    operationsss(index, e) {
      console.log(e);
      if (e == "查看") {
        this.xiangqing(index);
      } else if (e == "退还") {
        this.tuihuan(index);
      }
    },
    xiangqing(e) {
      console.log(e);
      this.$router.push({
        name: "earnestmoneyDetail",
        query: {
          id: e.sceneId,
        },
      });
    },
    paixus(e) {
      // console.log();
      this.paixu = e;
      if (e.order != null) {
        this.paixu.order = e.order.substring(0, e.order.length - 6);
      }

      this.earnestmoney();
    },
    daochu() {
      this.exports.exports(this.apis + "/deposit/jp-re-bond/exportExcel");
    },
    tuihuan(e) {
      console.log(e);

      this.$confirm("全额返还保证金 " + e.amt + " 元", e.buyerCompanyName, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          console.log('123')
          var url = this.apis + "/deposit/jp-re-bond/returnBond/" + e.id;
          var obj ={};
          this.httpsapi
            .POST(url, obj)
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
  },
  components: {
    Tables,
  },
};
</script>

<style></style>

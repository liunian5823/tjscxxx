<template>
  <div>
    <!-- 搜索组件 -->
    <searchui
      :searchFormArr="searchFormArr"
      @searchParma="searchParma"
      :isAccording="isAccording"
    ></searchui>
    <div class="bgBorderTwo">
      <el-row class="el-statistical" :gutter="10">
        <el-col :lg="3" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ xiangqing.biddingRecene }}</div>
            <div class="el-col-text">竞价场次(场)</div>
          </div>
        </el-col>
        <el-col :lg="3" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ xiangqing.dealNumber }}</div>
            <div class="el-col-text">成交数量(笔)</div>
          </div>
        </el-col>
        <el-col :lg="3" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ xiangqing.floaterNumber }}</div>
            <div class="el-col-text">流标数量(笔)</div>
          </div>
        </el-col>
        <el-col :lg="3" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ xiangqing.strike }}</div>
            <div class="el-col-text">成交率</div>
          </div>
        </el-col>
        <el-col :lg="3" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ xiangqing.strikeTotalAmount }}</div>
            <div class="el-col-text">成交总额(元)</div>
          </div>
        </el-col>
        <el-col :lg="3" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ xiangqing.premiumTotalAmount }}</div>
            <div class="el-col-text">溢价总额(元)</div>
          </div>
        </el-col>
        <el-col :lg="3" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ xiangqing.avgpremiumTotalAmount }}</div>
            <div class="el-col-text">平均溢价率</div>
          </div>
        </el-col>
        <el-col :lg="3" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ xiangqing.serviceAmtTotal }}</div>
            <div class="el-col-text">服务费总额(元)</div>
          </div>
        </el-col>
      </el-row>
      <el-menu
        :default-active="1"
        text-color="#000"
        class="el-menu-demo el-menu-color"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">标的处置分析</el-menu-item>
      </el-menu>
      <!-- 表格组件 -->
      <Tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
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

  </div>
</template>

<script>
import { transformVNodeArgs } from "vue";
import Tables from "../table/table.vue";
export default {
  name: "statistics",
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
          fieldName: "企业名称",
          type: "input",
          field: "enterprise",
          placeholder: "请输入"
        },
        {
          fieldName: "委托项目部",
          type: "select",
          field: "state1",
          option: [
            // { id: "11", text: "个" },
            // { id: "22", text: "米" },
          ],
          placeholder: "请选择项目部"
        },
        {
          fieldName: "公告名称",
          type: "input",
          field: "underlyingCode1",
          placeholder: "请输入"
        },
        {
          fieldName: "状态",
          type: "select",
          field: "state1",
          option: [
            { id: "11", text: "成交" },
            { id: "22", text: "流标" }
          ],
          placeholder: "请选择"
        },
        {
          fieldName: "发布人",
          type: "input",
          field: "underlyingCode",
          placeholder: "请输入"
        },
        {
          fieldName: "竞价结束时间",
          type: "date",
          field: "time3",
          placeholder: ""
        }
      ],

      // 表头数组
      Dataorigin: "",
      header: [
        { name: "竞价编号", prop: "code" },
        { name: "公告名称", prop: "title" },
        { name: "企业名称", prop: "enterName" },
        { name: "委托项目部", prop: "entrustproject" },
        { name: "状态", prop: "status" },
        { name: "竞价方式", prop: "bidWay" },
        { name: "处置方式", prop: "pricingMethod" },
        { name: "竞价结束", prop: "offerEndTime" },
        { name: "成交底价", prop: "basePrice" },
        { name: "成交价", prop: "bidAmt" },
        { name: "溢价额", prop: "premium" },
        { name: "溢价率", prop: "premiumProbability" },
        { name: "实付货款金额", prop: "realTimeAmt" },
        { name: "服务费", prop: "serviceFee" },
        { name: "发布人", prop: "createUserName" }
      ],
      total: "",
      size: "10",
      page: "1",
      lists: "",
      xiangqing: ""
      // 表格组件--结束
    };
  },
  mounted() {
    this.huoqulist();
  },
  methods: {
    // 搜索子组件回调
    searchParma(data) {
      console.log(data);
      this.lists = data;
      this.huoqulist();
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
    // 当前页多少条发生改变时触发
    tablePageSize(val) {
      //console.log('1----'+val)
    },
    // 当前页改变时触发
    tableCurrentChange(val) {
      //console.log('2----'+val)
    },
    exportData() {
      this.$router.push("signDetail");
    },
    huoqulist() {
      var url =
        this.apis +
        "/statistic/queryRubjectMater/" +
        this.page +
        "/" +
        this.size;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);
          this.Dataorigin = response.data.list;
          this.total = response.data.total;
          this.huoqushul();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    huoqushul() {
      // /statistic/queryMaterAnalyse
      var url = this.apis + "/statistic/queryMaterAnalyse";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data[0]);
          this.xiangqing = response.data[0];
        })
        .catch(err => {
          //console.log(err);
        });
    }
  },
  components: {
    Tables
  }
};
</script>

<style>
.el-statistical .el-col {
  padding: 15px 0;
  font-family: MicrosoftYaHei;
  color: #000000;
}
.el-statistical .el-col .el-col-bg {
  background: rgba(45, 183, 245, 0.05);
  border-radius: 4px;
  height: 88px;
  width: 100%;
}
.el-statistical .el-col .el-col-bg div {
  padding: 15px;
}
.el-statistical .el-col-num {
  width: 100%;
  height: 35px;
  line-height: 31px;
  font-size: 24px;
}
.el-statistical .el-col-text {
  width: 100%;
  font-size: 16px;
  height: 21px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.7);
}
.search {
  width: 99%;
  margin: 0 auto;
}
.table_title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>

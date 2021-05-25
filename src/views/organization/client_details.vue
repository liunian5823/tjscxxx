<template>
  <div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">{{ xiangqing.companyName }}</div>
      </div>
      <!-- 详情 -->
      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>组织类型</span>：</label>
          <div class="tCon" v-if="xiangqing.type == '0'">部门</div>
          <div class="tCon" v-else-if="xiangqing.type == '1'">项目</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>项目编号</span>：</label>
          <div class="tCon">{{ xiangqing.projectNum }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>所属企业</span>：</label>
          <div class="tCon">{{ xiangqing.companyName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>统一社会信用代码</span>：</label>
          <div class="tCon">{{ xiangqing.businessLicense }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>创建时间</span>：</label>
          <div class="tCon">{{ xiangqing.createTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>项目联系人</span>：</label>
          <div class="tCon">
            {{ xiangqing.projectPerson }}&ensp;&ensp;{{
              xiangqing.projectPersonPhone
            }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>项目地址</span>：</label>
          <div class="tCon">
            {{ xiangqing.province }}{{ xiangqing.city }}{{ xiangqing.area }}/{{
              xiangqing.detail_address
            }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>业务负责人</span>：</label>
          <div class="tCon">{{ xiangqing.realName }}&ensp;&ensp;{{xiangqing.phone}}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>备注</span>：</label>
          <div class="tCon">
            <el-input
              type="textarea"
              :rows="2"
              placeholder=""
              v-model="textarea"
              @input="beizhu"
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>

    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>数据统计</span>
        <el-button class="el-pull-right el-blueColor" @click="xiazaiquanbu"
          >查看委托订单</el-button
        >
      </div>
      <!-- 统计数据 -->
      <el-row class="el-statistical" :gutter="10">
        <el-col :lg="4" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ StatisticsMap.total }}</div>
            <div class="el-col-text">累计受理(笔)</div>
          </div>
        </el-col>
        <el-col :lg="4" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ StatisticsMap.failed }}</div>
            <div class="el-col-text">委托未成功(笔)</div>
          </div>
        </el-col>
        <el-col :lg="4" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ StatisticsMap.completed }}</div>
            <div class="el-col-text">已完成委托订单(笔)</div>
          </div>
        </el-col>
        <el-col :lg="4" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ StatisticsMap.inExecution }}</div>
            <div class="el-col-text">执行中委托订单(笔)</div>
          </div>
        </el-col>
        <el-col :lg="4" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ StatisticsMap.totalPrice }}</div>
            <div class="el-col-text">成交总额(元)</div>
          </div>
        </el-col>
        <el-col :lg="4" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ StatisticsMap.tradePrice }}</div>
            <div class="el-col-text">实际交易金额(元)</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>员工管理</span>
        <el-button class="el-pull-right el-blueColor" @click="download1"
          >导出名单</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%" empty-text=" ">
        <el-table-column fixed sortable prop="jobNumber" label="员工编号">
        </el-table-column>
        <el-table-column sortable prop="realName" label="姓名">
        </el-table-column>
        <el-table-column sortable prop="roleName" label="角色/职务">
        </el-table-column>
        <el-table-column sortable prop="phone" label="联系方式">
        </el-table-column>
        <el-table-column sortable prop="email" label="电子邮箱">
        </el-table-column>
        <el-table-column sortable prop="createTime" label="添加时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template #default="scope">
            <el-button
              @click="goTo('client_details', scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="sizes"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="bgBorderThree">
      <div class="el-b">
        <el-button class="el-noColor" @click="fanhui">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "client_details",
  data() {
    return {
      ecOrganizationId: "",
      tableData: [],
      StatisticsMap: {},
      page: 1,
      size: 10,
      sizes: [10, 20, 30, 40],
      total: 0,
      xiangqing: "",
      textarea: ""
    };
  },
  mounted() {
    this.ecOrganizationId = this.$route.query.ecOrganizationId;
    this.huoquxiangqing();
    this.searchParma();
    this.selectStatisticsMap();
  },
  methods: {
    huoquxiangqing() {
      // /system/jp-entrust/expExcelEntrust/{id}
      var url =
        this.apis + "/system/jp-entrust/category/" + this.ecOrganizationId;

      var obj = {};
      this.httpsapi
        .GET(url, obj)
        .then(response => {
          //console.log(response);
          this.xiangqing = response.data;
          this.textarea = response.data.remarks;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    download1() {
      this.exports.exports(
        this.apis +
          "/system/jp-entrust/expExcelEntrust/" +
          this.ecOrganizationId
      );
    },
    //查询委托方-数据统计
    //委托方管理- 委托方详情-数据统计-根据项目部id
    selectStatisticsMap() {
      var url =
        this.apis +
        "/system/jp-entrust/selectStatisticsMap/" +
        this.ecOrganizationId;
      var that = this;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          that.StatisticsMap = response.data;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    // 点击列表中按钮回调
    tableFuncCellback(data) {
      //console.log(data);
    },
    goTo(_url, _params) {
      //带参数跳转
      this.$router.push({
        name: "xiangqing",
        query: { id: _params.userId }
      });

      // this.$router.push({ name: _url, params: _params });
    },
    //页面选项改变
    handleSizeChange(val) {
      this.size = val;
      this.searchParma(null, 1);
    },
    //当前页改变
    handleCurrentChange(val) {
      this.page = val;
      this.searchParma(null, 1);
    },
    searchParma(val, _change) {
      var url =
        this.apis +
        "/system/jp-entrust/searchUserPageList/" +
        this.page +
        "/" +
        this.size;
      var obj = { entrustId: this.ecOrganizationId };
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          //console.log(response)
          this.tableData = response.data.records;
          this.page = response.data.current;
          this.total = response.data.total;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    beizhu() {
      //console.log(this.textarea)
      // updateRemarks
      var url = this.apis + "/system/jp-entrust/updateRemarks";
      var obj = { id: this.ecOrganizationId, remarks: this.textarea };
      this.httpsapi
        .PUT(url, obj)
        .then(response => {
          //console.log(response)
        })
        .catch(err => {
          //console.log(err);
        });
    },
    xiazaiquanbu() {
      this.$router.push({
        name: "order",
        query: { id: this.ecOrganizationId }
      });
    },
    fanhui() {
      this.$router.go(-1);
    }
  }
};
</script>

<style space>
.el-title {
  margin: 15px 0;
}
.theTitle {
  height: 42px;
  font-size: 20px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
  line-height: 30px;
}
.theBtn .el-button {
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

.el-detail-item {
  line-height: 25px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 25px;
  margin: 12px 0;
}
.el-detail-item label {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}
.el-detail-item .tCon {
  margin-left: 135px;
  word-break: break-all;
  word-wrap: break-word;
}
.el-detail-item label span {
  width: 120px;
  text-align: justify;
  text-align-last: justify;
  display: inline-block;
}
.el-detail-2 {
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #cfcfcf;
}

.Cord-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 25px;
  line-height: 40px;
  font-weight: bold;
  font-size: 14px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  color: #000000;
}
.Cord-header .el-button {
  margin-top: 5px;
  min-width: 88px;
}
.table {
  margin: 15px;
  padding-top: 15px;
  padding-bottom: 30px;
  max-width: 100%;
}

.el-b {
  padding: 15px 0;
  text-align: center;
}

/* 数据统计样式 */
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
.fenye {
  width: 100%;
  position: relative;
  top: 0;
  right: 0px;
}
.fenye {
  text-align: center;
  padding: 10px;
}
/* table表样式 */
.el-table__empty-text {
  display: block;
  width: 150px;
  height: 100px;
  background: url("../../assets/img/zanwushuju.png") no-repeat;
  color: #909399;
  box-sizing: border-box;
  margin-top: 46px;
}
</style>

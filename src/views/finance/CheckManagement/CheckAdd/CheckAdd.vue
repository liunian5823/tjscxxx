<template>
  <div id="checkadd">
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">
          <div class="el-detail-item el-clearfix" style="font-size: 18px;">
            <label class="el-pull-left"><span>对账单号</span>：</label>
            <div class="tCon">{{ reversevideo.accountNum }}</div>
          </div>
        </div>
        <div class="theBtn el-pull-right">
          <el-button v-if="reversevideo.status == 10">待 确 认</el-button>
          <el-button v-else-if="reversevideo.status == 20">已 完 成</el-button>
          <el-button v-else-if="reversevideo.status == 30">已 作 废</el-button>
          <el-button v-else>-</el-button>
        </div>
      </div>
      <div class="table">
        <el-row>
          <el-col :span="15">
            <div class="el-detail el-detail-1">
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>服务商</span>：</label>
                <div class="tCon">{{ reversevideo.serviceCompanyName }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>平台经营者</span>：</label>
                <div class="tCon">中铁建金服科技有限公司</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>制单日期</span>：</label>
                <div class="tCon">{{ reversevideo.createTime }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>完成时间</span>：</label>
                <div class="tCon">{{ reversevideo.handleTime }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>对账周期</span>：</label>
                <div class="tCon">
                  <el-date-picker
                    v-model="reversevideo.cycle"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="cycleChenge"
                  >
                  </el-date-picker>
                  <span style="padding-left: 15px;"
                    >{{ reversevideo.accountDay }}天</span
                  >
                </div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>订单数量</span>：</label>
                <div class="tCon">{{ reversevideo.accountOrderNum }}笔</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>处理人</span>：</label>
                <div class="tCon">{{ reversevideo.handlerName }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>附件</span>：</label>
                <div class="tCon">{{ reversevideo.file }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>制单人</span>：</label>
                <div class="tCon">{{ reversevideo.settleUserName }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>备注说明</span>：</label>
                <div class="tCon">
                  <el-input
                    type="textarea"
                    v-model="reversevideo.remark"
                    class="textareaC"
                  ></el-input>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="el-detail el-detail-1">
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>服务费合计</span>：</label>
                <div class="tCon">{{ reversevideo.serviceAmtTotal }}</div>
              </div>
              <!-- <div class="el-detail-item el-clearfix">
								<label class="el-pull-left"><span>佣金金额</span>：</label>
								<div class="tCon">{{ reversevideo.commissionAmt }}</div>
							</div> -->
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>沉没保证金</span>：</label>
                <div class="tCon">{{ reversevideo.bondAmtTotal }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>结算金额</span>：</label>
                <div class="tCon" style="color: red;font-size: 20px;">
                  {{ reversevideo.settlementAmt }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bgBorderThree check">
      <el-menu
        :default-active="0"
        text-color="#000"
        class="el-menu-demo el-menu-color"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="0">订单信息</el-menu-item>
        <el-menu-item index="1" :disabled="disabledActive"
          >对账单日志</el-menu-item
        >
        <el-menu-item index="2" :disabled="disabledActive"
          >资金明细</el-menu-item
        >
        <el-button
          v-if="disabledActive"
          class="el-pull-right Button-1 el-blueColor"
          size="medium"
          @click="CheckAdd()"
          >添加订单</el-button
        >
        <el-button
          v-if="!disabledActive"
          class="el-pull-right Button-1 el-blueColor"
          size="medium"
          @click="exportT()"
          >导出</el-button
        >
      </el-menu>
      <div class="table" v-if="tabletype == 0">
        <tableTwo
          :table="table1"
          @tableFuncCellback="tableFuncCellback1"
        ></tableTwo>
        <!-- <div class="paging">
					<el-pagination
						background="false"
						:page-size="size1"
						pager-count="8"
						:current-page="page1"
						layout="total, prev, pager, next,sizes,jumper"
						:total="total1"
						@size-change="tablePageSize1"
						@current-change="tableCurrentChange1"
						@prev-click="tableCurrentChange1"
						@next-click="tableCurrentChange1">
					</el-pagination>
				</div> -->
      </div>
      <div class="table" v-if="tabletype == 1" style="width: 700px;">
        <tableTwo
          :table="table4"
          @tableFuncCellback="tableFuncCellback4"
        ></tableTwo>
      </div>
      <div class="table" v-if="tabletype == 2">
        <tableTwo
          :table="table5"
          @tableFuncCellback="tableFuncCellback5"
        ></tableTwo>
      </div>
    </div>

    <div class="bgBorderThree">
      <div class="el-b">
        <el-button class="el-noColor" @click="cancel">取消</el-button>
        <el-button class="el-blueColor" @click="save">确认</el-button>
      </div>
    </div>

    <!-- 添加订单 -->
    <div
      class="proResults"
      :class="{ active: dialogFormVisibleActive }"
      v-if="dialogFormVisible"
      @click="Procancel"
    >
      <div class="proResults-Childer" @click.stop>
        <div class="card-header el-clearfix">
          <span>选择订单</span>
          <span class="el-pull-right" type="text" @click="Procancel">×</span>
        </div>
        <!-- 选择 -->
        <div
          class="table"
          style="border-bottom: 1px dashed #EEEEEE;padding-bottom: 15px;margin-bottom: 30px;"
        >
          <el-form
            :inline="true"
            :rules="searcRules"
            :model="searchorder"
            class="demo-form-inline wFrom"
          >
            <el-form-item>
              <el-input
                v-model="searchorder.entrustProject"
                placeholder="委托公司/委托项目"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="searchorder.workOrderNum"
                placeholder="订单编号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onsearch">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-row style="margin: 15px 25px 0 25px;">
            <el-col :span="6" :lg="6" :md="12" :sm="12"
              >可服务费：0.0000000</el-col
            >
            <!-- <el-col :span="6" :lg="6" :md="12" :sm="12">可结算佣金：0.0000000000</el-col> -->
            <el-col :span="6" :lg="6" :md="12" :sm="12"
              >可结算金额：0.000000000</el-col
            >
            <el-col :span="6" :lg="6" :md="12" :sm="12"
              >可结算订单数量：00000000笔</el-col
            >
          </el-row>
          <div class="tableT">
            <el-table
              ref="multipleTable"
              :data="table2"
              @sort-change="SortChange"
              @selection-change="handleSelectionChange"
              empty-text=" "
            >
              <el-table-column
                type="selection"
                min-width="55"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="workOrderNum"
                label="委托订单编号"
                min-width="200"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="entrustProject"
                label="委托部门"
                min-width="200"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="statusCnsNo"
                label="订单状态"
                min-width="110"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="createUserNameCnsNo"
                label="创建人"
                min-width="180"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                min-width="170"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="finishDate"
                label="完成时间"
                min-width="170"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="amountTotal"
                label="累计处置金额"
                min-width="150"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="serviceAmt"
                label="服务费金额"
                min-width="150"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="accountOrderNum"
                label="订单笔数"
                min-width="120"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="bondAmt"
                label="沉没保证金"
                min-width="130"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                prop="bondNum"
                label="沉没笔数"
                min-width="120"
                sortable="custom"
              ></el-table-column>
            </el-table>
          </div>
          <div class="paging">
            <el-pagination
              background="false"
              :page-size="pageSize"
              pager-count="8"
              :current-page="pageNum"
              layout="total, prev, pager, next,sizes,jumper"
              :total="total2"
              @size-change="tablePageSize2"
              @current-change="tableCurrentChange2"
              @prev-click="tableCurrentChange2"
              @next-click="tableCurrentChange2"
            >
            </el-pagination>
          </div>
        </div>
        <!-- 添加 -->
        <div class="table">
          <el-row style="margin: 15px 25px 0 25px;">
            <el-col :span="6" :lg="6" :md="12" :sm="12"
              >服务费合计：0.0000000</el-col
            >
            <!-- <el-col :span="6" :lg="6" :md="12" :sm="12">佣金合计：0.0000000000</el-col> -->
            <el-col :span="6" :lg="6" :md="12" :sm="12"
              >沉没保证金：0.000000000</el-col
            >
            <el-col :span="6" :lg="6" :md="12" :sm="12"
              >结算金额：00000000笔</el-col
            >
            <el-col :span="6" :lg="6" :md="12" :sm="12"
              >订单数量：00000000笔</el-col
            >
            <div
              style="text-align: right;display: block;width: 98%;padding: 0 1%;"
            >
              <el-button class="el-noColor" @click="cancelChecked('arr')"
                >清空</el-button
              >
            </div>
          </el-row>
          <tableTwo
            :table="table3"
            @tableFuncCellback="tableFuncCellback3"
          ></tableTwo>
          <!-- <div class="paging">
						<el-pagination
							background="false"
							:page-size="size3"
							pager-count="8"
							:current-page="page3"
							layout="total, prev, pager, next,sizes,jumper"
							:total="total3"
							@size-change="tablePageSize3"
							@current-change="tableCurrentChange3"
							@prev-click="tableCurrentChange3"
							@next-click="tableCurrentChange3">
						</el-pagination>
					</div> -->
        </div>
        <div class="el-b" style="margin: 30px 0;">
          <el-button class="el-noColor" @click="Procancel">取消</el-button>
          <el-button class="el-blueColor" @click="submit">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckAdd",
  data() {
    return {
      disabledActive: false, // 是详情页还是添加页面
      dialogFormVisibleActive: false,
      dialogFormVisible: false,
      tabletype: 0, // 展示哪类信息
      checkId: "", //父级传递过来的id
      // 搜索的参数
      searchorder: {
        entrustProject: "",
        workOrderNum: ""
      },
      // 主体信息
      reversevideo: {
        accountNum: "-",
        status: "",
        serviceCompanyName: "",
        createTime: "-",
        handleTime: "-",
        handlerName: "-",
        file: "-",
        accountDay: 0,
        accountOrderNum: 0,
        serviceAmtTotal: "0.00",
        bondAmtTotal: "0.00",
        settlementAmt: "0.00",
        commissionAmt: "",
        remark: "",
        cycle: []
      },

      table4: {
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
            name: "操作人",
            prop: "createUserNameCnsNo",
            width: "170",
            sortable: "custom"
          },
          {
            name: "操作时间",
            prop: "createTime",
            width: "150",
            sortable: "custom"
          },
          { name: "事件", prop: "eventLog", width: "300", sortable: "custom" }
        ]
      },
      table5: {
        // 表格操作数组
        operationList: [],
        // 操作块儿显示类型
        isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        // operationW: "100",
        // 表头数组
        header: [
          {
            name: "时间",
            prop: "accountNum",
            width: "220",
            sortable: "custom"
          },
          {
            name: "业务",
            prop: "createUserNameCnsNo",
            width: "150",
            sortable: "custom"
          },
          {
            name: "交易结果",
            prop: "createTimeEnd",
            width: "110",
            sortable: "custom"
          },
          {
            name: "银行水单号",
            prop: "startDate",
            width: "110",
            sortable: "custom"
          },
          { name: "金额", prop: "endDate", width: "150", sortable: "custom" }
        ]
      },
      table1: {
        // 表格操作数组
        operationList: ["查看"],
        // 操作块儿显示类型
        isoperation: false,
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
            sortable: ""
          },
          {
            name: "委托部门",
            prop: "entrustProject",
            width: "150",
            sortable: ""
          },
          { name: "订单状态", prop: "statusCnsNo", width: "110", sortable: "" },
          {
            name: "创建人",
            prop: "createUserNameCnsNo",
            width: "110",
            sortable: ""
          },
          { name: "创建时间", prop: "createTime", width: "150", sortable: "" },
          { name: "完成时间", prop: "finishDate", width: "150", sortable: "" },
          {
            name: "累计处置金额",
            prop: "amountTotal",
            width: "150",
            sortable: ""
          },
          {
            name: "服务费金额",
            prop: "serviceAmt",
            width: "150",
            sortable: ""
          },
          {
            name: "订单笔数",
            prop: "accountOrderNum",
            width: "120",
            sortable: ""
          },
          { name: "沉没保证金", prop: "bondAmt", width: "120", sortable: "" },
          { name: "沉没笔数", prop: "bondNum", width: "120", sortable: "" }
        ]
      },
      table2: [],
      table2param: {},
      table3: {
        // 表格操作数组
        operationList: ["删除"],
        // 操作块儿显示类型
        isoperation: false,
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
            sortable: ""
          },
          {
            name: "委托部门",
            prop: "entrustProject",
            width: "150",
            sortable: ""
          },
          { name: "订单状态", prop: "statusCnsNo", width: "110", sortable: "" },
          {
            name: "创建人",
            prop: "createUserNameCnsNo",
            width: "110",
            sortable: ""
          },
          { name: "创建时间", prop: "createTime", width: "150", sortable: "" },
          { name: "完成时间", prop: "finishDate", width: "150", sortable: "" },
          {
            name: "累计处置金额",
            prop: "amountTotal",
            width: "150",
            sortable: ""
          },
          {
            name: "服务费金额",
            prop: "serviceAmt",
            width: "150",
            sortable: ""
          },
          {
            name: "订单笔数",
            prop: "accountOrderNum",
            width: "120",
            sortable: ""
          },
          { name: "沉没保证金", prop: "bondAmt", width: "120", sortable: "" },
          { name: "沉没笔数", prop: "bondNum", width: "120", sortable: "" }
        ]
      },
      // 分页1
      // tablePage:[],
      // page1:1,
      // size1:2,
      // total1:0,
      pageNum: 1,
      pageSize: 10,
      total2: 0
      // page3:1,
      // size3:10,
      // total3:0,
    };
  },
  mounted() {
    // 获取参数
    this.getPream();
    // 查询委托订单
    this.getOwtOrder();
  },
  methods: {
    // 获取参数
    getPream() {
      if (this.$route.query.id != undefined) {
        this.checkId = this.$route.query.id;
        // 查看详情
        this.CheckDetails();
      }
      this.$route.query.type == 0
        ? (this.disabledActive = false)
        : (this.disabledActive = true);
      // 从vuex里面查询主体信息
      var da = this.$store.state.logininformation;
      this.reversevideo.serviceCompanyId = da.jpFws.id;
      this.reversevideo.serviceCompanyName = da.jpFws.name;
      this.reversevideo.settleUserName = da.realName + " " + da.phone;
      this.reversevideo.createUserId = da.createUserId;
    },
    // 查看详情
    CheckDetails() {
      var that = this;
      that.httpsapi
        .POST(that.apis + "/statement/jp-account/addAccountOrderDetail", {
          accountNum: that.checkId
        })
        .then(result => {
          console.log(result);
          if (result.code == 200) {
            var res = result.data;
            result.data.cycle = [result.data.startDate, result.data.endDate];
            that.reversevideo = result.data;
            var data1 = result.data1;
            data1.forEach(item => {
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
            that.table1.Dataorigin = data1;
            var data2 = result.data2;
            data2.forEach(item => {
              item.createUserNameCnsNo =
                item.createUserName + " " + item.createUserPhone;
            });
            that.table4.Dataorigin = data2;
          }
        });
    },
    // 保存数据
    save() {
      if (this.reversevideo.cycle == "") {
        this.$message({
          showClose: true,
          offset: 400,
          message: "请选择对账周期",
          duration: "3000",
          type: "error"
        });
        return false;
      }
      if (this.table1.Dataorigin.length < 1) {
        this.$message({
          showClose: true,
          offset: 400,
          message: "请添加订单",
          duration: "3000",
          type: "error"
        });
        return false;
      }
      var that = this,
        arr = [];
      that.table1.Dataorigin.forEach(item => {
        arr.push(item.id);
      });
      console.log(arr);
      var obj = {
        serviceCompanyId: that.reversevideo.serviceCompanyId,
        createUserId: that.reversevideo.createUserId,
        startDate: that.reversevideo.startDate,
        endDate: that.reversevideo.endDate,
        accountDay: that.reversevideo.accountDay,
        remark: that.reversevideo.remark,
        status: 10,
        orderIdArr: arr
      };
      console.log(obj);
      that.httpsapi
        .POST(that.apis + "/statement/jp-account/addAccountOrder", obj)
        .then(result => {
          if (result.code == 200) {
            that.$message({
              showClose: true,
              offset: 400,
              message: result.message,
              duration: "3000",
              type: "success"
            });
            that.$router.go(-1);
          } else {
            that.$message({
              showClose: true,
              offset: 400,
              message: result.message,
              duration: "3000",
              type: "error"
            });
          }
        });
    },
    // 添加对账单
    CheckAdd() {
      this.dialogFormVisible = true;
      setTimeout(() => {
        this.dialogFormVisibleActive = true;
      }, 0);
    },
    // 添加对账单时查询委托订单
    getOwtOrder() {
      this.httpsapi
        .POST(
          this.apis +
            "/statement/jp-account/queryAccountOrderInfor/" +
            this.pageNum +
            "/" +
            this.pageSize,
          this.table2param
        )
        .then(result => {
          console.log(result);
          if (result.code == 200) {
            var _list = result.data.records;
            _list.forEach(item => {
              item.createUserNameCnsNo =
                item.createUserName + " " + item.createUserPhone;
              if (item.status == 10) {
                item.statusCnsNo = "待确认";
              } else if (item.status == 20) {
                item.statusCnsNo = "已完成";
              } else if (item.status == 30) {
                item.statusCnsNo = "已作废";
              }
              item.amountTotal = item.amountTotal
                ? item.amountTotal
                : "0" + "元";
              item.serviceAmt = item.serviceAmt ? item.serviceAmt : "0" + "元";
              item.accountOrderNum = item.accountOrderNum
                ? item.accountOrderNum
                : 0 + "笔";
              item.bondNum = item.bondNum ? item.bondNum : "0" + "笔";
            });
            this.table2 = _list;
            this.total2 = result.data.total;
          }
        });
    },
    // 表格复选框选中或者取消
    handleSelectionChange(value) {
      var arr = [];
      value.forEach(item => {
        arr.push(item);
      });
      this.table3.Dataorigin = arr;
      arr = [];
    },
    // 表格1回调
    tableFuncCellback1(data) {
      if (data[1] == "查看") {
        this.$router.push({
          name: "orderPa",
          query: {
            id: data[0].id
          }
        });
      }
    },
    // 取消选择
    tableFuncCellback3(data) {
      if (data[0] == "删除") {
        this.cancelChecked("obj", data[0]);
      }
    },
    // 清空选中的数据
    cancelChecked(type, value) {
      var that = this;
      if (type == "obj") {
        that.$refs.multipleTable.toggleRowSelection(value);
      } else {
        that.table3.Dataorigin.forEach(item => {
          that.$refs.multipleTable.toggleRowSelection(item);
        });
      }
    },
    // 搜索表格2
    onsearch() {
      this.table2param = {
        entrustProject: this.searchorder.entrustProject,
        workOrderNum: this.searchorder.workOrderNum
      };
      this.getOwtOrder();
    },
    // 确定选择这些委托订单
    submit() {
      var arr = JSON.stringify(this.table3.Dataorigin);
      this.table1.Dataorigin = JSON.parse(arr);
      this.Procancel();
    },
    // tab标签
    handleSelect(data) {
      this.tabletype = data;
    },

    // 排序
    SortChange(data, _ty) {
      var reg = new RegExp("CnsNo", "g"),
        field;
      if (data.prop != null) {
        field = data.prop.replace(reg, "");
      } else {
        field = null;
      }
      this.table2param.orderBy = field;
      if (data.order == "descending") {
        var _order = 1;
      } else if (data.order == "ascending") {
        var _order = 2;
      } else {
        var _order = "";
      }
      this.table2param.descType = _order;
      console.log(this.table2param);
      this.getOwtOrder();
    },

    // 监听对账周期
    cycleChenge(value) {
      var time1 = this.Timetransf(value[0]);
      var time2 = this.Timetransf(value[1]);
      this.reversevideo.startDate =
        time1.y + "-" + time1.m + "-" + time1.d + " 00:00:00";
      this.reversevideo.endDate =
        time2.y + "-" + time2.m + "-" + time2.d + " 23:59:59";
      this.reversevideo.accountDay =
        Math.floor(Math.abs(value[1] - value[0]) / (24 * 3600 * 1000)) + 1;
    },
    // 时间格式，转换字符串
    Timetransf(_date) {
      var newDate = new Date(_date);
      var y = newDate.getFullYear();
      var m = newDate.getMonth() + 1;
      var d = newDate.getDate();
      var h = newDate.getHours();
      var f = newDate.getMinutes();
      var s = newDate.getSeconds();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      return { y: y, m: m, d: d, h: h, f: f, s: s };
    },
    // 当前页多少条发生改变时触发
    tablePageSize1(val) {
      this.size1 = val;
    },
    // 当前页改变时触发
    tableCurrentChange1(val) {
      this.page1 = val;
    },
    // 当前页多少条发生改变时触发
    tablePageSize2(val) {
      this.pageSize = val;
      this.getOwtOrder();
    },
    // 当前页改变时触发
    tableCurrentChange2(val) {
      this.pageNum = val;
      this.getOwtOrder();
    },
    // 当前页多少条发生改变时触发
    tablePageSize3(val) {
      this.size3 = val;
    },
    // 当前页改变时触发
    tableCurrentChange4(val) {
      this.page3 = val;
    },
    // 返回父级页面
    cancel() {
      this.$router.go(-1);
    },
    // 关闭弹框
    Procancel() {
      this.dialogFormVisibleActive = false;
      setTimeout(() => {
        this.dialogFormVisible = false;
      }, 500);
    }
  }
};
</script>

<style scoped>
#checkadd .theBtn .el-button {
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
#checkadd .el-detail-item {
  line-height: 25px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 25px;
  margin: 12px 0;
}
#checkadd .el-detail-item label {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}
#checkadd .el-detail-item .tCon {
  margin-left: 104px;
  word-break: break-all;
  word-wrap: break-word;
}
#checkadd .el-detail-item label span {
  width: 84px;
  text-align: justify;
  text-align-last: justify;
  display: inline-block;
}
#checkadd .textareaC {
  width: 90%;
  min-height: 100px;
  border-radius: 3px;
  outline: #eeeeee;
}
#checkadd .check {
  padding: 15px 25px;
}
#checkadd .proResults-Childer {
  width: 85%;
}
#checkadd .table .el-row {
  /* margin:15px 25px 0 25px; */
  line-height: 40px;
}
#checkadd .proResults .proResults-Childer .wFrom {
  padding: 0 25px;
}
#checkadd .el-form-item {
  margin-bottom: 0;
}
#checkadd .tableT {
  margin: 15px 25px;
}
</style>

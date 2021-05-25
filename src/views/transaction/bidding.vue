<template>
  <div id="bidding">
    <searchui
      :searchFormArr="searchFormArr"
      @searchParma="searchParma"
      :isAccording="isAccording"
    ></searchui>
    <div class="bgBorderTwo">
      <el-menu
        :default-active="tabactive"
        text-color="#000"
        class="el-menu-demo el-menu-color"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="0">全部</el-menu-item>
        <el-menu-item index="10">待发布</el-menu-item>
        <el-menu-item index="30">报名中</el-menu-item>
        <el-menu-item index="40">待竞价(保证金)</el-menu-item>
        <el-menu-item index="50">竞价中</el-menu-item>
        <el-menu-item index="60">待开标</el-menu-item>
        <el-menu-item index="7">开标审批</el-menu-item>
        <el-menu-item index="70">已完成</el-menu-item>
        <el-menu-item index="100">失效作废</el-menu-item>
        <el-button
          class="el-pull-right Button-1 el-blueColor"
          size="medium"
          @click="IssueBidSheet()"
          >发布竞价单</el-button
        >
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

    <!-- 弹框 -->
    <div class="proResults" :class="{ active: dialogFormVisibleActive }" v-if="dialogFormVisible" @click="Procancel">
      <!-- 修改服务费 -->
      <div v-if="isproResults == '1'" class="proResults-Childer" @click.stop style="width: 650px;">
        <div class="card-header el-clearfix">
          <span>修改服务费</span>
          <span class="el-pull-right" type="text" @click="Procancel">×</span>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="rForm" label-width="100px" class="demo-ruleForm bidding">
          <el-form-item label="竞价编号:">{{ ruleForm.code }}</el-form-item>
          <el-form-item label="公告名称:">{{ ruleForm.title }}</el-form-item>
          <el-form-item
            label="委托项目部:"
            style="border-bottom: 1px solid rgba(0,0,0,0.1);padding-bottom: 10px;margin-bottom: 10px;"
            >{{ ruleForm.saleDeptName }}</el-form-item
          >
          <el-form-item label="服务费设置:">
            <el-form-item prop="servceFeeType">
              <el-radio-group
                v-model="ruleForm.servceFeeType"
                @change="servceFeeTypeChange"
              >
                <el-radio :label="0">无报名费</el-radio>
                <el-radio :label="1">总金额收取</el-radio>
                <el-radio :label="2">定额收取</el-radio>
                <el-radio :label="3">按单位收取</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="ruleForm.servceFeeType != '0'"
              prop="servceFeePrice"
              style="height: 40px;"
            >
              <div>
                <el-input
                  v-model="ruleForm.servceFeePrice"
                  :placeholder="ruleFormtext[0]"
                  style="display: inline-block;width: 40%;"
                ></el-input>
                <span
                  style="padding-left: 15px; color: #808080;font-size: 14px;"
                  >{{ ruleFormtext[1] }}</span
                >
              </div>
            </el-form-item>
          </el-form-item>
        </el-form>
        <div class="el-b">
          <el-button class="el-noColor" @click="Procancel()">取消</el-button>
          <el-button class="el-blueColor" @click="ServiceFee('rForm')"
            >确定</el-button
          >
        </div>
      </div>

      <!-- 择标下单 -->
      <div  v-if="isproResults == '2'" class="proResults-Childer" @click.stop style="width: 60%;">
        <div class="card-header el-clearfix">
          <span>择标下单</span>
          <span class="el-pull-right" type="text" @click="Procancel">×</span>
        </div>
        <div class="table">
          <p style="margin-bottom: 10px;font-size: 14px;">
            共<span>{{ table1.length }}</span>家竞买人
          </p>
          <el-table :data="table1" empty-text=" ">
            <el-table-column prop="buyerCompanyName" label="供应商名称" width="220"></el-table-column>
            <el-table-column prop="confirmTime" label="保证金到账日" width="170"></el-table-column>
            <el-table-column prop="effectiveDate" label="报价有效期" width="170"></el-table-column>
            <el-table-column prop="deliveryTime" label="预计到货日期" width="170"></el-table-column>
            <el-table-column prop="taxAmount" label="税额" width="110"></el-table-column>
            <el-table-column prop="taxAmountPrice" label="税价合计" width="150"></el-table-column>
            <el-table-column prop="" label="状态" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.offerStatus == 1">报价无效</span>
                <span v-if="scope.row.offerStatus == 2">报价有效</span>
              </template>
            </el-table-column>
            <el-table-column label="选择" width="100" fixed="right" class="radioF">
              <template slot-scope="scope">
                <el-radio size="medium" :label="scope.$index" v-model="elRadio" @change="radioFunc(scope.row)">
                </el-radio>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <!-- <div class="paging">
            <el-pagination
              background="false"
              :page-size="size1"
              pager-count="8"
              :current-page="page1"
              layout="total, prev, pager, next,sizes,jumper"
              :total="total1"
              @size-change="tablePageSize"
              @current-change="tableCurrentChange"
              @prev-click="tableCurrentChange"
              @next-click="tableCurrentChange">
            </el-pagination>
          </div> -->
        </div>
        <div class="table">
          <p class="table-title">已选供应商信息</p>
          <div class="el-detail el-detail-1">
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>价格排名</span>：</label>
              <div class="tCon" :style="{ color: selectedsupplier.position != 1 ? 'red' : '' }">
                第 {{ selectedsupplier.position }} 名
                <span v-if="selectedsupplier.position != 1" style="padding-left: 10px;">
                  非最低报价竞买人，请慎重选择</span>
              </div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>供应商名称</span>：</label>
              <div class="tCon">{{ selectedsupplier.buyerCompanyName }}</div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>注册资本</span>：</label>
              <div class="tCon">{{ selectedsupplier.registeredCapital }}</div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>厂家类型</span>：</label>
              <div class="tCon" v-if="selectedsupplier.type == 0">采购商</div>
              <div class="tCon" v-if="selectedsupplier.type == 1">供应商</div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>公司所在地</span>：</label>
              <div class="tCon">{{ selectedsupplier.parentPath }}</div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>报价联系人</span>：</label>
              <div class="tCon"> {{ selectedsupplier.offerUserName?selectedsupplier.offerUserName:'' + " " + selectedsupplier.offerUserTel?selectedsupplier.offerUserTel:'' }} </div>
            </div>
          </div>
          <el-row class="jine" style="border-top: 1px solid rgba(0,0,0,0.1);padding-top: 10px;margin: 20px 0;" >
            <el-col :span="12">
              <!-- 已选竞买人信息 -->
              <div class="el-detail el-detail-1">
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>金额</span>：</label>
                  <div class="tCon">
                    ￥{{ selectedsupplier.taxAmountPrice }}
                  </div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>税额</span>：</label>
                  <div class="tCon">￥{{ selectedsupplier.assessQuato }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>附件上传</span>：</label>
                  <div class="tCon">
                    <el-button type="button" class="el-blueColor">上传附件</el-button>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <!-- 已选竞买人信息 -->
              <div class="el-detail el-detail-1">
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>价税合计</span>：</label>
                  <div class="tCon">￥{{ selectedsupplier.assessPrice }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>单位价格</span>：</label>
                  <div class="tCon">￥{{ selectedsupplier.price }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="el-b">
            <el-button class="el-noColor" @click="Procancel">取消</el-button>
            <el-button class="el-blueColor" @click="submit">确定</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 下载签到码 -->
    <div style="width: 0;height:0; overflow: hidden;">
      <div class="bgddd" ref="bgddd">
        <img class="logo" src="../../assets/img/bglogo.png" />
        <div class="title">
          <p>
            {{ tit1 }}<span class="tit1">{{ tit2 }}</span
            ><span :class="{ tit2: oootitle }">看货会</span>
          </p>
        </div>
        <div class="code">
          <div calss="oCode" ref="qrCodeDiv"></div>
        </div>
        <div class="but">扫码签到</div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
export default {
  name: "bidding",
  data() {
    return {
      elRadio: false,
      isAccording: true,
      tabactive: "0",
      // 搜索组件数据
      searchFormArr: [
        {
          fieldName: "委托项目部",
          type: "select",
          field: "saleDeptName",
          option: [],
          placeholder: "请选择"
        },
        {
          fieldName: "名称/单号",
          type: "input",
          field: "title",
          placeholder: "请输入"
        },
        {
          fieldName: "发布时间",
          type: "date",
          field: "time1",
          placeholder: ""
        },
        {
          fieldName: "竞价开始时间",
          type: "date",
          field: "time2",
          placeholder: ""
        },
        {
          fieldName: "报名截止时间",
          type: "date",
          field: "time3",
          placeholder: ""
        },
        {
          fieldName: "竞价结束时间",
          type: "date",
          field: "time4",
          placeholder: ""
        },
        {
          fieldName: "下单日期",
          type: "date",
          field: "time5",
          placeholder: ""
        },
        // commitTime   下单日期
        {
          fieldName: "竞价方式",
          type: "select",
          field: "bidWay",
          option: [
            { id: "1", text: "公开" },
            { id: "2", text: "邀请" }
          ],
          placeholder: "请选择"
        },
        {
          fieldName: "竞价状态",
          type: "select",
          field: "status",
          option: [
            { id: "10", text: "待发布" },
            { id: "20", text: "审核中" },
            { id: "21", text: "待审核" },
            { id: "22", text: "已驳回" },
            { id: "30", text: "报名中" },
            { id: "40", text: "保证金" },
            { id: "41", text: "未确认" },
            { id: "42", text: "已确认" },
            { id: "50", text: "竞价中" },
            { id: "60", text: "待开标" },
            { id: "61", text: "待确认" },
            { id: "62", text: "待审核" },
            { id: "63", text: "已驳回" },
            { id: "70", text: "已完成" },
            { id: "71", text: "已成交" },
            { id: "72", text: "已流标" },
            { id: "100", text: "失效/作废" },
            { id: "101", text: "参与企业不足" },
            { id: "102", text: "中止" }
          ],
          placeholder: "请选择"
        },
        {
          fieldName: "处置方式",
          type: "select",
          field: "pricingMethod",
          option: [
            { id: "1", text: "按批次计价" },
            { id: "2", text: "按重量计价" }
          ],
          placeholder: "请选择"
        }
      ],
      // 表格组件--开始
      table: {
        // 表格操作数组
        operationList: {
          "10": ["查看详情", "编辑", "删除", "复制"],
          "001":["查看详情"],     //没有此状态，
          // '20':['查看详情','撤销','复制'],
          // '22';['查看详情','编辑','删除','复制'],
          "30": ["查看详情", "下载签到码", "复制"],
          "40": ["查看详情", "下载签到码", "保证金管理", "复制"],
          "50": ["查看详情", "复制"],
          "60": ["查看详情", "择标", "复制"],
          "006": ["查看详情", "复制"],
          "70": ["查看详情", "复制"],
          "71": ["查看详情", "修改服务费", "复制"],
          "72": ["查看详情", "复制"],
          "100": ["查看详情", "复制"]
        },
        // 操作块儿显示类型
        isoperation: true,
        StatusField:'biddingStatus',
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "180",
        // 表头数组
        header: [
          { name: "竞价编号", prop: "code", width: "200", sortable: "custom" },
          { name: "公告名称", prop: "title", width: "380", sortable: "custom" },
          {
            name: "委托项目部",
            prop: "saleDeptName",
            width: "230",
            sortable: "custom"
          },
          {
            name: "报名数量",
            prop: "applyNumber",
            width: "150",
            sortable: "custom"
          },
          {
            name: "状态",
            prop: "statusName",
            width: "100",
            sortable: "custom"
          },
          {
            name: "竞价方式",
            prop: "bidWayName",
            width: "120",
            sortable: "custom"
          },
          {
            name: "处置方式",
            prop: "pricingMethodName",
            width: "120",
            sortable: "custom"
          },
          {
            name: "发布时间",
            prop: "createTime",
            width: "100",
            sortable: "custom"
          },
          {
            name: "报名截止",
            prop: "signEndTime",
            width: "100",
            sortable: "custom"
          },
          {
            name: "竞价开始",
            prop: "offerStartTime",
            width: "100",
            sortable: "custom"
          },
          {
            name: "竞价结束",
            prop: "offerEndTime",
            width: "100",
            sortable: "custom"
          },
          {
            name: "开标时间",
            prop: "commitTime",
            width: "100",
            sortable: "custom"
          },
          {
            name: "出价次数",
            prop: "quotePeopleNumber",
            width: "110",
            sortable: "custom"
          },
          {
            name: "出价人数",
            prop: "quotePeopleNumber",
            width: "110",
            sortable: "custom"
          }
        ]
      },
      // 表格组件--结束
      dialogFormVisibleActive: false,
      dialogFormVisible: false,
      ruleFormtext: [],
      ruleForm: {
        uuids: "",
        title: "",
        saleDeptName: "",
        servceFeeType: 0,
        servceFeePrice: ""
      },
      rules: {
        servceFeeType: [
          { required: true, message: "请配置服务费", trigger: "change" }
        ],
        servceFeePrice: [
          { required: true, message: "请配置服务费", trigger: "change" }
        ]
      },
      table1:[],
      // 已选供应商信息
      selectedsupplier: {
        position: "",
        buyerCompanyName: "",
        registeredCapital: "",
        type: "",
        parentPath: "",
        offerUserName: "",
        offerUserTel: "",
        taxAmountPrice: "",
        assessQuato: "",
        assessPrice: "",
        price: ""
      },
      // 分页
      page: 1,
      size: 10,
      total: 0,
      param: {},
      search: {},
      biddingId: "",
      isproResults: "1",
      tit1: "",
      oootitle: false
    };
  },
  mounted() {
    // 获取参数
    this.theQuery();
    // 渲染表格
    this.QueryList();
    // 查询委托项目部
    this.queryProject();
  },
  methods: {
    theQuery() {
      if (this.$route.query.stataus != undefined) {
        this.tabactive = this.$route.query.stataus;
        this.param = {
          status: this.$route.query.stataus
        };
      }
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
        if (data.time1) {data.createTime = data.time1[0];data.createTimeEnd = data.time1[1];}
        if (data.time2) {data.offerStartTime = data.time2[0];data.offerStartTimeEnd = data.time2[1];}
        if (data.time3) {data.signEndTime = data.time3[0];data.signEndTimeEnd = data.time3[1];}
        if (data.time4) {data.offerEndTime = data.time4[0];data.offerEndTimeEnd = data.time4[1];}
        if (data.time5) {data.commitTime = data.time5[0];data.commitTimeEnd = data.time5[1];}
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
        .then(result => {
          var _result = result.data;
          if (result.code == "200") {
            _result.forEach(item => {
              _this.searchFormArr[0].option.push({
                id: item.ecOrganizationId,
                text: item.projectName
              });
            });
          }
        })
        .catch(err => {});
    },
    // 发布竞价单
    IssueBidSheet() {
      this.$router.push({
        name: "biddingAdd"
      });
    },
    // 导出
    exportData() {
      this.exports.exports(this.apis + "/trade/bidding/expExcelReBidding",this.param)
    },
    // 查询列表
    QueryList() {
      var _this = this;
      var url =_this.apis + "/trade/bidding/queryRecordByCondition/" +_this.page +"/" +_this.size;
      _this.httpsapi.POST(url, _this.param)
        .then(result => {
          console.log(result)
          if (result.code == 200) {
            var _result = result.data.records;
            _this.total = result.data.total;
            // 动态渲染状态
            _result.forEach((item, index) => {

              // 公告名称
              // 委托项目部
              if(item.saleDeptName.length > 50){
                var sal = item.saleDeptName;
                item.saleDeptName = sal.substring(0,20)+'...'+sal.substring(sal.length - 28,sal.length);
              }

              // 处理状态
              for (var i = 0; i < _this.searchFormArr[8].option.length; i++) {
                if (item.status == _this.searchFormArr[8].option[i].id) {
                  _result[index].statusName =
                    _this.searchFormArr[8].option[i].text;
                }
              }
              item.biddingStatus = item.status;
              // 判断是否在此状态下有此权限
              var currentId = _this.$store.state.logininformation.id;
              if(item.status == 10){
                if(currentId != item.createUserId){
                  item.biddingStatus = '001';
                }
              }
              if(item.status == 60){
                if(currentId != item.createUserId){
                  item.biddingStatus = '006';
                }
              }

              // 竞价方式
              item.bidWayName = item.bidWay == 1 ? "公开竞价" : item.bidWay == 2 ? "邀请竞价" : "";
              // 处置方式
              item.pricingMethodName = item.pricingMethod == 1 ? "按批次计价" : item.pricingMethod == 2 ? "按重量计价" : "";
            });
            _this.table.Dataorigin = _result;
          }
        })
        .catch(err => {});
    },
    // 点击tab导航搜索
    handleSelect(index, indexPath) {
      this.param.status = Number(index);
      this.QueryList();
    },
    // 表格回调
    tableFuncCellback(data) {
      switch (data[1]) {
        case "查看详情":
          this.CheckDetails(data[0]);
          break;
        case "编辑":
          this.editor(data[0]);
          break;
        case "删除":
          this.delete(data[0]);
          break;
        case "复制":
          this.copy(data[0]);
          break;
        case "下载签到码":
          this.DownloadCode(data[0]);
          break;
        case "修改服务费":
          this.ChangeService(data[0]);
          break;
        case "保证金管理":
          this.MarginManagement(data[0]);
          break;
        case "撤销":
          this.undo(data[0]);
          break;
        case "择标":
          this.ChooseStandard(data[0]);
          break;
        case "排序":
          this.sortingq(data[0]);
        default:
          break;
      }
    },
    // 查看详情
    CheckDetails(data) {
      this.$router.push({
        name: "biddingDetail",
        query: {
          id: data.uuids
        }
      });
    },
    // 编辑
    editor(data) {
      this.$router.push({
        name: "biddingAdd",
        query: {
          uuids: data.uuids,
          name: "editor"
        }
      });
    },
    // 删除
    delete(res) {
      var that = this;
      that.msgBox.msgBoxOpen(that, {
        message: "确认要删除竞价单？",
        success(data) {
          that.httpsapi
            .POST(that.apis + "/trade/scene/deleteScene/" + res.uuids, {})
            .then(result => {
              // console.log(result);
              if (result.code == 200) {
                that.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "2000",
                  type: "success"
                });
                that.QueryList();
              }
            });
        }
      });
    },
    // 复制
    copy(data) {
      this.$router.push({
        name: "biddingAdd",
        query: {
          uuids: data.uuids,
          name: "copy"
        }
      });
    },
    // 下载签到码
    DownloadCode(data) {
      var that = this;
      // this.$router.push({
      //   name: "qrcode",
      //   query: {
      //     id: data.uuids,
      //   }
      // });
      // return
      var text = data.title;
      if (text.length > 17) {
        that.tit1 = text.substring(0, 17);
        that.tit2 = text.substring(18, text.length);
        that.oootitle = true;
      } else {
        that.tit1 = text;
      }
      var url = that.apis.substring(0, that.apis.length - 5);
      that.$nextTick(() => {
        new QRCode(this.$refs.qrCodeDiv, {
          text: url + "/qrcode?id" + data.uuids,
          width: 559,
          height: 575,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.H //容错率，L/M/H
        });
        html2canvas(this.$refs.bgddd).then(canvas => {
          let dataURL = canvas.toDataURL("image/*");
          if (dataURL !== "") {
            var aLink = document.createElement("a");
            aLink.download = "签到码";
            aLink.href = dataURL;
            aLink.click();
          }
        });
      });
    },
    // 修改服务费
    ChangeService(data) {
      this.ruleForm.uuids = data.uuids;
      this.ruleForm.code = data.code;
      this.ruleForm.title = data.title;
      this.ruleForm.saleDeptName = data.saleDeptName;
      this.ruleForm.saleDeptId = data.saleDeptId;
      this.dialogFormVisible = true;
      setTimeout(() => {
        this.dialogFormVisibleActive = true;
      }, 0);
    },
    // 监听处理报名费
    servceFeeTypeChange(data) {
      if (data == 0) {
        this.ruleForm.servceFeePrice = "";
      }
      if (data == 1) {
        this.ruleFormtext[0] = "%";
        this.ruleFormtext[1] = "按总结算金额固定比例收取";
      }
      if (data == 2) {
        this.ruleFormtext[0] = "0.00元";
        this.ruleFormtext[1] = "按照单场次拍卖会定额收取";
      }
      if (data == 3) {
        this.ruleFormtext[0] = "0.00元/吨";
        this.ruleFormtext[1] = "按照处置数量定额收取";
      }
      console.log(this.ruleForm);
      console.log(this.ruleFormtext);
    },
    // 确定修改服务费
    ServiceFee(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.httpsapi
            .POST(that.apis + "/trade/scene/updateSceneCost", {
              sceneId: this.ruleForm.uuids,
              servceFeeType: this.ruleForm.servceFeeType,
              servceFeePrice: this.ruleForm.servceFeePrice
            })
            .then(result => {
              // console.log(result);
              if (result.code == 200) {
                that.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "5000",
                  type: "success"
                });
                that.QueryList();
                that.Procancel();
              } else {
                that.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "5000",
                  type: "error"
                });
              }
            });
        }
      });
    },
    // 保证金管理
    MarginManagement(data) {
      this.$router.push({
        name: "earnestmoneyDetail",
        query: {
          id: data.id
        }
      });
    },
    // 撤销
    undo(data) {
      var that = this;
      that.httpsapi
        .POST(that.apis + "/trade/scene/reSceneRevoke", { id: data.id })
        .then(result => {
          if (result.code == 200) {
            that.$message({
              showClose: true,
              offset: 400,
              message: result.message,
              duration: "5000",
              type: "success"
            });
          } else {
            that.$message({
              showClose: true,
              offset: 400,
              message: result.message,
              duration: "5000",
              type: "error"
            });
          }
        })
        .catch();
    },
    // 择标
    ChooseStandard(data) {
      this.biddingId = data.uuids;
      this.dialogFormVisible = true;
      setTimeout(() => {
        this.dialogFormVisibleActive = true;
        this.isproResults = 2;
      }, 500);
      this.httpsapi.POST(this.apis + "/trade/bidding/queryPricerList/" + this.biddingId, {})
      .then(result => {
        console.log(result);
        if (result.code == 200) {
          this.table1 = result.data;
        }
      });
    },
    // 所选的竞买人
    radioFunc(data) {
      this.selectedsupplier = data;
    },
    // 择标下单确定按钮
    submit() {
      var that = this;
      if (!that.selectedsupplier.buyerCompanyId) {
        that.$message({
          showClose: true,
          offset: 400,
          message: "请选择竞买人",
          duration: "3000",
          type: "error"
        });
        return false;
      }
      that.msgBox.msgBoxOpen(that, {
        message: "是否下单？",
        btnText: "下单",
        success: function() {
          that.httpsapi.POST(that.apis + "/trade/bidding/updatePricerListIsWinBidding/" + that.biddingId + "/" + that.selectedsupplier.buyerCompanyId, {})
            .then(result => {
              console.log(result);
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
                  type: "success"
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
      this.param.descType = data.order;
      this.QueryList();
    },
    // 关闭弹框
    Procancel() {
      this.dialogFormVisibleActive = false;
      setTimeout(() => {
        this.dialogFormVisible = false;
        this.isproResults = "1";
      }, 500);
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
    }
  }
};
</script>

<style scoped>
#bidding .bidding .el-form-item {
  margin: 0;
}
#bidding .bidding .el-radio {
  padding: 12px 0;
}
#bidding .bidding .el-radio-group .el-input {
  display: inline-block;
  width: 50%;
}
#bidding .table-title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 15px;
}
#bidding .el-row.jine .tCon {
  color: #e02020;
  font-size: 20px;
  font-weight: bold;
}
/* 订单详情--开始 */
#bidding .el-detail-item {
  line-height: 25px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 25px;
  margin: 12px 0;
}
#bidding .el-detail-item label {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}
#bidding .el-detail-item .tCon {
  margin-left: 104px;
  word-break: break-all;
  word-wrap: break-word;
}
#bidding .el-detail-item label span {
  width: 84px;
  text-align: justify;
  text-align-last: justify;
  display: inline-block;
}
#bidding .el-detail-2 {
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #cfcfcf;
}
#bidding .table {
  margin: 0 25px 15px 25px;
  padding-bottom: 30px;
  max-width: 100%;
}
#bidding .table .el-row {
  margin-top: 20px;
}
#bidding .table .el-row .el-col {
  color: #2db7f5;
  cursor: pointer;
  position: relative;
  padding: 15px;
  font-size: 14px;
}
#bidding .bgddd {
  width: 750px;
  height: 1077px;
  background-image: url(../../assets/img/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  padding-top: 47px;
}
#bidding .bgddd .logo {
  display: inline-block;
  text-align: center;
  width: 130px;
  width: 265px;
  height: 65px;
}
#bidding .bgddd .title {
  margin: 60px 25px;
  height: 120px;
  font-size: 40px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 58px;
  overflow: hidden;
}
#bidding .bgddd .title p {
  margin: 0;
}
#bidding .bgddd .title p .tit1 {
  display: inline-block;
  max-width: 515px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
#bidding .bgddd .title p .tit2 {
  position: relative;
  top: -13px;
}
#bidding .bgddd .code {
  width: 559px;
  height: 586px;
  background-color: #ffffff;
  margin: 107px 86px 42px 86px;
  padding: 10px;
  padding-bottom: 0;
}
#bidding .bgddd .code img {
  width: 100%;
  height: 100%;
}
#bidding .bgddd .but {
  font-size: 40px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
}
</style>
<style>
  #bidding .el-radio__label {
    display: none !important;
  }
</style>

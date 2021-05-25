<template>
  <div id="bidderDetails">
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">实打实大所大所大所大所</div>
        <div class="theBtn el-pull-right">
          <el-button> </el-button>
        </div>
      </div>
      <!-- 详情 -->
      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>销售单位</span>：</label>
          <div class="tCon">{{ reversevideo.saleCompanyName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>销售部门</span>：</label>
          <div class="tCon">{{ reversevideo.saleDeptName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>竞价单号</span>：</label>
          <div class="tCon">{{ reversevideo.code }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>竞价开始日期</span>：</label>
          <div class="tCon">{{ reversevideo.offerStartTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>竞价截止日期</span>：</label>
          <div class="tCon">{{ reversevideo.offerEndTime }}</div>
        </div>
      </div>
    </div>
    <!-- 竞买人要求 -->
    <div class="bgBorderThree da1" v-if="!isSingle">
      <div class="Cord-header el-clearfix">
        <span>竞买人要求</span>
      </div>
      <div class="table">
        <div class="el-detail el-detail-1">
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>付款方式</span>：</label>
            <div class="tCon" v-if="bidder.payWay == '1'">现金</div>
            <div class="tCon" v-if="bidder.payWay == '2'">票据</div>
            <div class="tCon" v-if="bidder.payWay == '3'">无要求</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>付款时间</span>：</label>
            <div class="tCon">{{ bidder.payTime }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>货品所在地</span>：</label>
            <div class="tCon">
              {{ bidder.provinceName + bidder.cityName + bidder.countyName }}
            </div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>看货地址</span>：</label>
            <div class="tCon">{{ bidder.provinceName }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>储存方式</span>：</label>
            <div class="tCon" v-if="bidder.storageWay == '1'">
              室内存放{{ bidder.storageTime }}天
            </div>
            <div class="tCon" v-if="bidder.storageWay == '2'">
              室外存放{{ bidder.storageTime }}天
            </div>
            <div class="tCon" v-if="bidder.storageWay == '3'">
              其他存放{{ bidder.storageTime }}天
            </div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>提货时间</span>：</label>
            <div class="tCon">{{ bidder.deliveryTime }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>竞买人企业类型</span>：</label>
            <div class="tCon" v-if="bidder.biddersType == '1'">个体工商户</div>
            <div class="tCon" v-if="bidder.biddersType == '2'">企业主体</div>
            <div class="tCon" v-if="bidder.biddersType == '3'">无要求</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>竞买人注册资本</span>：</label>
            <div class="tCon">{{ bidder.biddersRegistered }}万元</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>竞买人经营地址</span>：</label>
            <div class="tCon">{{ bidder.biddersProvince }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>竞买人资格许可</span>：</label>
            <div class="tCon">{{ bidder.biddersQualification }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>竞买人报价税率</span>：</label>
            <div class="tCon">{{ bidder.biddersTax }}%</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>拆卸情况</span>：</label>
            <div class="tCon" v-if="bidder.disassembleFlag == '1'">
              需买方自行拆卸
            </div>
            <div class="tCon" v-if="bidder.disassembleFlag == '2'">
              无需拆卸可直接清运
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 报名及开票信息 -->
    <div class="bgBorderThree da1" v-if="!isSingle">
      <div class="Cord-header el-clearfix">
        <span>报名及开票信息</span>
      </div>
      <div class="table">
        <div class="el-detail el-detail-1">
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>竞买人企业名称</span>：</label>
            <div class="tCon">{{ findSignUpData.buyerCompanyName }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>报名费</span>：</label>
            <div class="tCon">{{ findSignUpData.payAmt }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>缴费时间</span>：</label>
            <div class="tCon">{{ findSignUpData.createTime }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>报名联系人</span>：</label>
            <div class="tCon">
              {{ findSignUpData.contacts + " " + findSignUpData.contactsTel }}
            </div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>报名时间</span>：</label>
            <div class="tCon">{{ findSignUpData.signTime }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>报名备注</span>：</label>
            <div class="tCon">{{ findSignUpData.remark }}</div>
          </div>
          <div
            class="el-detail-item el-clearfix"
            style="border-bottom: 1px solid #CCCCCC;padding-bottom: 15px;margin-bottom: 15px;"
          >
            <label class="el-pull-left"><span>报名结果</span>：</label>
            <div class="tCon" v-if="findSignUpData.status == 10">待报名</div>
            <div class="tCon" v-if="findSignUpData.status == 20">保证金</div>
            <div class="tCon" v-if="findSignUpData.status == 21">未缴纳</div>
            <div class="tCon" v-if="findSignUpData.status == 22">无需缴纳</div>
            <div class="tCon" v-if="findSignUpData.status == 23">
              已缴纳未确认
            </div>
            <div class="tCon" v-if="findSignUpData.status == 24">
              已缴纳已确认
            </div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>发票类型</span>：</label>
            <div class="tCon" v-if="billingMap.invType == 1">
              增值税专用发票
            </div>
            <div class="tCon" v-if="billingMap.invType == 2">
              增值税普通发票
            </div>
            <div class="tCon" v-if="billingMap.invType == 3">其他</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>发票抬头</span>：</label>
            <div class="tCon">{{ billingMap.title }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>纳税人识别号</span>：</label>
            <div class="tCon">{{ billingMap.invoicePath }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>地址</span>：</label>
            <div class="tCon">{{ billingMap.address }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>开户行</span>：</label>
            <div class="tCon">{{ billingMap.bankDeposit }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>账号</span>：</label>
            <div class="tCon">{{ billingMap.accountNumber }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>开票电话</span>：</label>
            <div class="tCon">{{ billingMap.billingTelephone }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>收票人</span>：</label>
            <div class="tCon">{{ billingMap.drawee }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>收票地址</span>：</label>
            <div class="tCon">{{ billingMap.billingAddress }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 保证金 -->
    <div class="bgBorderThree da1" v-if="!isSingle">
      <div class="Cord-header el-clearfix">
        <span>保证金</span>
      </div>
      <div class="table table2">
        <el-row>
          <el-col :span="12">
            <div class="el-detail el-detail-1">
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"
                  ><span>是否缴纳保证金</span>：</label
                >
                <div class="tCon">
                  {{
                    marginmoney.bond_type == 1
                      ? "否"
                      : marginmoney.bond_type == 2 || marginmoney.bond_type == 3
                      ? "是"
                      : ""
                  }}
                </div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>保证金金额</span>：</label>
                <div class="tCon">{{ marginmoney.amt }}</div>
              </div>
              <div class="el-detail-item el-clearfix eldetail">
                <label class="el-pull-left"><span>保证金状态</span>：</label>
                <div class="tCon" v-if="marginmoney.status == 10">未缴纳</div>
                <div class="tCon" v-if="marginmoney.status == 20">未确认</div>
                <div class="tCon" v-if="marginmoney.status == 30">已确认</div>
                <div class="tCon" v-if="marginmoney.status == 40">未退还</div>
                <div class="tCon" v-if="marginmoney.status == 50">已退还</div>
                <div class="tCon" v-if="marginmoney.status == 60">已没收</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"
                  ><span>保证金缴纳时间</span>：</label
                >
                <div class="tCon">{{ marginmoney.pay_time }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"
                  ><span>保证金确认时间</span>：</label
                >
                <div class="tCon">{{ marginmoney.confirm_time }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"
                  ><span>退还保证金时间</span>：</label
                >
                <div class="tCon">{{ marginmoney.return_time }}</div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-detail el-detail-1">
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>收款账户名</span>：</label>
                <div class="tCon">{{ marginmoney.account }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"
                  ><span>保证金收款账户</span>：</label
                >
                <div class="tCon">{{ marginmoney.account_no }}</div>
              </div>
              <div class="el-detail-item el-clearfix eldetail">
                <label class="el-pull-left"><span>开户行</span>：</label>
                <div class="tCon">{{ marginmoney.open_bank }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>来款备注</span>：</label>
                <div class="tCon">{{ marginmoney.bond_remark }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>保证金操作人</span>：</label>
                <div class="tCon">
                  {{
                    marginmoney.pay_user_name + " " + marginmoney.pay_user_tel
                  }}
                </div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>保证金凭证</span>：</label>
                <div class="tCon">{{ marginmoney.file_name }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>缴纳方式</span>：</label>
                <div class="tCon" v-if="marginmoney.pay_way == 0">无需缴纳</div>
                <div class="tCon" v-if="marginmoney.pay_way == 1">汇款转账</div>
                <div class="tCon" v-if="marginmoney.pay_way == 2">
                  资金账余额
                </div>
                <div class="tCon" v-if="marginmoney.pay_way == 3">线下</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 竞买人及报价信息 -->
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>竞买人及报价信息</span>
      </div>
      <div class="table">
        <div class="el-detail el-detail-1">
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>供应商名称</span>：</label>
            <div class="tCon">{{ findScene.buyerCompanyName }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>注册资本</span>：</label>
            <div class="tCon">{{ findScene.registeredCapital }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>企业类型</span>：</label>
            <div class="tCon" v-if="findScene.type == 0">采购商</div>
            <div class="tCon" v-if="findScene.type == 1">供应商</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>公司所在地</span>：</label>
            <div class="tCon">{{ findScene.parentPath }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>报价联系人</span>：</label>
            <div class="tCon">
              {{ findScene.offerUserName + " " + findScene.offerUserTel }}
            </div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>报价有效期</span>：</label>
            <div class="tCon">{{ findScene.effectiveDate }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>报价说明</span>：</label>
            <div class="tCon">{{ findScene.remark }}</div>
          </div>
          <div class="el-detail-item el-clearfix">
            <label class="el-pull-left"><span>报价附件</span>：</label>
            <div class="tCon">{{ findScene.fileIds }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 标的物清单 -->
    <div class="bgBorderThree da1">
      <div class="Cord-header el-clearfix">
        <span>标的物清单</span>
        <span class="subtitle"
          >报价时间：2019-11-06 14:16:46 本报价为此供应商最终出价</span
        >
      </div>
      <div class="table">
        <tableTwo
          :table="table1"
          @tableFuncCellback="tableFuncCellback1"
        ></tableTwo>
      </div>
      <div class="bgBorderTwo widTab1">
        <div class="el-detail el-detail-1">
          <el-row>
            <el-col :span="16">
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>处置/计价方式</span>：</label>
                <div class="tCon">
                  {{
                    reversevideo.pricingMethod == 1
                      ? "按批次计价"
                      : reversevideo.pricingMethod == 2
                      ? "按重量计价"
                      : ""
                  }}
                </div>
              </div>
              <div
                class="el-detail-item el-clearfix"
                v-if="reversevideo.pricingMethod == 2"
              >
                <label class="el-pull-left"><span>单位价格</span>：</label>
                <div class="tCon">{{ matter.unitPriceTotal }}/吨</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"
                  ><span>税额（{{ matter.taxRates }}%）</span>：</label
                >
                <div class="tCon fontWidhetRed">
                  ￥{{ matter.taxAmountTotal }}
                </div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>金额</span>：</label>
                <div class="tCon fontWidhetRed">￥{{ matter.priceTotal }}</div>
              </div>
              <div class="el-detail-item el-clearfix">
                <label class="el-pull-left"><span>税价合计</span>：</label>
                <div class="tCon fontWidhetRed">￥{{ matter.taxAllTotal }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 竞价记录 -->
    <div class="bgBorderThree" v-if="!isSingle">
      <div class="Cord-header el-clearfix">
        <span>竞价记录</span>
        <span
          style="display: inline-block;margin-left: 15px;color: red;font-size: 14px;"
          >剩余
          <span style="font-size: 19px;font-weight: bold;">28:50:26</span>
          s</span
        >
      </div>
      <div class="table">
        <tableTwo
          :table="table2"
          @tableFuncCellback="tableFuncCellback2"
        ></tableTwo>
      </div>
    </div>

    <div class="bgBorderThree" style="margin-top: 15px;">
      <div class="el-b">
        <el-button class="el-noColor">关闭</el-button>
        <el-button class="el-blueColor">打印</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bidderDetails",
  data() {
    return {
      isSingle: false,
      biddingId: "",
      companyId: "",
      offerId: "",
      // 销售信息
      reversevideo: {},
      // 报名及开票信息
      findSignUpData: {},
      billingMap: {},
      // 竞买人及报价信息
      findScene: {},
      // 保证金
      marginmoney: {},

      // 竞买人要求
      bidder: {},
      // 标的物
      matter: {},
      table1: {
        // 表格操作
        operationList: ["查看附件"],
        // 操作块儿显示类型
        isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "110",
        // 表头数组
        header: [
          { name: "标的名称", prop: "goodsName", width: "200" },
          { name: "规格", prop: "spec", width: "200" },
          { name: "品牌", prop: "brand", width: "200" },
          { name: "标的描述", prop: "desc", width: "200" },
          { name: "采购数量", prop: "num", width: "200" },
          { name: "金额/单价", prop: "uuids", width: "300" },
          { name: "税额", prop: "taxAmount", width: "300" },
          { name: "单位价格", prop: "unitPrice", width: "300" },
          { name: "税价合计", prop: "taxTotal", width: "300" }
        ]
      },
      table2: {
        // 表格操作
        operationList: ["报价详情"],
        // 操作块儿显示类型
        // isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "100",
        // 表头数组
        header: [
          { name: "报价次序", prop: "", width: "300" },
          {
            name: "竞买人企业名称",
            prop: "buyerCompanyName",
            width: "200",
            sortable: "custom"
          },
          {
            name: "报价时间",
            prop: "createTime",
            width: "200",
            sortable: "custom"
          },
          {
            name: "降幅比例",
            prop: "increRate",
            width: "200",
            sortable: "custom"
          },
          {
            name: "降幅金额",
            prop: "increAmt",
            width: "300",
            sortable: "custom"
          },
          { name: "税额", prop: "taxAmount", width: "200", sortable: "custom" },
          {
            name: "税价合计",
            prop: "totalTax",
            width: "200",
            sortable: "custom"
          }
        ]
      }
    };
  },
  mounted() {
    // 获取参数
    this.getParameter();
  },
  methods: {
    // 获取参数
    getParameter() {
      this.isSingle = this.$store.state.bidderType;
      this.biddingId = this.$route.query.biddingId;
      this.companyId = this.$route.query.companyId;
      this.offerId = this.$route.query.offerId;
      if (this.isSingle) {
        //单笔报价详情
        // 主题信息
        this.ReverseVideo();
        // 查询标的物清单
        this.MatterList();
        // 竞买人及报价信息
        this.findSceneOfferF();
      } else {
        // 竞买人详情
        // 主题信息
        this.ReverseVideo();
        // 报名及开票信息
        this.findSignUpF();
        // 竞价记录
        this.sceneOfferList();
        // 竞买人要求
        this.queryPricerAsk();
        // 竞买人及报价信息
        this.findSceneOfferF();
        // 查询标的物清单
        this.MatterList();
        // 保证金
        this.queryBondDeal();
      }
    },
    // 反显主体信息
    ReverseVideo() {
      var that = this;
      that.httpsapi
        .POST(that.apis + "/trade/bidding/queryBiddingDetail", {
          uuids: that.biddingId
        })
        .then(result => {
          console.log(result);
          if (result.code == 200) {
            that.reversevideo = result.data[0];
          }
        });
    },
    // 报名及开票信息
    findSignUpF() {
      var _this = this;
      _this.httpsapi
        .POST(
          _this.apis +
            "/trade/bidding/findSignUp/" +
            _this.biddingId +
            "/" +
            this.companyId
        )
        .then(result => {
          // console.log(result)
          if (result.code == 200) {
            _this.findSignUpData = result.data.signUpList[0];
            _this.billingMap = result.data.billingMap;
          }
        });
    },
    // 竞价记录
    sceneOfferList() {
      var _this = this;
      _this.httpsapi
        .POST(_this.apis + "/trade/bidding/sceneOfferList", {
          uuids: _this.biddingId,
          companyId: _this.companyId
        })
        .then(result => {
          // console.log(result)
          if (result.code == 200) {
            _this.table2.Dataorigin = result.data;
          }
        });
    },
    // 保证金
    queryBondDeal() {
      var _this = this;
      _this.httpsapi
        .POST(
          _this.apis +
            "/trade/bidding/queryBondDeal/" +
            _this.biddingId +
            "/" +
            _this.companyId,
          {}
        )
        .then(result => {
          // console.log(result)
          if (result.code == 200) {
            _this.marginmoney = result.data.bondDealList[0];
          }
        });
    },
    // 竞买人要求
    queryPricerAsk() {
      var _this = this;
      _this.httpsapi
        .POST(
          _this.apis + "/trade/bidding/queryPricerAsk/" + _this.biddingId,
          {}
        )
        .then(result => {
          // console.log(result)
          if (result.code == 200) {
            _this.bidder = result.data[0];
          }
        });
    },
    // 竞买人及报价信息
    findSceneOfferF() {
      var _this = this;
      _this.httpsapi
        .POST(
          _this.apis +
            "/trade/bidding/findSceneOffer/" +
            _this.biddingId +
            "/" +
            _this.companyId,
          {}
        )
        .then(result => {
          // console.log(result)
          if (result.code == 200) {
            _this.findScene = result.data.offerList[0];
          }
        });
    },
    // 查询标的物清单
    MatterList() {
      var _this = this;
      if (this.isSingle) {
        //竞价记录来的
        var _text = _this.biddingId + "/0/" + _this.offerId;
      } else {
        //竞买人来的
        var _text = _this.biddingId + "/" + _this.companyId + "/0";
      }
      _this.httpsapi
        .POST(_this.apis + "/trade/bidding/findSceneOfferDetail/" + _text, {})
        .then(result => {
          // console.log(result)
          if (result.code == 200) {
            _this.matter = result.data;
            _this.table1.Dataorigin = result.data.detailList;
          }
        });
    }
  }
};
</script>

<style space>
#bidderDetails .el-title {
  margin: 15px 0;
}
#bidderDetails .fontWidhetRed {
  font-size: 20px;
  color: red;
}
#bidderDetails .table-title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 15px;
}
#bidderDetails .el-row.jine .tCon {
  color: #e02020;
  font-size: 20px;
  font-weight: bold;
}
#bidderDetails .eldetail {
  border-bottom: 1px solid #cccccc;
  padding-bottom: 15px;
  margin-top: 15px;
}
#bidderDetails .theTitle {
  height: 42px;
  font-size: 20px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
  line-height: 30px;
}
#bidderDetails .theBtn .el-button {
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
#bidderDetails .table2 .el-row {
  margin: 0;
}
#bidderDetails .el-detail-item {
  line-height: 25px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 25px;
  margin: 12px 0;
}
#bidderDetails .el-detail-item label {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}
#bidderDetails .el-detail-item .tCon {
  margin-left: 104px;
  word-break: break-all;
  word-wrap: break-word;
}
#bidderDetails .el-detail-item label span {
  width: 84px;
  text-align: justify;
  text-align-last: justify;
  display: inline-block;
}
#bidderDetails .da1 .el-detail-item label span {
  width: 100px;
}
#bidderDetails .table {
  margin: 0 25px 15px 25px;
  padding-bottom: 15px;
  max-width: 100%;
}
#bidderDetails .el-b {
  padding: 15px 0;
  text-align: center;
}
#bidderDetails .el-b .el-button {
  padding: 5px 15px;
  letter-spacing: 0px;
}
#bidderDetails .subtitle {
  font-size: 12px;
  font-weight: 100;
  padding-left: 15px;
  color: #787878;
}
</style>

<template>
  <div id="biddingD">
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">{{ reversevideo.title }}</div>
        <div class="theBtn el-pull-right">
          <el-button v-if="reversevideo.status">{{
            reversStatus[reversevideo.status].text
          }}</el-button>
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
          <label class="el-pull-left"><span>竞价分类</span>：</label>
          <div class="tCon">{{ reversevideo.classifyName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>计价方式</span>：</label>
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
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>应用领域</span>：</label>
          <div class="tCon">{{ reversevideo.useArea }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>竞价联系人</span>：</label>
          <div class="tCon">
            {{ reversevideo.contacts + " " + reversevideo.contactsTel }}
          </div>
        </div>
        <!--  -->
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>择标人</span>：</label>
          <div class="tCon">
            {{
              (reversevideo.updateUserName ? reversevideo.updateUserName : "") +
              " " +
              (reversevideo.updateUserTel ? reversevideo.updateUserTel : "")
            }}
          </div>
        </div>
        <br />
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>发布人</span>：</label>
          <div class="tCon">
            {{ reversevideo.createUserName + " " + reversevideo.createUserTel }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>发布日期</span>：</label>
          <div class="tCon">{{ reversevideo.createTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>可看货日期</span>：</label>
          <div class="tCon">{{ reversevideo.khStartTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>报名截止日期</span>：</label>
          <div class="tCon">{{ reversevideo.signEndTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>竞价开始日期</span>：</label>
          <div class="tCon">{{ reversevideo.offerStartTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>竞价截止日期</span>：</label>
          <div class="tCon">{{ reversevideo.offerEndTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>中标日期</span>：</label>
          <div class="tCon">{{ reversevideo.bidTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>结束自动延长</span>：</label>
          <div class="tCon">{{ reversevideo.offerEndTime }}</div>
        </div>
      </div>
    </div>
    <div class="bgBorderTwo" style="margin-bottom: 0">
      <el-tabs v-model="activeName" @tab-click="handleSelect">
        <el-tab-pane label="标的物清单" name="1">
          <div class="bgBorderThree">
            <div class="Cord-header el-clearfix">
              <span>标的物清单</span>
              <el-button class="el-blueColor el-pull-right" @click="ExportList"
                >导出商品清单</el-button
              >
            </div>
            <div class="table">
              <tableTwo
                :table="table1"
                @tableFuncCellback="tableFuncCellback1"
              ></tableTwo>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="竞买人管理" name="2">
          <div class="bgBorderThree">
            <div class="Cord-header el-clearfix">
              <span>竞买人名单</span>
              <span class="subtitle">共5家</span>
              <el-button class="el-blueColor el-pull-right" @click="marginGo"
                >保证金管理</el-button
              >
            </div>
            <div class="table">
              <tableTwo
                :table="table2"
                @tableFuncCellback="tableFuncCellback2"
              ></tableTwo>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="竞价须知/标的物详情" name="3">
          <div class="bgBorderThree" style="margin-bottom: 20px">
            <div class="Cord-header el-clearfix">
              <span>竞价须知/标的物详情</span>
            </div>
            <div class="table">
              <div class="GoodsContent" v-html="goodsContent"></div>
            </div>
          </div>
          <div class="bgBorderThree" style="margin-bottom: 20px">
            <div class="Cord-header el-clearfix">
              <span>附件</span>
              <el-button class="el-blueColor el-pull-right" @click="xiazia">下载全部</el-button>
            </div>
            <div class="table" style="width: 570px">
              <tableTwo
                :table="table5"
                @tableFuncCellback="tableFuncCellback5"
              ></tableTwo>
            </div>
          </div>
          <div class="bgBorderThree">
            <div class="Cord-header el-clearfix">
              <span>图片</span>
            </div>
            <div class="table" style="width: 570px">
              <tableTwo
                :table="table9"
                @tableFuncCellback="tableFuncCellback9"
              ></tableTwo>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="竞价规则及费用要求" name="4">
          <div class="bgBorderThree widTab1">
            <div class="Cord-header el-clearfix">
              <span>竞价规则及费用</span>
            </div>
            <div class="table">
              <el-row>
                <el-col :span="12">
                  <div class="el-detail el-detail-1">
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>调价方式</span>：</label
                      >
                      <div class="tCon">
                        {{
                          marginmoney.adjustWay == 1
                            ? "按比例调整"
                            : marginmoney.adjustWay == 2
                            ? "按金额调整"
                            : ""
                        }}
                      </div>
                    </div>
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>增价幅度</span>：</label
                      >
                      <div class="tCon">
                        {{ marginmoney.increRange }}
                        <span v-if="marginmoney.adjustWay == 1">%</span>
                        <span v-else>元</span>
                      </div>
                    </div>
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>开盘价格</span>：</label
                      >
                      <div class="tCon" v-if="marginmoney.startPriceFlag == 1">
                        未设置开盘价格
                      </div>
                      <div class="tCon" v-if="marginmoney.startPriceFlag == 2">
                        {{ marginmoney.startPrice }}
                      </div>
                    </div>
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>成交底价</span>：</label
                      >
                      <div class="tCon">{{ marginmoney.basePrice }}元</div>
                    </div>
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>评估参考值</span>：</label
                      >
                      <div class="tCon">
                        {{ marginmoney.evaluationPrice }}元
                      </div>
                    </div>
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>最低参与企业数</span>：</label
                      >
                      <div class="tCon">
                        最少 {{ marginmoney.minSign }} 家报名
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="el-detail el-detail-1">
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>隐私设置</span>：</label
                      >
                      <div class="tCon">
                        {{
                          marginmoney.privacySet == 1
                            ? "电话报价后可见"
                            : marginmoney.privacySet == 2
                            ? "公开联系人信息"
                            : ""
                        }}
                      </div>
                    </div>
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>成交公告</span>：</label
                      >
                      <div class="tCon">
                        {{
                          marginmoney.dealNotice == 1
                            ? "成交后自动发布"
                            : marginmoney.dealNotice == 2
                            ? "成交后不公开"
                            : ""
                        }}
                      </div>
                    </div>
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>结束时间延长</span>：</label
                      >
                      <div class="tCon">{{ marginmoney.offerEndTime }}</div>
                    </div>
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"><span>报名费</span>：</label>
                      <div class="tCon">{{ marginmoney.entryFeePrice }}</div>
                    </div>
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>平台服务费</span>：</label
                      >
                      <div class="tCon">
                        <div v-if="marginmoney.servceFeeType == '0'">
                          无服务费
                        </div>
                        <div v-if="marginmoney.servceFeeType == '1'">
                          {{ marginmoney.servceFeePrice }}%
                        </div>
                        <div v-if="marginmoney.servceFeeType == '2'">
                          {{ marginmoney.servceFeePrice }}元
                        </div>
                        <div v-if="marginmoney.servceFeeType == '3'">
                          {{ marginmoney.servceFeePrice }}元/{{
                            marginmoney.unit
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>询价方式</span>：</label
                      >
                      <div class="tCon">
                        {{
                          marginmoney.bidWay == 1
                            ? "公开询价"
                            : marginmoney.bidWay == 2
                            ? "邀请询价"
                            : ""
                        }}
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="bgBorderThree widTab1">
            <div class="Cord-header el-clearfix">
              <span>保证金要求</span>
            </div>
            <div class="table">
              <el-row>
                <el-col :span="12">
                  <div class="el-detail el-detail-1">
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>是否缴纳保证金</span>：</label
                      >
                      <div class="tCon">
                        {{
                          marginmoney.bondType == 1
                            ? "否"
                            : marginmoney.bondType == 2 ||
                              marginmoney.bondType == 3
                            ? "是"
                            : ""
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="el-detail el-detail-1">
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>保证金金额</span>：</label
                      >
                      <div class="tCon">{{ marginmoney.bondAmt }}元</div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="el-detail el-detail-1">
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>收款账户名</span>：</label
                      >
                      <div class="tCon">{{ marginmoney.accountName }}</div>
                    </div>
                  </div>
                  <div class="el-detail el-detail-1">
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>保证金收款账户</span>：</label
                      >
                      <div class="tCon">{{ marginmoney.accountDeposit }}</div>
                    </div>
                  </div>
                  <div class="el-detail el-detail-1">
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"><span>开户行</span>：</label>
                      <div class="tCon">{{ marginmoney.bankDeposit }}</div>
                    </div>
                  </div>
                  <div class="el-detail el-detail-1">
                    <div class="el-detail-item el-clearfix">
                      <label class="el-pull-left"
                        ><span>来款备注</span>：</label
                      >
                      <div class="tCon">{{ marginmoney.paymentNotes }}</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="竞买人要求" name="5">
          <div class="bgBorderThree widTab3">
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
                  <div class="tCon">成交后 {{ bidder.payTime }} 日内</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>货品所在地</span>：</label>
                  <div class="tCon">
                    {{ bidder.provinceName + bidder.cityName }}
                  </div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>看货地址</span>：</label>
                  <div class="tCon">{{ bidder.khAddress }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>储存方式</span>：</label>
                  <div class="tCon" v-if="bidder.storageWay == '1'">
                    室内<span>存放 {{ bidder.storageTime }} 天</span>
                  </div>
                  <div class="tCon" v-if="bidder.storageWay == '2'">
                    室外<span>存放 {{ bidder.storageTime }} 天</span>
                  </div>
                  <div class="tCon" v-if="bidder.storageWay == '3'">
                    其他<span>存放 {{ bidder.storageTime }} 天</span>
                  </div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>提货时间</span>：</label>
                  <div class="tCon">{{ bidder.deliveryTime }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"
                    ><span>竞买人企业类型</span>：</label
                  >
                  <div class="tCon" v-if="bidder.biddersType == '1'">
                    个体工商户
                  </div>
                  <div class="tCon" v-if="bidder.biddersType == '2'">
                    企业主体
                  </div>
                  <div class="tCon" v-if="bidder.biddersType == '3'">
                    无要求
                  </div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"
                    ><span>竞买人注册资本</span>：</label
                  >
                  <div class="tCon">{{ bidder.biddersRegistered }}万元</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"
                    ><span>竞买人经营地址</span>：</label
                  >
                  <div class="tCon">{{ bidder.biddersProvince }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"
                    ><span>竞买人资格许可</span>：</label
                  >
                  <div class="tCon">
                    {{
                      bidder.biddersQualification +
                      "," +
                      (bidder.biddersQualificationOther
                        ? bidder.biddersQualificationOther
                        : "")
                    }}
                  </div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"
                    ><span>竞买人报价税率</span>：</label
                  >
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
        </el-tab-pane>
        <el-tab-pane label="竞价记录" name="6">
          <div class="bgBorderThree">
            <div class="Cord-header el-clearfix">
              <span>竞价记录</span>
              <span class="subtitle">共计 12 次报价 用时 {{ zhengxu }}</span>
              <span class="style1"
                >剩余 <span class="style2">{{ daoxu }}</span>
              </span>
            </div>
            <div class="table">
              <tableTwo
                :table="table3"
                @tableFuncCellback="tableFuncCellback3"
              ></tableTwo>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批记录" name="7">
          <div class="bgBorderThree widTab2">
            <div class="Cord-header el-clearfix">
              <span>审批记录</span>
            </div>
            <div class="table">
              <div class="el-detail el-detail-1">
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>审批方式</span>：</label>
                  <div class="tCon">{{ approvalF.mode }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>模版名称</span>：</label>
                  <div class="tCon">{{ approvalF.name }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>审批金额</span>：</label>
                  <div class="tCon">{{ approvalF.bidAmt }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>审批机制</span>：</label>
                  <div class="tCon">{{ approvalF.mechanism }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>审批附件</span>：</label>
                  <div class="tCon" v-if="approvalF.fileList != undefined">
                    <div
                      style="color: #20a0ff"
                      v-for="(item, index) in approvalF.fileList"
                      :dataUrl="item.approvalFilePath"
                      :key="index"
                    >
                      {{ item.approvalFileName }}
                    </div>
                  </div>
                </div>
              </div>
              <tableTwo
                :table="table4"
                @tableFuncCellback="tableFuncCellback4"
              ></tableTwo>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="订单信息" name="8">
          <div class="bgBorderThree widTab2">
            <div class="Cord-header el-clearfix">
              <span>订单信息</span>
              <span class="subtitle">共 4 笔提货单</span>
              <div class="theBtn el-pull-right">
                <el-button>待 受 理</el-button>
              </div>
            </div>
            <div class="table">
              <div class="el-detail el-detail-1">
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>订单号</span>：</label>
                  <div class="tCon" style="color: #20a0ff">
                    {{ findeOrderF.code }}
                  </div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>下单时间</span>：</label>
                  <div class="tCon">{{ findeOrderF.bidTime }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>下单人</span>：</label>
                  <div class="tCon">{{ findeOrderF.username }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>总金额</span>：</label>
                  <div class="tCon" style="color: red; font-size: 24px">
                    {{ findeOrderF.amt }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="竞价日志" name="9">
          <div class="bgBorderThree widTab2">
            <div class="Cord-header el-clearfix">
              <span>竞价日志</span>
            </div>
            <div class="table" style="width: 670px">
              <tableTwo
                :table="table6"
                @tableFuncCellback="tableFuncCellback6"
              ></tableTwo>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="买卖协议" name="10">
          <div class="bgBorderThree widTab2">
            <div class="Cord-header el-clearfix">
              <span>买卖协议</span>
              <el-button
                class="el-blueColor el-pull-right"
                @click="chakanhyetong(agreementListD.contract_pdf_url)"
                >查看合同</el-button
              >
            </div>
            <div class="table" style="770px">
              <div class="el-detail el-detail-1">
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>合同编号</span>：</label>
                  <div class="tCon">{{ agreementListD.contract_number }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>生成时间</span>：</label>
                  <div class="tCon">{{ agreementListD.create_time }}</div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>合同状态</span>：</label>
                  <div
                    class="tCon"
                    v-if="agreementListD.contract_sign_state == 0"
                  >
                    待签章
                  </div>
                  <div
                    class="tCon"
                    v-if="agreementListD.contract_sign_state == 1"
                  >
                    待生效
                  </div>
                  <div
                    class="tCon"
                    v-if="agreementListD.contract_sign_state == 2"
                  >
                    已生效
                  </div>
                  <div
                    class="tCon"
                    v-if="agreementListD.contract_sign_state == 3"
                  >
                    作废
                  </div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>创建人</span>：</label>
                  <div class="tCon">
                    {{ agreementListD.username }} {{ agreementListD.phone }}
                  </div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>合同类型</span>：</label>
                  <div class="tCon">
                    {{
                      agreementListD.contract_type == 1
                        ? "签章合同"
                        : agreementListD.contract_type == 2
                        ? "线下签署"
                        : ""
                    }}
                  </div>
                </div>
              </div>
              <!-- <tableTwo :table="table7" @tableFuncCellback="tableFuncCellback7"></tableTwo> -->
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="发票" name="11">
          <div class="bgBorderThree widTab2">
            <div class="Cord-header el-clearfix">
              <span>发票</span>
            </div>
            <div class="table">
              <tableTwo
                :table="table8"
                @tableFuncCellback="tableFuncCellback8"
              ></tableTwo>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bgBorderThree" style="margin-top: 15px">
      <div class="el-b">
        <el-button class="el-noColor" @click="cancel">关闭</el-button>
        <el-button
          class="el-blueColor"
          v-if="reversevideo.status == 60 && isBtn"
          @click="accept"
          >流 标</el-button
        >
        <el-button
          class="el-blueColor"
          v-if="reversevideo.status == 60 && isBtn"
          @click="ToDealWith"
          >择标下单</el-button
        >
      </div>
    </div>
    <!-- 弹框 -->
    <div
      class="proResults"
      :class="{ active: dialogFormVisibleActive }"
      v-if="dialogFormVisible"
      @click="Procancel"
    >
      <!-- 择标下单 -->
      <div v-if="isproResults == '1'" class="MarkListing" @click.stop>
        <div class="card-header el-clearfix">
          <span>择标下单</span>
          <span class="el-pull-right" type="text" @click="Procancel">×</span>
        </div>
        <div class="table">
          <p style="margin-bottom: 10px; font-size: 14px">
            共<span>{{ table10.length }}</span
            >家竞买人
          </p>
          <el-table :data="table10" empty-text=" ">
            <el-table-column
              prop="buyerCompanyName"
              label="供应商名称"
              width="220"
            ></el-table-column>
            <el-table-column
              prop="confirmTime"
              label="保证金到账日"
              width="170"
            ></el-table-column>
            <el-table-column
              prop="effectiveDate"
              label="报价有效期"
              width="170"
            ></el-table-column>
            <el-table-column
              prop="deliveryTime"
              label="预计到货日期"
              width="170"
            ></el-table-column>
            <el-table-column
              prop="taxAmount"
              label="税额"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="taxAmountPrice"
              label="税价合计"
              width="150"
            ></el-table-column>
            <el-table-column prop="" label="状态" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.offerStatus == 1">报价无效</span>
                <span v-if="scope.row.offerStatus == 2">报价有效</span>
              </template>
            </el-table-column>
            <el-table-column
              label="选择"
              width="100"
              fixed="right"
              class="radioF"
            >
              <template slot-scope="scope">
                <el-radio
                  size="medium"
                  :label="scope.$index"
                  v-model="elRadio"
                  @change="radioFunc(scope.row)"
                >
                </el-radio>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table">
          <p class="table-title">已选供应商信息</p>
          <div class="el-detail el-detail-1">
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>价格排名</span>：</label>
              <div
                class="tCon"
                :style="{ color: selectedsupplier.position != 1 ? 'red' : '' }"
              >
                第 {{ selectedsupplier.position }} 名
                <span
                  v-if="selectedsupplier.position != 1"
                  style="padding-left: 10px"
                >
                  非最低报价竞买人，请慎重选择</span
                >
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
              <div class="tCon">
                {{
                  selectedsupplier.offerUserName +
                  " " +
                  selectedsupplier.offerUserTel
                }}
              </div>
            </div>
          </div>
          <el-row
            class="jine"
            style="
              border-top: 1px solid rgba(0, 0, 0, 0.1);
              padding-top: 10px;
              margin: 20px 0;
            "
          >
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
                    <el-button type="button" class="el-blueColor"
                      >上传附件</el-button
                    >
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

      <!-- 流标确认 -->
      <div
        v-if="isproResults == '2'"
        class="MarkListing"
        @click.stop
        style="width: 650px"
      >
        <div class="card-header el-clearfix">
          <span>确认流标</span>
          <span class="el-pull-right" type="text" @click="Procancel">×</span>
        </div>
        <div class="table">
          <el-form
            ref="flowform"
            :model="flowstandardD"
            :rules="flowsRules"
            label-width="85px"
          >
            <el-form-item label="附件上传:">
              <div class="tCon">
                <el-button
                  type="button"
                  class="el-blueColor"
                  @click="failRUpload"
                  >上传附件</el-button
                >
                <span style="padding-left: 15px">{{
                  flowstandardD.failReasonFile.fileName
                }}</span>
              </div>
            </el-form-item>
            <el-form-item label="流标理由:" prop="failReason" class="buchong">
              <el-input
                type="textarea"
                v-model="flowstandardD.failReason"
                maxlength="200"
                show-word-limit
                style="margin-top: 15px"
              ></el-input>
            </el-form-item>
            <div class="FlowStandard">
              <p class="title">流标说明</p>
              <p class="cont">说明说明说明说明</p>
            </div>
            <el-form-item
              style="text-align: center; margin-left: -80px !important"
            >
              <el-button class="el-noColor" @click="Procancel()"
                >取消</el-button
              >
              <el-button class="el-blueColor" @click="FlowStandardF"
                >确认流标</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- input type="file" -->
    <input
      type="file"
      ref="inputFile"
      multiple="multiple"
      class="inputFileClass"
      @change="FileUpload"
    />
  </div>
</template>

<script>
export default {
  name: "needDetail",
  data() {
    return {
      elRadio: false,
      isBtn: true,
      activeName: "1",
      biddingId: "",
      istabList: "0",
      reversStatus: {
        10: {
          text: "待发布",
        },
        20: {
          text: "审核中",
        },
        21: {
          text: "待审核",
        },
        22: {
          text: "已驳回",
        },
        30: {
          text: "报名中",
        },
        40: {
          text: "保证金",
        },
        41: {
          text: "未确认",
        },
        42: {
          text: "已确认",
        },
        50: {
          text: "竞价中",
        },
        60: {
          text: "待开标",
        },
        61: {
          text: "待确认",
        },
        62: {
          text: "待审核",
        },
        63: {
          text: "已驳回",
        },
        70: {
          text: "已完成",
        },
        71: {
          text: "已成交",
        },
        72: {
          text: "已流标",
        },
        100: {
          text: "失效/作废",
        },
        101: {
          text: "参与企业不足",
        },
        102: {
          text: "中止",
        },
      },
      // 主体信息
      reversevideo: {
        saleCompanyName: "",
        saleDeptName: "",
        code: "",
        classifyName: "",
        pricingMethod: "",
        useArea: "",
        contacts: "",
        contactsTel: "",
        updateUserName: "",
        createUserName: "",
        createTime: "",
        khStartTime: "",
        signEndTime: "",
        offerStartDate: "",
        offerEndDate: "",
        bidTime: "",
        extend: "",
      },
      // 富文本字段
      goodsContent: "",
      // 竞价规则及费用要求---竞价规则及费用
      marginmoney: {},
      // 竞价规则及费用要求---保证金
      marginmoney: {},
      // 竞买人要求
      bidder: {},
      // 审批记录
      approvalF: {
        mode: "",
        name: "",
        bidAmt: "",
        mechanism: "",
        fileList: "",
        approvalFilePath: "",
        approvalFileName: "",
      },
      // 订单信息
      findeOrderF: {},
      // 买卖协议
      agreementListD: {},
      clication: [],
      // 表格组件--开始
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
          {
            name: "商品类别",
            prop: "typeName",
            width: "200",
          },
          {
            name: "标的名称",
            prop: "name",
            width: "200",
          },
          {
            name: "规格",
            prop: "standards",
            width: "200",
          },
          {
            name: "品牌",
            prop: "brand",
            width: "200",
          },
          {
            name: "标的描述",
            prop: "represent",
            width: "300",
          },
          {
            name: "采购数量",
            prop: "saleNumCnsNo",
            width: "200",
          },
        ],
      },
      table2: {
        // 表格操作
        operationList: {
          10: ["查看详情"],
          20: ["查看详情"],
          21: ["查看详情", "查看收款码"],
          22: ["查看详情"],
          23: ["查看详情"],
          24: ["查看详情"],
        },
        // 操作块儿显示类型
        isoperation: true,
        // 状态字段，用来判断操作按钮显示
        StatusField: "rssStatus",
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "110",
        // 表头数组
        header: [
          {
            name: "供应商名称",
            prop: "saleCompanyName",
            width: "300",
          },
          {
            name: "联系方式",
            prop: "contactsCnsNo",
            width: "200",
          },
          {
            name: "保证金状态",
            prop: "rbdStatusCnsNo",
            width: "200",
          },
          {
            name: "报价有效期",
            prop: "effectiveDate",
            width: "200",
          },
          {
            name: "税额",
            prop: "assessQuato",
            width: "300",
          },
          {
            name: "税价合计",
            prop: "assessPrice",
            width: "200",
          },
          {
            name: "单位价格",
            prop: "price",
            width: "200",
          },
          {
            name: "报名日期",
            prop: "signTime",
            width: "200",
          },
          {
            name: "状态",
            prop: "rssStatusCnsNo",
            width: "200",
          },
        ],
      },
      table3: {
        // 表格操作
        operationList: ["报价详情"],
        // 操作块儿显示类型
        isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "110",
        // 表头数组
        header: [
          {
            name: "报价次序",
            prop: "",
            width: "300",
          },
          {
            name: "竞买人企业名称",
            prop: "buyerCompanyName",
            width: "200",
            sortable: "custom",
          },
          {
            name: "报价时间",
            prop: "createTime",
            width: "200",
            sortable: "custom",
          },
          {
            name: "降幅比例",
            prop: "increRate",
            width: "200",
            sortable: "custom",
          },
          {
            name: "降幅金额",
            prop: "increAmt",
            width: "300",
            sortable: "custom",
          },
          {
            name: "税额",
            prop: "taxAmount",
            width: "200",
            sortable: "custom",
          },
          {
            name: "税价合计",
            prop: "totalTax",
            width: "200",
            sortable: "custom",
          },
        ],
      },
      table4: {
        // 表格操作
        operationList: [],
        // 操作块儿显示类型
        // isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "170",
        // 表头数组
        header: [
          {
            name: "审批次序",
            prop: "nodeList",
            width: "120",
          },
          {
            name: "职务",
            prop: "userType",
            width: "100",
          },
          {
            name: "审批人",
            prop: "username",
            width: "100",
          },
          {
            name: "审批时间",
            prop: "createTime",
            width: "200",
          },
          {
            name: "审批状态",
            prop: "result",
            width: "100",
          },
          {
            name: "审批意见",
            prop: "approvalReason",
            width: "300",
          },
        ],
      },
      // 竞价须知/标的物详情图片
      table5: {
        // 表格操作
        operationList: ["下载"],
        // 操作块儿显示类型
        // isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "170",
        // 表头数组
        header: [
          { name: "排序", prop: "num", width: "120" },
          { name: "文件名称", prop: "fileName", width: "280" },
        ],
      },
      table6: {
        // 表格操作
        operationList: [],
        // 操作块儿显示类型
        // isoperation: false,
        // 数据数组
        Dataorigin: [
          {
            uuids: 1,
            status: 30,
          },
          {
            uuids: 1,
            status: 40,
          },
        ],
        // 右侧操作宽度
        operationW: "170",
        // 表头数组
        header: [
          {
            name: "操作人",
            prop: "real_name",
            width: "120",
          },
          {
            name: "操作时间",
            prop: "create_time",
            width: "200",
          },
          {
            name: "事件说明",
            prop: "remark",
            width: "350",
          },
        ],
      },
      table7: {
        // 表格操作
        operationList: [],
        // 操作块儿显示类型
        // isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "170",
        // 表头数组
        header: [
          {
            name: "序号",
            prop: "sort",
            width: "120",
          },
          {
            name: "事件",
            prop: "content",
            width: "350",
          },
          {
            name: "操作人",
            prop: "createUserNameCnsNo",
            width: "100",
          },
          {
            name: "时间",
            prop: "createTime",
            width: "200",
          },
        ],
      },
      table8: {
        // 表格操作
        operationList: [],
        // 操作块儿显示类型
        // isoperation: false,
        // 数据数组
        Dataorigin: [
          {
            uuids: 1,
            status: 30,
          },
          {
            uuids: 1,
            status: 40,
          },
        ],
        // 右侧操作宽度
        operationW: "170",
        // 表头数组
        header: [
          {
            name: "业务类型",
            prop: "typeCnsNo",
            width: "120",
          },
          {
            name: "发票类型",
            prop: "invTypeCnsNo",
            width: "350",
          },
          {
            name: "上传日期",
            prop: "openInvoiceTime",
            width: "100",
          },
          {
            name: "发票代码",
            prop: "invCode",
            width: "200",
          },
          {
            name: "发票号",
            prop: "invNo",
            width: "200",
          },
          {
            name: "开票主体",
            prop: "createCompanyName",
            width: "200",
          },
          {
            name: "收票主体",
            prop: "receiveCompanyName",
            width: "200",
          },
          {
            name: "金额",
            prop: "amount",
            width: "200",
          },
          {
            name: "税率",
            prop: "taxRates",
            width: "200",
          },
          {
            name: "税额",
            prop: "tax",
            width: "200",
          },
          {
            name: "税价合计",
            prop: "totalTax",
            width: "200",
          },
          {
            name: "开票时间",
            prop: "openInvoiceTime",
            width: "200",
          },
        ],
      },
      // 竞价须知/标的物详情附件
      table9: {
        // 表格操作
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
            name: "排序",
            prop: "num",
            width: "120",
          },
          {
            name: "文件名称",
            prop: "imageName",
            width: "300",
          },
        ],
      },
      table10: [],
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
        price: "",
      },
      // 表格组件--结束
      dialogFormVisible: false,
      dialogFormVisibleActive: false,
      isproResults: "1",
      useAreaArr: ["房建类", "公路类", "铁路类", "桥梁隧道类", "市政类"],
      // 流标
      flowstandardD: {
        failReasonFile: {},
        failReason: "",
      },
      // 流标验证
      flowsRules: {
        failReason: [
          {
            required: true,
            message: "请填写流标理由",
            trigger: ["change", "blur"],
          },
        ],
      },
      SpecifiedField: [],
      // 分页
      page: 1,
      size: 10,
      total: 0,
      zhengxu: "",
      daoxu: "",
    };
  },
  mounted() {
    // 获取参数
    this.parameter();
    // 反显主体信息
    this.ReverseVideo();
  },
  methods: {
    // 获取其他页面传递过来的值
    parameter() {
      this.biddingId = this.$route.query.id;
    },
    // 反显主体信息
    ReverseVideo() {
      var that = this;
      that.httpsapi
        .POST(that.apis + "/trade/bidding/queryBiddingDetail", {
          uuids: that.biddingId,
        })
        .then((result) => {
          console.log(result);
          if (result.code == 200) {
            var data = result.data[0];
            var currentId = that.$store.state.logininformation.id;
            console.log(result.data[0].createUserId + ":" + currentId);
            if (currentId != result.data[0].createUserId) {
              this.isBtn = false;
            }
            that.reversevideo = result.data[0];
            // 查询标的物清单
            this.MatterList();
          }
        });
    },
    // 查询标的物清单
    MatterList() {
      var _this = this;
      _this.httpsapi
        .POST(
          _this.apis +
            "/trade/bidding/querySubjectMatterList/" +
            _this.biddingId,
          {}
        )
        .then((result) => {
          // console.log(result)
          if (result.code == 200) {
            result.data.forEach((item, index) => {
              item.saleNumCnsNo = item.saleNum + item.unit;
            });
            _this.table1.Dataorigin = result.data;
          }
        });
    },
    // 竞买人管理
    Bidder() {
      var _this = this;
      var _rbdStatus = {
        10: { text: "未缴纳" },
        20: { text: "未确认" },
        30: { text: "已确认" },
        40: { text: "未退还" },
        50: { text: "已退还" },
        60: { text: "已没收" },
      };
      var _rssStatus = {
        10: { text: "待报名" },
        20: { text: "保证金" },
        21: { text: "未缴纳" },
        22: { text: "无需缴纳" },
        23: { text: "已缴纳未确认" },
        24: { text: "已缴纳已确认" },
      };
      _this.httpsapi
        .POST(
          _this.apis +
            "/trade/bidding/queryAuctionBuyManage/" +
            _this.biddingId,
          {}
        )
        .then((result) => {
          // console.log(result)
          if (result.code == 200) {
            result.data.forEach((item, index) => {
              item.contactsCnsNo = item.contacts + " " + item.contactsTel;
              item.rbdStatusCnsNo = _rbdStatus[item.rbdStatus].text;
              item.rssStatusCnsNo = _rssStatus[item.rssStatus].text;
            });
            _this.table2.Dataorigin = result.data;
          }
        });
    },
    // 竞价须知标的物详情
    findJpSceneCost() {
      var that = this;
      that.httpsapi
        .POST(
          that.apis + "/trade/bidding/findJpSceneCost/" + that.biddingId,
          {}
        )
        .then((result) => {
          // console.log(result);
          if (result.code == 200) {
            that.goodsContent = result.data.goodsRepresent;
            result.data.filesList.forEach((item, index) => {
              item.num = index + 1;
            });
            that.table5.Dataorigin = result.data.filesList;
            console.log(result.data.imgFiles)
            if (result.data.imgFiles) {
           
              var Arr = [];
              result.data.imgFiles.forEach((item, index) => {
                Arr.push({
                  num: index + 1,
                  imageName: item.fileName,
                  filePath:item.filePath
                });
              });
              console.log(Arr)
              that.table9.Dataorigin = Arr;
            }
          }
        });
    },
    // 保证金
    queryDepositAsk() {
      var _this = this;
      _this.httpsapi
        .POST(
          _this.apis + "/trade/bidding/queryDepositAsk/" + _this.biddingId,
          {}
        )
        .then((result) => {
          // console.log(result)
          if (result.code == 200) {
            _this.marginmoney = result.data[0];
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
        .then((result) => {
          if (result.code == 200) {
            result.data[0].biddersQualification = result.data[0].biddersQualification.substring(
              0,
              result.data[0].biddersQualification.length - 3
            );
            _this.bidder = result.data[0];
          }
        });
    },
    // 竞价记录
    sceneOfferList() {
      var _this = this;
      _this.httpsapi
        .POST(_this.apis + "/trade/bidding/sceneOfferList", {
          uuids: _this.biddingId,
        })
        .then((result) => {
          console.log(result.data[0].offer_start_time);
          let newDataStr = result.data[0].offer_start_time.replace(
            /\.|\-/g,
            "/"
          );
          let newDataStrs = result.data[0].offer_end_time.replace(
            /\.|\-/g,
            "/"
          );
          let date = new Date(newDataStr);
          let datess = new Date(newDataStrs);
          let timestamp = date.getTime() / 1000;
          let timestamps = datess.getTime() / 1000;
          setInterval(function () {
            var dates = Math.round(new Date() / 1000);
            // var total = dates - timestamp;
            var usedTime = dates - timestamp; //两个时间戳相差的毫秒数

            var days = Math.floor(usedTime / (24 * 3600));
            //计算出小时数
            var leave1 = usedTime % (24 * 3600); //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / 3600);
            //计算相差分钟数
            var leave2 = leave1 % 3600; //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / 60);
            // console.log()
            // console.log(usedTime)
            var leave3 =
              usedTime - (days * 24 * 3600 + hours * 3600 + minutes * 60);
            var time =
              days + "天" + hours + "时" + minutes + "分" + leave3 + "秒";
            // console.log(time);
            _this.zhengxu = time;

            var usedTimes = timestamps - dates;
            var days = Math.floor(usedTimes / (24 * 3600));
            //计算出小时数
            var leave1 = usedTimes % (24 * 3600); //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / 3600);
            //计算相差分钟数
            var leave2 = leave1 % 3600; //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / 60);
            console.log();
            console.log(usedTimes);
            var leave3 =
              usedTimes - (days * 24 * 3600 + hours * 3600 + minutes * 60);
            var times =
              days + "天" + hours + "时" + minutes + "分" + leave3 + "秒";
            console.log(times);
            _this.daoxu = times;
          }, 1000);

          if (result.code == 200) {
            _this.table3.Dataorigin = result.data;
          }
        });
    },
    // 审批记录
    approvalFlow() {
      var _this = this;
      _this.httpsapi
        .POST(_this.apis + "/trade/bidding/approvalFlow/" + _this.biddingId, {})
        .then((result) => {
          // console.log(result);
          if (result.code == 200) {
            if (result.data.flowInfo.length > 0) {
              _this.approvalF = result.data.flowInfo[0];
            }
            if (result.data.fileList.length > 0) {
              _this.approvalF.fileList = result.data.fileList;
            }
            if (result.data.nodeList.length > 0) {
              _this.table4.Dataorigin = result.data.nodeList;
            }
          }
        });
    },
    // 订单信息
    findeOrderList() {
      var _this = this;
      _this.httpsapi
        .POST(
          _this.apis + "/trade/bidding/findeOrderList/" + _this.biddingId,
          {}
        )
        .then((result) => {
          // console.log(result)
          if (result.code == 200) {
            _this.findeOrderF = result.data[0];
          }
        });
    },
    // 竞买人日志
    queryAuctionLog() {
      var _this = this;
      _this.httpsapi
        .POST(
          _this.apis + "/trade/bidding/queryAuctionLog/" + _this.biddingId,
          {}
        )
        .then((result) => {
          // console.log(result)
          if (result.code == 200) {
            _this.table6.Dataorigin = result.data;
          }
        });
    },
    // 买卖协议
    agreementList() {
      var _this = this;
      _this.httpsapi
        .POST(
          _this.apis + "/trade/bidding/reOrderContractList/" + _this.biddingId,
          {}
        )
        .then((result) => {
          if (result.code == 200) {
            var _result = result.data.logList;
            _this.agreementListD = result.data.agreementList[0];
            // _result.forEach((item, index) => {
            //   item.sort = index + 1;
            //   item.createUserNameCnsNo = item.createUserName + " " + item.phone;
            // });
            // _this.table7.Dataorigin = _result;
          }
        });
    },
    // 发票
    reInvoice() {
      var _this = this;
      _this.httpsapi
        .POST(_this.apis + "/system/re-invoice/search/1/10000", {
          uuids: _this.biddingId,
        })
        .then((result) => {
          // console.log(result)
          if (result.code == 200) {
            var _result = result.data.records;
            var arr1 = ["报名费", "服务费", "货款", "沉默金发票", "佣金发票"];
            var arr2 = ["增值税专用发票", "增值税普通发票", "其他"];
            _result.forEach((item, index) => {
              item.typeCnsNo = arr1[item.type - 1];
              item.invTypeCnsNo = arr2[item.invType - 1];
            });
            _this.table8.Dataorigin = _result;
          }
        });
    },
    // 跳转到保证金详情
    marginGo() {
      console.log(this.reversevideo.code);
      this.$router.push({
        name: "earnestmoneyDetail",
        query: {
          id: this.reversevideo.code,
        },
      });
    },
    // tab
    handleSelect(index) {
      var that = this;
      switch (index.name) {
        case "2":
          // 竞买人管理
          that.Bidder();
          break;
        case "3":
          // 竞价须知/标的物详情
          that.findJpSceneCost();
          break;
        case "4":
          // 保证金
          that.queryDepositAsk();
          break;
        case "5":
          // 竞买人要求
          that.queryPricerAsk();
          break;
        case "6":
          // 竞价记录
          that.sceneOfferList();
          break;
        case "7":
          // 审批记录
          that.approvalFlow();
          break;
        case "8":
          // 订单信息
          that.findeOrderList();
          break;
        case "9":
          // 竞价日志
          that.queryAuctionLog();
          break;
        case "10":
          // 买卖协议
          that.agreementList();
          break;
        case "11":
          // 发票
          that.reInvoice();
          break;
      }
    },
    // 标的物清单--表格回调
    tableFuncCellback1(data) {
      switch (data[1]) {
        case "查看附件":
          window.open(this.tuurl + data[0].attachmentUrl);
          break;
      }
    },
    // 导出商品清单
    ExportList() {
      this.exports.exports(
        this.apis +
          "/trade/bidding/expExcelSubjectMatterList/" +
          this.biddingId,
        {}
      );
    },
    // 竞买人管理--表格回调
    tableFuncCellback2(data) {
      if (data[1] == "查看详情") {
        this.$router.push({
          name: "bidderDetails",
          query: {
            biddingId: this.biddingId,
            companyId: data[0].saleCompanyId,
          },
        });
        this.$store.commit("bidderType", false);
      }
    },
    // 竞价记录--表格回调
    tableFuncCellback3(data) {
      if (data[1] == "报价详情") {
        console.log(data);
        this.$router.push({
          name: "bidderDetails",
          query: {
            biddingId: this.biddingId,
            companyId: data[0].buyerCompanyId,
            offerId: data[0].id,
          },
        });
        this.$store.commit("bidderType", true);
      }
    },
    // 竞价须知/标的物详情
    tableFuncCellback5(data) {
      // if (data[1] == "下载") {
      //   console.log(data[0].filePath);
      //   let image = new Image();
      //   image.setAttribute("crossOrigin", "anonymous");
      //   image.src =this.tuurl data[0].filePath;
      //   image.onload = () => {
      //     let canvas = document.createElement("canvas");
      //     canvas.width = image.width;
      //     canvas.height = image.height;
      //     let ctx = canvas.getContext("2d");
      //     ctx.drawImage(image, 0, 0, image.width, image.height);
      //     canvas.toBlob((blob) => {
      //       let url = URL.createObjectURL(blob);
      //       download(url);
      //       // 用完释放URL对象
      //       URL.revokeObjectURL(url);
      //     });
      //   };
        window.open(this.tuurl + data[0].filePath);
      // }
    },
    // 择标下单
    ToDealWith(data) {
      this.dialogFormVisible = true;
      setTimeout(() => {
        this.dialogFormVisibleActive = true;
      }, 0);
      var _this = this;
      _this.httpsapi
        .POST(
          _this.apis + "/trade/bidding/queryPricerList/" + _this.biddingId,
          {}
        )
        .then((result) => {
          // console.log(result);
          if (result.code == 200) {
            _this.table10 = result.data;
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
          type: "error",
        });
        return false;
      }
      that.msgBox.msgBoxOpen(that, {
        message: "是否下单？",
        btnText: "下单",
        success: function () {
          that.httpsapi
            .POST(
              that.apis +
                "/trade/bidding/updatePricerListIsWinBidding/" +
                that.biddingId +
                "/" +
                that.selectedsupplier.buyerCompanyId,
              {}
            )
            .then((result) => {
              console.log(result);
              if (result.code == 200) {
                that.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "3000",
                  type: "success",
                });
                that.$router.go(-1);
              } else {
                that.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "3000",
                  type: "success",
                });
              }
            })
            .catch((err) => {});
        },
      });
    },

    // 流标
    accept() {
      this.dialogFormVisible = true;
      setTimeout(() => {
        this.dialogFormVisibleActive = true;
        this.isproResults = "2";
      }, 0);
    },
    // 流标上传
    failRUpload() {
      this.upload();
      this.SpecifiedField[0] = "lb";
    },
    // 确认流标
    FlowStandardF() {
      var that = this;
      that.$refs["flowform"].validate((vloid) => {
        if (vloid) {
          that.httpsapi
            .POST(that.apis + "/trade/bidding/failAuction", {
              uuids: that.biddingId,
              failReason: that.flowstandardD.failReason,
              failReasonFile: that.flowstandardD.failReasonFile,
            })
            .then((result) => {
              console.log(result);
              if (result.code == 200) {
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "3000",
                  type: "success",
                });
                this.Procancel();
              } else {
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "3000",
                  type: "error",
                });
              }
            });
        }
      });
    },
    // 关闭弹框
    Procancel() {
      this.dialogFormVisibleActive = false;
      setTimeout(() => {
        this.dialogFormVisible = false;
        this.isproResults = "1";
      }, 500);
    },
    tableFuncCellback9(e){
      window.open(this.tuurl + e[0].filePath)
    },
    // 上传
    upload() {
      this.$refs.inputFile.dispatchEvent(new MouseEvent("click"));
    },
    // 文件上传
    FileUpload(e) {
      var that = this;
      if (that.SpecifiedField[0] == "lb") {
        that.uploading.uploading(e, "5", "jpg/png", that, function (result) {
          that.flowstandardD.failReasonFile = {
            fileName: result.fullname,
            filePath: result.url,
            fileSuf: result.ext,
          };
        });
      }
      that.$refs.inputFile.value = "";
    },
    // 关闭当前页面
    cancel() {
      this.$router.go(-1);
    },
    chakanhyetong(e) {
      console.log(e);
      window.open(this.tuurl + e);
    },
    xiazia(){
      var obj  = {
        uuids:this.biddingId,
        url:this.tuurl,
        type:"",
      }
      this.exports.exports1(this.apis+'/trade/bidding/zipDownload',obj);
    }
  },
};
</script>

<style space>
#biddingD .el-tab-pane .bgBorderThree .Cord-header {
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
}
#biddingD .buchong .el-form-item__error {
  top: 100% !important;
}
#biddingD .el-title {
  margin: 15px 0;
}

#biddingD .table-title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 15px;
}

#biddingD .el-row.jine .tCon {
  color: #e02020;
  font-size: 18px;
  font-weight: bold;
}

#biddingD .theTitle {
  height: 42px;
  font-size: 20px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
  line-height: 30px;
}

#biddingD .theBtn .el-button {
  min-width: 84px;
  width: 110px;
  height: 32px;
  padding: 0;
  background: #fa9912;
  border: 1px solid #fa9912 !important;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}

#biddingD .el-detail-item {
  line-height: 25px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 25px;
  margin: 12px 0;
}

#biddingD .el-detail-item label {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}

#biddingD .el-detail-item .tCon {
  margin-left: 104px;
  word-break: break-all;
  word-wrap: break-word;
}

#biddingD .el-detail-item label span {
  width: 84px;
  text-align: justify;
  text-align-last: justify;
  display: inline-block;
}

#biddingD .widTab1 .el-detail-item label span {
  width: 100px;
}

#biddingD .widTab2 .el-detail-item label span {
  width: 60px;
}

#biddingD .widTab3 .el-detail-item label span {
  width: 100px;
}

#biddingD .el-tab-pane .bgBorderThree {
  margin: 0;
  /* margin-left: 15px; */
}

#biddingD .el-tab-pane .table {
  margin: 0 0;
  padding-bottom: 0;
  max-width: 100%;
}

#biddingD .el-tab-pane .table .el-row {
  margin-top: 0;
}

#biddingD .el-b {
  padding: 15px 0;
  text-align: center;
}

#biddingD .el-b .el-button {
  padding: 5px 15px;
  letter-spacing: 0px;
}

#biddingD .subtitle {
  font-size: 12px;
  font-weight: 100;
  padding-left: 15px;
  color: #787878;
}

#biddingD .FlowStandard {
  background: #e6f7ff;
  border-radius: 2px;
  border: 1px solid #91d5ff;
  padding: 15px;
  margin: 15px;
  padding-left: 55px;
  position: relative;
}

#biddingD .FlowStandard::before {
  display: inline-block;
  width: 20px;
  height: 20px;
  content: "";
  background-image: url(../../../assets/img/ub.png);
  background-size: 100% 100%;
  background-position: center center;
  position: absolute;
  left: 15px;
  top: 16px;
}

#biddingD .FlowStandard .title {
  font-size: 16px;
  font-weight: bold;
}

#biddingD .FlowStandard .cont {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  padding: 5px 0;
}

#biddingD .style1 {
  display: inline-block;
  margin-left: 15px;
  color: red;
  font-size: 14px;
}

#biddingD .style2 {
  font-size: 19px;
  font-weight: bold;
}

#biddingD .GoodsContent {
  margin: 0 0 25px 0;
}
#biddingD .GoodsContent img {
  width: 100%;
}

#biddingD .proResults .MarkListing .table {
  margin: 25px !important;
}

#biddingD .MarkListing .el-radio__label {
  display: none !important;
}

#biddingD .MarkListing .el-radio__inner {
  width: 20px;
  height: 20px;
}
</style>

<template>
  <div id="biddingAdd">
    <div class="bgBorderTwo">
      <el-form
        ref="form1"
        :rules="rules1"
        :model="formInline"
        label-width="110px"
        :inline="true"
        label-suffix=":"
        class="demo-form-inline DemoLine"
      >
        <el-form-item label="委托订单号" prop="ordercode">
          <el-input
            style="width: 500px"
            v-model="formInline.ordercode"
            placeholder="请输入委托订单号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="el-blueColor" type="primary" @click="onSearch"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 没有搜索时 -->
      <div style="text-align: center" v-if="isOrderData == 0">
        <img src="../../../assets/img/u7732.png" alt="" />
        <p class="subtitle" style="font-size: 15px">
          暂无订单信息，请在上方输入订单号查询
        </p>
      </div>
      <!-- 没有数据时 -->
      <div style="text-align: center" v-if="isOrderData == 2">
        <img src="../../../assets/img/u7732.png" alt="" />
        <p class="subtitle" style="font-size: 15px">
          当前订单号匹配不到订单，请核对修改后再进行搜索
        </p>
      </div>
      <!-- 订单信息 -->
      <el-row v-if="isOrderData == 1">
        <el-col :span="12">
          <div class="el-detail el-detail-1">
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>委托订单号</span>：</label>
              <div class="tCon" v-text="orderNumber.workOrderNum"></div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>委托企业</span>：</label>
              <div class="tCon" v-text="orderNumber.enterName"></div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>委托项目部 </span>：</label>
              <div class="tCon" v-text="orderNumber.entrustProjectName"></div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>委托人</span>：</label>
              <div class="tCon" v-text="orderNumber.entrustUserName"></div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>看货对接人</span>：</label>
              <div class="tCon" v-text="orderNumber.lookGoodUser"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="el-detail el-detail-1">
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>订单状态</span>：</label>
              <div class="tCon" v-text="orderNumber.statusName"></div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>看货地址</span>：</label>
              <div class="tCon" v-text="orderNumber.lookGoodAddress"></div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>订单创建时间</span>：</label>
              <div class="tCon" v-text="orderNumber.createTime"></div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>订单创建人</span>：</label>
              <div class="tCon" v-text="orderNumber.createUserName"></div>
            </div>
            <div class="el-detail-item el-clearfix">
              <label class="el-pull-left"><span>清运期限</span>：</label>
              <div class="tCon" v-text="orderNumber.clearDate"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 竞价基本信息 -->
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>竞价基本信息</span>
      </div>
      <el-form
        ref="form2"
        :model="forsingle"
        label-width="130px"
        :rules="rules"
        label-suffix=":"
        label-position="left"
        class="demo-ruleForm text-From textfrom2"
      >
        <el-form-item label="竞价标题名称" prop="title">
          <el-input
            v-model="forsingle.title"
            maxlength="150"
            show-word-limit
            placeholder="请输入竞价标题"
            style="width: 700px"
          ></el-input>
        </el-form-item>
        <el-form-item label="竞价场次编号" prop="enterpriseId">{{
          forsingle.code
        }}</el-form-item>
        <el-form-item label="委托企业" prop="enterpriseId">{{
          forsingle.saleCompanyName
        }}</el-form-item>
        <el-form-item label="委托项目部" prop="enterpriseId">{{
          forsingle.saleDeptName
        }}</el-form-item>
        <el-form-item label="发布人" prop="enterpriseId">{{
          forsingle.createUserName
        }}</el-form-item>
        <div class="custom">
          <label class="el-form-item__label"
            ><span class="customIconRed">* </span>竞价联系人:</label
          >
          <el-form-item
            label=""
            prop="contacts"
            style="display: inline-block; margin-right: 15px"
          >
            <el-input
              v-model="forsingle.contacts"
              placeholder="请输入联系人姓名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label=""
            prop="contactsTel"
            style="display: inline-block"
          >
            <el-input
              v-model="forsingle.contactsTel"
              placeholder="请输入联系人手机号"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="竞价分类" prop="classifyId">
          <el-select
            filterable
            v-model="forsingle.classifyId"
            placeholder="请选择项"
            @change="classifyIdChange"
          >
            <el-option
              v-for="(item, index) in clication"
              :label="item.NAME"
              :value="String(item.id)"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用领域" prop="useAreaN" class="special">
          <el-select
            filterable
            multiple
            placeholder="请选择应用领域"
            v-model="forsingle.useAreaN"
          >
            <el-option
              v-for="(item, index) in ApplicationField"
              :value="item"
              :label="item"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="允许看货时间" prop="khStartTimeN">
          <div class="block">
            <el-date-picker
              v-model="forsingle.khStartTimeN"
              type="daterange"
              align="left"
              editable="false"
              start-placeholder="开始日期"
              unlink-panels="true"
              end-placeholder="结束日期"
              @change="khStartTimeChange"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="报名截止日期" prop="signEndTimeN">
          <div class="block">
            <el-date-picker
              v-model="forsingle.signEndTimeN"
              type="date"
              placeholder="选择日期"
              @change="signEndTimeChange"
            >
            </el-date-picker>
            <span class="subtitle"
              >*采购商无法在此时间后报名参与竞价，已报名的采购商可继续在竞价开始前缴纳保证金</span
            >
          </div>
        </el-form-item>
        <div class="custom">
          <label class="el-form-item__label"
            ><span class="customIconRed">* </span>竞价开始日期:</label
          >
          <el-form-item
            label=""
            prop="offerStartDays"
            style="display: inline-block"
          >
            <span>报名截止后 </span>
            <el-input
              v-model="forsingle.offerStartDays"
              @change="offerStartDaysFunc"
              style="
                width: 80px;
                margin-right: 5px;
                display: inline-block;
                text-align: center;
              "
            ></el-input>
            <span>天</span>
          </el-form-item>
          <el-form-item
            label=""
            prop="offerStartDateN"
            style="display: inline-block"
          >
            <span>开始竞价【{{ forsingle.offerStartDateN }}</span>
          </el-form-item>
          <el-form-item
            label=""
            prop="offerStartAt"
            style="display: inline-block"
          >
            <el-time-picker
              arrow-control
              v-model="forsingle.offerStartAt"
              format="HH:mm"
              style="width: 100px; margin: 0 5px"
              @change="offerStartAtChange"
            >
            </el-time-picker>
            <span>】</span>
            <span class="subtitle"
              >*竞价开始前采购未缴纳保证金或销售方未确认保证金到账，视为报名无效无法参与竞价</span
            >
          </el-form-item>
        </div>
        <div class="custom">
          <label class="el-form-item__label"
            ><span class="customIconRed">* </span>竞价截止日期:</label
          >
          <el-form-item
            label=""
            prop="offerEndDays"
            style="display: inline-block"
          >
            <span>竞价开始后 </span>
            <el-input
              v-model="forsingle.offerEndDays"
              @change="offerEndDaysFunc"
              style="
                width: 80px;
                margin-right: 5px;
                display: inline-block;
                text-align: center;
              "
            ></el-input>
            <span>天</span>
          </el-form-item>
          <el-form-item
            label=""
            prop="offerEndDateN"
            style="display: inline-block"
          >
            <span>竞价截止【{{ forsingle.offerEndDateN }}</span>
          </el-form-item>
          <el-form-item
            label=""
            prop="offerEndAt"
            style="display: inline-block"
          >
            <el-time-picker
              arrow-control
              v-model="forsingle.offerEndAt"
              format="HH:mm"
              style="width: 100px; margin: 0 5px"
              @change="offerEndAtChange"
            >
            </el-time-picker>
            <span>】</span>
            <span class="subtitle"
              >*竞价截止后锁定出价结果，可选择中标人下单或手动流标</span
            >
          </el-form-item>
        </div>
        <el-form-item label="处置/计价方式" prop="pricingMethod">
          <el-radio-group v-model="forsingle.pricingMethod">
            <el-radio :label="1">按批次计价</el-radio>
            <el-radio :label="2">按重量计价</el-radio>
          </el-radio-group>
          <span class="subtitle"
            >*计重销售的商品建议选择按重量计价，按重量计价将锁定商品的单位以便换算单位重量的价格</span
          >
        </el-form-item>
        <el-form-item label="截止自动延长" prop="extendN">
          <el-switch
            v-model="forsingle.extendN"
            @change="extendChange"
          ></el-switch>
          <span class="subtitle"
            >*竞价结束前2分钟内有新的出价，竞价结束时间将自动延长5分钟</span
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 竞价要求 -->
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>竞价要求</span>
      </div>
      <el-form
        ref="form3"
        :model="forsingle"
        label-width="140px"
        :rules="rules"
        label-suffix=":"
        label-position="left"
        class="demo-ruleForm text-From textfrom3"
      >
        <el-form-item label="付款方式" prop="payWay">
          <el-radio-group v-model="forsingle.payWay">
            <el-radio label="1">现金</el-radio>
            <el-radio label="2">票据</el-radio>
            <el-radio label="3">无要求</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="付款时间" prop="payTime">
          <span>成交后</span>
          <el-input
            v-model="forsingle.payTime"
            style="
              width: 80px;
              margin: 0 5px;
              display: inline-block;
              text-align: center;
            "
          ></el-input>
          <span>日内</span>
        </el-form-item>
        <div class="custom2">
          <label class="el-form-item__label"
            ><span class="customIconRed">* </span>看货地址:</label
          >
          <el-form-item
            label=""
            class="address"
            prop="provinceId"
            style="display: inline-block; margin-right: 15px"
          >
            <el-select
              v-model="forsingle.provinceId"
              placeholder="请选择省"
              @change="provinceChange"
            >
              <el-option
                v-for="(province, index) in province"
                :label="province.provinceName"
                :value="province.provinceCode"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label=""
            class="address"
            prop="cityId"
            style="display: inline-block"
          >
            <el-select
              v-model="forsingle.cityId"
              placeholder="请选择市"
              @change="cityChange"
            >
              <el-option
                v-for="(city, index) in city"
                :label="city.cityName"
                :value="city.cityCode"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" class="address addrs" prop="khAddress">
            <el-input
              v-model="forsingle.khAddress"
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
        </div>
        <div class="custom">
          <label class="el-form-item__label"
            ><span class="customIconRed">* </span>储存方式:</label
          >
          <el-form-item
            label=""
            class="address"
            prop="storageWay"
            style="display: inline-block; margin-right: 15px"
          >
            <el-select
              v-model="forsingle.storageWay"
              placeholder="请选择储存方式"
            >
              <el-option :value="1" label="室内"></el-option>
              <el-option :value="2" label="室外"></el-option>
              <el-option :value="3" label="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label=""
            prop="storageTime"
            style="display: inline-block"
          >
            <span>存放</span>
            <el-input
              v-model="forsingle.storageTime"
              style="
                width: 80px;
                margin: 0 5px;
                display: inline-block;
                text-align: center;
              "
            ></el-input>
            <span>天</span>
          </el-form-item>
        </div>
        <el-form-item label="清运期限" prop="deliveryTimeN">
          <div class="block">
            <el-date-picker
              v-model="forsingle.deliveryTimeN"
              type="date"
              placeholder="选择日期"
              @change="deliveryTimeNChange"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="竞买人企业类型" prop="biddersType">
          <el-radio-group v-model="forsingle.biddersType">
            <el-radio :label="1">个体工商户</el-radio>
            <el-radio :label="2">企业主体</el-radio>
            <el-radio :label="3">无要求</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="竞买人注册资本" prop="biddersRegistered">
          <el-input
            v-model="forsingle.biddersRegistered"
            style="
              width: 80px;
              margin-right: 5px;
              display: inline-block;
              text-align: center;
            "
          ></el-input>
          <span>万元</span>
        </el-form-item>
        <el-form-item
          label="竞买人经营地址"
          prop="biddersProvinceN"
          class="jmr"
        >
          <el-checkbox
            style="margin-right: 15px"
            v-model="forsingle.biddersAddressFlagN"
            @change="biddersAddressChange"
            >不限</el-checkbox
          >
          <el-select
            filterable
            placeholder="请选择应用领域"
            multiple
            v-model="forsingle.biddersProvinceN"
            @change="biddersProvinceNChange"
          >
            <el-option
              v-for="(province, index) in province"
              :label="province.provinceName"
              :value="province.provinceName"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="竞买人资质许可" prop="biddersQualificationN">
          <el-checkbox-group
            v-model="forsingle.biddersQualificationN"
            @change="biddersChange"
          >
            <el-checkbox
              v-for="(item, index) in biddersArr"
              :label="String(item.value)"
              :key="index"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
          <el-form-item
            style="width: 500px"
            prop="biddersQualificationOther"
            v-if="forsingleBool"
          >
            <el-input
              v-model="forsingle.biddersQualificationOther"
              @input="biddeOthe"
              placeholder="请输入竞买人资质许可证"
            ></el-input>
          </el-form-item>
        </el-form-item>
        <div class="custom">
          <label class="el-form-item__label"
            ><span class="customIconRed">* </span>竞买人报价税率:</label
          >
          <el-form-item
            style="display: inline-block; margin-right: 15px"
            prop="biddersTaxFalg"
          >
            <el-radio-group v-model="forsingle.biddersTaxFalg">
              <el-radio :label="1">报价不含税</el-radio>
              <el-radio :label="2">报价含税</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            style="display: inline-block"
            prop="biddersTax"
            v-if="forsingle.biddersTaxFalg == 2"
          >
            <el-select placeholder="请选择税率" v-model="forsingle.biddersTax">
              <el-option label="13%" :value="13"></el-option>
              <el-option label="9%" :value="9"></el-option>
              <el-option label="6%" :value="6"></el-option>
              <el-option label="3%" :value="3"></el-option>
              <el-option label="1%" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="拆卸情况" prop="disassembleFlag">
          <el-radio-group v-model="forsingle.disassembleFlag">
            <el-radio :label="1">需买方自行拆卸</el-radio>
            <el-radio :label="2">无需拆卸可直接清运</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <!-- 竞价产品 -->
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>竞价产品</span>
        <el-button class="el-blueColor el-pull-right" @click="addProduct"
          >添加产品</el-button
        >
      </div>
      <div class="table">
        <tableTwo
          ref="refTableTwo"
          :table="table1"
          @tableFuncCellback="tableFuncCellback1"
        ></tableTwo>
      </div>
    </div>
    <!-- 商品图片上传 -->
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix" style="width: 650px">
        <span>商品图片上传</span>
        <el-button class="el-blueColor el-pull-right" @click="uploadImage"
          >上传图片</el-button
        >
      </div>
      <div class="table" style="width: 650px">
        <tableTwo
          ref="refTableTwo"
          :table="table2"
          @tableFuncCellback="tableFuncCellback2"
        ></tableTwo>
      </div>
    </div>
    <!-- 竞价附件 -->
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>竞价附件</span>
      </div>
      <div class="table">
        <div class="">
          <el-button
            style="
              border: 1px solid #2db7f5;
              color: #2db7f5;
              margin-right: 10px;
            "
            @click="uploadFile"
            >点击上传</el-button
          >
          <span class="subtitle"
            >最多上传5个格式为doc、xlsx、pdf、jpg、png单个文件，体积小于5MB的文件</span
          >
        </div>
        <el-row>
          <el-col
            class="elCol"
            :span="4"
            v-for="(item, index) in fileArr"
            :key="index"
            @click="CheckFile(item)"
          >
            <i @click="deleteDelete2(item, index)">×</i>
            <span
              ><span class="el-icon-paperclip"></span>{{ item.fileName }}</span
            >
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 竞价详情及货品描述 -->
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>竞价详情及货品描述</span>
        <span class="subtitle">建议上传货品图像</span>
      </div>
      <div class="table">
        <QuillEditor
          ref="onEditor"
          v-model="forsingle.jpSceneCost.goodsRepresent"
          @change="onEditorFunc"
        >
        </QuillEditor>
      </div>
    </div>
    <!-- 保证金及费用设置 -->
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>保证金及费用设置</span>
      </div>
      <el-form
        ref="form4"
        :model="forsingle"
        label-width="110px"
        :rules="rules"
        label-suffix=":"
        label-position="left"
        class="demo-ruleForm text-From textfrom4"
      >
        <div class="custom">
          <label class="el-form-item__label"
            ><span class="customIconRed">* </span>报名费设置:</label
          >
          <el-form-item
            prop="entryFeeType"
            style="display: inline-block; margin-right: 15px"
          >
            <el-radio-group v-model="forsingle.entryFeeType">
              <el-radio :label="1">无报名费</el-radio>
              <el-radio :label="2">需缴纳报名费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            prop="entryFeePrice"
            style="display: inline-block"
            v-if="forsingle.entryFeeType == 2"
          >
            <el-input
              v-model="forsingle.entryFeePrice"
              style="width: 100px"
              disabled
            ></el-input>
          </el-form-item>
        </div>
        <div class="custom">
          <label class="el-form-item__label"
            ><span class="customIconRed">* </span>服务费设置:</label
          >
          <el-form-item
            prop="servceFeeType"
            style="display: inline-block; margin-right: 15px"
          >
            <el-radio-group v-model="forsingle.servceFeeType">
              <el-radio :label="0">无服务费</el-radio>
              <el-radio :label="1">总金额收取</el-radio>
              <el-radio :label="2">定额收取</el-radio>
              <el-radio :label="3">按单位收取</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            prop="servceFeePrice"
            style="margin-left: 0px !important; margin-top: -15px"
            v-if="forsingle.servceFeeType != '0'"
          >
            <div v-if="forsingle.servceFeeType == '1'">
              <el-input
                v-model="forsingle.servceFeePrice"
                style="width: 240px"
                placeholder="%"
              ></el-input>
              <span class="subtitle">按总结算金额固定比例收取</span>
            </div>
            <div v-if="forsingle.servceFeeType == '2'">
              <el-input
                v-model="forsingle.servceFeePrice"
                style="width: 240px"
                placeholder="元"
              ></el-input>
              <span class="subtitle">按照单场次拍卖会定额收取</span>
            </div>
            <div v-if="forsingle.servceFeeType == '3'">
              <el-input
                v-model="forsingle.servceFeePrice"
                style="width: 240px"
                placeholder="元/吨"
              ></el-input>
              <span class="subtitle">按照处置数量定额收取</span>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="保证金缴纳" prop="bondTypeN">
          <el-checkbox-group
            v-model="forsingle.bondTypeN"
            @change="bondTypeNChange"
          >
            <el-checkbox label="1" disabled>无需缴纳保证金</el-checkbox>
            <el-checkbox label="2">线上缴纳</el-checkbox>
            <el-checkbox label="3" disabled>线下缴纳</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="保证金金额" prop="bondAmt">
          <el-input v-model="forsingle.bondAmt" class="elinputM"></el-input>
          <span>元</span>
        </el-form-item>
      </el-form>
    </div>
    <!-- 竞价规则及隐私设置 -->
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>竞价规则及隐私设置</span>
      </div>
      <el-form
        ref="form5"
        :model="forsingle"
        :rules="rules"
        label-width="140px"
        label-suffix=":"
        label-position="left"
        class="demo-ruleForm text-From"
      >
        <el-form-item label="隐私设置" prop="privacySet">
          <el-radio-group v-model="forsingle.privacySet">
            <el-radio :label="1">电话报价后可见</el-radio>
            <el-radio :label="2">公开联系人信息</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="成交公告" prop="dealNotice">
          <el-radio-group v-model="forsingle.dealNotice">
            <el-radio :label="1">成交后自动发布</el-radio>
            <el-radio :label="2">成交后不公开</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="调价方式" prop="adjustWay">
          <el-radio-group v-model="forsingle.adjustWay">
            <el-radio :label="1">按比例调整</el-radio>
            <el-radio :label="2">按金额调整</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="增价幅度" prop="increRange">
          <el-input v-model="forsingle.increRange" class="elinputM"></el-input>
          <span v-show="forsingle.adjustWay == 1">%</span>
          <span v-show="forsingle.adjustWay == 2">元</span>
        </el-form-item>
        <div class="custom">
          <label class="el-form-item__label" style="width: 140px"
            ><span class="customIconRed">* </span>开盘价格:</label
          >
          <el-form-item
            v-if="!forsingle.startPriceFlagN"
            label=""
            prop="startPrice"
            style="display: inline-block; margin-left: -140px"
          >
            <el-input
              v-model="forsingle.startPrice"
              class="elinputM"
              @change="startPriceChange"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="forsingle.startPriceFlagN"
            label=""
            style="display: inline-block; margin-left: -140px"
          >
            <el-input class="elinputM" @change="startPriceChange"></el-input>
          </el-form-item>
          <el-form-item
            label=""
            style="display: inline-block; margin-left: -140px"
          >
            <el-checkbox
              label="不设置开盘价"
              prop="startPrice"
              v-model="forsingle.startPriceFlagN"
              @change="startPriceFlagNChange"
              style="margin-left: 10px"
            ></el-checkbox>
          </el-form-item>
        </div>
        <el-form-item label="成交底价" prop="basePrice">
          <el-input v-model="forsingle.basePrice" class="elinputM"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="评估参考价" prop="evaluationPrice">
          <el-input
            v-model="forsingle.evaluationPrice"
            class="elinputM"
          ></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="最低参与企业数" prop="minSign">
          <span>最少</span>
          <el-input
            v-model="forsingle.minSign"
            style="display: inline-block; width: 100px; margin: 0 5px"
          ></el-input>
          <span>家</span>
        </el-form-item>
        <el-form-item label="竞价方式" prop="bidWay">
          <el-radio-group v-model="forsingle.bidWay">
            <el-radio :label="1">公开询价</el-radio>
            <el-radio :label="2">邀请询价</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="保证金白名单" prop="lookUserName">
					<el-button style="color: #2DB7F5; border: 1px solid #2DB7F5;">添加白名单</el-button>
					<el-row style="width: 60%;">
						<el-col :span="8">XXXXXXXXXXXXX公司 <span class="comDe">删除</span></el-col>
						<el-col :span="8">XXXXXXXXXXXXX公司 <span class="comDe">删除</span></el-col>
						<el-col :span="8">XXXXXXXXXXXXX公司 <span class="comDe">删除</span></el-col>
						<el-col :span="8">XXXXXXXXXXXXX公司 <span class="comDe">删除</span></el-col>
						<el-col :span="8">XXXXXXXXXXXXX公司 <span class="comDe">删除</span></el-col>
						<el-col :span="8">XXXXXXXXXXXXX公司 <span class="comDe">删除</span></el-col>
						<el-col :span="8">XXXXXXXXXXXXX公司 <span class="comDe">删除</span></el-col>
						<el-col :span="8">XXXXXXXXXXXXX公司 <span class="comDe">删除</span></el-col>
					</el-row>
				</el-form-item> -->
      </el-form>
    </div>

    <div class="bgBorderThree">
      <div class="el-b">
        <el-button class="el-noColor" @click="cencal">关闭</el-button>
        <el-button class="el-blueColor" @click="release('10', '保存')"
          >保存</el-button
        >
        <el-button class="el-blueColor" @click="release('30', '发布')"
          >发布</el-button
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
      <div class="MarkListing" @click.stop>
        <div class="card-header el-clearfix">
          <span>编辑标的清单</span>
          <span class="el-pull-right" type="text" @click="Procancel">×</span>
        </div>
        <div style="margin: 15px">
          <!-- 订单信息 -->
          <el-row style="margin: 0 20px">
            <el-col :span="12">
              <div class="el-detail el-detail-1">
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>委托订单号</span>：</label>
                  <div class="tCon" v-text="orderNumber.workOrderNum"></div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>委托企业</span>：</label>
                  <div class="tCon" v-text="orderNumber.enterName"></div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>委托项目部 </span>：</label>
                  <div
                    class="tCon"
                    v-text="orderNumber.entrustProjectName"
                  ></div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>委托人</span>：</label>
                  <div class="tCon" v-text="orderNumber.entrustUserName"></div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>看货对接人</span>：</label>
                  <div class="tCon" v-text="orderNumber.lookGoodUser"></div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="el-detail el-detail-1">
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>订单状态</span>：</label>
                  <div class="tCon" v-text="orderNumber.statusName"></div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>看货地址</span>：</label>
                  <div class="tCon" v-text="orderNumber.lookGoodAddress"></div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"
                    ><span>订单创建时间</span>：</label
                  >
                  <div class="tCon" v-text="orderNumber.createTime"></div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>订单创建人</span>：</label>
                  <div class="tCon" v-text="orderNumber.createUserName"></div>
                </div>
                <div class="el-detail-item el-clearfix">
                  <label class="el-pull-left"><span>清运期限</span>：</label>
                  <div class="tCon" v-text="orderNumber.clearDate"></div>
                </div>
              </div>
            </el-col>
          </el-row>
          <tableTwo
            ref="multipleTable"
            :table="table3"
            @tableFuncCellback="tableFuncCellback3"
          ></tableTwo>
          <div class="el-b">
            <el-button class="el-noColor" @click="Procancel">取消</el-button>
            <el-button class="el-blueColor" @click="submitMarkLing"
              >确定</el-button
            >
          </div>
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
    <!-- 图片预览 -->
    <elImageViewer
      v-if="PreviewPcture.show"
      :initial-index="PreviewPcture.index"
      :on-close="imagesOnClose"
      :url-list="PreviewPcture.urlarr"
    ></elImageViewer>
  </div>
</template>

<script>
import QuillEditor from "../../RichText/RichText.vue";
import elImageViewer from "element-ui/packages/image/src/image-viewer.vue";
export default {
  name: "biddingDetail",
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入11位手机号"));
        }
      }
    };
    let min = (rule, value, callback) => {
      if (value > 0 && value <= 30) {
        if (String(value).indexOf(".") != -1) {
          return callback(new Error("请输入0-30之间的整数"));
        }
      } else {
        return callback(new Error("请输入0-30之间的整数"));
      }
    };
    return {
      biddinguuids: "",
      biddingtype: "",
      isOrderData: 0,
      forsingleBool: false, //是否显示竞买人经营许可证输入框
      formInline: {
        ordercode: "", //委托订单号
      },
      rules1: {
        ordercode: [{ required: true, message: "委托订单号不能为空" }],
      },
      // 订单号详情
      orderNumber: {
        uuids: "",
        workOrderNum: "",
        enterName: "",
        entrustProject: "",
        entrustUserName: "",
        lookGoodUser: "",
        statusName: "",
        lookGoodAddress: "",
        createTime: "",
        createUserName: "",
        clearDate: "",
      },
      forsingle: {
        // 竞价基本信息
        title: "",
        code: "",
        saleCompanyName: "",
        saleDeptName: "",
        createUserName: "",
        contacts: "",
        contactsTel: "",
        classifyId: "",
        classifyName: "",
        useAreaN: "",
        useArea: "",
        khStartTimeN: [],
        khStartTime: "",
        khEndTime: "",
        signEndTimeN: "", //不传
        signEndTime: "",
        offerStartDays: "",
        offerStartTime: "",
        offerStartDateN: "", //不传
        offerStartAt: "", //不传
        offerEndDays: "",
        offerEndTime: "",
        offerEndDateN: "", //不传
        offerEndAt: "", //不传
        pricingMethod: 1,
        extend: 0,
        extendN: false, //不传
        // 竞价要求
        payWay: "1",
        payTime: "",
        provinceId: "",
        provinceName: "",
        cityId: "",
        cityName: "",
        khAddress: "",
        storageWay: "",
        storageTime: "",
        biddersType: 3,
        deliveryTime: "",
        deliveryTimeN: "",
        biddersRegistered: 0,
        biddersProvince: "",
        biddersProvinceN: [],
        biddersAddressFlag: 1,
        biddersAddressFlagN: false,
        biddersQualification: "",
        biddersQualificationN: ["1"],
        biddersQualificationOther: "",
        customIconRed: "",
        biddersTax: 0,
        biddersTaxFalg: 0,
        disassembleFlag: "",
        // 保证金及费用设置
        entryFeeType: 1,
        entryFeePrice: "",
        servceFeeType: 0,
        servceFeePrice: "",
        bondType: "2",
        bondTypeN: ["2"],
        bondAmt: "",
        // 竞价规则及隐私设置
        privacySet: 2,
        dealNotice: "",
        adjustWay: "",
        increRange: "",
        startPrice: "",
        startPriceFlag: "",
        startPriceFlagN: false,
        basePrice: "",
        evaluationPrice: "",
        minSign: "",
        bidWay: "",
        jpSceneCost: {
          goodsRepresent: "",
        },
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入竞价标题，标题内容请勿包含特殊字符或空格",
            trigger: ["change", "blur"],
          },
        ],
        contacts: [
          {
            required: true,
            message: "请输入联系人姓名",
            trigger: ["change", "blur"],
          },
        ],
        contactsTel: [
          {
            required: true,
            message: "请输入联系人手机号",
            trigger: ["change", "blur"],
          },
          {
            validator: checkPhone,
            message: "请输入11位手机号",
            trigger: ["change", "blur"],
          },
        ],
        classifyId: [
          {
            required: true,
            message: "请选择竞价分类",
            trigger: ["change", "blur"],
          },
        ],
        khStartTimeN: [
          {
            required: true,
            message: "请选择可预约看货日期",
            trigger: ["change", "blur"],
          },
        ],
        signEndTimeN: [
          {
            required: true,
            message: "请选择报名截止日期",
            trigger: ["change", "blur"],
          },
        ],
        offerStartDays: [
          {
            required: true,
            message: "请配置竞价开始时间",
            trigger: ["change", "blur"],
          },
          {
            validator: min,
            message: "请输入0-30之间的整数",
            trigger: ["change", "blur"],
          },
        ],
        offerEndDays: [
          {
            required: true,
            message: "请配置竞价截止时间",
            trigger: ["change", "blur"],
          },
          {
            validator: min,
            message: "请输入0-30之间的整数",
            trigger: ["change", "blur"],
          },
        ],
        pricingMethod: [
          {
            required: true,
            message: "请选择处置计价方式",
            trigger: ["change", "blur"],
          },
        ],
        payWay: [
          {
            required: true,
            message: "请选择付款方式",
            trigger: ["change", "blur"],
          },
        ],
        payTime: [
          {
            required: true,
            message: "请填写付款时间",
            trigger: ["change", "blur"],
          },
          {
            validator: function (rule, value, callback) {
              if (value > 0) {
                callback();
              } else {
                return callback(new Error("请填写大于0的数字"));
              }
            },
            message: "请填写大于0的数字",
            trigger: ["change", "blur"],
          },
        ],
        provinceId: [
          { required: true, message: "请选择省", trigger: ["change", "blur"] },
        ],
        cityId: [
          { required: true, message: "请选择市", trigger: ["change", "blur"] },
        ],
        khAddress: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: ["change", "blur"],
          },
        ],
        storageWay: [
          {
            required: true,
            message: "请选择储存方式",
            trigger: ["change", "blur"],
          },
        ],
        storageTime: [
          {
            required: true,
            message: "请填写储存时间",
            trigger: ["change", "blur"],
          },
          {
            validator: function (rule, value, callback) {
              if (value > 0) {
                callback();
              } else {
                return callback(new Error("请填写大于0的数字"));
              }
            },
            message: "请填写大于0的数字",
            trigger: ["change", "blur"],
          },
        ],
        biddersType: [
          {
            required: true,
            message: "请选择竞买人企业类型",
            trigger: ["change", "blur"],
          },
        ],
        biddersTaxFalg: [
          { required: true, message: "请选择税率要求", trigger: ["blur"] },
        ],
        biddersTax: [
          { required: true, message: "请选择选择税率", trigger: ["blur"] },
        ],
        disassembleFlag: [
          {
            required: true,
            message: "请选择标的物拆卸情况",
            trigger: ["change", "blur"],
          },
        ],
        biddersQualificationOther: [
          {
            required: true,
            message: "请输入竞买人资质许可证",
            trigger: ["change", "blur"],
          },
        ],
        offerStartAt: [
          {
            required: true,
            message: "请选择时分",
            trigger: ["change", "blur"],
          },
        ],
        offerEndAt: [
          {
            required: true,
            message: "请选择时分",
            trigger: ["change", "blur"],
          },
        ],
        entryFeeType: [
          {
            required: true,
            message: "请配置报名费",
            trigger: ["change", "blur"],
          },
        ],
        servceFeeType: [
          {
            required: true,
            message: "请配置服务费",
            trigger: ["change", "blur"],
          },
        ],
        servceFeePrice: [
          {
            required: true,
            message: "请配置服务费",
            trigger: ["change", "blur"],
          },
          {
            validator: function (rule, value, callback) {
              if (value > 0) {
                callback();
              } else {
                return callback(new Error("大于0的数字"));
              }
            },
            message: "大于0的数字",
            trigger: ["change", "blur"],
          },
        ],
        bondTypeN: [
          {
            required: true,
            message: "请选择保证金缴纳方式",
            trigger: ["change", "blur"],
          },
        ],
        bondAmt: [
          {
            required: true,
            message: "请输入保证金金额",
            trigger: ["change", "blur"],
          },
          {
            validator: function (rule, value, callback) {
              if (value > 0) {
                callback();
              } else {
                return callback(new Error("大于0的数字"));
              }
            },
            message: "大于0的数字",
            trigger: ["change", "blur"],
          },
        ],
        privacySet: [
          {
            required: true,
            message: "请选择隐私设置",
            trigger: ["change", "blur"],
          },
        ],
        dealNotice: [
          {
            required: true,
            message: "请选择成交公告",
            trigger: ["change", "blur"],
          },
        ],
        adjustWay: [
          {
            required: true,
            message: "请选择调价方式",
            trigger: ["change", "blur"],
          },
        ],
        increRange: [
          {
            required: true,
            message: "请填写增价幅度",
            trigger: ["change", "blur"],
          },
        ],
        startPrice: [
          {
            validator: function (rule, value, callback) {
              if (!value) {
                callback(new Error("请输入开盘价格"));
              } else if (
                String(value).indexOf(".") != -1 &&
                String(value).split(".").length > 2
              ) {
                callback(new Error("请输入正确格式的金额")); //防止输入多个小数点
              } else if (
                String(value).indexOf(".") != -1 &&
                String(value).split(".")[1].length > 2
              ) {
                callback(new Error("只能输入两位小数")); //小数点后两位
              } else {
                callback();
              }
            },
            trigger: ["change"],
          },
        ],
        basePrice: [
          {
            required: true,
            validator: function (rule, value, callback) {
              if (!value) {
                callback(new Error("请输入成交底价"));
              } else if (
                String(value).indexOf(".") != -1 &&
                String(value).split(".").length > 2
              ) {
                callback(new Error("请输入正确格式的金额")); //防止输入多个小数点
              } else if (
                String(value).indexOf(".") != -1 &&
                String(value).split(".")[1].length > 2
              ) {
                callback(new Error("只能输入两位小数")); //小数点后两位
              } else {
                callback();
              }
            },
            trigger: ["change", "blur"],
          },
        ],
        evaluationPrice: [
          {
            validator: function (rule, value, callback) {
              if (
                String(value).indexOf(".") != -1 &&
                String(value).split(".").length > 2
              ) {
                callback(new Error("请输入正确格式的金额")); //防止输入多个小数点
              } else if (
                String(value).indexOf(".") != -1 &&
                String(value).split(".")[1].length > 2
              ) {
                callback(new Error("只能输入两位小数")); //小数点后两位
              } else {
                callback();
              }
            },
            trigger: ["change", "blur"],
          },
        ],
        minSign: [
          {
            required: true,
            validator: function (rule, value, callback) {
              if (!value) {
                callback(new Error("请填写企业数"));
              } else if (String(value).indexOf(".") != -1) {
                callback(new Error("请输入整数")); //防止输入多个小数点
              } else if (value < 1) {
                callback(new Error("企业数大于0"));
              } else {
                callback();
              }
            },
            trigger: ["change", "blur"],
          },
        ],
        bidWay: [
          {
            required: true,
            message: "请选择竞价方式",
            trigger: ["change", "blur"],
          },
        ],
      },
      table1: {
        // 表格操作数组
        operationList: {
          0: ["上传附件"],
          1: ["查看附件"],
        },
        // 操作块儿是否显示
        isoperation: true,
        // 数据数组
        Dataorigin: [],
        // 按钮切换状态
        StatusField: "unStatus",
        // 右侧操作宽度
        operationW: "150",
        // 表头数组
        header: [
          { name: "操作", prop: "i", width: "50", type: "button" },
          { name: "标的类别", prop: "typeName", width: "230" },
          { name: "标的编码", prop: "code", width: "230" },
          { name: "标的名称", prop: "name", width: "230" },
          { name: "规格", prop: "standards", width: "230" },
          { name: "品牌", prop: "brand", width: "230" },
          { name: "标的描述", prop: "represent", width: "230" },
          { name: "剩余未处置", prop: "remainingUnsold", width: "230" },
          {
            name: "处置数量",
            prop: "disposalUnderQuantity",
            width: "230",
            type: "input",
          },
          { name: "计量单位", prop: "unit", width: "230" },
          { name: "质量状况", prop: "qualityStatus", width: "230" },
        ],
        rules: {
          disposalUnderQuantity: [
            {
              required: true,
              message: "处置数量不能为空",
              trigger: ["change", "blur"],
            },
            {
              pattern: /^[0-9]+.?[0-9]*$/,
              message: "请输入大于0数字",
              trigger: ["blur", "change"],
            },
          ],
        },
      },
      table2: {
        // 表格操作数组
        operationList: ["上移", "下移", "删除"],
        // 操作块儿是否显示
        // isoperation: false,
        // 数据数组
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "150",
        // 表头数组
        header: [
          { name: "排序", prop: "sort", width: "100" },
          { name: "图片名称", prop: "fileName", width: "250", type: "button" },
          // {name: "大小",prop: "size",width:'80'},
        ],
      },
      table3: {
        // 表格操作数组
        operationList: {
          0: ["上传附件"],
          1: ["查看附件"],
        },
        // 操作块儿是否显示
        isoperation: true,
        // 数据数组
        Dataorigin: [],
        // 按钮切换状态
        StatusField: "unStatus",
        // 右侧操作宽度
        operationW: "150",
        // 表头数组
        header: [
          { name: "操作", prop: "check", width: "50", type: "checkbox" },
          { name: "标的类别", prop: "typeName", width: "230" },
          { name: "标的编码", prop: "code", width: "230" },
          { name: "标的名称", prop: "name", width: "230" },
          { name: "规格", prop: "standards", width: "230" },
          { name: "品牌", prop: "brand", width: "230" },
          { name: "标的描述", prop: "represent", width: "230" },
          { name: "委托处置", prop: "saleNum", width: "230" },
          { name: "剩余未处置", prop: "remainingUnsold", width: "230" },
          { name: "已处置", prop: "disposalQuantity", width: "230" },
          { name: "计量单位", prop: "unit", width: "230" },
          { name: "质量状况", prop: "qualityStatus", width: "230" },
        ],
      },
      // 省市
      province: [],
      city: [],
      // 竞价分类
      clication: [],
      // 竞买人经营许可
      biddersArr: [],
      // 应用领域
      ApplicationField: ["房建类", "公路类", "铁路类", "桥梁隧道类", "市政类"],
      // 图片
      imagesArr: [],
      // 附件
      fileArr: [],
      // 图片查看
      PreviewPcture: {
        index: "",
        urlarr: [],
        show: false,
      },
      contNumber: 0, //自增变量，有用
      // 指定目前上传的是哪个字段或集合
      SpecifiedField: [],
      // 弹出层调用
      dialogFormVisible: false,
      dialogFormVisibleActive: false,
      getResult: false,
    };
  },
  components: {
    QuillEditor,
    elImageViewer,
  },
  mounted() {
    // 获取省
    this.address();
    // 获取竞价分类
    this.classifyId();
    // 传参查询数据
    this.theQuery();
    // 富文本焦点事件
    this.Editorfocus();
    //查询竞买人资质
    this.InquireAbout();
  },
  methods: {
    // 传参查询数据
    theQuery() {
      console.log(this.$route.query.id);
      if (this.$route.query.id != undefined) {
        this.formInline.ordercode = this.$route.query.id;
        if (this.formInline.ordercode != "") {
          this.onSearch();
        }
      }
      if (
        this.$route.query.uuids != undefined &&
        this.$route.query.name != undefined
      ) {
        this.biddinguuids = this.$route.query.uuids;
        this.biddingtype = this.$route.query.name;
        if (
          this.$route.query.name == "editor" ||
          this.$route.query.name == "copy"
        ) {
          this.queryBidding();
        }
      }
    },
    // 编辑、复制反显
    queryBidding() {
      var that = this;
      that.httpsapi
        .POST(that.apis + "/trade/bidding/queryBiddingInformation", {
          uuids: that.biddinguuids,
        })
        .then((result) => {
          console.log(result);
          if (result.code == 200) {
            var data = result.data;
            var _arr = [];
            _arr.push(data.khStartTime);
            _arr.push(data.khEndTime);
            data.khStartTimeN = _arr;
            that.formInline.ordercode = data.workOrderNum;
            that.onSearch1();
            that.httpsapi
              .POST(that.apis + "/ec/province-city-area/searchCity", {
                provinceCode: data.provinceId,
              })
              .then((result) => {
                if (result.code == 200) {
                  that.city = result.data;
                }
              });
            data.signEndTimeN = data.signEndTime;
            data.offerStartDateN = data.offerStartTime.substring(0, 10);
            data.offerEndDateN = data.offerEndTime.substring(0, 10);
            data.extend === 1 ? (data.extendN = true) : (data.extendN = false);
            data.offerStartAt = new Date(data.offerStartTime);
            data.offerEndAt = new Date(data.offerEndTime);
            data.biddersProvinceN = data.biddersProvince.split(",");
            data.startPriceFlagN = data.startPriceFlag == 1 ? true : false;
            data.useAreaN = data.useArea.split(",");
            data.biddersQualificationN = data.biddersQualification.split(",");
            data.biddersQualificationN.forEach((item) => {
              if (item == 5) {
                that.forsingleBool = true;
              }
            });
            var table1 = data.jpEntrustSubjectOrder;
            if (table1 != null && table1 != []) {
              table1.forEach((item, index) => {
                item.i = '<i class="dTt">-</i>';
                if (item.attachmentUrl != null) {
                  item.unStatus = 1;
                } else {
                  item.unStatus = 0;
                }
                item.ioId = that.contNumber++;
              });
              that.table1.Dataorigin = table1;
            }
            data.bondTypeN = data.bondType.split(",");
            data.entryFeeType = data.jpSceneCost.entryFeeType;
            data.servceFeeType = data.jpSceneCost.servceFeeType;
            data.servceFeePrice = data.jpSceneCost.servceFeePrice;
            that.forsingle = data;
            that.imagesArr = data.upload;
            that.table2.Dataorigin = JSON.parse(that.imagesArrF());
            that.fileArr = data.upload1;
          }
        });
    },
    // 富文本焦点事件
    Editorfocus() {
      var that = this;
      that.$nextTick(() => {
        that.$refs.onEditor.quill.enable(false);
        setTimeout(function () {
          that.$refs.onEditor.quill.enable(true);
        }, 3000);
      });
    },
    // 发布
    release(_status, _text) {
      var _this = this,
        Retuen = true;
      if (!_this.$refs.refTableTwo.refTableTwo()) {
        return false;
      }
      for (var i = 1; i < 5; i++) {
        _this.$refs["form" + (i + 1)].validate((viod) => {
          if (viod === false) {
            Retuen = false;
          }
        });
      }
      // 特别处理竞价开始和截止日期的时分框
      if (
        _this.forsingle.offerStartAt == "" ||
        _this.forsingle.offerEndAt == ""
      ) {
        Retuen = false;
      }
      if (Retuen) {
        _this.msgBox.msgBoxOpen(_this, {
          message: "确认要" + _text + "竞价单?",
          btnText: _text,
          success(data) {
            //确定回调
            var url = _this.apis + "/trade/scene/addReScene";
            if (_this.$route.query.name === "editor") {
              url = _this.apis + "/trade/scene/updateScene";
            }
            console.log(url);
            var _obj = _this.forsingle;
            _obj.useArea = "";
            _obj.useAreaN.forEach((item) => {
              _obj.useArea += item + ",";
            });
            _obj.useArea = _obj.useArea.substring(0, _obj.useArea.length - 1);
            _obj.upload = _this.imagesArr;
            _obj.upload1 = _this.fileArr;
            _obj.workOrderNum = _this.formInline.ordercode;
            _obj.entrustUuids = _this.orderNumber.uuids;
            _obj.status = _status;
            _obj.jpEntrustSubjectOrder = _this.table1.Dataorigin;
            (_obj.jpSceneCost.entryFeeType = _obj.entryFeeType),
              (_obj.jpSceneCost.entryFeePrice = _obj.entryFeePrice),
              (_obj.jpSceneCost.servceFeeType = _obj.servceFeeType),
              (_obj.jpSceneCost.servceFeePrice = _obj.servceFeePrice),
              console.log(_obj);

            _this.httpsapi.POST(url, _obj).then((result) => {
              console.log(result);
              if (result.code == 200) {
                _this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "2000",
                  type: "success",
                });
                _this.$router.replace({
                  name: "bidding",
                });
              } else {
              }
            });
          },
        });
      }
    },
    // 关闭竞价单
    cencal() {
      var _this = this;
      _this.msgBox.msgBoxOpen(_this, {
        message: "确认要关闭竞价单?",
        btnText: "关闭",
        success(data) {
          //确定回调
          _this.$router.go(-1);
        },
      });
    },
    // 搜索订单号
    onSearch() {
      var _this = this;
      _this.$refs["form1"].validate((valid) => {
        if (valid) {
          var url = _this.apis + "/trade/bidding/queryEntrustById";
          _this.httpsapi
            .POST(url, { workOrderNum: _this.formInline.ordercode })
            .then((result) => {
              console.log(result);
              if (result.code == 200) {
                _this.isOrderData = "1";
                _this.orderNumber = result.data[0];
                _this.forsingle.saleCompanyName = result.data[0].enterName;
                _this.forsingle.saleCompanyName = result.data[0].enterName;
                _this.forsingle.saleDeptName =
                  result.data[0].entrustProjectName;
                _this.forsingle.createUserName = result.data[0].createUserName;
                _this.forsingle.saleCompanyId = result.data[0].saleCompanyId;
                _this.forsingle.saleDeptId = result.data[0].entrustProject;
                _this.forsingle.deliveryTime = result.data[0].clearDate;
                _this.forsingle.deliveryTimeN = result.data[0].clearDate;
                _this.forsingle.provinceId = result.data[0].provinceId;
                _this.forsingle.provinceName = result.data[0].provinceName;
                _this.forsingle.cityId = result.data[0].cityId;
                _this.forsingle.cityName = result.data[0].cityName;
                _this.forsingle.khAddress = result.data[0].lookGoodAddress;
                for (let i = 0; i < result.data[0].listGoods.length; i++) {
                  if (result.data[0].listGoods[i].attachmentUrl != null) {
                    result.data[0].listGoods[i]['unStatus'] = 1;
                  } else {
                    result.data[0].listGoods[i]['unStatus'] = 0;
                  }
                }
                _this.table1.Dataorigin = result.data[0].listGoods;

                _this.forsingle.biddersTaxFalg = Number(
                  result.data[0].biddersTaxFalg
                );
                _this.forsingle.biddersTax = Number(result.data[0].biddersTax);

                _this.getResult = true;
                _this.imagesArr = result.data[0].upload;
                var t2 = result.data[0].upload1;
                _this.imagesArr.forEach((item, index) => {
                  item.fileName = item.fullname;
                  item.filePath = item.url;
                  item.fileSuf = item.ext;
                });

                _this.table2.Dataorigin = JSON.parse(_this.imagesArrF());

                t2.forEach((item, index) => {
                  item.sort = index + 1;
                  item.fileName = item.fullname;
                  item.filePath = item.url;
                  item.fileSuf = item.ext;
                });

                _this.fileArr = t2;
              } else {
                _this.isOrderData = "2";
              }
            });
        } else {
          return false;
        }
      });
    },
    onSearch1() {
      var _this = this;
      _this.$refs["form1"].validate((valid) => {
        if (valid) {
          var url = _this.apis + "/trade/bidding/queryEntrustById";
          _this.httpsapi
            .POST(url, { workOrderNum: _this.formInline.ordercode })
            .then((result) => {
              console.log(result);
              if (result.code == 200) {
                _this.isOrderData = "1";
                _this.orderNumber = result.data[0];
                _this.forsingle.saleCompanyName = result.data[0].enterName;
                _this.forsingle.saleCompanyName = result.data[0].enterName;
                _this.forsingle.saleDeptName =
                  result.data[0].entrustProjectName;
                _this.forsingle.createUserName = result.data[0].createUserName;
                _this.forsingle.saleCompanyId = result.data[0].saleCompanyId;
                _this.forsingle.saleDeptId = result.data[0].entrustProject;
                _this.forsingle.deliveryTime = result.data[0].clearDate;
                _this.forsingle.deliveryTimeN = result.data[0].clearDate;
                _this.forsingle.provinceId = result.data[0].provinceId;
                _this.forsingle.provinceName = result.data[0].provinceName;
                _this.forsingle.cityId = result.data[0].cityId;
                _this.forsingle.cityName = result.data[0].cityName;
                _this.forsingle.khAddress = result.data[0].lookGoodAddress;
                _this.forsingle.biddersTaxFalg = Number(
                  result.data[0].biddersTaxFalg
                );
                _this.forsingle.biddersTax = Number(result.data[0].biddersTax);

                _this.getResult = true;
              } else {
                _this.isOrderData = "2";
              }
            });
        } else {
          return false;
        }
      });
    },
    // 监听产品清单
    tableFuncCellback1(data) {
      switch (data[1]) {
        case "button": //点击按钮
          this.detele1(data[0]);
          break;
        case "上传附件": //点击按钮
          this.unUpload(data[0]);
          break;
        case "查看附件": //点击按钮
          window.open(this.tuurl + data[0].attachmentUrl);
          break;
        default:
          break;
      }
    },
    // 图片
    tableFuncCellback2(data) {
      switch (data[1]) {
        case "删除": //删除图片
          this.imagesDetail(data[0]);
          break;
        case "上移":
          this.MoveUp(data[0]);
          break;
        case "下移":
          this.MoveDown(data[0]);
          break;
        case "button":
          this.lookImage(data[0]);
          break;
        default:
          break;
      }
    },
    // 编辑标的清单
    tableFuncCellback3(data) {
      switch (data[1]) {
        case "查看附件":
          window.open(this.tuurl + data[0].attachmentUrl);
          break;
      }
    },
    // 上传
    upload() {
      this.$refs.inputFile.dispatchEvent(new MouseEvent("click"));
    },
    // 文件上传
    FileUpload(e) {
      var that = this;
      if (that.SpecifiedField[0] == "images") {
        that.uploading.uploading(e, "5", "jpg/png", that, function (result) {
          result.fileName = result.fullname;
          result.filePath = result.url;
          result.fileSuf = result.ext;
          that.table2.Dataorigin = JSON.parse(that.imagesArrF(result));
        });
      } else if (that.SpecifiedField[0] == "file") {
        that.uploading.uploading(
          e,
          "5",
          "doc/docx/xls/xlsx/pdf/jpg/png",
          that,
          function (result) {
            result.fileName = result.fullname;
            result.filePath = result.url;
            result.fileSuf = result.ext;
            that.fileArr.push(result);
          }
        );
      } else if (that.SpecifiedField[0] == "underlying") {
        that.uploading.uploading(
          e,
          "5",
          "doc/docx/xls/xlsx/pdf/jpg/png",
          that,
          function (result) {
            that.table1.Dataorigin.forEach((item) => {
              if (item.uuids == that.SpecifiedField[1]) {
                item.attachmentUrl = result.url;
                item.unStatus = "1";
              }
            });
            console.log(that.table1.Dataorigin);
          }
        );
      }
      that.$refs.inputFile.value = "";
    },

    // 标的清单上传附件
    unUpload(data) {
      this.upload();
      this.SpecifiedField[0] = "underlying";
      this.SpecifiedField[1] = data.uuids;
    },
    // 上移
    MoveUp(data) {
      console.log(data);
      if (data.sort - 1 == 0) {
        return false;
      }
      this.table2.Dataorigin = [];
      var moveA = this.imagesArr[data.sort - 1];
      var moveB = this.imagesArr[data.sort - 2];
      this.imagesArr[data.sort - 1] = moveB;
      this.imagesArr[data.sort - 2] = moveA;
      this.table2.Dataorigin = JSON.parse(this.imagesArrF());
    },
    // 下移
    MoveDown(data) {
      if (data.sort == this.imagesArr.length) {
        return false;
      }
      this.table2.Dataorigin = [];
      var moveA = this.imagesArr[data.sort - 1];
      var moveB = this.imagesArr[data.sort];
      this.imagesArr[data.sort - 1] = moveB;
      this.imagesArr[data.sort] = moveA;
      console.log(this.imagesArr);
      this.table2.Dataorigin = JSON.parse(this.imagesArrF());
    },
    // 删除图片
    imagesDetail(data) {
      this.imagesArr.splice(data.sort - 1, 1);
      this.table2.Dataorigin = JSON.parse(this.imagesArrF());
    },
    // 上传图片
    uploadImage() {
      if (this.table2.Dataorigin.length < 5) {
        this.upload();
        this.SpecifiedField[0] = "images";
      }
    },
    // 上传附件
    uploadFile() {
      if (this.fileArr.length < 5) {
        this.upload();
        this.SpecifiedField[0] = "file";
      }
    },
    // 排序图片
    imagesArrF(data) {
      if (data) {
        this.imagesArr.push(data);
      }
      this.imagesArr.forEach((item, index) => {
        item.sort = index + 1;
      });
      return JSON.stringify(this.imagesArr);
    },
    // 查看图片
    lookImage(data) {
      var arr = [];
      this.table2.Dataorigin.forEach((item, index) => {
        arr.push(this.tuurl + item.filePath);
        if (item == data) {
          this.PreviewPcture.index = index;
        }
      });
      this.PreviewPcture.urlarr = arr;
      this.PreviewPcture.show = true;
    },
    // 关闭图片弹框
    imagesOnClose() {
      this.PreviewPcture.show = false;
    },
    // 点击查看附件
    CheckFile(data) {
      window.open(this.tuurl + data.filePath);
    },
    // 删除附件
    deleteDelete2(item, index) {
      var _this = this;
      _this.msgBox.msgBoxOpen(_this, {
        message: "确认要删除" + item.fileName + "?",
        success(result) {
          //确定回调
          _this.fileArr.splice(index, 1);
          _this.$message({
            showClose: true,
            offset: 400,
            message: "删除成功",
            duration: "2000",
            type: "success",
          });
        },
      });
    },
    // 标的清单删除
    detele1(data) {
      var oindex = this.table1.Dataorigin.findIndex((ele) => {
        return ele.ioId === data.ioId;
      });
      this.table1.Dataorigin.splice(oindex, 1);
      this.$refs.refTableTwo.refTableTwo();
    },
    // 添加产品
    addProduct() {
      var _this = this;
      if (_this.getResult != true) {
        _this.$message({
          showClose: true,
          offset: 400,
          message: "请先添加委托订单",
          type: "error",
        });
        return false;
      }
      var bridgeArr = _this.table1.Dataorigin;
      // 查询竞价产品
      _this.httpsapi
        .POST(
          _this.apis +
            "/trade/bidding/queryBiddingAddProdect/" +
            _this.formInline.ordercode
        )
        .then((getResult) => {
          console.log(getResult);
          if (getResult.code == 200) {
            var _result = [];
            var _result = getResult.data;
            _result.forEach((item1, index1) => {
              if (item1.attachmentUrl) {
                item1.unStatus = 1;
              } else {
                item1.unStatus = 0;
              }
              bridgeArr.forEach((item2) => {
                if (item1.id == item2.id) {
                  _result[index1].check = true;
                }
              });
              item1.ioId = index1;
            });
            _this.table3.Dataorigin = _result;
          }
        });
      _this.dialogFormVisible = true;
      setTimeout(() => {
        _this.dialogFormVisibleActive = true;
      }, 0);
    },
    // 富文本编辑器监听
    onEditorFunc({ editor, html, text }) {
      this.forsingle.jpSceneCost.goodsRepresent = html;
      console.log(this.forsingle);
    },
    // 关闭弹框
    Procancel() {
      this.dialogFormVisibleActive = false;
      setTimeout(() => {
        this.dialogFormVisible = false;
      }, 500);
    },
    // 弹框确定按钮
    submitMarkLing() {
      var _this = this;
      var noArr = [];
      var arr = [];
      var comb = 0;
      _this.table3.Dataorigin.forEach((item, index) => {
        if (item.check) {
          item.i = '<i class="dTt">-</i>';
          if (item.attachmentUrl) {
            item.unStatus = 1;
          } else {
            item.unStatus = 0;
          }
          comb += item.reservePrice ? item.reservePrice : 0;
          item.disposalUnderQuantity = item.remainingUnsold;
          noArr.push(item);
        }
      });
      // 判断标的的服务费是否都一样，一样的，预添加服务费设置
      if (noArr.length > 0) {
        if (noArr.length == 1) {
          _this.forsingle.servceFeeType = noArr[0].serviceMode;
          _this.forsingle.servceFeePrice = noArr[0].servicePrice;
        } else {
          noArr.some(function (value, index) {
            if (value.servicePrice === noArr[0].servicePrice) {
              _this.forsingle.servceFeeType = noArr[0].serviceMode;
              _this.forsingle.servceFeePrice = noArr[0].servicePrice;
            }
          });
        }
      }
      _this.forsingle.basePrice = comb;
      _this.table1.Dataorigin = noArr;
      _this.Procancel();
    },
    // 获取省
    address() {
      var _this = this;
      var url = this.apis + "/ec/province-city-area/searchProvince";
      _this.httpsapi.POST(url, {}).then((result) => {
        if (result.code == 200) {
          this.province = result.data;
        }
      });
    },
    // 查询竞买人资质许可
    InquireAbout() {
      this.httpsapi
        .POST(this.apis + "/system/jp-sys-dict-detail/search", { dictId: 130 })
        .then((result) => {
          console.log(result);
          if (result.code == 200) {
            this.biddersArr = result.data;
          }
        });
    },
    // 监听省获取市
    provinceChange(data) {
      var _this = this;
      var url = _this.apis + "/ec/province-city-area/searchCity";
      _this.forsingle.provinceName = _this.province.find((item) => {
        return item.provinceCode === data;
      }).provinceName;
      _this.httpsapi.POST(url, { provinceCode: data }).then((result) => {
        console.log(result);
        _this.forsingle.cityId = "";
        if (result.code == 200) {
          _this.city = result.data;
        }
      });
    },
    // 监听市
    cityChange(data) {
      var _this = this;
      var url = this.apis + "/ec/province-city-area/searchArea";
      _this.forsingle.cityName = _this.city.find((item) => {
        return item.cityCode === data;
      }).cityName;
    },
    // 查询竞价分类
    classifyId() {
      var _this = this;
      this.httpsapi
        .POST(this.apis + "/trade/scene/queryReClass", {})
        .then(function (result) {
          // console.log(result)
          if (result.code == 200) {
            _this.clication = result.data;
          }
        });
    },
    // 监听报名截止日期
    signEndTimeChange(e) {
      if (
        this.forsingle.offerStartDays > 0 &&
        this.forsingle.offerStartDays <= 30
      ) {
        var a = Number(this.forsingle.offerStartDays),
          b = this.forsingle.signEndTimeN,
          c = "offerStartDateN";
        this.ComTime(a, b, c);
        this.offerEndFunc();
      }
      var _time = this.Timetransf(e);
      this.forsingle.signEndTime = _time.y + "-" + _time.m + "-" + _time.d;
    },
    // 选择竞价开始日期天数
    offerStartDaysFunc(dayNum) {
      if (dayNum > 0 && dayNum <= 30) {
        if (this.forsingle.signEndTimeN != "") {
          var a = Number(dayNum),
            b = this.forsingle.signEndTimeN,
            c = "offerStartDateN";
          this.ComTime(a, b, c);
          this.offerEndFunc();
        }
      }
    },
    // 监听竞价截止日期天数
    offerEndDaysFunc(dayNum) {
      if (dayNum > 0 && dayNum <= 30) {
        if (this.forsingle.offerStartDateN != "") {
          var a = Number(dayNum),
            b = this.ogetDate(this.forsingle.offerStartDateN),
            c = "offerEndDateN";
          this.ComTime(a, b, c);
        }
      }
      console.log(this.forsingle);
    },
    // 监听竞价开始日期时分
    offerStartAtChange(e) {
      this.forsingle.offerStartTime =
        this.forsingle.offerStartDateN +
        " " +
        this.Timetransf(e).h +
        ":" +
        this.Timetransf(e).f;
    },
    // 监听竞价结束日期时分
    offerEndAtChange(e) {
      this.forsingle.offerEndTime =
        this.forsingle.offerEndDateN +
        " " +
        this.Timetransf(e).h +
        ":" +
        this.Timetransf(e).f;
    },
    // 计算竞价截止日期
    offerEndFunc() {
      if (this.forsingle.offerStartDateN != "") {
        if (
          this.forsingle.offerEndDays > 0 &&
          this.forsingle.offerEndDays <= 30
        ) {
          var a = Number(this.forsingle.offerEndDays),
            b = this.ogetDate(this.forsingle.offerStartDateN),
            c = "offerEndDateN";
          this.ComTime(a, b, c);
        }
      }
    },
    // 计算时间
    ComTime(dayNum, _type, _field) {
      var date2 = new Date(_type);
      date2.setDate(_type.getDate() + dayNum);
      var oF = date2.getFullYear();
      var oM = date2.getMonth() + 1;
      var oD = date2.getDate();
      this.forsingle[_field] = oF + "-" + oM + "-" + oD;
    },
    // 时间字符串，转日期格式
    ogetDate(strDate) {
      var date = eval(
        "new Date(" +
          strDate
            .replace(/\d+(?=-[^-]+$)/, function (a) {
              return parseInt(a, 10) - 1;
            })
            .match(/\d+/g) +
          ")"
      );
      return date;
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
    // 监听竞价分类
    classifyIdChange(data) {
      console.log(data);
      var that = this;
      that.clication.forEach((item) => {
        if (item.id == data) {
          that.forsingle.classifyName = item.NAME;
        }
      });
      console.log(that.forsingle);
    },
    // 监听修改允许看货时间格式
    khStartTimeChange(e) {
      var _time1 = this.Timetransf(e[0]);
      var _time2 = this.Timetransf(e[1]);
      this.forsingle.khStartTime = _time1.y + "-" + _time1.m + "-" + _time1.d;
      this.forsingle.khEndTime = _time2.y + "-" + _time2.m + "-" + _time2.d;
    },
    // 监听修改截止自动延长
    extendChange(bool) {
      if (bool) {
        this.forsingle.extend = 1;
      } else {
        this.forsingle.extend = 0;
      }
    },
    // 监听竞买人资质许可
    biddersChange(data) {
      var _text = "";
      if (this.forsingleBool) {
        this.forsingleBool = false;
      }
      data.forEach((item) => {
        _text += item + ",";
        if (item == 5) {
          this.forsingleBool = true;
        }
      });
      this.forsingle.biddersQualification = _text.substring(
        0,
        _text.length - 1
      );
    },
    // 监听竞买人输入框的变化
    biddeOthe(data) {
      var str = data.replace(/\s/g, "");
      this.biddersArr.forEach((item) => {
        if (item.text === str) {
          this.forsingle.biddersQualificationN.push(item.label);
        }
      });
    },
    // 监听竞买人经营地址是否受限
    biddersAddressChange(data) {
      if (data) {
        this.biddersAddress = 2;
        this.forsingle.biddersProvinceN = [];
      } else {
        this.biddersAddress = 1;
      }
    },
    // 监听竞买人经营地址
    biddersProvinceNChange(data) {
      if (data.length > 0) {
        this.forsingle.biddersAddressFlagN = false;
        var _text = "";
        data.forEach((item, index) => {
          _text += item + ",";
        });
        this.forsingle.biddersProvince = _text.substring(0, _text.length - 1);
      }
    },
    // 监听保证金缴纳
    bondTypeNChange(data) {
      var _text = "";
      data.forEach((item, index) => {
        _text += item + ",";
      });
      this.forsingle.bondType = _text.substring(0, _text.length - 1);
    },
    // 监听开盘价格是否设置
    startPriceFlagNChange(data) {
      if (data) {
        this.forsingle.startPrice = "";
        this.forsingle.startPriceFlag = 1;
        this.$refs["form5"].clearValidate("startPrice");
      } else {
        this.forsingle.startPriceFlag = 2;
      }
    },
    // 监听开盘间隔是否输入
    startPriceChange(data) {
      if (data.length > 0) {
        this.forsingle.startPriceFlagN = false;
        this.forsingle.startPriceFlag = 2;
      }
      if (data.indexOf(" ") > 0) {
        this.forsingle.startPrice = "";
      }
    },
    // 监听修改清运期限
    deliveryTimeNChange(data) {
      var _time = this.Timetransf(data);
      this.forsingle.deliveryTimeN = _time.y + "-" + _time.m + "-" + _time.d;
      this.forsingle.deliveryTime = _time.y + "-" + _time.m + "-" + _time.d;
    },
  },
};
</script>

<style>
.textfrom2 .el-form-item__label {
  width: 130px !important;
}
.textfrom2 .custom .el-form-item,
.textfrom2 .custom2 .el-form-item {
  margin-left: -130px !important;
}
.textfrom3 .el-form-item__label {
  width: 140px !important;
}
.textfrom3 .custom .el-form-item,
.textfrom3 .custom2 .el-form-item {
  margin-left: -140px !important;
}
.textfrom3 .custom2 .addrs .el-input__inner {
  width: 450px !important;
  margin-left: 140px;
}
.textfrom3 .custom2 .addrs .el-form-item__error {
  left: 140px;
}
.textfrom4 .custom .el-form-item,
.textfrom4 .custom2 .el-form-item {
  margin-left: -105px !important;
}
.textfrom2 .special .el-input__inner {
  width: 500px;
}
</style>
<style scoped>
#biddingAdd .customIconRed {
  color: red;
}
#biddingAdd .subtitle {
  font-size: 12px;
  font-weight: 100;
  padding-left: 15px;
  color: #787878;
}
#biddingAdd .comDe {
  color: red;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
}
#biddingAdd .elinputM {
  display: inline-block;
  width: 100px;
  margin-right: 5px;
}
/* 订单详情--开始 */
#biddingAdd .el-detail-item {
  line-height: 25px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 25px;
  margin: 12px 0;
}
#biddingAdd .el-detail-item label {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}
#biddingAdd .el-detail-item .tCon {
  margin-left: 104px;
  word-break: break-all;
  word-wrap: break-word;
}
#biddingAdd .el-detail-item label span {
  width: 84px;
  text-align: justify;
  text-align-last: justify;
  display: inline-block;
}
#biddingAdd .el-detail-2 {
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #cfcfcf;
}
/* 订单详情--结束 */
#biddingAdd .demo-ruleForm {
  margin: 0 25px;
  padding-bottom: 5px;
}
#biddingAdd .table {
  margin: 0 25px 15px 25px;
  padding-bottom: 30px;
  max-width: 100%;
}
#biddingAdd .table .el-row {
  margin-top: 20px;
}
#biddingAdd .table .el-row .el-col {
  color: #2db7f5;
  cursor: pointer;
  position: relative;
  padding: 15px;
  font-size: 14px;
}
#biddingAdd .elCol i {
  display: none;
}
#biddingAdd .elCol:hover {
  background-color: rgba(45, 183, 245, 0.05) !important;
}
#biddingAdd .elCol:hover i {
  display: inline-block;
  position: absolute;
  top: -5px;
  right: -5px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border: 1px solid #e51d27;
  color: #e51d27;
  font-size: 20px;
}
#biddingAdd .jmr .el-select {
  width: 80%;
}
</style>

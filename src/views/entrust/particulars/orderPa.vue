<template>
  <div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">委托订单号：{{xiangqing.entrustInforNum}}</div>
        <div class="theTitle el-pull-left" style="float: right">
          <div class="title_right">
            <div class="title_right_text">{{xiangqing.status}}</div>
          </div>
        </div>
      </div>
      <!-- 详情 -->
      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托企业</span>：</label>
          <div class="tCon">{{ xiangqing.enterName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托项目部</span>：</label>
          <div class="tCon">{{ xiangqing.projectName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托人</span>：</label>
          <div class="tCon">
            {{ xiangqing.entrustUserName }} {{ xiangqing.entrustUserPhone }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>看货对接人</span>：</label>
          <div class="tCon">
            {{ xiangqing.lookGoodUser }} {{ xiangqing.lookGoodUserPhone }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>看货地址</span>：</label>
          <div class="tCon">{{ xiangqing.lookGoodAddress }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>创建时间</span>：</label>
          <div class="tCon">
            {{ xiangqing.createTime }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>创建人</span>：</label>
          <div class="tCon">
            {{ xiangqing.userName }}{{ xiangqing.userPhone }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>清运期限</span>：</label>
          <div class="tCon">{{ xiangqing.clearDate }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>处置期限</span>：</label>
          <div class="tCon">{{ xiangqing.dealDate }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>完成时间</span>：</label>
          <div class="tCon">{{ xiangqing.finishDate }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>建议保留总价</span>：</label>
          <div class="tCon">{{ dijia }}元</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>累计处置金额</span>：</label>
          <div class="tCon">{{ xiangqing.amountTotal }}元</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托协议</span>：</label>
          <div class="tCon">{{ xiangqing.entrustAgreementNum }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托工单</span>：</label>
          <div class="tCon">{{ xiangqing.entrustInforNum }}</div>
        </div>
      </div>
    </div>
    <div class="bgBorderTwo">
      <el-menu
        :default-active="handleSelects"
        text-color="#000"
        class="el-menu-demo el-menu-color"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="0">标的清单</el-menu-item>
        <el-menu-item index="10">竞价单</el-menu-item>
        <el-menu-item index="20">交易订单</el-menu-item>
        <el-menu-item index="30">订单日志</el-menu-item>
        <el-button
          class="el-pull-right Button-1 el-blueColor"
          size="medium"
          @click="needAdd()"
          >导出标的清单</el-button
        >
      </el-menu>
      <tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
        :condition="condition"
        @operationsss="operationsss"
        @states="states"
        v-if="xiangqings == '0'"
        @fujian="fujian"
      ></tables>
      <tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
        :condition="condition"
        @operationsss="operationsss"
        @states="states"
        v-else-if="xiangqings == '10'"
      ></tables>
      <tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
        :condition="condition"
        @operationsss="operationsss"
        @states="states"
        v-else-if="xiangqings == '20'"
      ></tables>
      <tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
        :condition="condition"
        @operationsss="operationsss"
        @states="states"
        v-else-if="xiangqings == '30'"
      ></tables>
      <div class="paging">
        <el-pagination
          :background="false"
          :page-size="size"
          :pager-count="9"
          :current-page="page"
          layout="total, prev, pager, next,sizes,jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <div class="bgBorderThree">
      <div class="el-b">
        <el-button class="el-noColor" @click="fanhui">返回</el-button>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <img :src="src2" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
import Tables from "../../table/table.vue";
export default {
  name: "orderPa",
  data() {
    return {
      dialogVisible:false,
      xiangqing: "",
      MHeight: "auto",
      isoperation: false,
      Dataorigin: [],
      condition: false,
      operationW: "180",

      header: [],
      id: "",
      xiangqings: "0",
      dijia: "",
      total: 0,
      size: 10,
      page: 1,
      handleSelects: "0",
      ioperationList: "",
      src2:""
    };
  },
  components: {
    Tables
  },

  mounted() {
    this.id = this.$route.query.id;
    console.log(this.$route.query.id);
    this.huoqulist();
  },
  methods: {
    operationsss(e) {
      console.log(e);
    },
    huoqulist() {
      var url =
        this.apis + "/system/jp-entrust-order/searchEntrustOrder/" + this.id;
      var obj = {};
      // return;
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);
           if (response.data.status == "0") {
              response.data.status = "全部";
            } else if (response.data.status == "10") {
              response.data.status = "待处置";
            } else if (response.data.status == "20") {
              response.data.status = "处置中";
            } else if (response.data.status == "30") {
              response.data.status = "已完成";
            } else if (response.data.status == "40") {
              response.data.status = "已中止";
            }

          this.xiangqing = response.data;
          this.listing();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    listing() {
      // console.log('123')
      if (this.xiangqings == "0") {
        this.header = [
          { name: "标的类别", prop: "typeName" },
          { name: "标的编码", prop: "code" },
          { name: "标的名称", prop: "name" },
          { name: "规格", prop: "standards" },
          { name: "品牌", prop: "brand" },
          { name: "标的描述", prop: "represent" },
          { name: "计量单位", prop: "unit" },
          { name: "累计委托数量", prop: "entrustNum" },
          { name: "处置中数量", prop: "disposalUnderQuantity" },
          { name: "剩余未处置", prop: "remainingUnsold" },
          { name: "成交底价", prop: "reservePrice" },
          { name: "质量状况", prop: "qualityStatus" },
          { name: "附件", prop: "urls" }
        ];
        this.listing1();
      } else if (this.xiangqings == "10") {
        this.header = [
          { name: "竞价编号", prop: "code" },
          { name: "公告名称", prop: "title" },
          { name: "报名数", prop: "signNum" },
          { name: "状态", prop: "status" },
          { name: "竞价方式", prop: "bidWay" },
          { name: "处置方式", prop: "pricingMethod" },
          { name: "发布时间", prop: "createTime" },
          { name: "报名截止", prop: "signEndTime" },
          { name: "竞价开始", prop: "offerStartTime" },
          { name: "竞价结束", prop: "offerEndTime" },
          { name: "开标时间", prop: "commitTime" },
          { name: "创建人", prop: "userName" },
          { name: "出价次数", prop: "offerTimes" },
          { name: "出价人数", prop: "offerUserNum" }
        ];
        this.listing2();
      } else if (this.xiangqings == "20") {
        this.header = [
          { name: "订单编号", prop: "code" },
          { name: "竞价单编号", prop: "sceneCode" },
          { name: "买受人", prop: "buyerCompanyName" },
          { name: "买方联系人", prop: "contacts" },
          { name: "订单金额", prop: "amt" },
          { name: "状态", prop: "status" },
          { name: "下单人", prop: "offerContacts" },
          { name: "创建时间", prop: "createTime" },
          { name: "提货期限", prop: "takeDeeliveryDate" }
        ];
        this.listing3();
      } else if (this.xiangqings == "30") {
        this.header = [
          { name: "操作人", prop: "userName" },
          { name: "操作时间", prop: "createTime" },
          { name: "事件说明", prop: "remark" }
        ];
        this.listing4();
      }
    },
    handleSelect(e) {
      this.xiangqings = e;
      this.listing();
    },
    listing1() {
       this.Dataorigin=[]
      var url =
        this.apis +
        "/system/jp-entrust-order/searchEntrustSubjectList/" +
        this.page +
        "/" +
        this.size;
      var obj = {
        entrustOrderId: this.id
      };
      // return;
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          var a = 0;
          for (var i = 0; i < response.data.records.length; i++) {
            a += response.data.records[i].reservePrice;
          var ssa = response.data.records[i].attachmentUrl.split('/')
          response.data.records[i]['urls'] = ssa[ssa.length-1]
          }
          this.Dataorigin = response.data.records;
          this.dijia = a;
          this.total = response.data.total;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    listing2() {
      this.Dataorigin=[]
      var url =
        this.apis +
        "/system/jp-entrust-order/searchSceneList/" +
        this.xiangqing.uuids +
        "/" +
        this.page +
        "/" +
        this.size;
      var obj = {};
      // return;
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);

          for (var i = 0; i < response.data.records.length; i++) {
            response.data.records[i].userName =
              response.data.records[i].userName +
              " " +
              response.data.records[i].userPhone;
              if(response.data.records[i].bidWay == '1'){
                response.data.records[i].bidWay = '公开询价'
              }else if(response.data.records[i].bidWay == '2'){
                 response.data.records[i].bidWay = '邀请询价'
              }
              if(response.data.records[i].pricingMethod == '1'){
                response.data.records[i].pricingMethod = '按批次计价'
              }else if(response.data.records[i].pricingMethod == '2'){
                 response.data.records[i].pricingMethod = '按重量计价'
              }
          }
          console.log(response.data.records);
          this.Dataorigin = response.data.records;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    listing3() {
      this.Dataorigin=[]
      var url =
        this.apis +
        "/system/jp-entrust-order/searchOrderList/" +
        this.xiangqing.uuids +
        "/" +
        this.page +
        "/" +
        this.size;
      var obj = {};
      // return;
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);
          for (var i = 0; i < response.data.records.length; i++) {
            response.data.records[i].contacts =
              response.data.records[i].contacts +
              " " +
              response.data.records[i].contactsTel;
            response.data.records[i].fferContacts =
              response.data.records[i].fferContacts +
              " " +
              response.data.records[i].offerContactsTel;
             
          }
          
          this.Dataorigin = response.data.records;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    listing4() {
      this.Dataorigin=[]
      var url =
        this.apis +
        "/system/jp-entrust-order/searchOrderLog/" +
        this.id +
        "/" +
        this.page +
        "/" +
        this.size;
      var obj = {};
      // return;
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);
          this.Dataorigin = response.data.records;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    states(e) {
      console.log(e);
    },
    needAdd() {
      this.exports.exports(
        this.apis + "/system/jp-entrust-order/expExcelEntrustSubject/" + this.id
      );
    },
    handleCurrentChange(e) {
      this.page = e;
      this.listing();
    },
    handleSizeChange(e) {
      this.size = e;
      this.listing();
    },
    fanhui() {
      this.$router.go(-1);
    },
    fujian(e){ 
      console.log(e.attachmentUrl )
      this.src2 = this.tuurl + e.attachmentUrl
      this.dialogVisible = true
    }
  }
};
</script>

<style scoped>
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
.title_right {
  width: 74px;
  height: 32px;
  background: #2db7f5;
  border-radius: 4px;
}
.title_right_text {
  width: 100%;
  height: 19px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #ffffff;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
</style>

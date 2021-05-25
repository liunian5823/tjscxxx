<template>
  <div >
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">{{ singlist.name }}</div>
      </div>
      <!-- 详情 -->

      <div class="el-detail el-detail-1" :span="12">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>规格</span>：</label>
          <div class="tCon">{{ singlist.standards }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>计量单位</span>：</label>
          <div class="tCon">{{ singlist.unit }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>标的类型</span>：</label>
          <div class="tCon">{{ singlist.typeName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>入库时间</span>：</label>
          <div class="tCon">{{ singlist.createTime }}</div>
        </div>
      </div>
      <div style="width: 50%">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="orderNum"
            label="委托订单数"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="saleNum" label="累计委托数量" width="180">
          </el-table-column>
          <el-table-column prop="disposalQuantity" label="累计处置数量">
          </el-table-column>
          <el-table-column prop="disposalUnderQuantity" label="处置中数量">
          </el-table-column>
          <el-table-column prop="remainingUnsold" label="剩余未处置">
          </el-table-column>
        </el-table>
      </div>

      <div class="el-detail el-detail-2"></div>
    </div>

    <div class="bgBorderTwo sada">
      <div class="Cord-header el-clearfix">
        <span>委托企业名单</span>

        <div class="el-pull-right el-blueColor sadad">
          <el-input
            v-model="input"
            class="sadad_l"
            placeholder="委托企业名称/营业执照号"
          ></el-input>
          <el-button type="primary" class="sadad_r" @click="huoqulist"
            >搜索</el-button
          >
        </div>
      </div>
      <Tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
        @operationsss="operationsss"
      >
      </Tables>
      <div class="paging">
        <el-pagination
          :background="false"
          :page-size="size"
          :pager-count="9"
          :current-page="page"
          layout="total, prev, pager, next,sizes,jumper"
          :total="total"
          @size-change="tablePageSize"
          @current-change="tableCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <div class="bgBorderThree">
      <div class="el-b">
        <el-button class="el-blueColor" @click="guanbi">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Tables from "../../table/table.vue";
export default {
  name: "signDetail",
  data() {
    return {
      tableData: [],
      singlist: "",
      MHeight: "auto",
      // 右侧操作宽度
      operationW: "180",
      // 表格操作数组
      ioperationList: {1:[{ name: "查看详情" }]},
      // 操作块儿是否显示
      isoperation: true,
      // 数据数组
      Dataorigin: [],
      // 表头数组
      header: [
        { name: "委托企业", prop: "enterpriseName" },
        { name: "委托项目部数量", prop: "projectNum" },
        { name: "委托订单数", prop: "orderNum" },
        { name: "累计委托数量", prop: "saleNum" },
        { name: "累计处置数量", prop: "disposalQuantity" },
        { name: "处置中数量", prop: "disposalUnderQuantity" },
        { name: "剩余未处置", prop: "remainingUnsold" }
      ],
      input: "",
      page: 1,
      size: 10,
      total: 0
    };
  },
  components: {
    Tables
  },
  mounted() {
    console.log(this.$store.state.singlist.entrustSubjectId)
    // var a = [];
    var b = {};
    b["orderNum"] = this.$store.state.singlist.orderNum;
    b["saleNum"] = this.$store.state.singlist.saleNum;
    b[
      "disposalQuantity"
    ] = this.$store.state.singlist.disposalQuantity;
    b["disposalUnderQuantity"] = this.$store.state.singlist.disposalUnderQuantity;
    b["remainingUnsold"] = this.$store.state.singlist.remainingUnsold;
    // a.push(b)
    // console.log(a)
    this.tableData.push(b);
    this.singlist = this.$store.state.singlist;
    this.huoqulist();
  },
  methods: {
    download1() {},
    // 列表1回调
    tableFuncCellback1(data) {
      //console.log(data);
    },

    // 备注失去焦点事件
    elTextarea() {
      // //console.log('少时诵诗书')
      //console.log(this.note);
    },
    huoqulist() {
      // /system/jp-entrust-subject/searchEnterpriseList/{page}/{size}
      var url =
        this.apis +
        "/system/jp-entrust-subject-order/search/" +
        this.page +
        "/" +
        this.size;
      var obj = {
        entrustSubjectId:this.$store.state.singlist.entrustSubjectId,
       orderNum:"2"
      };
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);
          if (response.code == "200") {
            for (let i = 0; i <  response.data.records.length; i++) {
               response.data.records[i].status = '1'
            }
            this.Dataorigin = response.data.records;
            this.total = response.data.total;
          }
        })
        .catch(err => {
          //console.log(err);
        });
    },
    operationsss(e) {
      e["eid"] = this.$store.state.singlist.id;
      console.log(e);
      this.$store.commit("singlists", e);
      this.$router.push({ name: "signDetails" });
    },
    tableCurrentChange(e) {
      this.page = e;
      this.huoqulist();
    },
    tablePageSize(e) {
      this.size = e;
      this.huoqulist();
    },
    guanbi() {
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
  margin-left: 104px;
  word-break: break-all;
  word-wrap: break-word;
}
.el-detail-item label span {
  width: 84px;
  text-align: justify;
  text-align-last: justify;
  display: inline-block;
}
.el-detail-2 {
  margin-top: 30px;
  padding-top: 10px;
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
.el-b .el-button {
  width: 65px;
  padding: 0;
  padding-left: 5px;
  letter-spacing: 5px;
}
/* 
.el-textarea__inner {
  border: 0;
  padding: 2px 0;
  height: 100px;
  min-height: 100px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
} */
.sadad {
  width: 25%;
}
.sadad_l {
  float: left;
  width: 75%;
}
.sada .sadad_r {
  float: right;
  width: 25%;
    min-width: 10px !important;
}
</style>

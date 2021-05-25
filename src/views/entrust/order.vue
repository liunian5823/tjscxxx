<template>
  <div>
    <tankuang
      :xianshi="xianhsi"
      @queding="queding"
      @quxiao="quxiao"
      :shuju="shuju"
    ></tankuang>
    <div class="bgBorderTwo" style="padding: 0px">
      <searchui
        :searchFormArr="searchFormArr"
        @searchParma="searchParma"
        :isAccording="isAccording"
      ></searchui>
    </div>
    <div class="bgBorderTwo">
      <el-menu
        :default-active="handleSelects"
        text-color="#000"
        class="el-menu-demo el-menu-color"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="0">全部</el-menu-item>
        <el-menu-item index="10">待处置</el-menu-item>
        <el-menu-item index="20">处置中</el-menu-item>
        <el-menu-item index="30">已完成</el-menu-item>
        <el-menu-item index="40">已中止</el-menu-item>
        <!-- <el-button class="el-pull-right Button-1 el-blueColor" size="medium" @click="needAdd()">添加委托需求</el-button> -->
      </el-menu>
      <tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
        :condition="conditions"
        @operationsss="operationsss"
        @paixu="paixus"
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
      <!-- <div class="fenye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>

<script>
import Tables from "../table/table.vue";
import tankuang from "./particulars/ordertk.vue";
export default {
  name: "orders",
  data() {
    return {
      searchFormArr: [
        {
          fieldName: "委托订单编号",
          type: "input",
          field: "enterprise1",
          placeholder: "",
        },

        {
          fieldName: "委托企业",
          type: "input",
          field: "enterprise3",
          placeholder: "名称/统一社会代码",
        },
        {
          fieldName: "委托项目部",
          type: "select",
          field: "state",
          option: [],
          placeholder: "请选择",
        },
        {
          fieldName: "创建人/电话",
          type: "input",
          field: "phones",
          placeholder: "",
        },
        {
          fieldName: "处置状态",
          type: "select",
          field: "state1",
          option: [
            { id: "0", text: "全部" },
            { id: "10", text: "待处置" },
            { id: "20", text: "处置中" },
            { id: "30", text: "已完成" },
            { id: "40", text: "已中止" },
          ],
          placeholder: "请选择",
        },
        {
          fieldName: "创建时间",
          type: "date",
          field: "time2",
          placeholder: "",
        },
        {
          fieldName: "完成时间",
          type: "date",
          field: "time3",
          placeholder: "",
        },
      ],
      isAccording: true,
      MHeight: "auto",
      isoperation: true,
      Dataorigin: [],
      conditions: false,
      operationW: "180",
      ioperationList: {
        待处置: [
          {
            name: "查看详情",
          },
          {
            name: "发布竞价单",
          },
          {
            name: "结束订单",
          },
        ],
        处置中: [
          {
            name: "查看详情",
          },
          {
            name: "发布竞价单",
          },
          {
            name: "结束订单",
          },
        ],
        已完成: [
          {
            name: "查看详情",
          },
        ],
        已中止: [
          {
            name: "查看详情",
          },
        ],
      },

      header: [
        {
          name: "委托订单编号",
          prop: "workOrderNum",
        },
        {
          name: "委托项目部",
          prop: "projectName",
        },
        {
          name: "订单状态",
          prop: "status",
        },
        {
          name: "创建人",
          prop: "realName",
        },
        {
          name: "创建时间",
          prop: "createTime",
        },
        {
          name: "清运期限",
          prop: "clearDate",
        },
        {
          name: "处置期限",
          prop: "dealDate",
        },
        {
          name: "完成时间",
          prop: "finishDate",
        },
        {
          name: "竞价场次",
          prop: "biddingTimes",
        },
        {
          name: "成交场次",
          prop: "transactionTimes",
        },
        {
          name: "成交底价",
          prop: "floorPrice",
        },
        {
          name: "累计处置金额",
          prop: "amountTotal",
        },
      ],
      val: {},
      total: 0,
      size: 10,
      page: 1,
      xianhsi: false,
      shuju: "",
      idsss: "",
      paixu: "",
      handleSelects: "0",
    };
  },
  components: {
    Tables,
    tankuang,
  },

  mounted() {
    if (this.$route.query.id) {
      this.val["state"] = this.$route.query.id;
    }
    if (this.$route.query.stataus) {
      this.handleSelect(this.$route.query.stataus);
    }else{
      this.huoqulist();
    }

    
    this.huoqulists();
  },
  methods: {
    huoqulist() {
      // /system/jp-entrust-order/search/{page}/{size}
      var url =
        this.apis +
        "/system/jp-entrust-order/search/" +
        this.page +
        "/" +
        this.size;
      console.log(this.val)
      var obj = {
        workOrderNum: this.val.enterprise1,
        enterName: this.val.enterprise3,
        entrustProject: this.val.state,
        userName: this.val.phones,
        status: this.val.state1,
        orderBy: this.paixu.prop,
        descType: this.paixu.order,
      };
      if (this.val.time2) {
        obj["createTime"] = this.val.time2[0];
        obj["updateTime"] = this.val.time2[1];
      }
      if (this.val.time3) {
        obj["finishDateStart"] = this.val.time3[0];
        obj["finishDateEnd"] = this.val.time3[1];
      }

      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          console.log(response.data.records);
          for (var i = 0; i < response.data.records.length; i++) {
            if (response.data.records[i].status == "0") {
              response.data.records[i].status = "全部";
            } else if (response.data.records[i].status == "10") {
              response.data.records[i].status = "待处置";
            } else if (response.data.records[i].status == "20") {
              response.data.records[i].status = "处置中";
            } else if (response.data.records[i].status == "30") {
              response.data.records[i].status = "已完成";
            } else if (response.data.records[i].status == "40") {
              response.data.records[i].status = "已中止";
            }

            this.Dataorigin = response.data.records[i].realName =
              response.data.records[i].realName +
              " " +
              response.data.records[i].userPhone;
              if (response.data.records[i].projectName.length >= "50") {
              response.data.records[i].projectName =
                response.data.records[i].projectName.slice(0, 20) +
                "..." +
                response.data.records[i].projectName.slice(
                  response.data.records[i].projectName.length - 28,
                  -1
                );
            }
          }
          // projectName 委托项目部
          this.Dataorigin = response.data.records;
          this.total = response.data.total;
          this.size = response.data.size;
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
              _this.searchFormArr[2].option.push({
                id: item.ecOrganizationId,
                text: item.projectName,
              });
            });
          }

          //console.log(_this.searchFormArr)
        })
        .catch((err) => {});
    },
    searchParma(val) {
      console.log(val);

      this.val = val;
      this.huoqulist();
    },
    operationsss(e, index) {
      //console.log(e,index)
      if (index == "结束订单") {
        this.idsss = e;

        if (e.isStatus == "0") {
          this.deletes(e);
        } else {
          this.$message({
            showClose: true,
            offset: 400,
            message: "不可结束订单",
            type: "error",
          });
        }
      } else if (index == "发布竞价单") {
        // console.log(e.entrustInforNum)=
        console.log(e.workOrderNum);
        if (e.isStatus == "0") {
          this.$router.push({
            name: "biddingAdd",
            query: {
              id: e.workOrderNum,
            },
          });
        } else {
          this.$message({
            showClose: true,
            offset: 400,
            message: "无权限发布竞价单",
            type: "error",
          });
        }
      } else if (index == "查看详情") {
        this.details(e);
      }
      // /system/jp-entrust-order/isOverOrder
    },
    deletes(e) {
      var url = this.apis + "/system/jp-entrust-order/isOverOrder/" + e.uuids;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          console.log(response.data);
          if (response.data.status == true) {
            this.xianhsi = true;
            this.shuju = response.data.status;
          } else {
            this.$message({
              showClose: true,
              offset: 400,
              message: response.data.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    queding(e, src) {
      // console.log(this.id)
      // return
      if (e == "1") {
        this.xianhsi = false;
        var url = this.apis + "/system/jp-entrust-order/overOrder";
        var obj = {
          id: this.idsss.id,
          status: "30",
        };
        this.httpsapi
          .POST(url, obj)
          .then((response) => {
            this.huoqulist();
            this.$message({
              showClose: true,
              offset: 400,
              message: response.data.msg,
              type: "success",
            });
          })
          .catch((err) => {
            //console.log(err);
          });
      } else {
        var srcs = "";
        var name = "";
        var frf = src;
        for (var i = 0; i < frf.length; i++) {
          if (frf.indexOf(frf[i]) != i) {
            frf.splice(i, 1); //删除数组元素后数组长度减1后面的元素前移
            i--; //数组下标回退
          }
        }
        for (let i = 0; i < frf.length; i++) {
          if (srcs == "") {
            srcs = this.tuurl + frf[i].url;
            name = this.tuurl + frf[i].name;
          } else {
            srcs = srcs + ";" + this.tuurl + frf[i].url;
            name = name + ";" + this.tuurl + frf[i].name;
          }
        }

        this.xianhsi = false;
        var url = this.apis + "/system/jp-entrust-order/overOrder";
        var obj = {
          id: this.idsss.id,
          remark: e,
          status: "40",
          filePath: srcs,
          fileName: name,
        };
        this.httpsapi
          .POST(url, obj)
          .then((response) => {
            this.huoqulist();
            this.$message({
              showClose: true,
              offset: 400,
              message: response.data.msg,
              type: "success",
            });
          })
          .catch((err) => {
            //console.log(err);
          });
      }
    },
    quxiao() {
      this.xianhsi = false;
    },
    handleSelect(e) {
      this.status = e;
      if (this.val == "") {
        this.val["state1"] = e;
      } else {
        this.val.state1 = e;
      }
      this.huoqulist();
    },
    handleCurrentChange(e) {
      this.page = e;
      this.huoqulist();
    },
    handleSizeChange(e) {
      this.size = e;
      this.huoqulist();
    },
    details(e) {
      // console.log(e);
      this.$router.push({
        name: "orderPa",
        query: { id: e.id },
      });
    },
    paixus(e) {
      // console.log();
      this.paixu = e;
      if (e.order != null) {
        this.paixu.order = e.order.substring(0, e.order.length - 6);
      }

      this.huoqulist();
    },
  },
};
</script>

<style>
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
</style>

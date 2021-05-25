<template>
  <div>
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
        <el-menu-item index="1">待签章</el-menu-item>
        <el-menu-item index="2">待生效</el-menu-item>
        <el-menu-item index="3">已生效</el-menu-item>
        <el-menu-item index="4">作废</el-menu-item>
        <!-- <el-button
          class="el-pull-right Button-1 el-blueColor"
          size="medium"
          @click="needAdd()"
          >创建委托协议</el-button
        > -->
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
          @size-change="tablePageSize"
          @current-change="tableCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Tables from "../table/table.vue";
import protocolxqVue from "./particulars/protocolxq.vue";
export default {
  name: "protocols",
  data() {
    return {
      searchFormArr: [
        {
          fieldName: "委托企业",
          type: "input",
          field: "enterprise",
          placeholder: ""
        },
        {
          fieldName: "协议编号",
          type: "input",
          field: "enterprise1",
          placeholder: ""
        },
        {
          fieldName: "委托工单号",
          type: "input",
          field: "enterprise2",
          placeholder: "名称/统一社会代码"
        },
        {
          fieldName: "委托项目部",
          type: "select",
          field: "state",
          option: [],
          placeholder: "请选择"
        },
        {
          fieldName: "创建人/电话",
          type: "input",
          field: "phone",
          placeholder: ""
        },
        {
          fieldName: "状态",
          type: "select",
          field: "state1",
          option: [
            { id: "0", text: "全部" },
            { id: "1", text: "待签章" },
            { id: "2", text: "待生效" },
            { id: "3", text: "已生效" },
            { id: "4", text: "作废" }
          ],
          placeholder: "请选择"
        },
        {
          fieldName: "创建时间",
          type: "date",
          field: "time2",
          placeholder: ""
        },
        {
          fieldName: "生效时间",
          type: "date",
          field: "time3",
          placeholder: ""
        }
      ],
      isAccording: true,
      MHeight: "auto",
      isoperation: true,
      Dataorigin: [],
      condition: false,
      operationW: "180",
      ioperationList: {
        待签章: [
          {
            name: "查看"
          }
        ],
        待生效: [
          {
            name: "查看"
          }
        ],
        已生效: [
          {
            name: "查看"
          }
        ],
        作废: [
          {
            name: "查看"
          }
        ]
      },
      header: [
        {
          name: "协议编号",
          prop: "agreementNum"
        },
        {
          name: "委托工单号",
          prop: "entrustNumber"
        },
        {
          name: "委托项目部",
          prop: "projectName"
        },
        {
          name: "委托企业",
          prop: "enterName"
        },
        {
          name: "状态",
          prop: "status"
        },
        {
          name: "创建时间",
          prop: "createTime"
        },
        {
          name: "创建人",
          prop: "realName"
        },
        {
          name: "生效时间",
          prop: "effectiveDate"
        }
      ],
      page: 1,
      size: 10,
      total: 0,
      shuju: [],
      handleSelects: "0"
    };
  },
  components: {
    Tables
  },
  mounted() {
    this.huoqulist();
  },
  methods: {
    huoqulist() {
      // /entrust/jp-entrust-agreement/queryAgreementByList/{page}/{size}
      var url =
        this.apis +
        "/entrust/jp-entrust-agreement/queryAgreementByList/" +
        this.page +
        "/" +
        this.size;
      var obj = {};
      // return;
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          for (var i = 0; i < response.data.records.length; i++) {
            response.data.records[i].realName =
              response.data.records[i].realName +
              " " +
              response.data.records[i].phone;
            if (response.data.records[i].status == "1") {
              response.data.records[i].status = "待签章";
            } else if (response.data.records[i].status == "2") {
              response.data.records[i].status = "待生效";
            } else if (response.data.records[i].status == "3") {
              response.data.records[i].status = "已生效";
            } else if (response.data.records[i].status == "4") {
              response.data.records[i].status = "作废";
            }
            if (response.data.records[i].projectName.length >= "50") {
              response.data.records[i].projectName =
                response.data.records[i].projectName.slice(0, 20) +
                "..." +
                response.data.records[i].projectName.slice(
                  response.data.records[i].projectName.length - 28,
                  -1
                );
            }
            if (response.data.records[i].enterName.length >= "20") {
              response.data.records[i].enterName =
                response.data.records[i].enterName.slice(0, 3) +
                "..." +
                response.data.records[i].enterName.slice(
                  response.data.records[i].enterName.length - 16,
                  -1
                );
            }
          }
          // projectName 委托项目部   enterName 委托企业
          this.Dataorigin = response.data.records;
          this.projectdepartment();
          this.total = response.data.total;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    //获取项目部
    projectdepartment() {
      // /system/jp-entrust/searchProjectList
      var url = this.apis + "/system/jp-entrust/searchProjectList";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);
          var a = [];
          for (var i = 0; i < response.data.length; i++) {
            var c = {};
            c["id"] = response.data[i].ecOrganizationId;
            c["text"] = response.data[i].projectName;
            a.push(c);
          }
          this.searchFormArr[3].option = a;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    searchParma(e) {
      console.log(e);
      this.shuju = e;
      var url =
        this.apis +
        "/entrust/jp-entrust-agreement/queryAgreementByList/" +
        this.page +
        "/" +
        this.size;
      console.log(e)
      var obj = {
        enterName: e.enterprise,
        entrustNumber: e.enterprise2,
        createUserName: e.phone,
        projectName: e.state,
        agreementNum: e.enterprise1,
        status: e.state1
      };
      if (e.time2) {
        obj["createTimeEnd"] = e.time2[1];
        obj["createTime"] = e.time2[0];
      }
      if (e.time3) {
        obj["effectiveDate"] = e.time3[0];
        obj["effectiveDateEnd"] = e.time3[1];
      }
      if (this.paixu) {
        obj["orderBy"] = this.paixu.prop;
        obj["descType"] = this.paixu.order;
      }
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          for (var i = 0; i < response.data.records.length; i++) {
            console.log(response.data.records[i].realName);
            response.data.records[i].realName =
              response.data.records[i].realName +
              " " +
              response.data.records[i].phone;
            if (response.data.records[i].status == "1") {
              response.data.records[i].status = "待签章";
            } else if (response.data.records[i].status == "2") {
              response.data.records[i].status = "待生效";
            } else if (response.data.records[i].status == "3") {
              response.data.records[i].status = "已生效";
            } else if (response.data.records[i].status == "4") {
              response.data.records[i].status = "作废";
            }
          }
          this.Dataorigin = response.data.records;
          this.projectdepartment();
          this.total = response.data.total;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    operationsss(index, e) {
      console.log(index.agreementNum);
      this.$router.push({
        name: "protocolxq",
        query: {
          id: index.id
        }
      });
    },
    tablePageSize(val) {
      this.size = val;
      this.huoqulist();
    },
    // 当前页改变时触发
    tableCurrentChange(val) {
      this.page = val;
      this.huoqulist();
    },
    handleSelect(e) {
      console.log(e);

      if (this.shuju.state1) {
        this.shuju.state1 = e;
      } else {
        this.shuju["state1"] = e;
      }
      this.searchParma(this.shuju);
    },
    paixus(e) {
      // console.log();
      this.paixu = e;
      if (e.order != null) {
        this.paixu.order = e.order.substring(0, e.order.length - 6);
      }

      this.searchParma(this.shuju);
    }
  }
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

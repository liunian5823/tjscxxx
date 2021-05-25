<template>
  <div>
    <searchui
      :searchFormArr="searchFormArr"
      @searchParma="searchParma"
      :isAccording="isAccording"
    ></searchui>
    <div class="bgBorderTwo">
      <el-row :gutter="10" class="table_title">
        <el-col :span="12"
          ><div style="line-height: 44px; font-size: 19px">子账号管理</div>
        </el-col>
        <el-col :span="12" style="text-align: right"
          ><el-button type="primary" @click="add">添加员工</el-button></el-col
        >
      </el-row>
      <!-- <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="jobNumber"
        label="员工编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="xmbsl"
        label="项目部">
      </el-table-column>
      <el-table-column
        prop="countyName"
        label="账号有效期">
      </el-table-column>
    </el-table> -->
      <tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="headers"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
        :condition="condition"
        @operationsss="operationsss"
        @states="states"
        @paixu="paixus"
      ></tables>
      <div class="fenye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Tables from "../table/table.vue";
export default {
  name: "zaccounts",
  data() {
    return {
      MHeight: "auto",
      searchFormArr: [
        {
          fieldName: "员工",
          type: "input",
          field: "name",
          placeholder: "请输入角色名称",
        },
        {
          fieldName: "创建时间",
          type: "date",
          field: "phone",
          placeholder: "姓名/手机号/邮箱",
        },
        {
          fieldName: "状态",
          type: "select",
          field: "state1",
          option: [
            { id: "1", text: "启用" },
            { id: "0", text: "禁用" },
          ],
        },
      ],
      isAccording: true,
      ioperationList: {
        1: [
          {
            name: "详情",
          },
          {
            name: "修改",
          },
          {
            name: "删除",
          },
        ],
        0: [
          {
            name: "详情",
          },
          {
            name: "修改",
          },
          {
            name: "删除",
          },
        ],
      },
      isoperation: true,
      Dataorigin: [],
      condition: true,
      operationW: "180",

      headers: [
        {
          name: "员工编号",
          prop: "jobNumber",
        },
        {
          name: "姓名",
          prop: "realName",
        },
        {
          name: "手机号",
          prop: "phone",
        },
        {
          name: "邮箱",
          prop: "email",
        },
        {
          name: "创建时间",
          prop: "createTime",
        },
        {
          name: "项目部",
          prop: "xmbsl",
        },
        {
          name: "账号有效期",
          prop: "countyName",
        },
      ],
      information: "",
      pages: 1,
      size: 10,
      total: 0,
      paixu: "",
      luyou: "",
    };
  },
  components: {
    Tables,
  },
  mounted() {
    this.huoquxinxi();
  },
  activated() {
    if (this.luyou == "zaccountadd") {
      this.huoquxinxi();
    }
  },
  watch: {
    $route(to, from) {
      this.luyou = from.name;
    },
  },
  methods: {
    searchParma(val) {
      ////console.log(val.phone);
      //调用搜索接口

      this.information = val;
      this.huoquxinxi();
    },
    huoquxinxi() {
      var than = this;

      var url =
        this.apis +
        "/system/jp-sys-user/search/" +
        this.pages +
        "/" +
        this.size;
      var obj = {
        phone: than.information.name,
        status: than.information.state1,
      };
      if (than.information.phone) {
        obj["createTime"] = than.information.phone[0];
        obj["updateTime"] = than.information.phone[1];
      }
      if (than.paixu) {
        obj["orderBy"] = this.paixu.prop;
        obj["descType"] = this.paixu.order;
      }
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          ////console.log(response.data.records);
          this.Dataorigin = response.data.records;
          this.pages = response.data.current;
          this.size = response.data.size;
          this.total = response.data.total;
        })
        .catch((err) => {
          ////console.log(err);
        });
    },
    operationsss(val, e) {
      ////console.log(val.id);
      var than = this;
      if (e == "删除") {
        this.deletes(val.id);
      } else if (e == "修改") {
        this.modification(val.id);
      } else if (e == "详情") {
        this.xiangqing(val.id);
      }
    },
    states(index, e) {
      console.log(e);
      //   ////console.log(this.Dataorigin[index].id);
      // return
      if (e == true) {
        var title = "确认关闭账号吗";
        var name = "开启账号后，该账号将恢复使用，是否确认开启";
      } else if (e == false) {
        var title = "确认打开账号吗";
        var name = "关闭账号后，该账号将无法登陆，是否确认关闭";
      }
      this.$confirm(name, title)
        .then((res) => {
          var statuss = "";
          if (e == false) {
            statuss = "0";
          } else if (e == true) {
            statuss = "1";
          }
          var url = this.apis + "/system/jp-sys-user/updateStatus";
          var obj = {
            id: this.Dataorigin[index].id,
            status: statuss,
          };
          this.httpsapi
            .PUT(url, obj)
            .then((response) => {
              ////console.log(response);
            })
            .catch((err) => {});
        })
        .catch(() => {
          this.huoquxinxi();
        });
    },
    add() {
      this.$router.push({ name: "zaccountadd" });
    },
    deletes(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          var url = this.apis + "/system/jp-sys-user/" + e;
          var obj = {};
          this.httpsapi
            .DELETE(url, obj)
            .then((response) => {
              if (response.code == "200") {
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "success",
                });
                this.huoquxinxi();
              } else {
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    modification(e) {
      ////console.log(e);
      this.$router.push({
        name: "zaccountadd",
        query: { id: e, xiugai: "1" },
      });
    },
    xiangqing(e) {
      this.$router.push({
        name: "xiangqings",
        query: { id: e },
      });
    },
    handleSizeChange(e) {
      //console.log(e)
      this.size = e;
      this.pages = "1";
      this.huoquxinxi();
    },
    handleCurrentChange(e) {
      //console.log(e)
      this.pages = e;
      this.huoquxinxi();
    },
    paixus(e) {
      this.paixu = e;
      if (e.order != null) {
        this.paixu.order = e.order.substring(0, e.order.length - 6);
      }

      this.huoquxinxi();
    },
  },
};
</script>

<style>
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
  text-align: right;
  padding: 10px;
}
</style>

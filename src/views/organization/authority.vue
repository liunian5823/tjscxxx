<template>
  <div>
    <searchui
      :searchFormArr="searchFormArr"
      @searchParma="searchParma"
      :isAccording="isAccording"
    ></searchui>
    <div class="bgBorderTwo" id="asda">
      <el-row :gutter="10" class="table_title">
        <el-col :span="12"
          ><div style="line-height: 44px; font-size: 19px">角色信息</div>
        </el-col>
        <el-col :span="12" style="text-align: right"
          ><el-button type="primary" @click="addClick">添加</el-button></el-col
        >
      </el-row>
      
      <Tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
        :condition="condition"
        @operationsss="operationsss"
        @paixu="paixus"
      >
      </Tables>
      <div class="fenye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div
        :style="{
          position: absolute,
          top: tops,
          left: lefts,
          display: display,
        }"
      >
        123
      </div>
  </div>
</template>

<script>
import Tables from "../table/table.vue";
export default {
  name: "authoritys",
  data() {
    return {
      MHeight: "auto",
      operationW: "180",
      searchFormArr: [
        {
          fieldName: "角色名称",
          type: "input",
          field: "name",
          placeholder: "请输入角色名称",
        },
        {
          fieldName: "员工",
          type: "input",
          field: "phone",
          placeholder: "姓名/手机号/邮箱",
        },
      ],
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
          {
            name: "复制",
          },
        ],
      },

      isoperation: true,
      isAccording: false,
      condition: false,
      Dataorigin: [],
      header: [
        {
          name: "序号",
          prop: "id",
        },
        {
          name: "角色",
          prop: "name",
        },
        {
          name: "权限",
          prop: "jurisdiction",
        },
        {
          name: "人数",
          prop: "userNum",
        },
      ],
      page: 1,
      size: 10,
      vals: "",
      total: 0,
      display: "none",
      tops: "50px",
      lefts: "600px",
      absolute: "absolute",
      paixu: "",
    };
  },
  components: {
    Tables,
  },
  mounted() {
    this.searchParma("1");
  },
  methods: {
    searchParma(val) {
      console.log(val);
      this.vals = val;
      var url =
        this.apis + "/system/jp-sys-role/search/" + this.page + "/" + this.size;
      var obj = {};
      console.log()
      if (val.phone) {
        obj["userName"] = val.phone;
      }
      if (val.name) {
        obj["name"] = val.name;
      }
      if (this.paixu) {
        obj["orderBy"] = this.paixu.prop;
        obj["descType"] = this.paixu.order;
      }
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          //console.log(response.data.records);
          this.total = response.data.total;
          this.Dataorigin = response.data.records;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    addClick() {
      this.$router.push({ name: "add" });
    },
    operationsss(val, e) {
      //console.log(val, e);
      if (e == "复制") {
        this.copy(val.id);
      } else if (e == "删除") {
        this.delete(val.id);
      } else if (e == "修改") {
        this.modification(val.id);
      } else if (e == "详情") {
        this.xiangqing(val.id);
      }
    },
    copy(e) {
      this.$confirm("是否确认复制该角色", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          var url = this.apis + "/system/jp-sys-role/" + e;
          var obj = {};
          this.httpsapi
            .POST(url, obj)
            .then((response) => {
              //console.log(response);
              this.$message({
                showClose: true,
                offset: 400,
                message: response.message,
                type: "success",
              });
              this.searchParma(this.vals);
            })
            .catch((err) => {
              //console.log(err);
            });
        })
        .catch(() => {});
    },
    delete(e) {
      this.$confirm("是否确认删除该角色", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          var url = this.apis + "/system/jp-sys-role/" + e;
          var obj = {};
          this.httpsapi
            .DELETE(url, obj)
            .then((response) => {
              //console.log(response);
              if (response.code == "200") {
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "success",
                });
                this.searchParma(this.vals);
              }else{
                  this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              //console.log(err);
            });
        })
        .catch(() => {});
    },
    modification(e) {
      this.$router.push({
        name: "add",
        query: { id: e },
      });
    },
    handleSizeChange(e) {
      //console.log(e);
      this.size = e;
      this.searchParma(this.vals);
    },
    handleCurrentChange(e) {
      //console.log(e);
      this.page = e;
      this.searchParma(this.vals);
    },
    xiangqing(e) {
      this.$router.push({
        name: "authorityadd",
        query: { id: e },
      });
    },
    paixus(e) {
      this.paixu = e;
      if (e.order != null) {
        this.paixu.order = e.order.substring(0, e.order.length - 6);
      }

      this.searchParma();
    },
    touchstart(e) {
      console.log(e);
      this.tops = e.screenX + "px";
      this.lefts = e.screenY + "px";
      this.display = "block";
    },
    // 当鼠标移动时触发
    // touchmove(e) {
    //   console.log("touchmove");
    // },
    // asd() {
    //   console.log();
    // },
    // xianshiss(e, index) {
    //   // console.log(e);
    //   console.log(index);
    //   this.tops = index.screenX + 'px',
    //   this.lefts = index.screenY + 'px',
    //   this.display = "block";
    // },
    // xianshiss1(){
    //   //  this.display = "none";
    // }
  },
};
</script>

<style scoped>
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
  text-align: center;
  padding: 10px;
}

#sda .el-table /deep/.cell {
  white-space: nowrap;
}
</style>

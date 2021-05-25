<template>
  <el-dialog
    title="成员管理"
    :visible.sync="dialogTableVisible"
    style="background: rgba(0, 0, 0, 0.04)"
    :before-close="handleClose"
  >
    <div>
      <el-row :gutter="20">
        <el-col :span="12" class="title">员工管理</el-col>
        <el-col :span="12" class="Yinput"
          ><div style="margin-top: 15px">
            <el-input
              placeholder="请输入内容"
              v-model="input3"
              class="input-with-select"
            >
              <template #append>
                <el-button icon="el-icon-search" @click="sousuo"></el-button>
              </template>
            </el-input></div
        ></el-col>
      </el-row>
      <ul class="infinite-list" style="overflow: auto; height: 250px">
        <li>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @select="asdsa"
            @select-all="sdad"
            empty-text=" "
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="员工编号" width="120" prop="jobNumber">
            </el-table-column>
            <el-table-column prop="realName" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="性别" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系方式"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="email"
              label="电子邮箱"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </li>
      </ul>
    </div>
    <div style="margin-top: 60px">
      <el-row :gutter="20">
        <el-col :span="12" class="title"
          >已选员工
          <span class="qingkong" @click="qingkongs">清空</span></el-col
        >
      </el-row>
      <ul class="infinite-list" style="overflow: auto; height: 250px">
        <li>
          <el-table
            :data="tableDatas"
            @selection-change="handleSelectionChanges"
            empty-text=" "
          >
            <el-table-column label="员工编号" prop="jobNumber">
            </el-table-column>
            <el-table-column prop="realName" label="姓名"> </el-table-column>
            <el-table-column prop="sex" label="性别"> </el-table-column>

            <el-table-column prop="email" label="电子邮箱"> </el-table-column>

            <el-table-column
              :prop="roleId"
              label="职务"
              align="center"
              #default="scope"
            >
              <el-select
                v-model="scope.row.roleId"
                @change="childByValue(scope.row)"
              >
                <el-option
                  v-for="(itemOption, index) in options"
                  :key="index"
                  :label="itemOption.name"
                  :value="itemOption.id"
                ></el-option>
              </el-select>
            </el-table-column>

            <!-- <el-table-column prop="email" label="电子邮箱"> </el-table-column> -->
            <el-table-column fixed="right" label="操作">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.isManage != '1  '"
                  @click="caozuo(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </li>
      </ul>
    </div>
    <div class="bgBorderThree">
      <div class="el-b">
        <el-button class="el-noColor" @click="handleClose">取消</el-button>
        <el-button class="el-blueColor" @click="baocun">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "employees",
  data() {
    return {
      tableData: [],
      dialogTableVisible: true,
      page: "1",
      size: "5",
      vals: "",
      input3: "",
      tableDatas: "",
      value: "",
      current: "",
      temporary: [],
      options: ""
    };
  },
  props: ["project"],
  mounted() {
    this.huoqurenyuan();
    this.huoqulist("1");
    this.huoqulists();
  },
  methods: {
    huoqulist(val) {
      //console.log(val);
      var than = this;
      this.vals = val;
      var url = this.apis + "/system/jp-entrust/selectUserList";
      var obj = {
        ecOrganizationId: this.project.id,
        projectPerson: this.input3
      };
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          //console.log(response);
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].sex == "1") {
              response.data[i].sex = "男";
            } else if (response.data[i].sex == "2") {
              response.data[i].sex = "女";
            } else {
              response.data[i].sex = "其他";
            }
          }
          this.tableData = response.data;
          var a = [];
          for (var o = 0; o < response.data.length; o++) {
            //console.log(response.data.records[o].isSelect);
            if (response.data[o].isSelect == "true") {
              a.push(response.data[o]);
            }
          }
          console.log(a);
          setTimeout(function() {
            a.forEach(rows => {
              than.$refs.multipleTable.toggleRowSelection(rows, true);
            });
          }, 100);
          this.current = response.data.current;
          this.total = response.data.total;
          this.size = response.data.size;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    sousuo() {
      this.huoqulist(this.vals);
    },
    handleClose() {
      this.$emit("close");
    },
    baocun() {
      console.log(this.tableDatas);
      var listStaff = [];

      for (var i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].roleId == null) {
          this.$message({
            showClose: true,
            offset: 400,
            message:
              "请选择员工编号为" + this.tableDatas[i].jobNumber + "的职务",
            type: "error"
          });
          return;
        } else {
          var lists = {};
          lists["ecOrganizationId"] = this.project.id;
          lists["entrustId"] = this.project.id;
          lists["projectNum"] = this.project.projectNum;
          lists["companyName"] = this.project.companyName;
          lists["userId"] = this.tableDatas[i].userId;
          lists["roleId"] = this.tableDatas[i].roleId;
          listStaff.push(lists);
        }
      }

      //console.log(listStaff)
      //return;
      var url = this.apis + "/system/jp-entrust-staff/saveEntrustList";
      var obj = {
        listStaff: listStaff
      };
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          // console.log(response.data);
          this.$message({
            showClose: true,
            offset: 400,
            message: response.message,
            type: "success"
          });
          this.$emit("close");
        })
        .catch(err => {
          //console.log(err);
        });
    },
    huoqulists() {
      var url = this.apis + "/system/jp-entrust/selectUserList";
      var obj = {
        entrustId: this.project.id
      };
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].sex == "1") {
              response.data[i].sex = "男";
            } else if (response.data[i].sex == "2") {
              response.data[i].sex = "女";
            } else {
              response.data[i].sex = "其他";
            }
          }
          this.tableDatas = response.data;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    huoqurenyuan() {
      var url = this.apis + "/system/jp-sys-role/queryRoleList";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response.data);
          this.options = response.data;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    childByValue(e) {
      console.log(e);
    },
    asdsa(selection, row) {
      if (row.isManage == "1") {
        this.$message({
          showClose: true,
          offset: 400,
          message: "管理员不可取消",
          type: "error"
        });
      } else {
        var a = [];
        this.tableDatas = [];
        var a = this.tableDatas;
        a.push(selection);
        this.tableDatas = a[0];
      }
    },
    caozuo(e) {
      var than = this;
      console.log(this.tableDatas[e].userId);

      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableDatas[e].userId == this.tableData[i].userId) {
          than.$refs.multipleTable.toggleRowSelection(this.tableData[i]);
        }
      }
      this.tableDatas.splice(e, 1);
      console.log(this.tableData);
      // than.$refs.multipleTable.toggleRowSelection(this.tableData[4]);
    },
    handleSizeChange(e) {
      console.log(e);
      this.size = e;
      var val = this.val;
      this.huoqulist(val);
    },
    handleCurrentChange(e) {
      console.log(e);
      this.page = e;
      var val = this.val;
      this.huoqulist(val);
    },
    qingkongs() {
      this.$refs.multipleTable.clearSelection();
      this.tableDatas = [];
    },
    sdad(selection) {
      console.log(selection);
      var a = [];
      this.tableDatas = [];
      var a = this.tableDatas;
      a.push(selection);
      this.tableDatas = a[0];
    }
  }
};
</script>

<style scoped>
.title {
  width: 150px;
  height: 24px;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #000000;
  line-height: 24px;
  letter-spacing: 1px;
}
.Yinput {
  float: right;
  margin-top: -21px;
  padding-bottom: 10px;
}
.qingkong {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #2db7f5;
  line-height: 19px;
  cursor: pointer;
}
</style>

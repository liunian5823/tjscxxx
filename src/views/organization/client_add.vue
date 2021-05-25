<template>
  <div>
    <div class="bgBorderThree">
      <div class="Cord-header el-clearfix">
        <span>添加委托方</span>
      </div>
      <el-row>
        <el-col :span="12">
          <div style="margin: 15px">
            <el-input
              :placeholder="placeholder"
              v-model="el_search"
              class="input-with-select"
            >
              <template #prepend>
                <el-select
                  v-model="el_select"
                  placeholder="按名称搜索"
                  @change="placeholders"
                >
                  <el-option label="按名称搜索" value="1"></el-option>
                  <el-option label="按编号搜索" value="2"></el-option>
                </el-select>
              </template>
              <template #append>
                <el-button icon="el-icon-search" @click="sousuo"></el-button>
              </template>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        empty-text=" "
        @row-click="xuanze"
      >
        <el-table-column fixed sortable prop="projectNum" label="项目编号">
        </el-table-column>
        <el-table-column sortable prop="companyName1" label="委托企业">
        </el-table-column>
        <el-table-column
          sortable
          prop="businessLicense"
          label="统一社会信用代码"
        >
        </el-table-column>
        <el-table-column sortable prop="projectName1" label="委托项目部">
        </el-table-column>
        <el-table-column sortable prop="contactName" label="联系人">
        </el-table-column>
        <el-table-column sortable prop="ifAdd" label="状态"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template #default="scope">
            <el-radio
              class="no_text"
              :disabled="scope.row.ifAdd == '已添加'"
              v-model="checked"
              :label="scope.$index"
              @change="agreeChange"
            ></el-radio>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="sizes"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="bgBorderThree">
      <div class="Cord-header">
        <span>项目信息</span>
      </div>
      <el-form ref="formss" :model="formss" label-width="140px" :rules="rules">
        <!-- 详情 -->
        <el-form-item label="组织类型:">
          <span v-if="form.type == '0'">部门</span>
          <span v-else>项目</span>
        </el-form-item>
        <el-form-item label="项目编号:">
          {{ form.projectNum }}
        </el-form-item>
        <el-form-item label="所属企业:">
          {{ form.companyName }}
        </el-form-item>
        <el-form-item label="统一社会信用代码:">
          {{ form.businessLicense }}
        </el-form-item>
        <el-form-item label="创建时间:">
          {{ form.createTime }}
        </el-form-item>
        <el-form-item label="项目联系人:">
          {{ form.contactName }}
        </el-form-item>
        <el-form-item label="项目地址:">
          {{ form.address }}
        </el-form-item>

        <el-form-item
          label="业务负责人:"
          required
          prop="value"
          style="position: relative; z-index: 10; width: 200px"
        >
          <el-select
            v-model="formss.value"
            filterable
            placeholder="请选择"
            style="width: 500px"
            @change="sadsa"
          >
            <el-option
              v-for="(item, index) in options"
              :key="item.value"
              :label="
                item.realName + ' ' + item.phone + ' 【ID：' + item.id + '】'
              "
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          required
          prop="values"
          style="position: relative; top: -62px; left: 297px"
        >
          <el-select
            v-model="formss.values"
            filterable
            placeholder="请选择"
            style="width: 500px"
            @change="sadsa"
          >
            <el-option
              v-for="(item, index) in optionss"
              :key="item.value"
              :label="item.name"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="remarks"
            maxlength="500"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item class="el-b">
          <el-button class="el-noColor" @click="fanhui">返回</el-button>
          <el-button class="el-blueColor" @click="tiannn('formss')"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "client_add",
  data() {
    return {
      checked: "", //列表单选
      form: "",
      tableData: [],
      page: 1,
      size: 10,
      sizes: [10, 20, 30, 40],
      total: 0,
      el_select: "1",
      placeholder: "请输入委托项目部",
      el_search: "",
      options: [],
      value: "",
      remarks: "",
      formss: {
        value: "",
        values: "",
      },
      rules: {
        value: [
          { required: true, message: "请选择业务负责人", trigger: "blur" },
        ],
        values: [{ required: true, message: "请选权限", trigger: "blur" }],
      },
      optionss: "",
    };
  },
  mounted() {
    this.searchParma();
    this.huoqurenyuan();
  },
  methods: {
    // 点击列表中按钮回调
    tableFuncCellback(data) {
      //console.log(data);
    },
    goTo(_url, _params) {
      //带参数跳转
      this.$router.push({ name: _url, params: _params });
    },
    //页面选项改变
    handleSizeChange(val) {
       this.checked = "";
      this.size = val;
      this.searchParma(null, 1);
    },
    //当前页改变
    handleCurrentChange(val) {
       this.checked = "";
      this.page = val;
      this.searchParma(null, 1);
    },
    //单选变更时触发
    agreeChange: function (val) {
      // console.log(val);
      this.form = this.tableData[val];
    },
    placeholders(e) {
      if (e == "1") {
        this.placeholder = "请输入委托项目部";
      } else if (e == "2") {
        this.placeholder = "请输入项目编号";
      }
    },
    searchParma(val, _change) {
      var url =
        this.apis +
        "/system/jp-entrust/searchOrganizationPageList/" +
        this.page +
        "/" +
        this.size;
      if (this.el_select == "1") {
        var obj = { projectName: this.el_search };
      } else {
        var obj = { projectNum: this.el_search };
      }

      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          for (var i = 0; i < response.data.records.length; i++) {
            response.data.records[i].contactName =
              response.data.records[i].contactName +
              " " +
              response.data.records[i].contactPhone;
            if (response.data.records[i].ifAdd == "false") {
              response.data.records[i].ifAdd = "未添加";
            } else if (response.data.records[i].ifAdd == "true") {
              response.data.records[i].ifAdd = "已添加";
            }
            if (response.data.records[i].projectName.length >= "50") {
              response.data.records[i]['projectName1'] =
                response.data.records[i].projectName.slice(0, 20) +
                "..." +
                response.data.records[i].projectName.slice(
                  response.data.records[i].projectName.length - 28,
                  -1
                );
            }else{
                response.data.records[i]['projectName1'] = response.data.records[i].projectName
            }
            if(response.data.records[i].companyName == null){
              response.data.records[i].companyName = ''
            }
            if (response.data.records[i].companyName.length >= "20") {
              response.data.records[i]['companyName1'] =
                response.data.records[i].companyName.slice(0, 3) +
                "..." +
                response.data.records[i].companyName.slice(
                  response.data.records[i].companyName.length - 16,
                  -1
                );
            }else{
              response.data.records[i]['companyName1'] = response.data.records[i].companyName
            }
            console.log(response.data.records[i])
          }
          this.tableData = response.data.records;

          this.page = response.data.current;
          this.total = response.data.total;
          this.huoqulist();
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    huoqurenyuan() {
      var url = this.apis + "/system/jp-sys-role/queryRoleList";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          this.optionss = response.data;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    huoqulist() {
      var url = this.apis + "/system/jp-entrust/getUserList/0";
      var obj = {};
      this.httpsapi
        .GET(url, obj)
        .then((response) => {
          //console.log(response.data);
          this.options = response.data;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    sadsa() {
      //console.log(this.options[this.formss.value]);
    },
    tiannn(formss) {
      //console.log(this.$refs[formss]);
      this.$refs[formss].validate((valid) => {
        if (valid) {
          if (this.form == "") {
            this.$message({
              showClose: true,
              offset: 400,
              message: "请先添加项目部，在保存",
              type: "error",
            });
          } else {
            var url = this.apis + "/system/jp-entrust";
            var obj = {
              projectName: this.form.projectName,
              ecOrganizationId: this.form.id,
              projectNum: this.form.projectNum,
              companyId: this.form.companyId,
              companyName: this.form.companyName,
              entrustId: this.form.contactId,
              entrustUser: this.form.contactName.split(" ")[0],
              entrustUserPhone: this.form.contactPhone,
              adminUserId: this.options[this.formss.value].id,
              userNumber: this.options[this.formss.value].jobNumber,
              projectPerson: this.options[this.formss.value].realName,
              projectPersonPhone: this.options[this.formss.value].phone,
              remarks: this.remarks,
              roleId: this.optionss[this.formss.values].id,
            };
            this.httpsapi
              .POST(url, obj)
              .then((response) => {
                //console.log(response.data);
                this.options = response.data;
                if(response.code == '200'){
                   this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "success",
                });
                this.$router.go(-1)
                }
               
              })
              .catch((err) => {
                //console.log(err);
              });
          }
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    xuanze(row, column, event) {
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == row.id && row.ifAdd == "未添加") {
          this.checked = i;
          this.form = this.tableData[i];
        }
      }
    },
    sousuo() {
      // //console.log(this.el_search)
      // //console.log(this.el_select)
      this.searchParma();
    },
    fanhui() {
      this.$router.go(-1);
    },
  },
};
</script>

<style space>
.no_text .el-radio__label {
  display: none;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
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
  text-align: right;
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
  font-size: 10px;
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
  text-align: center;
  padding: 10px;
}
/* table表样式 */
.el-table__empty-text {
  display: block;
  width: 150px;
  height: 100px;
  background: url("../../assets/img/zanwushuju.png") no-repeat;
  color: #909399;
  box-sizing: border-box;
  margin-top: 46px;
}
.el-select .el-input {
  width: 261px;
}
.el-select {
  width: 270px !important;
}
</style>

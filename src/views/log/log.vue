<template>
  <div>
    <div class="search">
      <searchui
        :searchFormArr="searchFormArr"
        @searchParma="searchParma"
      ></searchui>

      <div class="bgBorderTwo">
        <el-row :gutter="10" class="table_title">
          <el-col :span="12"
            ><div style="line-height: 44px; font-size: 19px">操作日志</div>
          </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%" empty-text=" ">
          <el-table-column fixed sortable prop="id" label="序号">
          </el-table-column>
          <el-table-column sortable prop="createUserReaName" label="操作人">
          </el-table-column>
          <el-table-column sortable prop="createTime" label="操作时间">
          </el-table-column>
          <el-table-column sortable prop="operationEvent" label="操作事件">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small"
                >查看</el-button
              >
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
        <!-- 编辑弹出框 -->
        <el-dialog title="操作日志详情" :visible.sync="editVisible" width="60%">
          <el-form ref="form" :model="form" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="操作事件:">
                  {{ form.operationEvent }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="操作类型:">
                  {{ form.operationType }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建公司ID:">
                  {{ form.createCompanyId }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称:">
                  {{ form.createCompanyName }}
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="操作员工ID:">
                  {{ form.createUserId }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="操作员姓名:">
                  {{ form.createUserReaName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="IP地址:">
                  {{ form.operationIp }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="操作时间:">
                  {{ form.createTime }}
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="操作数据:">
                  {{ form.operationData }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="操作参数:">
                  {{ form.parameters }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="editVisible = false">关 闭</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "authoriyt",
  data() {
    return {
      form: {},
      tableData: [],
      editVisible: false,
      searchFormArr: [
        {
          fieldName: "操作人",
          type: "input",
          field: "createUserReaName",
          placeholder: "请输入操作人"
        },
        {
          fieldName: "操作时间",
          type: "date",
          field: "dates",
          placeholder: "开始日期~结束日期"
        }
      ],
      page: 1,
      size: 10,
      sizes: [10, 20, 30, 40],
      total: 0,
      createTime: null,
      updateTime: null,
      createUserReaName: null
    };
  },
  mounted() {
    this.searchParma();
  },
  methods: {
    // 编辑操作
    handleEdit(row) {
      var seid = localStorage.getItem("certificate");
      var url = this.apis + "/log/jp-sys-operation-log/category/" + row.id;
      var that = this;
      this.httpsapi
        .GET(url)
        .then(response => {
          if (response.data != null) {
            that.form = response.data;
            that.editVisible = true;
          } else {
            Message({
              showClose: true,
              message: "系统异常，没有查找到数据",
              type: "error"
            });
          }
        })
        .catch(err => {
          //console.log(err);
        });
    },
    //页面选项改变
    handleSizeChange(val) {
      this.size = val;
      this.searchParma(null, 1);
    },
    //当前页改变
    handleCurrentChange(val) {
      this.page = val;
      this.searchParma(null, 1);
    },
    searchParma(val, _change) {
      var seid = localStorage.getItem("certificate");
      var url =
        this.apis +
        "/log/jp-sys-operation-log/search/" +
        this.page +
        "/" +
        this.size;
      var obj = {};

      if (_change == null) {
        if (val != null) {
          if (val.createUserReaName != null) {
            this.createUserReaName = val.createUserReaName;
          } else {
            this.createUserReaName = null;
          }
          if (val.dates != null) {
            this.createTime = val.dates[0];
            this.updateTime = val.dates[1];
          } else {
            this.createTime = null;
            this.updateTime = null;
          }
        } else {
          this.createUserReaName = null;
          this.createTime = null;
          this.updateTime = null;
        }
      }
      if (this.createUserReaName != null) {
        obj.createUserReaName = this.createUserReaName;
      }
      if (this.createTime != null) {
        obj.createTime = this.createTime;
      }
      if (this.updateTime != null) {
        obj.updateTime = this.updateTime;
      }
      this.httpsapi
        .POST(url, obj, seid)
        .then(response => {
          //console.log(response.data);
          this.tableData = response.data.records;
          this.page = response.data.current;
          this.total = response.data.total;
        })
        .catch(err => {
          //console.log(err);
        });
    }
  }
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
</style>

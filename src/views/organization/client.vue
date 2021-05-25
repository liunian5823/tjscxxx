<template>
  <div>
    <div>
      <searchui
        :searchFormArr="searchFormArr"
        @searchParma="searchParma"
        :isAccording="isAccording"
      ></searchui>

      <div class="bgBorderTwo">
        <el-row :gutter="10" class="table_title">
          <el-col :span="12"
            ><div style="line-height: 44px; font-size: 19px">委托方管理</div>
          </el-col>
          <el-col :span="12">
            <el-button
              class="el-pull-right Button-1 el-blueColor"
              size="medium"
              @click="goTo('client_add')"
              >添加项目部</el-button
            >
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%"
          empty-text=" "
          @sort-change="paixus"
        >
          <el-table-column sortable="custom" prop="projectNum" label="项目编号">
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="companyName"
            label="委托企业"
          >
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="projectName"
            label="委托项目部"
          >
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="projectPerson"
            label="业务负责人"
          >
          </el-table-column>
          <el-table-column sortable="custom" prop="userName" label="项目联系人">
          </el-table-column>
          <el-table-column sortable="custom" prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="staffNum"
            label="员工"
            width="100"
          >
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="acceptCount"
            label="累计受理"
          >
          </el-table-column>
          <!-- amountTotal -->
          <el-table-column
            sortable="custom"
            prop="amountTotal"
            label="累计金额"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <el-button @click="examine(scope.row)" type="text" size="small"
                >查看</el-button
              >
              <el-button @click="goTos(scope.row)" type="text" size="small"
                >编辑</el-button
              >
              <el-button
                @click="delete_to(scope.row.id, scope.$index)"
                type="text"
                size="small"
                >删除</el-button
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "clients",
  data() {
    return {
      form: {},
      tableData: [],
      editVisible: false,
      isAccording: true,
      searchFormArr: [
        {
          fieldName: "委托项目部",
          type: "select",
          field: "ecOrganizationId",
          option: [],
        },
        {
          fieldName: "创建时间",
          type: "date",
          field: "dates",
          placeholder: "开始日期~结束日期",
        },
        {
          fieldName: "委托企业",
          type: "input",
          field: "companyName",
          placeholder: "请输入委托企业",
        },
        {
          fieldName: "项目联系人",
          type: "input",
          field: "userName",
          placeholder: "请输入项目联系人",
        },
        {
          fieldName: "业务负责人",
          type: "input",
          field: "projectPerson",
          placeholder: "请输入业务负责人",
        },
      ],
      page: 1,
      size: 10,
      sizes: [10, 20, 30, 40],
      total: 0,
      out_search: null, //输出查询字段
      sad: "",
      paixu: "",
    };
  },
  mounted() {
    this.searchParma();
    this.xiangmubu();
  },
  methods: {
    xiangmubu() {
      var _this = this;
      var url = _this.apis + "/system/jp-entrust/getjpEntrustDown";
      _this.httpsapi
        .POST(url, this.param)
        .then((result) => {
          var _result = result.data;
          if (result.code == "200") {
            console.log(_result);
            _result.forEach((item) => {
              _this.searchFormArr[0].option.push({
                id: item.ecOrganizationId,
                text: item.projectName,
              });
            });
          }

          //console.log(_this.searchFormArr)
        })
        .catch((err) => {});
    },
    //删除委托方
    delete_to(_id, _index) {
      var that = this;
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {})
        .then(() => {
          var url = this.apis + "/system/jp-entrust/" + _id;
          that.httpsapi
            .DELETE(url)
            .then((response) => {
              if (response.code == "200") {
                this.searchParma(this.sad, null);
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "success",
                });
              } else {
                this.$message({
                  showClose: true,
                  offset: 400,
                  message: response.message,
                  type: "success",
                });
              }
            })
            .catch((err) => {
              //console.log(err);
            });
        })
        .catch(() => {});
    },
    goTo(_url, _params) {
      if (_params) {
        //带参数跳转
        this.$router.push({
          name: _url,
          query: { ecOrganizationId: _params.id },
        });
      } else {
        //带参数跳转
        this.$router.push({ name: _url });
      }
    },
    goTos(e) {
      console.log(e);
      this.$router.push({
        name: "client_bianji",
        query: { ecOrganizationId: e.id },
      });
    },
    examine(e) {
      //console.log(e.id)
      this.$router.push({
        name: "client_details",
        query: { ecOrganizationId: e.id },
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
      this.sad = val;
      console.log(val);
      var url =
        this.apis + "/system/jp-entrust/search/" + this.page + "/" + this.size;
      var obj = {};
      if (_change == null) {
        if (val != null) {
          this.out_search = val;
          if (val.dates != null) {
            this.out_search.createTime = val.dates[0];
            this.out_search.updateTime = val.dates[1];
          } else {
            this.out_search.createTime = null;
            this.out_search.updateTime = null;
          }
        } else {
          this.out_search = null;
        }
      }
      if (this.out_search != null) {
        obj = this.out_search;
      }
      if (this.out_search != null) {
        obj = this.out_search;
      }
      if (this.paixu) {
        obj["orderBy"] = this.paixu.prop;
        obj["descType"] = this.paixu.order;
      }

      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          for (let i = 0; i < response.data.records.length; i++) {
            response.data.records[i].projectPerson =
              response.data.records[i].projectPerson +
              "  " +
              response.data.records[i].projectPersonPhone;
            response.data.records[i].userName =
              response.data.records[i].userName +
              "  " +
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
            if (response.data.records[i].companyName.length >= "20") {
              response.data.records[i].companyName =
                response.data.records[i].companyName.slice(0, 3) +
                "..." +
                response.data.records[i].companyName.slice(
                  response.data.records[i].companyName.length - 16,
                  -1
                );
            }
          }
          this.tableData = response.data.records;
          this.page = response.data.current;
          this.total = response.data.total;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    paixus(column) {
      this.paixu = column;
      if (column.order != null) {
        this.paixu.order = column.order.substring(0, column.order.length - 6);
      }

      this.searchParma();
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

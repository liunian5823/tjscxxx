<template>
  <div>
    <div class="bgBorderTwo">
      <el-row :gutter="10" class="table_title">
        <el-col :span="12"
          ><div
            style="
              font-size: 18px;
              font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
              font-weight: bold;
              color: #000000;
              line-height: 24px;
              letter-spacing: 1px;
            "
          >
            角色信息
          </div>
        </el-col>
      </el-row>

      <div>
        <el-row :gutter="10" class="table_titles">
          <el-col :span="24"
            ><div
              style="
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #333333;
                line-height: 34px;
              "
            >
              角色名称:{{ xinxi.name }}
            </div>
          </el-col>
          <el-col :span="24"
            ><div
              style="
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #333333;
                line-height: 34px;
              "
            >
              创建时间:{{ xinxi.createTime }}
            </div>
          </el-col>
          <el-col :span="24"
            ><div
              style="
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #333333;
                line-height: 34px;
              "
            >
              备注信息:{{ xinxi.remarks }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bgBorderTwo">
      <el-table :data="list" style="width: 100%" empty-text=" ">
        <el-table-column prop="jobNumber" label="员工编号" width="180">
        </el-table-column>
        <el-table-column prop="realName" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="phone" label="联系方式"> </el-table-column>
        <el-table-column prop="email" label="电子邮箱"></el-table-column>
        <!-- <el-table-column prop="email" label="操作"> </el-table-column> -->
      </el-table>

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
    <div class="bgBorderTwo">
      <el-row :gutter="10" class="table_title">
        <el-col :span="12"
          ><div
            style="
              font-size: 18px;
              font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
              font-weight: bold;
              color: #000000;
              line-height: 24px;
              letter-spacing: 1px;
            "
          >
            当前已选权限
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="12"
          style="padding：10px"
          v-for="(item, index) in lists"
          :key="index"
        >
          <el-row>
            <el-col :span="4" class="xian_left">{{ item.name }} </el-col>
            <el-tooltip :content="shujisa[index]" placement="top">
              <el-col :span="20" class="xian_rigth">
                <span v-for="(title, indexs) in item.sonMenus" :key="indexs">
                  ({{ title.name }})</span
                >
              </el-col>
            </el-tooltip>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="bgBorderTwo">
      <el-row style="position: relative; left: 50%; transform: translateX(-2%)">
        <el-button @click="black()">返回</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "authorityadd",
  data() {
    return {
      id: "",
      xinxi: [],
      list: [],
      lists: [],
      page: 1,
      size: 10,
      total: 0,
      shujisa: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.huoquxinxi();
  },
  methods: {
    huoquxinxi() {
      //   /system/jp-sys-role/category/{id}
      var url = this.apis + "/system/jp-sys-role/category/" + this.id;
      var obj = {};
      this.httpsapi
        .GET(url, obj)
        .then(response => {
          //console.log(response);
          this.xinxi = response.data;
          this.lists = response.data.listMenuList;
          var a = [];
          var c = {};
          for (var i = 0; i < response.data.listMenuList.length; i++) {
            var b = [];
            // console.log( response.data.listMenuList[i])
            for (
              var o = 0;
              o < response.data.listMenuList[i].sonMenus.length;
              o++
            ) {
              b.push(response.data.listMenuList[i].sonMenus[o].name + "、");
            }
            c[i] = b;
          }
          this.shujisa = c;
          // console.log(c[1])
          this.huoqulist();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    huoqulist() {
      //   /system/jp-sys-role/searchUserByRoleId/{page}/{size}
      var url =
        this.apis +
        "/system/jp-sys-role/searchUserByRoleId/" +
        this.page +
        "/" +
        this.size;
      var obj = {
        id: this.id
      };
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          //console.log(response);

          for (var i = 0; i < response.data.records.length; i++) {
            if (response.data.records[i].sex == "1") {
              response.data.records[i].sex = "男";
            } else if (response.data.records[i].sex == "2") {
              response.data.records[i].sex = "女";
            } else {
              response.data.records[i].sex = "其他";
            }
            //console.log(response.data.records);
            this.list = response.data.records;
            this.total = response.data.total;
          }
        })
        .catch(err => {
          //console.log(err);
        });
    },
    black() {
      this.$router.go(-1);
    },
    handleCurrentChange(e) {
      this.page = e;
      this.huoqulist();
    },
    handleSizeChange(e) {
      this.size = e;
      this.huoqulist();
    }
  }
};
</script>

<style scoped>
.table_title {
  border-bottom: 0px solid #fff !important;
}
.table_titles {
  margin-top: 30px;
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
.el-col-12 {
  padding: 10px;
}

div /deep/.el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.xian_left {
  background: #f4f4f4;
  border: 1px solid #d0d0d0;
  height: 37px;
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #333333;
  line-height: 37px;
  text-align: center;
}
.xian_rigth {
  background: #ffffff;
  border: 1px solid #d0d0d0;
  height: 37px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 37px;
}
</style>

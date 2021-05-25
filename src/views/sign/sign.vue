<template>
  <div>
    <!-- 搜索组件 -->
    <searchui
      :searchFormArr="searchFormArr"
      @searchParma="searchParma"
      :isAccording="isAccording"
    ></searchui>

    <div class="bgBorderTwo">
      <el-menu
        :default-active="handleSelects"
        text-color="#000"
        class="el-menu-demo el-menu-color"
        mode="horizontal"
      >
        <el-menu-item index="1">标的物管理</el-menu-item>

        <el-button
          class="el-pull-right Button-2"
          size="medium"
          @click="exportData()"
          >导出</el-button
        >
      </el-menu>
      <!-- 表格组件 -->
      <Tables
        :MHeight="MHeight"
        :Dataorigin="Dataorigin"
        :header="header"
        :isoperation="isoperation"
        :operationList="ioperationList"
        :operationW="operationW"
        @operationsss="operationsss"
        @paixu="paixus"
      >
      </Tables>
      <!-- 分页 -->
      <div class="paging">
        <el-pagination
          :background="false"
          :page-size="size"
          :pager-count="9"
          :current-page="1"
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
export default {
  name: "signs",
  data() {
    return {
      // 弹框组件--开始
      dialogVisible: false,
      text: '<b style="color:red">确定要这样吗？</b>',
      dMText: "11", //此参数不传，弹框的确定按钮默认文字为："确 定"
      // 弹框组件--结束
      isAccording: true,
      // 搜索组件数据
      searchFormArr: [
        {
          fieldName: "标的类别",
          type: "select",
          field: "department",
          option: [
            // { id: "11", text: "个" },
            // { id: "22", text: "米" },
          ],
          placeholder: "请选择"
        },
        {
          fieldName: "标的编码",
          type: "input",
          field: "enterprise",
          placeholder: "请输入"
        },
        {
          fieldName: "标的名称",
          type: "input",
          field: "underlyingCode",
          placeholder: "请输入"
        },
        {
          fieldName: "规格",
          type: "input",
          field: "underlyingCode1",
          placeholder: "请输入"
        },
        {
          fieldName: "品牌",
          type: "input",
          field: "underlyingCode2",
          placeholder: "请输入"
        },
        {
          fieldName: "计量单位",
          type: "select",
          field: "state1",
          option: [],
          placeholder: "请选择"
        },
        {
          fieldName: "入库时间",
          type: "date",
          field: "time3",
          placeholder: ""
        }
      ],
      // 表格组件--开始
      // 表格高度
      MHeight: "auto",
      // 右侧操作宽度
      operationW: "180",
      // 表格操作数组
      ioperationList: { 1: [{ name: "查看详情" }] },
      // 操作块儿是否显示
      isoperation: true,
      // 数据数组
      Dataorigin: [],
      // 表头数组
      header: [
        { name: "标的类别", prop: "typeName" },
        { name: "标的编码", prop: "code" },
        { name: "标的名称", prop: "name" },
        { name: "规格", prop: "standards" },
        { name: "计量单位", prop: "unit" },
        { name: "累计委托数量", prop: "saleNum" },
        { name: "累计处置数量", prop: "disposalQuantity" },
        { name: "处置中数量", prop: "disposalUnderQuantity" },
        { name: "剩余未处置", prop: "remainingUnsold" },
        { name: "委托订单数", prop: "orderNum" },
        { name: "入库时间", prop: "createTime" }
      ],
      pages: 1,
      size: 10,
      total: 0,
      data: "",
      handleSelects: "0",
      paixu: ""
      // 表格组件--结束
    };
  },
  mounted() {
    this.huoquxinxi();
    //  this.$router.push("signDetail");
  },
  methods: {
    // 搜索子组件回调
    searchParma(data) {
      this.data = data;
      this.huoquxinxi();
    },
    huoquxinxi() {
      console.log(this.data.time3);
      var url =
        this.apis +
        "/system/jp-entrust-subject-order/search/" +
        this.pages +
        "/" +
        this.size;
      var obj = {
        type: this.data.department,
        code: this.data.enterprise,
        name: this.data.underlyingCode,
        standards: this.data.underlyingCode1,
        unit: this.data.state1,
        brand: this.data.underlyingCode2,
        orderNum:"1"
      };
      if (this.data.time3) {
        obj["createTime"] = this.data.time3[0];
        obj["updateTime"] = this.data.time3[1];
      }
      if (this.paixu) {
        obj["orderBy"] = this.paixu.prop;
        obj["descType"] = this.paixu.order;
      }
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          if (response.code == "200") {
            //console.log(response);
            for (let i = 0; i < response.data.records.length; i++) {
              response.data.records[i]["status"] = "1";
            }
            this.Dataorigin = response.data.records;
            this.size = response.data.size;
            this.total = response.data.total;
            this.huoquliebie();
          }
        })
        .catch(err => {
          //console.log(err);
        });
    },
    tianjia() {
      this.dialogVisible = true;
    },
    // 提示对话框确定按钮
    determine() {
      this.dialogVisible = false;
    },
    // 提示对话框关闭按钮
    cancel() {
      this.dialogVisible = false;
    },
    // 当前页多少条发生改变时触发
    tablePageSize(val) {
      //console.log(val);
      this.size = val;
      this.searchParma(this.data);
    },
    // 当前页改变时触发
    tableCurrentChange(val) {
      this.pages = val;
      this.searchParma(this.data);
    },
    operationsss(index, e) {
      //console.log(index)
      this.$store.commit("singlist", index);
      this.$router.push({ name: "signDetail" });
    },
    huoquliebie() {
      // /system/jp-entrust-subject/searchSubjectTypeList
      var url = this.apis + "/system/jp-entrust-subject/searchSubjectTypeList";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);
          if (response.code == "200") {
            var a = [];
            for (var i = 0; i < response.data.length; i++) {
              var b = {};
              b["id"] = response.data[i].type;
              b["text"] = response.data[i].typeName;
              a.push(b);
            }
            console.log(a);
            this.searchFormArr[0].option = a;
            this.huoqujiliang();
          }
        })
        .catch(err => {
          //console.log(err);
        });
    },
    huoqujiliang() {
      // /system/jp-entrust-subject/searchSubjectTypeList
      var url = this.apis + "/system/jp-entrust-subject/searchUnitList";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          console.log(response);
          if (response.code == "200") {
            var a = [];
            for (var i = 0; i < response.data.length; i++) {
              var b = {};
              b["id"] = response.data[i].unit;
              b["text"] = response.data[i].unit;
              a.push(b);
            }
            console.log(a);
            this.searchFormArr[5].option = a;
          }
        })
        .catch(err => {
          //console.log(err);
        });
    },
    exportData() {
      var url = this.apis + "/system/jp-entrust-subject/expExcelEntrustSubject";
      if (this.data.time3 == undefined) {
        var obj = {
          type: this.data.department,
          code: this.data.enterprise,
          name: this.data.underlyingCode,
          standards: this.data.underlyingCode1,
          unit: this.data.state1,
          brand: this.data.underlyingCode2
        };
      } else {
        var obj = {
          type: this.data.department,
          code: this.data.enterprise,
          name: this.data.underlyingCode,
          standards: this.data.underlyingCode1,
          unit: this.data.state1,
          brand: this.data.underlyingCode2,
          createTime: this.data.time3[0],
          updateTime: this.data.time3[1]
        };
      }
      this.exports.exports(
        this.apis + "/system/jp-entrust-subject/expExcelEntrustSubject",
        obj
      );
    },
    paixus(e) {
      // console.log();
      this.paixu = e;
      if (e.order != null) {
        this.paixu.order = e.order.substring(0, e.order.length - 6);
      }

      this.huoquxinxi();
    }
  },
  components: {
    Tables
  }
};
</script>

<style></style>

<template>
  <el-table
    :data="Dataorigins"
    :max-height="MHeight"
    ref="tableT"
    empty-text=" "
    @sort-change="paixu"
    @cell-mouse-enter="asda"
    @cell-mouse-leave="asda1"
    @cell-click="sdgajs"

  >
    <el-table-column
      :prop="headers.prop"
      :label="headers.name"
      v-for="(headers, index) in headerX"
      :key="index"
      min-width="200px"
      row-click="sada"
      sortable="custom"
      :show-overflow-tooltip="headers.prop == 'jurisdiction'"
    >
      <!--   show-overflow-tooltip -->
    </el-table-column>
    <el-table-column
      v-if="condition"
      :prop="xianshi"
      label="状态"
      align="center"
      #default="scope"
    >
      <el-switch
        v-model="xianshi[scope.$index].name"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :disabled="Dataorigins[scope.$index].isRoot == 0 ? true : false"
        @change="state(scope.$index, xianshi[scope.$index].name)"
      >
      </el-switch>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      :width="operationW"
      v-if="isoperation"
    >
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          v-for="(operationLists, index) in operationList[scope.row.status]"
          :key="index"
          @click="caozuo(scope.$index, Dataorigins, operationLists.name)"
          >{{ operationLists.name }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  methods: {
    caozuo(index, rows, e) {
      this.$emit("operationsss", rows[index], e);
    },
    sada() {
      //console.log("123");
    },
    sdgajs(row, column, cell) {
      // console.log(row)
      // console.log(column.label)
      if (column.label == "附件") {
        this.$emit("fujian", row);
      }
      // console.log(cell)
    },
    state(index, e) {
      //   //console.log(this.Dataorigins[index]);

      this.$emit("states", index, e);
    },
    paixu(column, prop, order) {
      this.$emit("paixu", column);
    },
    asda(row, column, cell, event) {
      // console.log(row)

      if (column.label == "权限") {
        // console.log(row)
        this.$emit("xianshiss", row, event);
      }
    },
    asda1(row, column, cell, event) {
      if (column.label == "权限") {
        this.$emit("xianshiss1", row, event);
      }
    },


  },
  data() {
    return {
      Dataorigins: [],
      xianshi: "",
      headerX: "",
    };
  },

  props: [
    "MHeight",
    "Dataorigin",
    "header",
    "isoperation",
    "operationList",
    "operationW",
    "condition",
  ],
  mounted() {
    console.log(this.header);
    this.headerX = this.header;
  },

  watch: {
    Dataorigin: function (newVal, oldVal) {
      var than = this;
      than.Dataorigins = [];
      var cc = [];
      console.log(newVal);
      if (newVal) {
        for (var i = 0; i < newVal.length; i++) {
          var a = {};
          if (newVal[i].status == "1") {
            a["name"] = true;
          } else if (newVal[i].status == "0") {
            a["name"] = false;
          }
          cc.push(a);
        }
        this.xianshi = cc;
      }

      than.Dataorigins = newVal;
    },
    header: function (newVal, oldVal) {
      var than = this;
      than.headerX = newVal;
    },
  },
};
</script>

<style>
.el-table__empty-text {
  display: block;
  width: 150px;
  height: 100px;
  background: url("../../assets/img/zanwushuju.png") no-repeat;
  color: #909399;
  box-sizing: border-box;
  margin-top: 46px;
}

.el-table__header {
  width: 100% !important;
}
.el-table__body {
  width: 100% !important;
}
.class1 {
  color: blueviolet;
}
.class2 {
  color: red;
}
</style>

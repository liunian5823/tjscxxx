<template>
  <el-form :rules="tfrom.rue" :model="tfrom" ref="fromDome">
    <el-table
      :data="tfrom.Dataorigins"
      fit="false"
      ref="tableT"
      empty-text=" "
      @sort-change="SortChange"
      class="mltable"
    >
      <el-table-column
        v-for="(headers, index) in table.header"
        :prop="headers.prop"
        :label="headers.name"
        :key="index"
        :label-class-name="headers.require ? 'noClick' : ''"
        :min-width="headers.width"
        :sortable="headers.sortable"
      >
        <template #default="scope">
          <span
            v-html="scope.row[headers.prop]"
            v-if="!headers.hasOwnProperty('type')"
          ></span>
          <el-form-item
            :rules="tfrom.rue[headers.prop]"
            :prop="'Dataorigins.' + scope.$index + '.' + headers.prop"
            v-if="headers.type != '' && headers.type != undefined"
            style="margin-bottom: 0;min-height: 50px;"
          >
            <span v-if="headers.type === 'click'">
              <span v-html="scope.row[headers.prop]"></span>
              <a
                style="color: #409EFF;"
                href="javascript:;"
                v-if="scope.row.downFile != null && scope.row.downFile != ''"
                @click="childByValue(scope.row, headers.type)"
                >下载</a
              >
            </span>
            <span v-else-if="headers.type === 'select'">
              <el-select
                filterable
                v-model="scope.row[headers.prop]"
                @change="childByValue(scope.row, headers.type,scope.$index)"
              >
                <el-option
                  v-for="(itemOption, index) in headers.option"
                  :key="index"
                  :label="itemOption.name"
                  :value="itemOption.value"
                ></el-option>
              </el-select>
            </span>
            <span v-else-if="headers.type === 'selectfilt'">
              <el-select
                filterable
                allow-create
                v-model="scope.row[headers.prop]"
                @blur="optionS($event, scope.row, headers.prop)"
                @change="childByValue(scope.row, headers.type)"
              >
                <el-option
                  v-for="(itemOption, index) in headers.option"
                  :key="index"
                  :label="itemOption.name"
                  :value="itemOption.value"
                ></el-option>
              </el-select>
            </span>
            <span v-else-if="headers.type === 'switch'">
              <el-switch
                v-model="scope.row[headers.prop]"
                active-color="#2DB7F5"
                inactive-color="#c5c5c5"
                width="36px"
                @change="childByValue(scope.row, headers.type)"
              >
              </el-switch>
            </span>
            <span v-else-if="headers.type === 'input'">
              <el-input
                v-model="scope.row[headers.prop]"
                placeholder="请输入"
                @blur="childByValue(scope.row, headers.type)"
              ></el-input>
            </span>
            <span v-else-if="headers.type === 'button'">
              <el-button
                type="text"
                v-html="scope.row[headers.prop]"
                @click="childByValue(scope.row, headers.type)"
              ></el-button>
            </span>
            <span v-else-if="headers.type === 'checkbox'">
              <el-checkbox
                v-model="scope.row[headers.prop]"
                @change="childByValue(scope.row, headers.type)"
              ></el-checkbox>
            </span>
            <span v-else-if="headers.type === 'cascader'">
              <div class="block">
                <el-cascader
                  v-model="scope.row[headers.prop]"
                  :options="headers.option"
                  :props="{ expandTrigger: 'hover' }"
                  filterable
                  @change="childByValue(scope.row, headers.type)"
                ></el-cascader>
              </div>
            </span>
          </el-form-item>
        </template>
      </el-table-column>
      <!-- 当operationW为对象时，动态操作按钮时用到 -->
      <el-table-column
        fixed="right"
        label="操作"
        :width="table.operationW"
        v-if="table.isoperation"
      >
        <template #default="scope">
          <el-button
            v-for="(item, index) in table.operationList[
              scope.row[
                table.StatusField != undefined ? table.StatusField : 'status'
              ]
            ]"
            type="text"
            size="small"
            @click="childByValue(scope.row, item)"
            :key="index"
            >{{ item }}
          </el-button>
        </template>
      </el-table-column>
      <!-- 当operationW为数组时，渲染传过来的固定的值 -->
      <el-table-column
        fixed="right"
        label="操作"
        :width="table.operationW"
        v-if="!table.isoperation && table.operationList.length > 0"
      >
      1
        <template #default="scope">
          <el-button
            v-for="(item, index) in table.operationList"
            type="text"
            size="small"
            @click="childByValue(scope.row, item)"
            :key="index"
            >{{ item }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      tfrom: {
        Dataorigins: [],
        rue: {}
      }
    };
  },
  props: ["table"],
  mounted() {},
  methods: {
    // 表格按钮回调
    // 单元格中的输入框、开关、下拉菜单等给父级传值的方法
    childByValue(row, index,e) {
      this.$emit("tableFuncCellback", [row, index],e);
    },
    SortChange(callback) {
      this.$emit("tableFuncCellback", [callback, "排序"]);
    },
    // 父级调用该方法
    refTableTwo() {
      var _this = this,
        ReturnP = true;
      _this.$refs["fromDome"].validate(valid => {
        if (!valid) {
          ReturnP = false;
        }
      });
      return ReturnP;
    },
    // 判断输入选择时，下拉里面没有的数据，直接添加到选项里面
    optionS(e, data, filed) {
      data[filed] = e.target.value;
      return false;
    }
  },
  watch: {
    // 监听表格变化
    "table.Dataorigin": {
      handler(newVal, oldVal) {
        this.tfrom.Dataorigins = newVal;
      },
      deep: true,
      immediate: true
    },
    "table.rules": {
      handler(newVal, oldVal) {
        if (newVal == undefined) {
          this.tfrom.rue = {};
        } else {
          this.tfrom.rue = newVal;
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped>
.el-table td div {
  width: 100% !important;
}
.el-table td div.fakeEl-input {
  position: absolute;
  left: 0;
  opacity: 0;
  width: 88% !important;
}
>>>.noClick .cell {
  position: relative;
}
>>>.noClick .cell::after {
  content: "*";
  display: inline-block;
  color: red;
  position: absolute;
  left: 0;
}
>>> .el-form .el-select .el-input {
  width: 100% !important;
}
.mltable .el-form-item__error {
  top: 88%;
}
>>> .el-input__inner {
  height: 32px !important;
  line-height: 32px !important;
}
>>> .dTt {
  border: 1px solid #e51d27;
  width: 16px;
  height: 16px;
  color: #e51d27;
  line-height: 13px;
  font-size: 16px;
  text-align: center;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  position: relative;
  top: -3px;
}

/deep/.el-table__empty-text {
  display: block;
  width: 150px;
  height: 100px;
  background: url("../../assets/img/zanwushuju.png") no-repeat;
  color: #909399;
  box-sizing: border-box;
  margin-top: 46px;
}
.el-table /deep/.el-table__header-wrapper {
  border-radius: 5px !important;
  background-color: #f7f7f7 !important;
}
.el-table /deep/.el-table__header-wrapper th.is-leaf {
  border-bottom: 0 !important;
  background-color: #f7f7f7 !important;
  height: 50px;
  color: #666666;
}
.el-table /deep/th.is-leaf {
  border-bottom: 0 !important;
  border-radius: 0 5px 5px 0 !important;
  background-color: #f7f7f7 !important;
  height: 50px;
  color: #666666;
}
</style>

<template>
  <div id="se">
    <div class="bgBorderTwo">
      <el-form label-width="125px" class="demo-searchForm">
        <el-row
          ref="refHeight"
          :gutter="20"
          class="elRow"
          style="padding: 7px 0;"
          :style="{ height: ifH + 'px' }"
        >
          <el-col :span="9" v-for="(item, index) in searchFormArr" :key="index">
            <div class="grid-content bg-purple">
              <el-form-item :label="item.fieldName + '：'">
                <!-- ipnut -->
                <el-input
                  v-if="item.type == 'input'"
                  :type="item.NameType"
                  v-model="fieldArr[item.field]"
                  :placeholder="item.placeholder"
                ></el-input>
                <!-- select -->
                <el-select
                  v-else-if="item.type == 'select'"
                  v-model="fieldArr[item.field]"
                  :placeholder="item.placeholder"
                >
                  <el-option
                    v-for="(itemOption, index) in item.option"
                    :label="itemOption.text"
                    :value="itemOption.id"
                    :key="index"
                  ></el-option>
                </el-select>
                <el-select
                  v-else-if="item.type == 'selects'"
                  v-model="fieldArr[item.field]"
                  :placeholder="item.placeholder"
                  multiple=""
                >
                  <el-option
                    v-for="(itemOption, index) in item.option"
                    :label="itemOption.text"
                    :value="itemOption.id"
                    :key="index"
                  ></el-option>
                </el-select>
                <!-- 日期范围date -->
                <div class="block" v-else-if="item.type == 'date'">
                  <el-date-picker
                    v-model="fieldArr[item.field]"
                    type="daterange"
                    align="left"
                    :editable="false"
                    start-placeholder="开始日期"
                    :unlink-panels="true"
                    end-placeholder="结束日期"
                    @change="daterangeChange(fieldArr[item.field], item.field)"
                  >
                  </el-date-picker>
                </div>
                <!-- 单日期 -->
                <div class="block" v-else-if="item.type == 'date1'">
                  <el-date-picker
                    v-model="fieldArr[item.field]"
                    type="date"
                    placeholder="选择日期"
                    @change="dateChange((fieldArr[item.field], item.field))"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row class="searchTemBtn" :class="{active:isHeigth}">
          <el-col :span="24">
            <el-form-item style="text-align: right">
              <el-button class="el-noColor" @click="resetForm()"
                >重置</el-button
              >
              <el-button
                class="el-blueColor"
                type="primary"
                @click="submitForm()"
                >搜索</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 点击按钮折叠或者打开 -->
      <div v-if="isAccording" class="collapseBtn" @click="openCollapse()">
        高级搜索
        <i v-if="iconClassBool" class="el-icon-lx-down"></i>
        <i v-else class="el-icon-lx-top"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchui",
  data() {
    return {
      fieldArr: {},
      iconClassBool: true,
      isHeight: true,
      ifH: 60
    };
  },
  props: ["searchFormArr", "isAccording"],
  methods: {
    // 打开或关闭折叠框
    openCollapse() {
      this.ifH == 60
        ? (this.ifH = Math.ceil(this.searchFormArr.length / 2) * 60)
        : (this.ifH = 60);
      this.iconClassBool = !this.iconClassBool;
      this.isHeight = !this.isHeight;
    },
    // 日期范围选择
    daterangeChange(e, field) {
      var date = [];
      for (var i = 0; i < e.length; i++) {
        var a = new Date(e[i]);
        var b = a.getFullYear();
        if (a.getMonth() < "9") {
          var c = "0" + (a.getMonth() + 1);
        } else {
          var c = a.getMonth() + 1;
        }
        if (a.getDate() < "10") {
          var d = "0" + a.getDate();
        } else {
          var d = a.getDate();
        }

        var datetime = b + "-" + c + "-" + d;
        if (i == 0) {
          datetime = datetime + " 00:00:00";
        } else if (i == 1) {
          datetime = datetime + " 23:59:59";
        }
        date.push(datetime);
      }
      this.fieldArr[field] = date;
    },
    // 单日期
    dateChange(e, field) {
      var date = [];
      var a = new Date(e);
      var b = a.getFullYear();
      if (a.getMonth() < "9") {
        var c = "0" + (a.getMonth() + 1);
      } else {
        var c = a.getMonth() + 1;
      }
      if (a.getDate() < "10") {
        var d = "0" + a.getDate();
      } else {
        var d = a.getDate();
      }
      var datetime = b + "-" + c + "-" + d + " " + "00:00:00";
      date.push(datetime);
      this.fieldArr[field] = date;
    },
    // 搜索按钮
    submitForm() {
      this.$emit("searchParma", this.fieldArr);
    },
    // 重置
    resetForm() {
      this.fieldArr = {};
      this.$emit("searchParma", this.fieldArr);
    }
  }
};
</script>

<style scoped>
.el-button {
  width: 65px;
  padding: 0;
  padding-left: 5px;
  letter-spacing: 5px;
}
.el-collapse {
  border-top: 0;
  border-bottom: 0;
}
#se .el-date-editor .el-range-separator{
  line-height: 20px;
}
/deep/.el-collapse-item__header,
/deep/.el-collapse-item__wrap {
  border-bottom: 0;
}
/deep/.el-collapse-item__arrow {
  display: none;
}
/deep/.el-range-editor.el-input__inner,
.el-select {
  width: 100%;
}
>>> .el-input__inner {
  line-height: 32px;
  height: 32px;
}
>>> .el-input__icon {
  position: relative;
  top: -4px;
  height: inherit;
}
/* 在局部重写全局样式 */
.bgBorderTwo {
  padding: 25px;
}
.collapseBtn {
  height: 24px;
  background: rgba(0, 0, 0, 0.04);
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  -moz-user-select: none; /* Firefox私有属性 */
  -webkit-user-select: none; /* WebKit内核私有属性 */
  -ms-user-select: none; /* IE私有属性(IE10及以后) */
  -khtml-user-select: none; /* KHTML内核私有属性 */
  -o-user-select: none; /* Opera私有属性 */
  user-select: none; /* CSS3属性 */
}
.elRow {
  overflow: hidden;
  transition: 0.2s;
  z-index: 10;
}
.searchTemBtn{
  position: relative;
  top: -52px;
  right: 200px;
}
.searchTemBtn.active{
  top:-57px
}
</style>

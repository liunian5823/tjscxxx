<template>
  <el-dialog
    title="提示"
    v-model="dialible"
    top="20%"
    width="400px"
    :before-close="handleClose"
  >
    <div class="dialogText" v-html="confirm.text"></div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button
          :class="{ active: isBtnActive }"
          type="primary"
          @click="determine()"
          >{{ determineText }}</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialible: false,
      // 确认文字
      determineText: "确认",
      isBtnActive: false
    };
  },
  props: ["confirm"],
  mounted() {
    if (this.confirm.dMText != undefined) {
      this.determineText = this.confirm.dMText;
    }
  },
  watch: {
    "confirm.dialogVisible": function(n, d) {
      this.dialible = n;
    },
    "confirm.dMText": function(n, d) {
      if (n.length < 3) {
        this.isBtnActive = true;
      }
      this.determineText = n;
    }
  },
  methods: {
    // 点击“×”号和遮罩时，触发
    handleClose(done) {
      this.$emit("BouncedLogic", "cancel");
    },
    cancel() {
      this.$emit("BouncedLogic", "cancel");
    },
    determine() {
      this.$emit("BouncedLogic", this.determineText);
    }
  }
};
</script>

<style scoped>
.dialogText,
.dialog-footer {
  text-align: center !important;
}
.el-button {
  height: 32px;
  min-width: 65px;
  text-align: center;
}
.el-button.active {
  padding: 0;
  padding-left: 5px;
  letter-spacing: 5px;
}
</style>

<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="quxiao"
    v-if="shujus == false"
  >
    <div>该委托订单下有未完成的竞价单，不可以结束订单</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    title="结束委托订单"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="quxiao"
    v-else
  >
    <div>
      <el-form
        ref="formName"
        :model="formName"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="业务类型" required>
          <el-radio-group v-model="formName.resource">
            <el-radio v-model="formName.resource" label="1">订单完成</el-radio>
            <el-radio v-model="formName.resource" label="2">订单中止</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="xian"></div>

        <div v-if="formName.resource == '1'">
          <el-form-item label="操作验证" prop="name">
            <el-input
              v-model="formName.name"
              placeholder="输入“结束”确认操作"
            ></el-input>
          </el-form-item>
        </div>
        <div v-if="formName.resource == '2'">
          <el-form-item label="附件" required>
            <el-upload
              class="upload-demo"
              :action="action"
              name="multipartFile"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="shangchuan"
              multiple="false"
              :limit="5"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :before-upload="xianzhi"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  请上传聊天截图、邮件截图等作为关闭工单的依据
                  最多上传5个格式为pdf、jpg、png单个文件，文件大小不超过5MB
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              v-model="formName.desc"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="操作验证">
            <el-input
              v-model="formName.name"
              placeholder="输入“中止”确认操作"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
var token = localStorage.getItem("certificate");
export default {
  name: "ordertk",
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      dialogVisible: false,
      shujus: "",
      formName: {
        resource: "1",
        desc: "",
        name: "",
      },
      action: this.apis + "/fastdfs/upload-file",
      headers: { Authorization: token },
      fileList: [],
      src: [],
    };
  },

  props: ["xianshi", "shuju"],
  watch: {
    xianshi: function (newVal, oldVal) {
      this.dialogVisible = newVal;
    },
    shuju: function (newVal, oldVal) {
      console.log(newVal);
      this.shujus = newVal;
    },
  },

  methods: {
    quxiao() {
      this.formName = {
        resource: "1",
        desc: "",
        name: "",
      };
      this.fileList = [];
      this.src = [];
      this.$emit("quxiao");
    },
    queding() {
      var than = this;
      if (this.formName.resource == "1") {
        if (this.formName.name == "结束") {
          this.$emit("queding", "1");
        } else {
          this.$message({
            showClose: true,
            offset: 400,
            message: "请输入结束",
            type: "error",
          });
        }
      } else {
        if (this.formName.name == "中止") {
          console.log("123");
          this.$emit("queding", this.formName.desc, this.src);
        } else {
          this.$message({
            showClose: true,
            offset: 400,
            message: "请输入中止",
            type: "error",
          });
        }
      }
      return;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    shangchuan(file, fileList) {
      console.log(file.data);
      this.src.push(file.data);
    },
    handleExceed(fileList) {
      this.$message({
        showClose: true,
        offset: 400,
        message: "最多上传5个文件",
        type: "error",
      });
    },
    xianzhi(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const ispdf = file.type === "application/pdf";
      const isPG = isJPG || isPNG || ispdf; //限制图片格式为jpg / png
      const isLt2M = file.size / 1024 / 1024 < 5; //限制图片大小

      if (!isPG) {
        this.$message.error("上传文件只能是 JPG、PNG、PDF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 5MB!");
      }
      return isPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.xian {
  border-bottom: 1px solid #c7c7c7;
  width: 100%;
}
.el-form-item {
  margin-bottom: 10px;
}
.upload-demo /deep/.el-upload--text {
  float: left;
  background-color: #fff;
  border: 0px dashed #d9d9d9 !important;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 40px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>

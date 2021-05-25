<template>
  <div class="xiugaimima">
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      class="xiugaimima_ju"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            type="password"
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="pwd">
          <el-input
            type="password"
            v-model="form.pwd"
            autocomplete="off"
             placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          prop="newpwd"
        >
          <el-input
            type="password"
            v-model="form.newpwd"
            autocomplete="off"
             placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="dialog-footer">
          <el-button @click="quxiao">取 消</el-button>
          <el-button type="primary" @click="xiugai('ruleForm')"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <template #footer>
        <span class="dialog-footer">
          
        </span>
      </template> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "modificationpwd",
  data() {
    return {
      // dialogFormVisible: true,
      form: {
        name: "",
        pwd: "",
        newpwd: ""
      },
      formLabelWidth: "120px",
      rules: {
        pwd: [
          { required: true, message: "密码长度8-32位且由字母数字符号组成", trigger: "blur" },

          {
            min: 8,
            max: 32,
            message: "长度在 8 到 32 个字符",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入旧密码", trigger: "blur" },

          {
            min: 8,
            max: 32,
            message: "长度在 8 到 32 个字符",
            trigger: "blur"
          }
        ],
        newpwd: [
          { required: true, message: "请确认密码", trigger: "blur" },

          {
            min: 8,
            max: 32,
            message: "长度在 8 到 32 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },

  computed: {
    dialogFormVisible() {
      //console.log(this.$store.state.xiugai);
      return this.$store.state.xiugai;
    }
  },
  watch: {
    "$store.state.xiugai": function(newVal) {
      console.log(newVal);
    }
  },
  methods: {
    xiugai(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (
            this.form.name != "" &&
            this.form.pwd != "" &&
            this.form.newpwd != ""
          ) {
            if (this.form.pwd == this.form.newpwd) {
              this.$confirm("确认要退出登录？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              })
                .then(() => {
                  var url = this.apis + "/updatePassword";
                  var obj = {
                    password: this.form.name,
                    newPassword: this.form.newpwd
                  };

                  this.httpsapi
                    .PUT(url, obj)
                    .then(response => {
                      if (response.code == "200") {
                        //console.log(response.data);
                        this.$message({
                          showClose: true,
                          offset: 400,
                          message: response.message,
                          type: "success"
                        });
                        localStorage.removeItem("certificate");
                        this.$router.push("/login");
                      } else {
                        this.$message({
                          showClose: true,
                          offset: 400,
                          message: response.message,
                          type: "error"
                        });
                      }
                    })
                    .catch(err => {
                      //console.log(err);
                      this.$message({
                        showClose: true,
                        offset: 400,
                        message: err.message,
                        type: "success"
                      });
                    });
                })
                .catch(() => {
                  this.$store.commit("xiugai", false);
                  this.$message({
                    type: "info",
                    message: "已取消密码修改"
                  });
                });
            } else {
              this.$message({
                type: "error",
                message: "两次密码不一致"
              });
            }
          } else {
            this.$message({
              type: "info",
              message: "请填写完整"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      return;
    },
    handleClose() {
      this.$message({
        type: "info",
        message: "已取消密码修改"
      });
      this.$store.commit("xiugai", false);
    },
    quxiao() {
      this.$message({
        type: "info",
        message: "已取消密码修改"
      });
      this.$store.commit("xiugai", false);
    }
  }
};
</script>

<style scoped>
.xiugaimima {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}

/deep/.el-dialog {
  width: 30% !important;
}
.dialog-footer {
  text-align: right;
}
</style>

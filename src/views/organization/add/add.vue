<template>
  <div>
    <div class="bgBorderTwo">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
        style="width: 30%"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入角色名称"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            type="textarea"
            v-model="form.desc"
            placeholder="请备注说明"
            :rows="6"
            @input="riseInput"
            maxlength="1000"
          ></el-input>
          <span class="shuliang">{{ extent }}/1000</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="bgBorderTwo">
      <div class="juse_title">角色分配</div>
      <el-row :gutter="24" class="juse_xuanze_title">
        <el-col :span="8">模块</el-col>
        <el-col :span="8">功能</el-col>
        <el-col :span="8">操作</el-col>
      </el-row>
      <el-row :gutter="24" class="juse_xuanze" v-if="a != ''">
        <el-col :span="8" class="juse_xuanze_left">
          <ul class="infinite-list" style="overflow: auto">
            <li
              v-for="(as, index) in a"
              :key="index"
              class="infinite-list-item juse_xuanze_left_div"
              @click="diyi(index)"
            >
              <img
                src="../../../assets/img/weixuanzhong.png"
                width="20"
                alt=""
                v-if="as.iconShow == '0'"
                @click="xuanzeyi(index)"
              />
              <img
                src="../../../assets/img/xuanzhong.png"
                width="20"
                alt=""
                v-else-if="as.iconShow == '1'"
                @click="xuanzeyi(index)"
              />
              <img
                src="../../../assets/img/quanxuan.png"
                width="20"
                alt=""
                v-else-if="as.iconShow == '2'"
                @click="xuanzeyi(index)"
              />
              <span>{{ as.name }}</span>
            </li>
          </ul>
        </el-col>
        <!-- {{a[diers]}} -->
        <el-col :span="8" class="juse_xuanze_left" v-if="a[diers]">
          <ul class="infinite-list" style="overflow: auto">
            <li
              v-for="(bs, index) in a[diers].isopt"
              :key="index"
              class="infinite-list-item juse_xuanze_left_div"
              @click="dier(index)"
            >
              <img
                src="../../../assets/img/weixuanzhong.png"
                width="20"
                alt=""
                v-if="bs.iconShow == '0'"
                @click="xuanzeer(index)"
              />
              <img
                src="../../../assets/img/quanxuan.png"
                width="20"
                alt=""
                v-else-if="bs.iconShow == '2'"
                @click="xuanzeer(index)"
              />
              <img
                src="../../../assets/img/xuanzhong.png"
                width="20"
                alt=""
                v-else-if="bs.iconShow == '1'"
                @click="xuanzeer(index)"
              />
              <span>{{ bs.name }}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8" class="juse_xuanze_left" v-if="a[diers].isopt[disan]">
          <ul class="infinite-list" style="overflow: auto">
            <li
              v-for="(cs, index) in a[diers].isopt[disan].isopt"
              :key="index"
              class="infinite-list-item juse_xuanze_left_div"
              @click="xuanzesan(index)"
            >
              <img
                src="../../../assets/img/quanxuan.png"
                width="20"
                alt=""
                v-if="cs.iconShow == '2'"
              />
              <img
                src="../../../assets/img/weixuanzhong.png"
                width="20"
                alt=""
                v-else
              />
              <span>{{ cs.name }}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div class="bgBorderTwo">
      <el-row>
        <el-button @click="black()">返回</el-button>
        <el-button type="primary" @click="save" v-if="iss == '1'"
          >保存</el-button
        >
        <el-button type="primary" @click="saves" v-else>修改</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { number } from "echarts";
// import a from "../../../assets/a/quanxian.a";
export default {
  name: "add",
  data() {
    return {
      form: {
        name: "",
        desc: "",
      },
      extent: "0",
      a: [],
      b: [],
      c: [],
      b1: [],
      c1: [],
      listMenus: [],
      listMenusP: {},
      frg: [],
      diers: "0",
      disan: "0",
      sd: "",
      id: "",
      iss: "1",
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.$route.query.id != undefined) {
      this.acquireLists();
      this.huoquyonghu();
      this.iss = "2";
    } else {
      this.acquireList();
    }
  },
  methods: {
    acquireList() {
      var a = this.a;
      var b = this.b;
      var c = this.c;
      var url = this.apis + "/system/jp-sys-role/queryMenuList";
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          // //console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].type == "1") {
              a.push(response.data[i]);
            } else if (response.data[i].type == "2") {
              b.push(response.data[i]);
            } else if (response.data[i].type == "3") {
              c.push(response.data[i]);
            }
          }
          var isopt = [];
          var sad = [];
          for (var o = 0; o < b.length; o++) {
            b[o].isopt = isopt;
            b[o].sad = sad;
          }
          for (var o = 0; o < a.length; o++) {
            a[o].isopt = isopt;
          }

          // //console.log(c[o].pid)
          for (var i = 0; i < b.length; i++) {
            var erf = [];
            for (var o = 0; o < c.length; o++) {
              if (b[i].id == c[o].pid) {
                erf.push(c[o]);
                b[i].isopt = erf;
              }
            }
          }
          for (var i = 0; i < a.length; i++) {
            var erf = [];
            for (var o = 0; o < b.length; o++) {
              if (a[i].id == b[o].pid) {
                erf.push(b[o]);
                a[i].isopt = erf;
              }
            }
          }
          for (var i = 0; i < a.length; i++) {
            if (a[i].ifSelect == "false") {
              a[i].iconShow = "0";
            } else if (a[i].ifSelect == "true") {
              a[i].iconShow = "1";
            }
            for (var o = 0; o < a[i].isopt.length; o++) {
              if (a[i].isopt[o].ifSelect == "false") {
                a[i].isopt[o].iconShow = "0";
              } else if (a[i].isopt[o].ifSelect == "true") {
                a[i].isopt[o].iconShow = "1";
              }
              for (var p = 0; p < a[i].isopt[o].isopt.length; p++) {
                if (a[i].isopt[o].isopt[p].ifSelect == "false") {
                  a[i].isopt[o].isopt[p].iconShow = "0";
                } else if (a[i].isopt[o].isopt[p].ifSelect == "true") {
                  a[i].isopt[o].isopt[p].iconShow = "2";
                }
              }
            }
          }
          this.a = a;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    diyi(e) {
      this.diers = e;
    },
    dier(e) {
      this.disan = e;
    },
    xuanzesan(e) {
      if (this.a[this.diers].isopt[this.disan].isopt[e].iconShow == "2") {
        this.a[this.diers].isopt[this.disan].isopt[e].iconShow = "0";
        var asd = this.listMenus.indexOf(this.a[this.diers].id);
        this.listMenus.splice(asd, 1);
        var asd1 = this.listMenus.indexOf(
          this.a[this.diers].isopt[this.disan].id
        );
        this.listMenus.splice(asd1, 1);
        var asd2 = this.listMenus.indexOf(
          this.a[this.diers].isopt[this.disan].isopt[e].id
        );
        this.listMenus.splice(asd2, 1);
      } else {
        this.a[this.diers].isopt[this.disan].isopt[e].iconShow = "2";
        this.listMenus.push(this.a[this.diers].id);
        this.listMenus.push(this.a[this.diers].isopt[this.disan].id);
        this.listMenus.push(this.a[this.diers].isopt[this.disan].isopt[e].id);
        // this.listMenus.push(this.a[this.diers].isopt[this.disan].isopt[e].id)
      }
      var csd = "0";
      for (
        var i = 0;
        i < this.a[this.diers].isopt[this.disan].isopt.length;
        i++
      ) {
        if (this.a[this.diers].isopt[this.disan].isopt[i].iconShow == "2") {
          csd++;
        }
      }
      //console.log(csd);
      if (csd == this.a[this.diers].isopt[this.disan].isopt.length) {
        this.a[this.diers].isopt[this.disan].iconShow = "2";
      } else if (csd == "0") {
        this.a[this.diers].isopt[this.disan].iconShow = "0";
      } else {
        this.a[this.diers].isopt[this.disan].iconShow = "1";
      }
      this.asfdf();
    },
    xuanzeer(e) {
      if (this.a[this.diers].isopt[e].iconShow == "2") {
        this.a[this.diers].isopt[e].iconShow = "0";
        var asd = this.listMenus.indexOf(this.a[this.diers].isopt[e].id);
        this.listMenus.splice(asd, 1);
        var asd1 = this.listMenus.indexOf(this.a[this.diers].isopt[e].pid);
        this.listMenus.splice(asd1, 1);
        for (var i = 0; i < this.a[this.diers].isopt[e].isopt.length; i++) {
          this.a[this.diers].isopt[e].isopt[i].iconShow = "0";
        }
      } else {
        this.a[this.diers].isopt[e].iconShow = "2";
        this.listMenus.push(this.a[this.diers].isopt[e].id);
        this.listMenus.push(this.a[this.diers].isopt[e].pid);
        for (var i = 0; i < this.a[this.diers].isopt[e].isopt.length; i++) {
          this.a[this.diers].isopt[e].isopt[i].iconShow = "2";
          this.listMenus.push(this.a[this.diers].isopt[e].isopt[i].id);
        }
      }
      // //console.log( this.a[this.diers].isopt)
      this.asfdf();
    },
    asfdf() {
      var asdef = [];
      for (var i = 0; i < this.a[this.diers].isopt.length; i++) {
        if (this.a[this.diers].isopt[i].iconShow == "2") {
          asdef.push("2");
        } else if (this.a[this.diers].isopt[i].iconShow == "0") {
          asdef.push("0");
        } else {
          asdef.push("1");
        }
      }
      var sdaef = "0";
      for (var p = 0; p < asdef.length; p++) {
        sdaef = Number(sdaef) + Number(asdef[p]);
      }
      // //console.log(sdaef)
      var qwe = "1";
      // //console.log(Number(0)/Number(2))
      if (sdaef % asdef.length == "0") {
        if (sdaef / asdef.length == "2") {
          qwe = "2";
        } else if (sdaef / asdef.length == "0") {
          qwe = "0";
        }
      } else {
        qwe = "1";
      }

      if (qwe == "2") {
        //全选
        this.a[this.diers].iconShow = "2";
      } else if (qwe == "1") {
        //未全选
        this.a[this.diers].iconShow = "1";
      } else {
        //都不选
        this.a[this.diers].iconShow = "0";
      }
    },
    xuanzeyi(e) {
      if (this.a[e].iconShow == "2") {
        this.a[e].iconShow = "0";
        var asd = this.listMenus.indexOf(this.a[e].id);
        this.listMenus.splice(asd, 1);
        for (var o = 0; o < this.a[e].isopt.length; o++) {
          this.a[e].isopt[o].iconShow = "0";
          var asd = this.listMenus.indexOf(this.a[e].isopt[o].id);
          this.listMenus.splice(asd, 1);
          for (var p = 0; p < this.a[e].isopt[o].isopt.length; p++) {
            this.a[e].isopt[o].isopt[p].iconShow = "0";
            var asd = this.listMenus.indexOf(this.a[e].isopt[o].isopt[p].id);
            this.listMenus.splice(asd, 1);
          }
        }
      } else if (this.a[e].iconShow == "1") {
        this.a[e].iconShow = "2";
        this.listMenus.push(this.a[e].id);
        for (var o = 0; o < this.a[e].isopt.length; o++) {
          this.a[e].isopt[o].iconShow = "2";
          // //console.log( this.a[e].isopt[o].id)

          this.listMenus.push(this.a[e].isopt[o].id);
          for (var p = 0; p < this.a[e].isopt[o].isopt.length; p++) {
            this.a[e].isopt[o].isopt[p].iconShow = "2";
            //  //console.log(  this.a[e].isopt[o].isopt[p].id)
            this.listMenus.push(this.a[e].isopt[o].isopt[p].id);
          }
        }
      } else {
        this.a[e].iconShow = "2";
        this.listMenus.push(this.a[e].id);
        for (var o = 0; o < this.a[e].isopt.length; o++) {
          this.a[e].isopt[o].iconShow = "2";
          //  //console.log( this.a[e].isopt[o].id)
          this.listMenus.push(this.a[e].isopt[o].id);
          for (var p = 0; p < this.a[e].isopt[o].isopt.length; p++) {
            this.a[e].isopt[o].isopt[p].iconShow = "2";
            // //console.log(  this.a[e].isopt[o].isopt[p].id)
            this.listMenus.push(this.a[e].isopt[o].isopt[p].id);
          }
        }
      }
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.listMenus.length == "0") {
            this.$message({
              showClose: true,
              offset: 400,
              message: "请先选择权限",
              type: "error",
            });
          } else {
            this.$alert("确定同意保存", "提示", {
              confirmButtonText: "确定",
              callback: (action) => {
                var frf = this.listMenus;
                for (var i = 0; i < frf.length; i++) {
                  if (frf.indexOf(frf[i]) != i) {
                    frf.splice(i, 1); //删除数组元素后数组长度减1后面的元素前移
                    i--; //数组下标回退
                  }
                }
                var url = this.apis + "/system/jp-sys-role";
                var obj = {
                  listMenus: frf,
                  name: this.form.name,
                  remarks: this.form.desc,
                };
                // return;
                this.httpsapi
                  .POST(url, obj)
                  .then((response) => {
                    // console.log(response.code);
                    if (response.code == "200") {
                      this.$message({
                        showClose: true,
                        offset: 400,
                        message: response.message,
                        type: "",
                      });
                    }
                  })
                  .catch((err) => {
                    //console.log(err);
                  });
              },
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saves() {
      this.$refs.form.validate((valid) => {
        if (valid) {
            if (this.listMenus.length == "0") {
            this.$message({
              showClose: true,
              offset: 400,
              message: "请先选择权限",
              type: "error",
            });
          } else {
          this.$alert("确定同意保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            callback: (action) => {
              var frf = this.listMenus;
              for (var i = 0; i < frf.length; i++) {
                if (frf.indexOf(frf[i]) != i) {
                  frf.splice(i, 1); //删除数组元素后数组长度减1后面的元素前移
                  i--; //数组下标回退
                }
              }
              var url = this.apis + "/system/jp-sys-role";
              var obj = {
                id: this.id,
                listMenus: frf,
                name: this.form.name,
                remarks: this.form.desc,
              };
              // return;
              this.httpsapi
                .PUT(url, obj)
                .then((response) => {
                  //console.log(response.data);
                  if (response.code == "200") {
                    this.$message({
                      showClose: true,
                      offset: 400,
                      message: response.message,
                      type: "",
                    });
                  }
                })
                .catch((err) => {
                  //console.log(err);
                });
            },
          });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    acquireLists() {
      //console.log('21')
      var url = this.apis + "/system/jp-sys-role/queryMenuListShow";
      var obj = {
        roleId: this.id,
      };
      // return;
      this.httpsapi
        .POST(url, obj)
        .then((response) => {
          this.a = response.data;
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].iconShow != "0") {
              this.listMenus.push(response.data[i].id);
            }
            for (var o = 0; o < response.data[i].isopt.length; o++) {
              if (response.data[i].isopt[o].iconShow != "0") {
                this.listMenus.push(response.data[i].isopt[o].id);
              }

              for (var p = 0; p < response.data[i].isopt[o].isopt.length; p++) {
                if (response.data[i].isopt[o].isopt[p].iconShow != "0") {
                  this.listMenus.push(response.data[i].isopt[o].isopt[p].id);
                }
              }
            }
          }
          console.log(this.listMenus);
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    huoquyonghu() {
      // /system/jp-sys-role/category/
      //console.log('123')
      var url = this.apis + "/system/jp-sys-role/category/" + this.id;
      var obj = {};
      // return;
      this.httpsapi
        .GET(url, obj)
        .then((response) => {
          //console.log(response.data)
          this.form.name = response.data.name;
          this.form.desc = response.data.remarks;
          this.extent = response.data.remarks.length;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    riseInput(e) {
      this.extent = e.length;
    },
    black() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.shuliang {
  position: absolute;
  right: 18px;
  bottom: -8px;
  color: rgba(0, 0, 0, 0.35);
}
.juse_title {
  width: 77px;
  height: 24px;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #000000;
  line-height: 24px;
  letter-spacing: 1px;
}
.juse_xuanze_title {
  height: 37px;
  background: #f4f4f4;
  border: 1px solid #d0d0d0;
  line-height: 37px;
  text-align: center;
}
.juse_xuanze_left {
  padding: 10px;
  border: 1px solid #d0d0d0;
  background: #ffffff;
  height: 301px;
}
.juse_xuanze_left ul img {
  padding: 0px 10px;
}
.juse_xuanze_left ul {
  height: 100%;
}
.juse_xuanze_left_div {
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.el-button {
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>

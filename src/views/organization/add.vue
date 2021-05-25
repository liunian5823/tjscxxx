<template>
  <div>
    <div class="bgBorderTwo">
      <el-form ref="form" :model="form" label-width="80px" style="width: 30%">
        <el-form-item
          label="角色名称"
          :rules="[{ required: true, message: '姓名不能为空' }]"
        >
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            type="textarea"
            v-model="form.desc"
            placeholder="请备注说明"
            :rows="6"
            @input="riseInput"
          ></el-input>
          <span class="shuliang">{{ extent }}/200</span>
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
      <el-row :gutter="24" class="juse_xuanze">
        <el-col :span="8" class="juse_xuanze_left">
          <ul class="infinite-list" style="overflow: auto">
            <li
              v-for="(as, index) in a"
              :key="index"
              class="infinite-list-item juse_xuanze_left_div"
            >
              <img src="../../assets/img/quanxuan.png" width="20" alt="" />
              <span @click="modules(index)">{{ as.name }}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8" class="juse_xuanze_left">
          <ul class="infinite-list" style="overflow: auto">
            <li
              v-for="(bs, index) in b1"
              :key="index"
              class="infinite-list-item juse_xuanze_left_div"
            >
              <img src="../../assets/img/quanxuan.png" width="20" alt="" />
              <span @click="functions(index)">{{ bs.name }}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8" class="juse_xuanze_left">
          <ul class="infinite-list" style="overflow: auto">
            <li
              v-for="(cs, index) in c1"
              :key="index"
              class="infinite-list-item juse_xuanze_left_div"
            >
              <img src="../../assets/img/quanxuan.png" width="20" alt="" />
              <span>{{ cs.name }}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div class="bgBorderTwo">
      <el-row>
        <el-button @click="black()">返回</el-button>
        <el-button type="primary">保存</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      form: {
        name: "",
        desc: ""
      },
      extent: "0",
      a: [],
      b: [],
      c: [],
      b1: [],
      c1: []
    };
  },
  mounted() {
    this.acquireList();
  },
  methods: {
    acquireList() {
      var a = this.a;
      var b = this.b;
      var c = this.c;
      var url = this.apis + "/system/jp-sys-role/queryMenuList";
      var obj = {
        roleId: ""
      };
      this.httpsapi
        .POST(url, obj)
        .then(response => {
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
          for (var o = 0; o < b.length; o++) {
            b[o].isopt = isopt;
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
          //  //console.log(this.b)
          for (var i = 0; i < a.length; i++) {
            var erf = [];
            for (var o = 0; o < b.length; o++) {
              if (a[i].id == b[o].pid) {
                erf.push(b[o]);
                a[i].isopt = erf;
              }
            }
          }
          //console.log(a);
        })
        .catch(err => {
          //console.log(err);
        });
    },
    modules(e) {
      this.b1 = this.a[e].isopt;
    },
    functions(e) {
      this.c1 = this.b1[e].isopt;
    },
    riseInput() {
      this.extent = this.form.desc.length;
    },
    black() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
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

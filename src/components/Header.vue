<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="logo">
      <img src="../assets/img/logo.png" alt="" srcset="" />
    </div>
    <div class="logos">
      <span>{{ name }}</span>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div>
          <span class="iconfont icon-wode1"></span> {{ users.realName }}
        </div>
        <div @click="xiugaimima">
          <span class="iconfont icon-xiugaimima"></span>修改密码
        </div>
        <div @click="tuichu">
          <span class="iconfont icon-tuichudenglu"></span>退出登录
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullscreen: false,
      message: 2,
      users: [],
      name: ""
    };
  },
  mounted() {
    //console.log(this.$route)
    this.$store.commit("xiugai", false);
    this.huoquyonghuxinxi();
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
  computed: {
    username() {
      var username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    },
    collapse() {
      return this.$store.state.collapse;
    }
  },

  methods: {
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.$store.commit("hadndleCollapse", !this.collapse);
    },
    huoquyonghuxinxi() {
      var url = this.apis + "/getInfo";
      var obj = {};
      this.httpsapi
        .GET(url, obj)
        .then(response => {
          if (response.code == "200") {
            //console.log(response);
            this.users = response.user;
            this.name = response.user.jpFws.name;
            this.$store.commit("logininformation", response.user);
            localStorage.setItem("spid", response.user.spId);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    tuichu() {
      this.$confirm("确认退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          var url = this.apis + "/logout";
          var obj = {};
          this.httpsapi
            .GET(url, obj)
            .then(response => {
              if (response.code == "200") {
                //console.log(response);
                localStorage.removeItem("certificate");
                this.$router.push("/login");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    xiugaimima() {
      this.$store.commit("xiugai", true);
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background: #004197;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.logo {
  position: relative;
  left: 19px;
  top: 68%;
  transform: translateY(-50%);
}
.logo img {
  width: 195px;
}

.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.logos {
  float: left;
  width: 250px;
  line-height: 70px;
  font-size: 21px;
  margin-left: 30px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
  cursor: pointer;
}
.header-user-con div {
  margin-left: 10px;
  font-size: 16px;
}
.header-user-con span {
  margin-left: 30px;
  padding: 5px;
  font-size: 16px;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 16px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>

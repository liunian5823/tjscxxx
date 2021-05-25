<template>
  <div>
    <div class="bgBorderTwo">
      <p class="title">待办事项</p>
      <el-row class="todo">
        <el-col :span="5" @click.native="goneed('10','need')">
          <img src="../../assets/img/todo-1.png" />
          <div class="el-right">
            <p class="e-r-t">{{ todo.pendingNum }}</p>
            <p class="e-r-b">待受理</p>
          </div>
        </el-col>
        <el-col :span="6" @click.native="goneed('10','order')">
          <img src="../../assets/img/todo-2.png" />
          <div class="el-right">
            <p class="e-r-t">{{ todo.handleNum }}</p>
            <p class="e-r-b">待处置</p>
          </div>
        </el-col>
        <el-col :span="6" @click.native="goneed('40','bidding')">
          <img src="../../assets/img/todo-3.png" />
          <div class="el-right">
            <p class="e-r-t">{{ todo.biddingNum }}</p>
            <p class="e-r-b">待竞价</p>
          </div>
        </el-col>
        <el-col :span="6" @click.native="goneed('60','bidding')">
          <img src="../../assets/img/todo-4.png" />
          <div class="el-right">
            <p class="e-r-t">{{ todo.selectionNum }}</p>
            <p class="e-r-b">待开标</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bgBorderTwo">
      <p class="title">处置数据统计</p>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="委托项目部">
          <el-select v-model="formInline.projectId" placeholder="请选择">
            <el-option
              v-for="(item, index) in projectId"
              :label="item.text"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <div>
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              align="left"
              editable="false"
              start-placeholder="开始日期"
              unlink-panels="true"
              end-placeholder="结束日期"
              @change="timeChange"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="el-btn-search el-blueColor"
            type="primary"
            @click="onSubmit()"
            >搜索</el-button
          >
          <el-button class="el-btn-reset el-noColor" @click="resetForm()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 统计数据 -->
      <el-row class="el-statistical" :gutter="10">
        <el-col :lg="3" :md="6" :sm="6">
          <div class="el-col-bg">
            <div class="el-col-num">{{ statistics.acceptNum }}</div>
            <div class="el-col-text">累计受理(笔)</div>
          </div>
        </el-col>
        <el-col :lg="3" :md="6" :sm="6">
          <div class="el-col-bg">
            <div class="el-col-num">{{ statistics.signatureNum }}</div>
            <div class="el-col-text">累计签章(份)</div>
          </div>
        </el-col>
        <el-col :lg="3" :md="6" :sm="6">
          <div class="el-col-bg">
            <div class="el-col-num">{{ statistics.sceneNum }}</div>
            <div class="el-col-text">竞价场次(场)</div>
          </div>
        </el-col>
        <el-col :lg="3" :md="6" :sm="6">
          <div class="el-col-bg">
            <div class="el-col-num">{{ statistics.closingRatio }}</div>
            <div class="el-col-text">成交率</div>
          </div>
        </el-col>
        <el-col :lg="4" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ statistics.totalDeal }}</div>
            <div class="el-col-text">成交总额(元)</div>
          </div>
        </el-col>
        <el-col :lg="4" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ statistics.totalPremium }}</div>
            <div class="el-col-text">溢价总额(元)</div>
          </div>
        </el-col>
        <el-col :lg="4" :md="8" :sm="8">
          <div class="el-col-bg">
            <div class="el-col-num">{{ statistics.totalServiceFee }}</div>
            <div class="el-col-text">服务费总额(元)</div>
          </div>
        </el-col>
      </el-row>
      <!-- 饼图 -->
      <el-row class="charts charts1" :gutter="15">
        <el-col :lg="12" :md="24" :sm="24">
          <div class="charts-div">
            <p class="title">委托受理占比</p>
            <!-- <schart class="schart" canvasId="pie" :options="chartsOne"></schart> -->
            <div id="myChart1"></div>
          </div>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24">
          <div class="charts-div">
            <p class="title">竞价场次占比</p>
            <div id="myChart2"></div>
          </div>
        </el-col>
      </el-row>
      <!-- 进度条 -->
      <el-row class="charts charts2" :gutter="15">
        <el-col :lg="12" :md="24" :sm="24" style="margin: 10px 0">
          <div class="charts-div">
            <p class="title">成交额排行</p>
            <div class="customDiv">
              <el-row
                :gutter="10"
                v-for="(item, index) in dealList"
                :key="index"
              >
                <el-col :xl="3" :lg="4" :md="4" :sm="4">{{ item.name }}</el-col>
                <el-col :xl="17" :lg="15" :md="15" :sm="15">
                  <el-progress
                    :show-text="false"
                    :stroke-width="14"
                    :percentage="item.percentage"
                    color="#2DB7F5"
                  ></el-progress>
                </el-col>
                <el-col
                  :xl="4"
                  :lg="5"
                  :md="5"
                  :sm="5"
                  v-text="item.total.toFixed(2) + '元'"
                ></el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24" style="margin: 10px 0">
          <div class="charts-div">
            <p class="title">服务费排行</p>
            <div class="customDiv">
              <el-row
                :gutter="10"
                v-for="(item, index) in serviceFeeList"
                :key="index"
              >
                <el-col :xl="3" :lg="4" :md="4" :sm="4">{{ item.name }}</el-col>
                <el-col :xl="17" :lg="15" :md="15" :sm="15">
                  <el-progress
                    :show-text="false"
                    :stroke-width="14"
                    :percentage="item.percentage"
                    color="#2DB7F5"
                  ></el-progress>
                </el-col>
                <el-col :xl="4" :lg="5" :md="5" :sm="5">{{
                  item.total.toFixed(2) + "元"
                }}</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts';
var echarts = require("echarts");
export default {
  name: "index",
  data() {
    return {
      myChart1: {},
      myChart2: {},
      // 待办事项
      todo: {},
      // 数据统计
      statistics: {},
      formInline: {},
      projectId: [],
      dealList: [],
      serviceFeeList: []
    };
  },
  mounted() {
    // 查询数据
    this.QueryData();
    // 查询委托项目部
    this.queryProject();
  },
  methods: {
    goneed(status, routeName) {
      console.log(status)
      console.log(routeName);
      this.$router.push({
        name: routeName,
        query: {
          stataus: status
        }
      });
    },
    // 查询数据
    QueryData() {
      var that = this;
      that.httpsapi.POST(that.apis + "/backlogInfo", {}).then(result => {
        if (result.code == 200) {
          this.todo = result.data;
        }
      });
      console.log(this.formInline)
      that.httpsapi
        .POST(that.apis + "/handleStatistics/", this.formInline)
        .then(result => {
          console.log(result);
          if (result.code == 200) {
            this.statistics = result.data;
            var optionData1 = [
              { value: result.data.accept_10, name: "待受理" },
              { value: result.data.accept_20, name: "受理中" },
              { value: result.data.accept_30, name: "已完成" },
              { value: result.data.accept_40, name: "已关闭" }
            ];
            var optionData2 = [
              { value: result.data.scene_50, name: "竞价中" },
              { value: result.data.scene_71, name: "成交" },
              { value: result.data.scene_72, name: "流标" },
              { value: result.data.scene_100, name: "作废" }
            ];
            that.$nextTick(() => {
              that.Goecharts(
                optionData1,
                result.data.acceptAllNum,
                optionData2,
                result.data.sceneAll
              );
            });
            // 成交额排行
            result.data.dealList.forEach((item, index) => {
              item.percentage = (item.total / result.data.dealMax) * 100;
            });
            this.dealList = result.data.dealList;
            // 服务费排行
            result.data.serviceFeeList.forEach((item, index) => {
              item.percentage = (item.total / result.data.dealMax) * 100;
            });
            this.serviceFeeList = result.data.serviceFeeList;
          }
        });
    },
    // 查询委托项目部
    queryProject() {
      var _this = this;
      var url = _this.apis + "/system/jp-entrust/searchProjectList";
      _this.httpsapi
        .POST(url, {})
        .then(result => {
          var _result = result.data;
          if (result.code == "200") {
            _result.forEach(item => {
              _this.projectId.push({
                id: item.ecOrganizationId,
                text: item.projectName
              });
            });
          }
        })
        .catch(err => {});
    },
    // 转换时间
    Timetransf(_date) {
      var newDate = new Date(_date);
      var y = newDate.getFullYear();
      var m = newDate.getMonth() + 1;
      var d = newDate.getDate();
      var h = newDate.getHours();
      var f = newDate.getMinutes();
      var s = newDate.getSeconds();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      return { y: y, m: m, d: d, h: h, f: f, s: s };
    },
    // 监听时间范围
    timeChange(data) {
      var data1 = this.Timetransf(data[0]);
      var data2 = this.Timetransf(data[1]);
      this.formInline.startTime =
        data1.y + "-" + data1.m + "-" + data1.d + " 00:00:00";
      this.formInline.endTime =
        data2.y + "-" + data2.m + "-" + data2.d + " 23:59:59";
    },
    // 搜索
    onSubmit() {
      this.QueryData();
    },
    // 重置功能
    resetForm() {
      this.formInline = {};
      this.QueryData();
    },
    // echarts 饼图参数配置
    setOption(optionData, _total) {
      return {
        legend: {
          orient: "vertical",
          left: "60%",
          top: "60px",
          itemGap: 25,
          textStyle: {
            fontSize: 15
          },
          formatter: function(name) {
            var total = _total;
            var target = 0;
            var value = 0;
            for (var i = 0, l = optionData.length; i < l; i++) {
              value = optionData[i].value;
              if (optionData[i].name == name) {
                target = optionData[i].value;
              }
            }
            if (total != 0) {
              var perce = ((target / total) * 100).toFixed(2);
            } else {
              var perce = "0.00";
            }
            return name + "  " + target + "  (" + perce + "%)";
          }
        },
        series: [
          {
            radius: ["0%", "60%"],
            type: "pie",
            center: ["35%", "50%"],
            data: optionData,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            emphasis: {
              itemStyle: {
                borderRadius: 0,
                borderColor: "#fff",
                borderWidth: 3
              },
              label: {
                show: false
              }
            }
          }
        ]
      };
    },
    // 渲染实例
    Goecharts(_data1, _total1, _data2, _total2) {
      this.myChart1 = echarts.init(document.getElementById("myChart1"));
      this.myChart2 = echarts.init(document.getElementById("myChart2"));
      this.myChart1.setOption(this.setOption(_data1, _total1));
      this.myChart2.setOption(this.setOption(_data2, _total2));
      // window.addEventListener("resize", function() {
      // 	this.myChart1.resize();
      // 	this.myChart2.resize();
      // });
    }
  }
};
</script>

<style scoped="">
#myChart1,
#myChart2 {
  width: 100%;
  height: 90%;
}
.customDiv {
  margin-top: 30px;
}

.customDiv .el-row {
  margin: 20px 0;
}

.customDiv .el-clearfix .lef {
  width: 100px;
}

.customDiv .el-clearfix .mod {
  width: 67%;
  margin: 10px;
}

.customDiv .el-clearfix .rig {
  width: 120px;
}

.schart {
  height: 90%;
}

.charts {
  /* margin: 10px 0; */
}

.charts.charts1 .el-col {
  margin: 10px 0;
}

.charts .el-col .charts-div {
  padding: 15px 25px;
  height: 299px;
  background: #fefefe;
  box-shadow: 0px 2px 4px 0px #e9ecef;
  border-radius: 4px;
  border: 1px solid #eeeeee;
}

.el-statistical .el-col {
  padding: 15px 0;
  font-family: MicrosoftYaHei;
  color: #000000;
}

.el-statistical .el-col .el-col-bg {
  background: rgba(45, 183, 245, 0.05);
  border-radius: 4px;
  height: 88px;
  width: 100%;
}

.el-statistical .el-col .el-col-bg div {
  padding: 15px;
}

.el-statistical .el-col-num {
  width: 100%;
  height: 35px;
  line-height: 31px;
  font-size: 24px;
}

.el-statistical .el-col-text {
  width: 100%;
  font-size: 16px;
  height: 21px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.7);
}

.demo-form-inline {
  margin-top: 25px;
}

.el-form--inline .el-form-item {
  margin-right: 30px;
  font-weight: bold !important;
}

.el-form-item__label {
  color: #000000 !important;
}

.title {
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #000000;
  line-height: 24px;
  letter-spacing: 1px;
  margin-bottom: 15px;
}

.todo {
  text-align: center;
  padding: 25px 0;
}

.todo .el-col {
  position: relative;
}
.todo .el-col:hover {
  cursor: pointer;
}
.todo .el-col:hover .el-right .e-r-t {
  color: #f53d05;
}
.todo .el-col:hover .el-right .e-r-b {
  font-weight: bold;
  font-size: 16px;
}

.todo .el-col:first-child {
  text-align: left;
  padding-left: 15px;
}

.todo .el-col::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 34px;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0;
  top: 15px;
}

.todo .el-col:last-child::after {
  width: 0;
}

.todo .el-col img {
  width: 48px;
  height: 48px;
}

.todo .el-right {
  display: inline-block;
  margin-left: 15px;
  top: -1px;
  position: relative;
  font-family: MicrosoftYaHei;
}

.todo .el-right .e-r-t {
  width: 16px;
  height: 31px;
  font-size: 24px;
  color: #fa9b13;
  line-height: 31px;
  letter-spacing: 1px;
}

.todo .el-right .e-r-b {
  margin-top: 5px;
  font-size: 16px;
  color: #000000;
  line-height: 21px;
  letter-spacing: 1px;
}
.charts2 .el-col .charts-div {
  min-height: 100px;
  height: auto;
}
</style>

<template>
  <div>
    <div class="bgBorderTwo">
      <el-row>
        <el-col :span="24" class="lines">账户类型： </el-col>
        <el-divider></el-divider>
        <el-col :span="12">
          <el-row>
            <el-col :span="4" class="line">账户类型： </el-col>
            <el-col :span="20" class="line">平安银行账户</el-col>
            <el-col :span="4" class="line">开户时间： </el-col>
            <el-col :span="20" class="line">2021-04-07 12:02:53</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="4" class="line1">开户预留联系人： </el-col>
            <el-col :span="20" class="line1">张三李四 </el-col>
            <el-col :span="4" class="line1">开户预留手机号 </el-col>
            <el-col :span="20" class="line1"
              >188888888888 <span class="anniu">变更预留手机号</span>
              <span class="annius"
                >本手机号用于接收短信通知及短信验证码</span
              ></el-col
            >
            <el-col :span="4" class="line1">开户预留邮箱： </el-col>
            <el-col :span="20" class="line1">78954854545sfasf@crcc.com</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">12</div>
      </div>
      <!-- 详情 -->
      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>组织类型</span>：</label>
          <div class="tCon">123</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>项目编号</span>：</label>
          <div class="tCon">789</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>所属企业</span>：</label>
          <div class="tCon">48596</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>统一社会信用代码</span>：</label>
          <div class="tCon">7489</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>创建时间</span>：</label>
          <div class="tCon">12</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>项目联系人</span>：</label>
          <div class="tCon">
           123
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>项目地址</span>：</label>
          <div class="tCon">
          456
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>业务负责人</span>：</label>
          <div class="tCon">4685</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>备注</span>：</label>
          <div class="tCon">
            <el-input
              type="textarea"
              :rows="2"
              placeholder=""
              v-model="textarea"
              @input="beizhu"
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style>
.line {
  line-height: 34px;
}
.line1 {
  line-height: 22px;
}
.lines {
  line-height: 15px;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 29px 0 6px;
  background: #000;
}
.anniu {
  background: #169bd5;
  padding: 7px 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  position: relative;
  top: 0;
  left: 100px;
  cursor: pointer;
}
.annius {
  font-size: 12px;
}
</style>

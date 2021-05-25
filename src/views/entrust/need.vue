<template>
  <div id="need">
    <!-- 搜索组件 -->
    <searchui :searchFormArr="searchFormArr" @searchParma="searchParma" :isAccording="isAccording" ></searchui>

    <div class="bgBorderTwo">
      <el-menu :default-active="tabactive" text-color="#000" class="el-menu-demo el-menu-color" mode="horizontal" @select="handleSelect" >
        <el-menu-item index="0">全部</el-menu-item>
        <el-menu-item index="10">待受理</el-menu-item>
        <el-menu-item index="20">受理中</el-menu-item>
        <el-menu-item index="30">已完成</el-menu-item>
        <el-menu-item index="40">已关闭</el-menu-item>
        <el-button
          class="el-pull-right Button-1 el-blueColor"
          size="medium"
          @click="needAdd()"
          >添加委托需求</el-button
        >
      </el-menu>
      <!-- 表格组件 -->
      <tableTwo :table="table" @tableFuncCellback="tableFuncCellback"></tableTwo>
      <!-- 分页 -->
      <div class="paging">
        <el-pagination
          background="false"
          :page-size="size"
          pager-count="8"
          :current-page="page"
          layout="total, prev, pager, next,sizes,jumper"
          :total="total"
          @size-change="tablePageSize"
          @current-change="tableCurrentChange"
          @prev-click="tableCurrentChange"
          @next-click="tableCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 处理结果 -->
    <div
      class="proResults"
      :class="{ active: dialogFormVisibleActive }"
      v-if="dialogFormVisible"
      @click="Procancel">
      <!-- 处理结果 -->
      <div class="proResults-Childer" @click.stop>
        <div class="card-header el-clearfix">
          <span>处理结果</span>
          <span class="el-pull-right" type="text" @click="Procancel">×</span>
        </div>
        <!-- 委托成功 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="rForm"
          label-width="100px"
          class="demo-ruleForm need"
        >
          <el-form-item
            label="处理结果:"
            prop="dealwithStatus"
            style="border-bottom: 1px solid rgba(0, 0, 0, 0.1);"
          >
            <el-radio-group
              v-model="ruleForm.dealwithStatus"
              @change="changeFunc"
            >
              <el-radio label="1">委托成功</el-radio>
              <el-radio label="0">委托未成功</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="isEntrust == 1">
            <div>
              <el-form-item
                label="报价税率:"
                prop="rateType"
                style="display: inline-block;"
              >
                <el-radio-group
                  v-model="ruleForm.rateType"
                  @change="isOfferRate = !isOfferRate"
                >
                  <el-radio label="0">报价不含税</el-radio>
                  <el-radio label="1">报价含税</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="rate" v-if="isOfferRate" class="rateSelect">
                <el-select v-model="ruleForm.rate" placeholder="请选择税率">
                  <el-option label="13%" value="13"></el-option>
                  <el-option label="9%" value="9"></el-option>
                  <el-option label="6%" value="6"></el-option>
                  <el-option label="3%" value="3"></el-option>
                  <el-option label="1%" value="1"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item label="委托协议:" prop="signType">
              <el-radio-group v-model="ruleForm.signType">
                <el-radio label="1" disabled>线上签订</el-radio>
                <el-radio label="2">线下签订</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="委托协议:"
              prop="contractUrl"
              class="uploadFile"
            >
              <el-button class="upload" @click="wtcgupload">上传附件</el-button>
              <el-button class="upTem" type="text" @click="upTemDownLoad">委托协议模板下载</el-button>
              <span style="padding-left: 15px;">{{ spfilen1 }}</span>
              <el-input type="input" v-model="ruleForm.contractUrl" style="border: 0 !important;display: none;"></el-input>
            </el-form-item>
            <el-form-item
              label="委托协议:"
              prop="fileIds"
              class="uploadFile"
              v-if="!isEntrust"
            >
              <el-button class="upload">上传附件</el-button>
            </el-form-item>
            <el-form-item label="生效时间:" prop="effectiveDate">
              <el-date-picker
                type="date"
                placeholder="合同签订日期"
                v-model="ruleForm.effectiveDate"
                @change="effectiveDateFunc"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="委托协议编号:"
              prop="agreementNum"
              class="codeBianhao"
            >
              <el-input
                v-model="ruleForm.agreementNum"
                placeholder="请填写委托协议编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="清运期限:" prop="dealwithDate">
              <el-date-picker
                v-model="ruleForm.dealwithDate"
                type="datetime"
                placeholder="选择日期时间"
                @change="dealwithDateFunc"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="处置期限:" prop="dealWithValue">
              <el-input
                v-model="ruleForm.dealWithValue"
                style="width: 80px;margin-right: 5px;"
                @blur="dealWithValue"
              ></el-input
              >天
              <el-checkbox
                v-model="ruleForm.dealWithType"
                style="margin-left: 15px;"
                @change="dValue"
                >无要求</el-checkbox
              >
            </el-form-item>
            <el-form-item
              label="详细说明:"
              prop="detailedExplain"
              class="el-input-textarea buchong"
              >
              <el-input
                type="textarea"
                v-model="ruleForm.detailedExplain"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
          </div>

          <div v-else-if="isEntrust == 0">
            <el-form-item label="委托协议:" prop="fileIds" class="uploadFile buchong">
              <el-button class="upload" @click="wtupload">上传附件</el-button>
              <span style="padding-left: 15px;">{{ spfilen2 }}</span>
              <el-input type="input" v-model="ruleForm.fileIds" style="border: 0 !important;display: none;"></el-input>
            </el-form-item>
            <el-form-item label="详细说明:" prop="detailedExplain" class="buchong">
              <el-input
                type="textarea"
                v-model="ruleForm.detailedExplain"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
          </div>

          <el-form-item class="btn">
            <el-button class="el-noColor" @click="resetForm('rForm')"
              >取消</el-button
            >
            <el-button class="el-blueColor" @click="submitForm('rForm')"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  <!-- input type="file" -->
  <input type="file" ref="inputFile" class="inputFileClass" @change="FileUpload">
  </div>
</template>

<script>
export default {
  name: "needs",
  data() {
    return {
      isAccording: true,
      tabactive: "0",
      // 搜索组件数据
      searchFormArr: [
        {
          fieldName: "委托企业",
          type: "input",
          field: "enterpriseName",
          placeholder: "名称/统一社会代码"
        },
        {
          fieldName: "委托项目部",
          type: "select",
          field: "projectId",
          option: [],
          placeholder: "请选择"
        },
        {
          fieldName: "标题/编号",
          type: "input",
          field: "title",
          placeholder: "请输入"
        },
        {
          fieldName: "委托工单状态",
          type: "select",
          field: "status",
          option: [
            { id: "10", text: "待受理" },
            { id: "20", text: "受理中" },
            { id: "30", text: "已完成" },
            { id: "40", text: "已关闭" }
          ],
          placeholder: "请选择"
        },
        {
          fieldName: "委托时间",
          type: "date",
          field: "time1",
          placeholder: ""
        },
        {
          fieldName: "受理时间",
          type: "date",
          field: "time2",
          placeholder: ""
        },
        {
          fieldName: "完成时间",
          type: "date",
          field: "time3",
          placeholder: ""
        },
        {
          fieldName: "处理结果",
          type: "select",
          field: "dealwithStatus",
          option: [
            { id: "1", text: "委托成功" },
            { id: "0", text: "委托未成功" }
          ],
          placeholder: "请选择"
        },
        {
          fieldName: "委托人/电话",
          type: "input",
          field: "entrustUser",
          placeholder: "姓名/电话"
        },
        {
          fieldName: "受理人/电话",
          type: "input",
          field: "realName",
          placeholder: "姓名/电话"
        }
      ],
      // 表格组件--开始
      table: {
        // 表格操作
        operationList: {
          "10": ["查看详情", "受理"],
          "20": ["查看详情", "处理", "释放"],
          "002": ["查看详情"],
          "30": ["查看详情"],
          "40": ["查看详情"]
        },
        // 操作块儿是否显示
        isoperation: true,
        // 数据数组
        StatusField:'needStatus',
        Dataorigin: [],
        // 右侧操作宽度
        operationW: "180",
        // 表头数组
        header: [
          {
            name: "委托需求编号",
            prop: "entrustNum",
            width: "200",
            sortable: "custom"
          },
          {
            name: "委托企业",
            prop: "enterpriseName",
            width: "230",
            sortable: "custom"
          },
          {
            name: "委托项目部",
            prop: "projectName",
            width: "150",
            sortable: "custom"
          },
          { name: "委托标题", prop: "title", width: "250", sortable: "" },
          {
            name: "委托工单状态",
            prop: "statusName",
            width: "140",
            sortable: "custom"
          },
          { name: "委托时间", prop: "createTime", width: "100", sortable: "custom" },
          { name: "受理人", prop: "realNameCnsNo", width: "220", sortable: "custom" },
          {
            name: "受理时间",
            prop: "acceptorUserDate",
            width: "100",
            sortable: "custom"
          },
          {
            name: "委托人",
            prop: "entrustUserCnsNO",
            width: "220",
            sortable: "custom"
          },
          {
            name: "看货对接人",
            prop: "lookUserNameCnsNo",
            width: "220",
            sortable: "custom"
          },
          {
            name: "完成/关闭时间",
            prop: "dealwithDate",
            width: "180",
            sortable: "custom"
          },
          {
            name: "处理结果",
            prop: "dealwithStatusName",
            width: "150",
            sortable: "custom"
          }
        ]
      },
      // 表格组件--结束
      // 分页
      needId: "", //表格数据的某一条id
      entNum: "", //委托需求编号
      page: 1,
      size: 10,
      total: 0,
      param: {},
      search: {},
      SpecifiedField:[],
      spfilen1:'',
      spfilen2:'',
      dialogFormVisibleActive: false,
      dialogFormVisible: false,
      isEntrust: 1, //是否委托成功
      isOfferRate: false, //报价是否含税
      ruleForm: {
        dealwithStatus: "1",
        rateType: "0",
        rate: "",
        signType: "2",
        contractUrl: "",
        effectiveDate: "",
        agreementNum: "",
        dealwithDate: "",
        clearanceTime: "",
        dealWithType: false,
        dealWithValue: "",
        fileIds:'',
        detailedExplain: ""
      },
      ruleForm2: {
        dealwithStatus: "0",
        detailedExplain: "",
        fileIds: ""
      },
      // 弹出框正则验证
      rules: {
        dealwithStatus: [
          { required: true, message: "请选择处理结果", trigger: "change" }
        ],
        rateType: [
          { required: true, message: "请选择报价税率", trigger: "change" }
        ],
        rate: [{ required: true, message: "请选择税率", trigger: "change" }],
        signType: [
          { required: true, message: "请选择委托协议类型", trigger: "change" }
        ],
        contractUrl: [
        	{ required: true, message: '请上传委托协议附件', trigger: 'change' }
        ],
        fileIds: [
        	{ required: true, message: '请上传附件', trigger: 'change' }
        ],
        effectiveDate: [
          { required: true, message: "请填写选择生效时间", trigger: "blur" }
        ],
        agreementNum: [
          { required: true, message: "请填写委托协议编号", trigger: "blur" }
        ],
        dealwithDate: [
          { required: true, message: "请选择清运时间", trigger: "change" }
        ],
        dealWithValue:[
          {validator: function(rule, value, callback){
          	if(String(value).indexOf(".") != -1){
          		callback(new Error('请输入大于0的整数')) //防止输入多个小数点
          	}else if(value == ''){
          		callback();
          	}else{
              callback();
            }
          }, trigger:['change','blur']}
        ],
        detailedExplain: [
          { required: true, message: "请填写详细说明", trigger: "change" }
        ]
      }
    };
  },
  activated(){
    // 获取参数
    this.theQuery();
    // 调用渲染列表接口
    this.QueryList();
    // 查询委托项目部
    this.queryProject();
  },
  mounted() {
    // 获取参数
    this.theQuery();
    // 调用渲染列表接口
    this.QueryList();
    // 查询委托项目部
    this.queryProject();
  },
  methods: {
    // 获取参数
    theQuery() {
      if (this.$route.query.stataus != undefined) {
        this.tabactive = this.$route.query.stataus;
        this.param = {
          status: this.$route.query.stataus
        };
      }
    },
    // 自动点击上传
    upload(){
    	this.$refs.inputFile.dispatchEvent(new MouseEvent('click'))
    },
    // 监听文件上传
    FileUpload(e){
    	var that = this;
      if(that.SpecifiedField[0] == 'wtbcg'){
        that.uploading.uploading(e, "5", "doc/docx/xls/xlsx/pdf/jpg/png", that,function(result){
          that.ruleForm.fileIds = result.url;
          that.spfilen2 = result.fullname;
        });
      }else if(that.SpecifiedField[0] == 'wtcg'){
        that.uploading.uploading(e, "5", "doc/docx/xls/xlsx/pdf/jpg/png", that,function(result){
          that.ruleForm.contractUrl = result.url;
          that.spfilen1 = result.fullname;
        });
      }
      that.$refs.inputFile.value = '';
    },
    // 搜索子组件回调----高级搜索
    searchParma(data) {
      var _obj = data;
      var _this = this;
      var _obj = {};
      if (JSON.stringify(data) == "{}") {
        var item1, item2;
        for (item1 in _this.param) {
          for (item2 in _this.search) {
            if (item1 == item2) {
              delete _this.param[item2];
            }
          }
        }
      } else {
        if (_obj.time1) {_obj.createTime = _obj.time1[0];_obj.updateTime = _obj.time1[1];}
        if (_obj.time2) {_obj.acceptorUserDate = _obj.time2[0];_obj.acceptorUserDateEnd = _obj.time2[1];}
        if (_obj.time3) {_obj.dealwithDate = _obj.time3[0];_obj.dealwithDateEnd = _obj.time3[1];}
        _obj = data;
        _this.search = data;
      }
      Object.assign(this.param, _obj);
      this.QueryList();
    },
    // 点击tab导航搜索
    handleSelect(index, indexPath) {
      this.param.status = index;
      this.QueryList();
    },
    // 渲染委托列表
    QueryList() {
      var _this = this;
      var url = _this.apis +"/entrust/jp-entrust-infor/search/" +_this.page +"/" +_this.size;
      _this.httpsapi.POST(url, _this.param).then(result => {
          console.log(result);
          if (result.code == "200") {
            var _records = result.data.records;
            _this.total = result.data.total;
            _records.forEach((item, index) => {
              item.needStatus = item.status;
              switch (item.status) {
                case 10:
                  item.statusName = "待受理";
                  break;
                case 20:
                  item.statusName = "受理中";
                  var currentId = _this.$store.state.logininformation.id;
                  if(currentId != item.acceptorUserId){
                    item.needStatus = '002';
                  }
                  break;
                case 30:
                  item.statusName = "已完成";
                  break;
                case 40:
                  item.statusName = "已关闭";
                  break;
                default:
                  break;
              }
              switch (item.dealwithStatus) {
                case 1:
                  item.dealwithStatusName = "委托成功";
                  break;
                case 0:
                  item.dealwithStatusName = "委托未成功";
                  break;
                default:
                  break;
              }
              // 委托企业
              if(item.enterpriseName.length > 20){
                var ent = item.enterpriseName;
                item.enterpriseName = ent.substring(0,3)+'...'+ent.substring(ent.length - 16,ent.length);
              }
              // 委托项目部
              if(item.projectName.length > 50){
                var pro = item.projectName;
                item.projectName = pro.substring(0,20)+'...'+pro.substring(pro.length - 28,pro.length);
              }
              // 委托标题
              if(item.title.length > 20){
                var tit = item.title;
                item.title = tit.substring(0,20)+'...';
              }

              item.realNameCnsNo = (item.realName == null?'':item.realName) + " " + (item.phone == null? '':item.phone);
              item.entrustUserCnsNO = (item.entrustUser == null?'':item.entrustUser) + " " + (item.entrustUserPhone == null?'':item.entrustUserPhone);
              item.lookUserNameCnsNo = (item.lookUserName == null?'':item.lookUserName) + " " + (item.lookUserPhone == null?'':item.lookUserPhone);
            });
            _this.table.Dataorigin = _records;
          }
        })
        .catch(err => {});
    },
    // 查询委托项目部
    queryProject() {
      var _this = this;
      var url = _this.apis + "/system/jp-entrust/searchProjectList";
      _this.httpsapi
        .POST(url, this.param)
        .then(result => {
          var _result = result.data;
          if (result.code == "200") {
            _result.forEach(item => {
              _this.searchFormArr[1].option.push({
                id: item.ecOrganizationId,
                text: item.projectName
              });
            });
          }
          //console.log(_this.searchFormArr)
        })
        .catch(err => {});
    },
    // 添加委托需求
    needAdd() {
      this.$router.push({ name: "needAdd" });
    },
    // 表格子级回调的方法
    tableFuncCellback(data) {
      switch (data[1]) {
        case "查看详情":
          this.ForDetails(data);
          break;
        case "受理":
          this.accepThe(data);
          break;
        case "释放":
          this.releaseOf(data);
          break;
        case "处理":
          this.ToDealWith(data);
          break;
        case "排序":
          this.sortingq(data[0]);
          break;
        default:
          break;
      }
    },
    // 排序
    sortingq(data) {
      var reg = new RegExp("CnsNo", "g"),
        field;
      if (data.prop != null) {
        field = data.prop.replace(reg, "");
      } else {
        field = null;
      }
      this.param.orderBy = field;
      this.param.descType = data.order;
      console.log(this.param)
      this.QueryList();
    },
    // 处理
    ToDealWith(data) {
      var that = this;
      var ret = true;
      if(data[0].biddingList.length > 0){
        data[0].biddingList.forEach(item => {
          if(item.reservePrice == "" || item.reservePrice == null){
            that.msgBox.msgBoxOpen(that,{
              message:'请先编辑标的清单，补充成交底价、服务费信息',
              btnText:'编辑',
              success:function(){
                that.$router.push({
                  name: "needDetail",
                  query: {
                    id: data[0].id,
                    type:'addRe'
                  }
                });
              }
            })
            ret = false;
            return false;
          }
        })
      }else{
        that.msgBox.msgBoxOpen(that,{
          message:'请先编辑标的清单，补充成交底价、服务费信息',
          btnText:'编辑',
          success:function(){
            that.$router.push({
              name: "needDetail",
              query: {
                id: data[0].id,
                type:'addRe'
              }
            });
          }
        })
        ret = false;
      }
      if(ret){
        that.needId = data[0].id;
        that.entNum = data[0].entrustNum;
        that.dialogFormVisible = true;
        setTimeout(() => {
          that.dialogFormVisibleActive = true;
        }, 0);
      }
    },
    // 处理成功时 -- 上传附件
    wtcgupload(){
      this.upload();
      this.SpecifiedField[0] = "wtcg";
    },
    // 处理不成功时--上传附件
    wtupload(){
      this.upload();
      this.SpecifiedField[0] = "wtbcg";
    },
    // 委托协议下载模板
    upTemDownLoad(){
      window.open(this.tuurl+'group1/M00/00/D2/wKhCZmCcg_SAGavUAB8JKhypTks24.xlsx');
    },
    // 处理提交按钮
    submitForm(formName) {
      // console.log(formName)
      var _this = this;
      _this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          _this.ruleForm.entrustInforId = _this.needId;
          _this.ruleForm.entrustInforNum = _this.entNum;
          if (_this.ruleForm.dealWithType) {
            _this.ruleForm.dealWithType = 1;
          } else {
            _this.ruleForm.dealWithType = 0;
          }
          console.log(_this.ruleForm);
          _this.httpsapi
            .POST(
              _this.apis + "/entrust/jp-entrust-accept/handle",
              _this.ruleForm
            )
            .then(result => {
              console.log(result);
              if (result.code == 200) {
                _this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "5000",
                  type: "success"
                });
                _this.QueryList();
                _this.Procancel();
              } else {
                _this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "5000",
                  type: "error"
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    // 取消处理
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.Procancel();
    },
    changeFunc(data) {
      if (data == 0) {
        this.isEntrust = 0;
      } else if (data == 1) {
        this.isEntrust = 1;
      }
    },
    // 判断处理逻辑中，处置期限是否无要求
    dValue(data) {
      // console.log(data);
      if (this.ruleForm.dealWithType) {
        this.ruleForm.dealWithValue = "";
      }
    },
    // 监听生效时间
    effectiveDateFunc(e) {
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
      var datetime = b + "-" + c + "-" + d;
      this.ruleForm.effectiveDate = datetime;
    },
    // 监听清运期限
    dealwithDateFunc(e) {
      var a = new Date(e);
      var b = a.getFullYear();
      if (a.getMonth() < "10") {
        var c = "0" + (a.getMonth() + 1);
      } else {
        var c = a.getMonth() + 1;
      }
      if (a.getDate() < "10") {
        var d = "0" + a.getDate();
      } else {
        var d = a.getDate();
      }
      if (a.getHours() < "10") {
        var h = "0" + a.getHours();
      } else {
        var h = a.getHours();
      }
      if (a.getMinutes() < "10") {
        var m = "0" + a.getMinutes();
      } else {
        var m = a.getMinutes();
      }
      if (a.getSeconds() < "10") {
        var s = "0" + a.getSeconds();
      } else {
        var s = a.getSeconds();
      }
      var datetime = b + "-" + c + "-" + d + " " + h + ":" + m + ":" + s;
      this.ruleForm.dealwithDate = datetime;
      this.ruleForm.clearanceTime = datetime;
    },
    // 查询详情
    ForDetails(data) {
      this.$router.push({
        name: "needDetail",
        query: {
          id: data[0].id
        }
      });
    },
    // 受理
    accepThe(_t) {
      var _this = this;
      _this.msgBox.msgBoxOpen(_this, {
        message: "确定要受理委托单?",
        btnText: "受理",
        success(data) {
          //确定回调
          _this.httpsapi
            .POST(
              _this.apis + "/entrust/jp-entrust-infor/acceptance/" + _t[0].id
            )
            .then(result => {
              if (result.code == 200) {
                _this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "5000",
                  type: "success"
                });
                _this.QueryList();
              } else {
                _this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "5000",
                  type: "error"
                });
              }
            })
            .catch(err => {});
        }
      });
    },
    // 释放
    releaseOf(_t) {
      var _this = this;

      _this.msgBox.msgBoxOpen(_this, {
        message: "确定要释放?",
        btnText: "释放",
        success(data) {
          //确定回调
          _this.httpsapi
            .POST(_this.apis + "/entrust/jp-entrust-infor/release/" + _t[0].id)
            .then(result => {
              //console.log(result)
              if (result.code == 200) {
                _this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "5000",
                  type: "success"
                });
                _this.QueryList();
              } else {
                _this.$message({
                  showClose: true,
                  offset: 400,
                  message: result.message,
                  duration: "5000",
                  type: "error"
                });
              }
            })
            .catch(err => {});
        }
      });
    },
    // 关闭弹框
    Procancel() {
      this.ruleForm = {
        dealwithStatus: "1",
        rateType: "0",
        rate: "",
        signType: "2",
        contractUrl: "",
        effectiveDate: "",
        agreementNum: "",
        dealwithDate: "",
        clearanceTime: "",
        dealWithType: false,
        dealWithValue: "",
        fileIds:'',
        detailedExplain: ""
      },
      this.dialogFormVisibleActive = false;
      setTimeout(() => {
        this.dialogFormVisible = false;
        this.isEntrust = 1;
        this.spfilen1 = '';
        this.spfilen2 = '';
        this.ruleForm.dealwithStatus = "1";
      }, 500);
    },
    // 当前页多少条发生改变时触发
    tablePageSize(val) {
      this.size = val;
      this.QueryList();
    },
    // 当前页改变时触发
    tableCurrentChange(val) {
      this.page = val;
      this.QueryList();
    }
  },
};
</script>

<style>
  .need .btn .el-form-item__content {
    margin-top: 20px;
    margin-left: 0 !important;
    text-align: center !important;
  }
  #need .need .el-input-textarea .el-textarea__inner {
    border: 1px solid #dcdfe6 !important;
  }
  #need .need .el-form-item.is-error .el-textarea__inner {
    border-color: #f56c6c !important;
  }
  #need .buchong .el-form-item__error{
      top: 100% !important;
  }
  #need .uploadFile .upload{
  	border: 1px solid #2DB7F5;
  	color: #2DB7F5;
  }
  #need .uploadFile .upTem{
  	color: #2DB7F5;
  }
</style>

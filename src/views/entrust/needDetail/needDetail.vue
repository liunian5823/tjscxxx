<template>
	<div id="needDetail">
		<div class="bgBorderTwo">
			<div class="el-title el-clearfix">
				<div class="theTitle el-pull-left">{{ ReVideoObj.title }}</div>
				<div class="theBtn el-pull-right">
					<el-button v-if="ReVideoObj.status == 10">待 受 理</el-button>
					<el-button v-else-if="ReVideoObj.status == 20">受 理 中</el-button>
					<el-button v-else-if="ReVideoObj.status == 30">已 完 成</el-button>
					<el-button v-else-if="ReVideoObj.status == 40">已 终 止</el-button>
				</div>
			</div>
			<!-- 详情 -->
			<div class="el-detail el-detail-1">
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>委托需求编号</span>：</label>
					<div class="tCon" v-html="ReVideoObj.entrustNum"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>企业类型</span>：</label>
					<div class="tCon" v-html="ReVideoObj.enterpriseType"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>委托企业</span>：</label>
					<div class="tCon" v-html="ReVideoObj.enterpriseName"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>委托项目部</span>：</label>
					<div class="tCon" v-html="ReVideoObj.projectName"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>委托人</span>：</label>
					<div class="tCon" v-html="ReVideoObj.entrustUser + ' ' + ReVideoObj.entrustUserPhone "></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>看货对接人</span>：</label>
					<div class="tCon" v-html="ReVideoObj.lookUserName"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>看货地址</span>：</label>
					<div class="tCon" v-html="ReVideoObj.provinceName+ReVideoObj.cityName+ReVideoObj.countyName+ReVideoObj.address"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>递交时间</span>：</label>
					<div class="tCon" v-html="ReVideoObj.createTime"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>补充说明</span>：</label>
					<div class="tCon" v-html="ReVideoObj.notes"></div>
				</div>
			</div>
			<div class="el-detail el-detail-2" v-if="isAccept">
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>受理人</span>：</label>
					<div class="tCon" v-html="ReVideoObj.jpEntrustAccept.acceptorUserName"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>受理时间</span>：</label>
					<div class="tCon" v-html="ReVideoObj.jpEntrustAccept.acceptorUserDate"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>处理时间</span>：</label>
					<div class="tCon" v-html="ReVideoObj.jpEntrustAccept.dealwithDate"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>处理结果</span>：</label>
					<div class="tCon" v-html=" ReVideoObj.jpEntrustAccept.dealwithStatus == 1?'委托成功':ReVideoObj.jpEntrustAccept.dealwithStatus == 0?'委托未成功':'' "></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>委托协议编号</span>：</label>
					<div class="tCon" style="color: #2DB7F5;cursor: pointer;" @click="GoDetail('protocolxq',ReVideoObj.jpEntrustAccept.agreementId)" v-html="ReVideoObj.jpEntrustAccept.entrustAgreementNum"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>委托订单号</span>：</label>
					<div class="tCon" style="color: #2DB7F5;cursor: pointer;"  @click="GoDetail('orderPa',ReVideoObj.jpEntrustAccept.orderId)" v-html="ReVideoObj.jpEntrustAccept.entrustOrderNum"></div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>询价报告书</span>：</label>
					<div class="tCon" style="color: #2DB7F5;" >
						<div v-if="ReVideoObj.jpEntrustAccept.reportFileIds == '' || ReVideoObj.jpEntrustAccept.reportFileIds == null">
							<el-button class="upload" @click="uploadB">上传</el-button>
							<el-button type="text" style="color: #2db7f5;">询价报告书模板</el-button>
							<span style="font-size: 12px;color: #808080;display: inline-block;margin-left: 10px;">最多上传1个格式为pdf、jpg、png体积小于5MB的文件</span>
						</div>
						<div v-if="ReVideoObj.jpEntrustAccept.reportFileIds != '' && ReVideoObj.jpEntrustAccept.reportFileIds != null">
							<el-button type="text" style="color: #2db7f5;" @click="downLoadrF">{{ ReVideoObj.jpEntrustAccept.rF }}</el-button>
							<el-button type="text" style="color: #2db7f5;" v-if="ReVideoObj.status < 30 " @click="detailReport">删除</el-button>
						</div>
					</div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>建议保留总价</span>：</label>
					<div class="tCon">{{ ReVideoObj.jpEntrustAccept.reservePriceTotal }}元</div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>报价税率</span>：</label>
          <!-- rateType -->
					<div class="tCon" v-if="ReVideoObj.rateType == 0">报价不含税</div>
          <div class="tCon" v-else-if="ReVideoObj.rateType == 1">报价含税{{ReVideoObj.rate}}%</div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>处置期限</span>：</label>
					<div class="tCon">{{ ReVideoObj.dealWithValue }}天</div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>清运期限</span>：</label>
					<div class="tCon">{{ ReVideoObj.clearanceTime}}</div>
				</div>
				<div class="el-detail-item el-clearfix">
					<label class="el-pull-left"><span>备注</span>：</label>
					<div class="tCon" v-if="ReVideoObj.status > 20">
						{{ReVideoObj.jpEntrustAccept.remarks}}
					</div>
					<div class="tCon" v-if="ReVideoObj.status <= 20">
						<el-input type="textarea" v-model="ReVideoObj.jpEntrustAccept.remarks" @blur="elTextarea()"></el-input>
					</div>
				</div>
			</div>
		</div>

		<div class="bgBorderThree">
			<div class="Cord-header el-clearfix">
				<span>标的照片</span>
				<el-button class="el-pull-right el-blueColor" @click="DownloadAll('image')">下载全部</el-button>
			</div>
			<div class="table" style="width: 650px;">
				<tableTwo :table="table1" @tableFuncCellback="tableFuncCellback1"></tableTwo>
			</div>
		</div>

		<div class="bgBorderThree">
			<div class="Cord-header el-clearfix">
				<span>附件</span>
				<el-button class="el-pull-right el-blueColor" @click="DownloadAll('file')">下载全部</el-button>
			</div>
			<div class="table" style="width: 650px;">
				<tableTwo :table="table2" @tableFuncCellback="tableFuncCellback2"></tableTwo>
			</div>
		</div>

		<div class="bgBorderThree">
			<div class="Cord-header el-clearfix">
				<span>标的清单</span>
				<el-button class="el-pull-right el-blueColor" @click="exportUnderlying" style="margin-left: 15px;">导出标的清单</el-button>
				<el-button class="el-pull-right el-blueColor" v-if="ReVideoObj.status == 20" @click="editor">编辑</el-button>
			</div>
			<div class="table">
				<tableTwo :table="table3" @tableFuncCellback="tableFuncCellback3" key="table3"></tableTwo>
			</div>
		</div>

		<div class="bgBorderThree">
			<div class="Cord-header el-clearfix">
				<span>工单日志</span>
			</div>
			<div class="table" style="width: 650px;">
				<tableTwo :table="table4" @tableFuncCellback="tableFuncCellback4" :key="table4"></tableTwo>
			</div>
		</div>

		<div class="bgBorderThree">
			<div class="el-b">
				<el-button class="el-noColor" @click="ShutDown">关闭</el-button>
				<el-button class="el-blueColor" @click="accept" v-if="!isAccept">受理</el-button>
        <el-button class="el-blueColor" @click="ToDealWith" v-if="isCurrent?(isAccept && ReVideoObj.status == 20):false">处理</el-button>
			</div>
		</div>
    <!-- 图片预览 -->
    <elImageViewer
      v-if="PreviewPcture.show"
      :initial-index = 'PreviewPcture.index'
      :on-close="imagesOnClose"
      :url-list="PreviewPcture.urlarr"
    ></elImageViewer>
		<!-- 处理结果 -->
		<div class="proResults" :class="{active:dialogFormVisibleActive}" v-if="dialogFormVisible" @click="Procancel">
			<!-- 处理结果 -->
			<div v-if="!dialogType" class="proResults-Childer" @click.stop>
				<div class="card-header el-clearfix">
					<span>处理结果</span>
					<span class="el-pull-right" type="text" @click="Procancel">×</span>
				</div>
				<!-- 委托成功 -->
				<el-form :model="ruleForm" :rules="rules" ref="rForm" label-width="100px" class="demo-ruleForm need">
					<el-form-item label="处理结果:" prop="dealwithStatus" style="border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
						<el-radio-group v-model="ruleForm.dealwithStatus" @change="changeFunc">
							<el-radio label="1">委托成功</el-radio>
							<el-radio label="0">委托未成功</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if="isEntrust == 1">
						<div>
							<el-form-item label="报价税率:" prop="rateType"  style="display: inline-block;">
								<el-radio-group v-model="ruleForm.rateType" @change="isOfferRate = !isOfferRate">
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
						<el-form-item label="委托协议:" prop="signType" >
							<el-radio-group v-model="ruleForm.signType">
								<el-radio label="1" disabled>线上签订</el-radio>
								<el-radio label="2">线下签订</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="委托协议:" prop="contractUrl" class="uploadFile" >
							<el-button class="upload" @click="wtcgupload">上传附件</el-button>
							<el-button class="upTem" type="text" @click="upTemDownLoad">委托协议模板下载</el-button>
              <span style="padding-left: 15px;">{{ SpecifiedField[2] }}</span>
              <el-input type="input" v-model="ruleForm.contractUrl" style="border: 0 !important;display: none;"></el-input>
						</el-form-item>
						<el-form-item label="委托协议:" prop="fileIds" class="uploadFile" v-if="!isEntrust">
							<el-button class="upload">上传附件</el-button>
						</el-form-item>
						<el-form-item label="生效时间:" prop="effectiveDate" >
							<el-date-picker type="date" placeholder="合同签订日期" v-model="ruleForm.effectiveDate" @change="effectiveDateFunc"></el-date-picker>
						</el-form-item>
						<el-form-item label="委托协议编号:" prop="agreementNum" class="codeBianhao" >
							<el-input v-model="ruleForm.agreementNum" placeholder="请填写委托协议编号"></el-input>
						</el-form-item>
						<el-form-item label="清运期限:" prop="dealwithDate" >
							<el-date-picker v-model="ruleForm.dealwithDate" type="datetime" placeholder="选择日期时间" @change="dealwithDateFunc"></el-date-picker>
						</el-form-item>
						<el-form-item label="处置期限:" prop="dealWithValue">
							<el-input v-model="ruleForm.dealWithValue" style="width: 80px;margin-right: 5px;" @blur="dealWithValue"></el-input>天
							<el-checkbox v-model="ruleForm.dealWithType" style="margin-left: 15px;" @change="dValue">无要求</el-checkbox>
						</el-form-item>
						<el-form-item label="详细说明:" prop="detailedExplain"  class="el-input-textarea buchong">
							<el-input type="textarea" v-model="ruleForm.detailedExplain" maxlength="500" show-word-limit></el-input>
						</el-form-item>
					</div>

					<div v-else-if="isEntrust == 0">
						<el-form-item label="委托协议:" prop="fileIds" class="uploadFile buchong">
							<el-button class="upload" @click="wtupload">上传附件</el-button>
              <span style="padding-left: 15px;">{{ SpecifiedField[2] }}</span>
              <el-input type="input" v-model="ruleForm.fileIds" style="border: 0 !important;display: none;"></el-input>
						</el-form-item>
						<el-form-item label="详细说明:" prop="detailedExplain" class="buchong">
							<el-input type="textarea" v-model="ruleForm.detailedExplain" maxlength="500" show-word-limit></el-input>
						</el-form-item>
					</div>

					<el-form-item class="btn" style="text-align: center;">
						<el-button class="el-noColor" @click="resetForm('rForm')">取消</el-button>
						<el-button class="el-blueColor" @click="submitForm('rForm')">确定</el-button>
					</el-form-item>
				</el-form>
			</div>
			<!-- 标的清单 -->
			<div v-if="dialogType" class="MarkListing" @click.stop>
				<div class="card-header el-clearfix">
					<span>编辑标的清单</span>
					<span class="el-pull-right" type="text" @click="Procancel">×</span>
				</div>
				<div style="margin: 15px;">
					<tableTwo ref="refTableTwo" :table="table5" @tableFuncCellback="tableFuncCellback5" key="table5"></tableTwo>
					<div class="collapseBtn" @click="AddMark()">+添加标的</div>
					<div class="el-b">
						<el-button class="el-noColor" @click="Procancel">取消</el-button>
						<el-button class="el-blueColor" @click="submitMarkLing">确定</el-button>
					</div>
				</div>
			</div>

		</div>
    <!-- input type="file" -->
		<input type="file" ref="inputFile" class="inputFileClass" @change="FileUpload">
	</div>

</template>

<script>
import elImageViewer from 'element-ui/packages/image/src/image-viewer.vue';
export default {
	name:'needDetail',
  components:{
    elImageViewer
  },
	data(){
		return {
			needId:'',
			ReVideoObj:{
				title:'',
				status:'',
				entrustNum:'',
				enterpriseType:'',
				enterpriseName:'',
				projectName:'',
				entrustUser:'',
				entrustUserPhone:'',
				lookUserName:'',
				provinceName:'',
				cityName:'',
				countyName:'',
				address:'',
				createTime:'',
				notes:'',
				rate:'',
        reservePriceTotal:'',
				dealWithValue:'',
				clearanceTime:'',
				jpEntrustAccept:{
					acceptorUserName:'',
					acceptorUserDate:'',
					dealwithDate:'',
					dealwithStatus:'',
					reportFileIds:null,
					agreementId:'',
					orderId:'',
					remarks:'',
				}
			},
			// 是否受理
			isAccept:false,
      // 此条数据,是否当前登录人提交
      isCurrent:true,
			// 表格组件--开始
			table1:{
				// 表格操作数组
				operationList: ['查看'],
				// 操作块儿是否显示
				// isoperation: false,
				// 数据数组
				Dataorigin: [],
				// 右侧操作宽度
				operationW: "150",
				// 表头数组
				header: [
					{name: "排序",prop: "sort",width:'100'},
					{name: "图片名称",prop: "fullname",width:'250'},
					{name: "大小",prop: "size",width:'80'},
				]
			},
			table2:{
				// 表格操作数组
				operationList: ['下载'],
				// 操作块儿是否显示
				// isoperation: false,
				// 数据数组
				Dataorigin: [],
				// 右侧操作宽度
				operationW: "150",
				// 表头数组
				header: [
					{name: "排序",prop: "sort",width:'100'},
					{name: "附件名称",prop: "fullname",width:'250'},
					{name: "大小",prop: "size",width:'80'},
				]
			},
			table3:{
				// 表格操作数组
				operationList: {
          '0':['无'],
          '1':['查看附件']
        },
				// 操作块儿是否显示
				isoperation: true,
				// 数据数组
				Dataorigin: [],
        // 按钮切换状态
        StatusField:'unStatus',
				// 右侧操作宽度
				operationW: "150",
				// 表头数组
				header: [
					{name: "标的类别",prop: "typeName",width:'230'},
					{name: "标的编码",prop: "code",width:'230'},
					{name: "标的名称",prop: "name",width:'230'},
					{name: "规格",prop: "standards",width:'230'},
					{name: "品牌",prop: "brand",width:'230'},
					{name: "标的描述",prop: "represent",width:'230'},
					{name: "销售数量",prop: "saleNumName",width:'230'},
					{name: "质量状况",prop: "qualityStatus",width:'230'},
					{name: "成交底价",prop: "reservePriceCnsno",width:'230'},
					{name: "服务费计价(参考)",prop: "serviceModeName",width:'230'},
					{name: "服务费金额/比例(参考)",prop: "servicePriceName",width:'230'},
				]
			},
			table4:{
				// 表格操作数组
				operationList: [ ],
				// 操作块儿是否显示
				isoperation: false,
				// 数据数组
				Dataorigin: [],
				// 右侧操作宽度
				operationW: "150",
				// 表头数组
				header: [
					{name: "操作人",prop: "createUserName",width:'150'},
					{name: "操作时间",prop: "createTime",width:'100'},
					{name: "事件",prop: "contentCnsNo",width:'400',type:'click'}
				]
			},
			table5:{
				// 表格操作数组
				operationList: {
				  '0':['上传附件'],
				  '1':['查看附件']
				},
				// 操作块儿是否显示
				isoperation: true,
				// 数据数组
				Dataorigin: [],
        // 按钮切换状态
        StatusField:'unStatus',
				// 右侧操作宽度
				operationW: "150",
				// 表头数组
				header: [
					{name: "操作",prop: "i",width:'50',type:'button'},
					{name: "标的类别",prop: "typeCnsNo",width:'400',require:true,type:'cascader',option:[]},
					{name: "标的编码",prop: "code",width:'230',type:'selectfilt',option:[]},
					{name: "标的名称",prop: "name",width:'230',require:true,type:'selectfilt',option:[]},
					{name: "规格",prop: "standards",width:'230',type:'selectfilt',require:true,option:[]},
					{name: "品牌",prop: "brand",width:'230',type:'input'},
					{name: "标的描述",prop: "represent",width:'230',type:'input'},
					{name: "销售数量",prop: "saleNum",width:'230',require:true,type:'input'},
					{name: "计量单位",prop: "unit",width:'230',type:'select',option:[]},
					{name: "质量状况",prop: "qualityStatus",width:'230',type:'input'},
					{name: "成交底价",prop: "reservePrice",width:'230',type:'input',require:true,},
					{name: "服务费计价(参考)",prop: "serviceMode",width:'230',type:'select',require:true,option:[
						{value:1,name:'总额收取'},
						{value:2,name:'定额收取'},
						{value:3,name:'按单位收取'},
					]},
					{name: "服务费金额/比例(参考)",prop: "servicePrice",width:'230',type:'input',require:true,},
				],
				rules:{
					typeCnsNo:[
						{ required:true, message:'请选择标的类别',trigger: 'change'}
					],
					code:[
						{ required:true, message:'请选择标的编码',trigger: 'change'}
					],
					name:[
						{ required:true, message:'请选择标的名称',trigger: 'change'}
					],
					standards:[
						{ required:true, message:'请选择规格',trigger: 'change'}
					],
					brand:[
						{ required:true, message:'请输入品牌',trigger: ['blur','change']}
					],
					represent:[
						{ required:true, message:'请输入物料描述',trigger: ['blur','change']}
					],
					saleNum:[
						{ required:true, message:'请输入销售数量',trigger: ['blur','change']},
						{ pattern: /^[0-9]+.[0-9]*$/, message: '请输入大于0数字', trigger: ['blur','change']}
					],
					unit:[
						{ required:true, message:'请选择计量单位',trigger: 'change'}
					],
					qualityStatus:[
						{ required:true, message:'请填写质量状况',trigger: ['blur','change']}
					],
					reservePrice:[
						{ required:true, message:'请输入成交底价',trigger: ['blur','change']},
            {pattern: /^[0-9]*$/, message: '请输入数字', trigger: ['blur','change']}
					],
					serviceMode:[
						{ required:true, message:'请选择服务费计价',trigger: 'change'}
					],
					servicePrice:[
						{ required:true, message:'请填写服务费金额/比例',trigger: ['blur','change']}
					],

				}
			},
			// 表格组件--结束
      PreviewPcture:{
        index:'',
        urlarr:[],
        show:false
      },
      SpecifiedField:[],
			ruleForm: {
				dealwithStatus: "1",
				rateType: "0",
				rate:'',
				signType: "2",
				contractUrl:'',
				effectiveDate:'',
				agreementNum:'',
				dealwithDate:'',
				clearanceTime:'',
				dealWithType:false,
				dealWithValue:'',
        fileIds:'',
				detailedExplain:'',
			},
			// 弹出框正则验证
			rules: {
				dealwithStatus: [
					{ required: true, message: '请选择处理结果', trigger: 'change' },
				],
				rateType: [
					{ required: true, message: '请选择报价税率', trigger: 'change' }
				],
				rate: [
					{ required: true, message: '请选择税率', trigger: 'change' }
				],
				signType: [
					{ required: true, message: '请选择委托协议类型', trigger: 'change' }
				],
				contractUrl: [
					{ required: true, message: '请上传委托协议附件', trigger: 'change' }
				],
				fileIds: [
					{ required: true, message: '请上传附件', trigger: 'change' }
				],
				effectiveDate:[
					{ required: true, message: '请填写选择生效时间', trigger: 'blur' }
				],
				agreementNum: [
					{ required: true, message: '请填写委托协议编号', trigger: 'blur' }
				],
				dealwithDate: [
					{ required: true, message: '请选择清运时间', trigger: 'change' }
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
					{ required: true, message: '请填写详细说明', trigger: 'change' }
				],
			},
			dialogFormVisible:false,
			dialogFormVisibleActive:false,
			dialogType:false,
			isEntrust:1,      //是否委托成功
			isOfferRate:false,    //报价是否含税
			contNumber:0,
			src:[],      //文件上传中间数组
			uploadType:'',
		}
	},
	mounted() {
		// 赋值详情id
		this.needId = this.$route.query.id;
    // 获取参数
    // this.theQuery();
		// 查询详情
		this.ReverseVideo();
		// 查询标的编码、规格、名称
		this.subjectDown();
		// 查询计量单位
		this.queryReUnit();
		// 查询标的清单-标的类别
		this.underlyingType();
	},
	methods:{
    // 获取参数
    // theQuery(){

    // },
		// 监听切换委托按钮
		changeFunc(data){
			if(data == 0){
				this.isEntrust = 0;
			}else if(data == 1){
				this.isEntrust = 1;
			}
		},
		// 上传询价报告书
		uploadB(){
			this.$refs.inputFile.dispatchEvent(new MouseEvent('click'))
			this.SpecifiedField[0] = 'bgs';
		},
		// 关闭
		ShutDown(){
			this.$router.go(-1)
		},
		// 反显
		ReverseVideo(){
			this.httpsapi.POST(this.apis+'/entrust/jp-entrust-infor/getInforById/'+this.needId,{}).then((result) => {
				console.log(result)
				if(result.code == 200){
          var table1 = result.data.upload;
          var table2 = result.data.upload1;
          var table3 = result.data.biddingList;
					this.ReVideoObj = result.data;
          // 判断有没有受理人
          if(this.ReVideoObj.jpEntrustAccept){
            if(this.ReVideoObj.jpEntrustAccept.acceptorUserId){
              var currentId = this.$store.state.logininformation.id;
              if(currentId != this.ReVideoObj.jpEntrustAccept.acceptorUserId){
                this.isCurrent = false;
              }
            }
            // 询价附件
            if(this.ReVideoObj.jpEntrustAccept.reportFileIds){
                var rf = this.ReVideoObj.jpEntrustAccept.reportFileIds.split('/');
                this.ReVideoObj.jpEntrustAccept.rF = rf[rf.length - 1];
            }

          }
          if(table1){
            table1.forEach(item => {
              item.size = item.size + 'M';
            })
            this.table1.Dataorigin = table1;
          }
          if(table2){
            table2.forEach((item,index) => {
              item.size = item.size + 'M';
              item.sort = index+1;
            })
            this.table2.Dataorigin = table2;
          }
          if(table3){
            table3.forEach((item,index) =>{
              // 处理销售数量
              item.saleNumName = item.saleNum+item.unit
              // 处理服务费计价和参考
              if(item.serviceMode == 1){
                item.serviceModeName = '总额收取';
                item.servicePriceName = item.servicePrice.toFixed(2)+'%';
              }else if(item.serviceMode == 2){
                item.serviceModeName = '定额收取';
                item.servicePriceName = item.servicePrice.toFixed(2)+'元';
              }else if(item.serviceMode == 3){
                item.serviceModeName = '按单位收取';
                item.servicePriceName = item.servicePrice.toFixed(2)+'元';
              }
              if(item.attachmentUrl){
                item.unStatus = '1';
              }else{
                item.unStatus = '0';
              }
              item.reservePriceCnsno = item.reservePrice != null? item.reservePrice+'元/'+item.unit:'';
            })
            this.table3.Dataorigin = table3;
          }

					this.getLog();
					if(result.data.status > 10){
						this.isAccept = true;
					}
          //
          if(this.$route.query.type == 'addRe'){
            this.editor();
          }
				}
			})
		},
    // 下载询价报告书
    downLoadrF(){
      window.open(this.tuurl+this.ReVideoObj.jpEntrustAccept.reportFileIds);
    },
    // 删除询价报告书
    detailReport(){
      var that = this;
      that.msgBox.msgBoxOpen(that,{
        message:'确定删除询价报告书？',
        success:function(){
          that.httpsapi.PUT( that.apis + '/entrust/jp-entrust-accept/updateEntrustAccept',{
            id:that.ReVideoObj.jpEntrustAccept.id,
            reportFileIds:null
          }).then((result) => {
            console.log(result)
            if(result.code == 200){
              that.ReverseVideo();
            }else{}
          }).catch((err) => {});
        },
      })

    },
		// 工单日志
		getLog(){
			this.httpsapi.POST(this.apis+'/entrust/jp-entrust-infor/getLog/'+this.needId,{}).then((result) => {
				// console.log(result)
				if(result.code == 200){
					result.data.forEach((item) => {
						item.contentCnsNo = item.remark+','+item.content;
					})
					this.table4.Dataorigin = result.data
				}
			})
		},
		// 导出标的清单
    exportUnderlying(){
      this.exports.exports(this.apis+'/entrust/jp-entrust-infor-bidding/expExcelEntrust/'+this.needId);
    },
		// 受理
		accept(){
			var _this = this;
			_this.msgBox.msgBoxOpen(_this,{
				message:'确定要受理委托单?',
				btnText:'受理',
				success(data){   //确定回调
					_this.httpsapi.POST( _this.apis + '/entrust/jp-entrust-infor/acceptance/'+_this.needId).then((result) => {
						if(result.code == 200){
							_this.ReVideoObj.status = 20;
							_this.isAccept = true;
							_this.$message({
								showClose: true,
								offset: 400,
								message: result.message,
								duration: "5000",
								type: "success",
							});
							_this.ReverseVideo();
						}
					}).catch((err) => {});
				}
			})
		},
		// 处理
		ToDealWith(){
      var that = this;
      var ret = true;
      if(that.ReVideoObj.jpEntrustAccept.reservePriceTotal){
        if(that.table3.Dataorigin.length > 0){
          that.table3.Dataorigin.forEach(item => {
            if(item.reservePriceCnsno == "" || item.reservePriceCnsno == null ||
              item.serviceModeName == "" || item.serviceModeName == null ||
              item.servicePriceName == "" || item.servicePriceName == null
            ){
              that.msgBox.msgBoxOpen(that,{
                message:'请先编辑标的清单，补充成交底价、服务费信息',
                btnText:'编辑',
                success:function(){
                  that.editor();
                }
              })
              ret = false;
            }
          })
        }
      }else{
        that.msgBox.msgBoxOpen(that,{
          message:'请先编辑标的清单，补充成交底价、服务费信息',
          btnText:'编辑',
          success:function(){
            that.editor();
          }
        })
        ret = false;
      }
      if(ret){
        that.dialogFormVisible = true;
        setTimeout(()=>{
          that.dialogFormVisibleActive = true;
        },0)
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
		// 关闭弹框
		Procancel(){
			this.dialogFormVisibleActive = false;
			setTimeout(()=>{
				this.dialogFormVisible = false;
				this.dialogType = false;
				this.isEntrust = 1;
				this.ruleForm.dealwithStatus = '1';
			},500)
		},
		// 处理提交按钮
		submitForm(formName) {
			var _this = this;
			_this.$refs[formName].validate((valid) => {
				if (valid) {
					_this.ruleForm.entrustInforId = this.needId;
					_this.ruleForm.entrustInforNum = this.ReVideoObj.entrustNum;
					if(_this.ruleForm.dealWithType){
						_this.ruleForm.dealWithType = 1;
					}else{
						_this.ruleForm.dealWithType = 0;
					}
					this.httpsapi.POST(this.apis+'/entrust/jp-entrust-accept/handle',_this.ruleForm).then((result) => {
						if(result.code == 200){
							_this.$message({
								showClose: true,
								offset: 400,
								message: result.message,
								duration: "5000",
								type: "success",
							});
							_this.$router.go(-1);
						}else{
							_this.$message({
								showClose: true,
								offset: 400,
								message: result.message,
								duration: "5000",
								type: "error",
							});
						}
					})

				} else {return false;}
			});
    },
		// 处理取消按钮
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.Procancel();
		},
    // 自动点击上传
    upload(){
    	this.$refs.inputFile.dispatchEvent(new MouseEvent('click'))
    },
    // 文件上传
    FileUpload(e){
    	var that = this;
      if(that.SpecifiedField[0] == 'underlying'){
        that.uploading.uploading(e, "5", "doc/docx/xls/xlsx/pdf/jpg/png", that,function(result){
          that.table5.Dataorigin.forEach(item => {
            if(item.ioId == that.SpecifiedField[1]){
              item.attachmentUrl = result.url;
              item.unStatus = '1';
            }
          })
        });
      }else if(that.SpecifiedField[0] == 'bgs'){
        that.uploading.uploading(e, "5", "pdf/jpg/png", that,function(result){
            that.httpsapi.PUT( that.apis + '/entrust/jp-entrust-accept/updateEntrustAccept',{
              id:that.ReVideoObj.jpEntrustAccept.id,
              reportFileIds:result.url
            }).then((result) => {
              console.log(result)
              if(result.code == 200){
                that.ReverseVideo();
              }else{}
            }).catch((err) => {});
        })
      }else if(that.SpecifiedField[0] == 'wtbcg'){
        that.uploading.uploading(e, "5", "doc/docx/xls/xlsx/pdf/jpg/png", that,function(result){
          that.ruleForm.fileIds = result.url;
          that.SpecifiedField[2] = result.fullname;
        });
      }else if(that.SpecifiedField[0] == 'wtcg'){
        that.uploading.uploading(e, "5", "doc/docx/xls/xlsx/pdf/jpg/png", that,function(result){
          that.ruleForm.contractUrl = result.url;
          that.SpecifiedField[2] = result.fullname;
        });
      }
      that.$refs.inputFile.value = '';
    },
    // 下载全部
    DownloadAll(type){
      var that = this;
      var url = '';
      var obj = {
        id:that.needId,
        url:that.tuurl,
      }
      if(type == 'image'){
        obj.type = 0;
      }else if(type == 'file'){
        obj.type = 1;
      }
      console.log(obj)
      that.exports.exports1(that.apis+'/entrust/jp-entrust-infor/zipDownload',obj);
      // that.httpsapi.POST2(that.apis+'/entrust/jp-entrust-infor/zipDownload',obj).then(result => {
      //   console.log(result)
      // }).catch(err => {})
    },
		// 图片
		tableFuncCellback1(data){
			switch(data[1]) {
			    case '查看':
          this.lookImage(data[0]);
					break;
				default:
					break;
			}
		},
    // 查看图片
    lookImage(data){
      var arr = [];
      this.table1.Dataorigin.forEach((item,index) => {
        arr.push(this.tuurl + item.url);
        if(item == data){
          this.PreviewPcture.index = index;
        }
      })
      this.PreviewPcture.urlarr = arr;
      this.PreviewPcture.show = true;
    },
    // 关闭图片弹框
    imagesOnClose(){
      this.PreviewPcture.show = false;
    },
		// 附件回到
		tableFuncCellback2(data){
			switch(data[1]) {
			    case '下载':
          window.open(this.tuurl+data[0].url,'download');
					break;
				default:
					break;
			}
		},
		//标的清单
		tableFuncCellback3(data){
			if(data[1] == '查看附件'){
        window.open(this.tuurl + data[0].attachmentUrl);
      }
		},
		// 工单日志
		tableFuncCellback4(data){
			//console.log(data)
      switch(data[1]){
        case 'click':
          window.open(this.tuurl+data[0].downFile);
          break;
      }
		},
		// 编辑标的清单回调
		tableFuncCellback5(data){
			switch(data[1]) {
			    case 'button':     //删除
			    	this.detele1(data[0]);
			    	break;
				case '上传附件':     //上传附件
					this.upload1(data[0]);
					break;
        case '查看附件':
          window.open(this.tuurl + data[0].attachmentUrl);
          break;
				default:
					break;
			}
		},
    // 打开编辑标的清单
    editor(){
    	this.dialogFormVisible = true;
    	setTimeout(()=>{
    		this.dialogFormVisibleActive = true;
    	},0)
    	this.dialogType = true;
      var table0 = this.table3.Dataorigin;
    	table0.forEach((item,index) =>{
    		item.i = '<i class="dTt">-</i>';
    		item.ioId = this.contNumber++;
    		item.typeCnsNo = item.type.split(',');
    	})
    	var table1 = JSON.stringify(table0);
    	this.table5.Dataorigin = JSON.parse(table1);
    },
    // 标的清单删除
    detele1(data){
      console.log(data)
    	var oindex = this.table5.Dataorigin.findIndex((ele) => {
    		return ele.ioId === data.ioId;
    	});
    	this.table5.Dataorigin.splice(oindex, 1);
    	this.$refs.refTableTwo.refTableTwo();
    },
    // 标的清单上传附件
    upload1(data){
      this.upload();
      this.SpecifiedField[0] = 'underlying';
      this.SpecifiedField[1] = data.ioId;
    },
		// 确定提交标的清单修改
		submitMarkLing(){
			var _this = this;
			if(!_this.$refs.refTableTwo.refTableTwo()) return false;
			_this.table5.Dataorigin.forEach((item,idnex) => {
				var t = '';
				item.typeCnsNo.forEach((item1,index1) => {
					t += item1 + ',';
				})
				item.type = t.substring(0,t.length -1);
			})
			_this.httpsapi.POST(_this.apis + '/entrust/jp-entrust-infor/saveBidding',{
				id:_this.needId,
				biddingList:_this.table5.Dataorigin
			}).then((result) => {
				console.log(result);
				if(result.code == 200){
					_this.$message({
						showClose: true,
						offset: 400,
						message: result.message,
						duration: "5000",
						type: "success",
					});
					var tableo = JSON.stringify(_this.table5.Dataorigin)
					_this.table3.Dataorigin = JSON.parse(tableo);
					_this.ReverseVideo();
					_this.Procancel();
				}
			}).catch((err) => {});
		},
		// 添加一条标的清单
		AddMark(){
			var _tableObj = {
				ioId:this.contNumber++,
				i:'<i class="dTt">-</i>',
				type:'',
				code:'',
				name:'',
				standards:'',
				brand:'',
				represent:'',
				saleNum:'',
				unit:'',
				qualityStatus:'',
				reservePrice:'',
				serviceMode:'',
				serviceType:'',
				unStatus:'0',
				attachmentUrl:''
			};
			this.table5.Dataorigin.push(_tableObj)
		},

    // 查询标的类别
    underlyingType(){
    	this.table5.header[1].option = this.$store.state.underlyingType;
    },
		// 查询标的编码、名称、规格
		subjectDown(){
			var _this = this;
			_this.httpsapi.POST(_this.apis + '/entrust/jp-entrust-infor/subjectDown',{}).then((result) => {
				// console.log(result)
				if(result.code == 200){
					var _result = result.data;
					_result.code.forEach((item,index) => {
						this.table5.header[2].option.push({value:item.code,name:item.code})
					})
					_result.name.forEach((item,index) => {
						this.table5.header[3].option.push({value:item.name,name:item.name})
					})
					_result.standards.forEach((item,index) => {
						this.table5.header[4].option.push({value:item.standards,name:item.standards})
					})
				}
			})
		},
		// 计量单位
		queryReUnit(){
			var _this = this;
			_this.httpsapi.POST(_this.apis + '/trade/scene/queryReUnit',{}).then((result) => {
				if(result.code == 200){
					result.data.forEach( (item,index) => {
						this.table5.header[8].option.push({value:item.name,name:item.name});
					})
				}
			})
		},
		// 备注失去焦点事件
		elTextarea(){
			if(this.ReVideoObj.jpEntrustAccept.remarks == '' || this.ReVideoObj.jpEntrustAccept.remarks == undefined){return false;}
			var _this = this;
			_this.httpsapi.PUT( _this.apis + '/entrust/jp-entrust-accept/updateEntrustAccept',{
				id:this.ReVideoObj.jpEntrustAccept.id,
				remarks:this.ReVideoObj.jpEntrustAccept.remarks
			}).then((data) => {
				//console.log(data)
				if(data.code == 200){
					_this.$message({
						showClose: true,
						offset: 400,
						message: '备注修改成功',
						duration: "5000",
						type: "success",
					});
				}
			}).catch((err) => {
				//console.log(err)
			});
		},
		// 处置期限
		dealWithValue(){
			if(this.ruleForm.dealWithValue != ''){
				this.ruleForm.dealWithType = false;
			}
		},
		// 判断处理逻辑中，处置期限是否无要求
		dValue(data){
			// console.log(data)
			if(this.ruleForm.dealWithType){
				this.ruleForm.dealWithValue = "";
			}
		},
		// 监听生效时间
		effectiveDateFunc(e){
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
		dealwithDateFunc(e){
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
			if(a.getHours() < "10" ){
				var h = "0" + a.getHours();
			}else{
				var h = a.getHours();
			}
			if(a.getMinutes() < "10" ){
				var m = "0" + a.getMinutes();
			}else{
				var m = a.getMinutes();
			}
			if(a.getSeconds() < "10" ){
				var s = "0" + a.getSeconds();
			}else{
				var s = a.getSeconds();
			}
			var datetime = b + "-" + c + "-" + d + ' ' + h +':'+m+':'+s;
			this.ruleForm.dealwithDate = datetime;
			this.ruleForm.clearanceTime = datetime;
		},
		// 跳转到委托协议详情或委托订单详情
		GoDetail(_routerName,prm){
			this.$router.push({
				name:_routerName,
				query:{
					id:prm
				}
			})
		}

	},
}
</script>

<style space>
	#needDetail .need .el-input-textarea .el-textarea__inner{
		border: 1px solid #DCDFE6 !important;
	}
	#needDetail .need .el-form-item.is-error .el-textarea__inner{
		border-color:#F56C6C !important;
	}
  #needDetail .buchong .el-form-item__error{
    top: 100% !important;
  }
	#needDetail .el-title{
		margin: 15px 0;
	}
	#needDetail .theTitle{
		height: 42px;
		font-size: 20px;
		font-family: SourceHanSansCN-Bold, SourceHanSansCN;
		font-weight: bold;
		color: rgba(0, 0, 0, 0.65);
		line-height: 30px;
	}
	#needDetail .theBtn .el-button{
		width: 84px;
		height: 32px;
		padding: 0;
		background: #FA9912;
		border:1px solid #FA9912 !important;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	#needDetail .upload {
		border: 1px solid #2db7f5;
		color: #2db7f5;
	}
	#needDetail .el-detail-item{
		line-height:25px;
		font-size: 14px;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.65);
		line-height: 25px;
		margin: 12px 0;
	}
	#needDetail .el-detail-item label{
		font-weight: bold;
		color: rgba(0, 0, 0, 0.85);
	}
	#needDetail .el-detail-item .tCon{
		margin-left: 104px;
		word-break: break-all;
		word-wrap:break-word;
	}
	#needDetail .el-detail-item label span{
		width: 84px;
		text-align: justify;
		text-align-last: justify;
		display: inline-block;
	}
	#needDetail .el-detail-2{
		margin-top:30px;
		padding-top: 10px;
		border-top: 1px solid #CFCFCF;
	}
	#needDetail .rateSelect {
		display: inline-block;
	}
	#needDetail .rateSelect .el-form-item__content{
		margin-left: 0px !important;
	}

	#needDetail .Cord-header{
		padding: 10px 25px;
		line-height: 40px;
		font-weight: bold;
		font-size: 18px;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		color: #000000;
	}
	#needDetail .Cord-header .el-button{
		margin-top: 5px;
		min-width: 88px;
	}
	#needDetail .table{
		margin: 0 25px 15px 25px;
		padding-bottom: 30px;
		max-width: 100%;
	}

	#needDetail .bgBorderTwo .el-textarea__inner{
		/* border: 0; */
		/* padding: 2px 0; */
		height: 100px;
		min-height: 100px;
		color: rgba(0, 0, 0, 0.65);
		font-size: 14px;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.65);
	}

	/*  */
	#needDetail .proResults{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 999 !important;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0,0.4);
		display: flex;
		align-items: center;
		transition: 0.5s;
		opacity: 0;
	}
	#needDetail .proResults.active{
		opacity: 1;
		transition: 0.5s;
	}
	#needDetail .proResults .proResults-Childer{
		background: #FFFFFF;
		width: 40%;
		margin: 0 auto;
		min-height: 400px;
		max-height: 80%;
		overflow: auto;
	}
	#needDetail .proResults .MarkListing{
		background: #FFFFFF;
		width: 80%;
		margin: 0 auto;
		max-height: 80%;
		overflow: auto;
	}
	#needDetail .collapseBtn {
		margin-top:15px;
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
	#needDetail .proResults .proResults-Childer .el-form{
		height: 90%;
		padding: 15px 30px;
	}
	#needDetail .proResults .proResults-Childer .el-form .el-form-item__label{
		color: #333333;
	}
	#needDetail .proResults .el-select .el-input .el-select__caret.el-input__icon{
		position: relative;
		top: -3px;
		line-height: inherit;
		height: inherit;
	}
	#needDetail .proResults .proResults-Childer .el-form .el-select{
		margin-left: 15px;
	}
	#needDetail .proResults .proResults-Childer .el-form input{
		height: 32px !important;
	}
	/* .proResults .proResults-Childer .el-form textarea{
		height: 185px;
	} */
	#needDetail .codeBianhao .el-form-item__label{
		width: 125px !important;
	}
	#needDetail .codeBianhao .el-form-item__content{
		margin-left: 125px !important;
		width: 60%;
	}
	#needDetail .btn .el-form-item__content{
		margin-left: 0 !important;
		margin-top: 30px;
	}
	#needDetail .card-header{
		height: 49px;
		background: rgba(0, 0, 0, 0.04);
		border-radius: 4px 4px 0px 0px;
		font-size: 17px;
		font-weight: bold;
		font-family: MicrosoftYaHei;
		color: #000000;
		line-height: 49px;
		padding: 0 20px;
		margin-bottom: 15px;
	}
	#needDetail .card-header .el-pull-right{
		font-size: 24px;
		font-weight: bold;
		color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}
	#needDetail .uploadFile .upload{
		border: 1px solid #2DB7F5;
		color: #2DB7F5;
	}
	#needDetail .uploadFile .upTem{
		color: #2DB7F5;
	}
</style>

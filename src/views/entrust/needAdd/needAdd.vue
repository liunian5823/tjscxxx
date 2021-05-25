<template>
	<div id="needAdd">
		<div class="bgBorderTwo">
			<el-form ref="form1" :model="form" :rules="rules" label-width="110px" label-suffix=":" label-position="left" class="demo-ruleForm FormDataDom">
				<el-form-item label="委托标题" prop="title">
					<el-input style="width: 680px;" v-model="form.title" maxlength="30" show-word-limit placeholder="请输入委托标题"></el-input>
				</el-form-item>
				<el-form-item label="委托企业" prop="enterpriseId">
					<el-select filterable v-model="form.enterpriseId" @change="enterpriseChange" placeholder="请选择委托企业">
						<el-option
							v-for="(item,index) in enterprise"
							:label="item.enterpriseName"
							:value="item.enterpriseId"
							:key="index">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="委托项目部" prop="projectId">
					<el-select v-model="form.projectId" @change="projectChange" placeholder="请选择项目部">
						<el-option
							v-for="(item,index) in project"
							:label="item.projectName"
							:value="item.projectId"
							:key="index">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="委托人" prop="entrustId">
					<el-select v-model="form.entrustId"  @change="entrustChange" placeholder="请选择委托人">
						<el-option
							v-for="(item,index) in entrust"
							:label="item.entrustUser + ' ' + item.entrustUserPhone"
							:value="item.entrustId"
							:key="index">
						</el-option>
					</el-select>
				</el-form-item>
				<div class="custom">
					<label class="el-form-item__label"><span style="color: red;">* </span>看货对接人:</label>
					<el-form-item label="" prop="lookUserName" style="display: inline-block;margin-right: 15px;">
						<el-input v-model="form.lookUserName" placeholder="请输入对接人姓名" ></el-input>
					</el-form-item>
					<el-form-item label="" prop="lookUserPhone" style="display: inline-block;">
						<el-input v-model="form.lookUserPhone" placeholder="请输入对接人手机号" ></el-input>
					</el-form-item>
				</div>
				<div class="custom2">
					<label class="el-form-item__label"><span style="color: red;">* </span>看货地址:</label>
					<el-form-item label="" class="address" prop="provinceId" style="display: inline-block;margin-right: 15px;">
						<el-select v-model="form.provinceId" placeholder="请选择省" @change="provinceChange">
							<el-option
								v-for="(province,index) in province"
								:label="province.provinceName"
								:value="province.provinceCode"
								:key="index">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="" class="address" prop="cityId" style="display: inline-block;margin-right: 15px;">
						<el-select v-model="form.cityId" placeholder="请选择市" @change="cityChange">
							<el-option
								v-for="(city,index) in city"
								:label="city.cityName"
								:value="city.cityCode"
								:key="index">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="" class="address" prop="countyId" style="display: inline-block;">
						<el-select v-model="form.countyId" placeholder="请选择区/县" @change="countyChange">
							<el-option
								v-for="(area,index) in county"
								:label="area.areaName"
								:value="area.areaCode"
								:key="index">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="" class="address addrs" prop="address" style="margin-left: 98px;margin-bottom: 25px !important;">
						<el-input v-model="form.address" placeholder="请输入详细地址" ></el-input>
					</el-form-item>
				</div>
				<el-form-item label="补充说明" prop="notes" class="buchong">
					<el-input type="textarea" v-model="form.notes" maxlength="500" show-word-limit ></el-input>
				</el-form-item>
			</el-form>
		</div>

		<div class="bgBorderThree">
			<div class="Cord-header el-clearfix">
				<span>标的清单</span>
				<el-button class="el-pull-right el-blueColor" @click="AddMark()">添加产品</el-button>
				<el-button class="el-pull-right" style="border: 1px solid #2DB7F5;color: #2DB7F5;margin-left: 10px;margin-right: 10px;" @click="download1">批量上传</el-button>
				<el-button type="text" class="el-pull-right" style="color: #2DB7F5;text-decoration: underline;" @click="download1">批量导入模板.xlxs</el-button>
			</div>
			<div class="table">
				<!-- 点击按钮折叠或者打开 -->
				<tableTwo ref="refTableTwo" :table="table1" @tableFuncCellback="tableFuncCellback1"></tableTwo>
				<div class="collapseBtn" @click="AddMark()">+添加标的</div>
			</div>
		</div>

		<div class="bgBorderThree">
			<div class="Cord-header el-clearfix" style="width: 600px;">
				<span>标的照片</span>
				<span class="subtitle">最多上传5个格式为jpg、png 单个文件体积小于5MB的图片</span>
        <el-button class="el-pull-right" style="border: 1px solid #2DB7F5;color: #2DB7F5;margin-right: 10px;" @click="uploadImage">上传图片</el-button>
			</div>
			<div class="table" style="width: 600px;">
				<tableTwo :table="table2" @tableFuncCellback="tableFuncCellback2"></tableTwo>
			</div>
		</div>

		<div class="bgBorderThree">
			<div class="Cord-header el-clearfix">
				<span>附件</span>
			</div>
			<div class="table">
				<div class="">
					<el-button style="border: 1px solid #2DB7F5;color: #2DB7F5;margin-right: 10px;" @click="uploadFile">点击上传</el-button>
					<span class="subtitle">最多上传5个格式为doc、xlsx、pdf、jpg、png单个文件，体积小于5MB的文件</span>
				</div>
				<el-row>
					<el-col class="elCol" :span="4" v-for="(item,index) in fileArr" :key="index" @click="CheckFile(item)">
						<i @click="deleteDelete2(item,index)">×</i>
						<span><span class="el-icon-paperclip"></span>{{ item.fullname }}</span>
					</el-col>
				</el-row>
			</div>
		</div>

		<div class="bgBorderThree">
			<div class="el-b">
				<el-button class="el-noColor" @click="ShutDown">关闭</el-button>
				<el-button class="el-blueColor" @click="submit('form')">递交</el-button>
			</div>
		</div>

		<input type="file" ref="inputFile" multiple="multiple" class="inputFileClass" @change="FileUpload">
    <!-- 图片预览 -->
    <elImageViewer
      v-if="PreviewPcture.show"
      :initial-index = 'PreviewPcture.index'
      :on-close="imagesOnClose"
      :url-list="PreviewPcture.urlarr"
    ></elImageViewer>
	</div>
</template>

<script>
import elImageViewer from 'element-ui/packages/image/src/image-viewer.vue';
export default{
	name:"needAdd",
  components:{
    elImageViewer
  },
	data(){
		let checkPhone = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("手机号不能为空"));
			} else {
				const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				if (reg.test(value)) {
					callback();
				} else {
					return callback(new Error("请输入11位手机号"));
				}
			}
		};
		return {
			form: {
				title: '',
				enterpriseId:'',
				enterpriseName: '',
				projectId: '',
				// jpEntrustId:'',
				projectName: '',
				entrustId:'',
				entrustUser:'',
				entrustUserPhone:'',
				lookUserName:'',
				lookUserPhone:'',
				provinceId:'',
				provinceName:'',
				cityId:'',
				cityName:'',
				countyId:'',
				countyName:'',
				address:'',
				notes:''
			},
			rules: {
				title: [
					{ required: true, message: '请填写委托标题', trigger: 'blur' }
				],
				enterpriseId:[
					{ required:true, message:'请选择委托企业',trigger: 'change' }
				],
				projectId:[
					{ required:true, message:'请选择委托项目部',trigger: 'change' }
				],
				entrustId:[
					{ required:true, message:'请选择委托人',trigger: 'change' }
				],
				lookUserName:[
					{required:true, message:'请输入对接人姓名',trigger: 'blur'}
				],
				lookUserPhone:[
					{required:true, message:'请输入对接人手机号',trigger: 'blur'},
					{ validator: checkPhone, trigger: "blur" },
				],
				provinceId:[
					{required:true, message:'请选择省',trigger: 'change'}
				],
				cityId:[
					{required:true, message:'请选择市',trigger: 'change'}
				],
				countyId:[
					{required:true, message:'请选择县/区',trigger: 'change'}
				],
				address:[
					{required:true, message:'请填写详细地址',trigger: 'blur'}
				],
				notes:[
					{required:true, message:'请填写补充说明',trigger: 'blur'}
				]

			},
			table1:{
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
					{name: "标的类别",prop: "typeCnsNo",width:'400',type:'cascader',option:[]},
					{name: "标的编码",prop: "code",width:'230',type:'selectfilt',option:[]},
					{name: "标的名称",prop: "name",width:'230',type:'selectfilt',require:true,option:[]},
					{name: "规格",prop: "standards",width:'230',type:'selectfilt',option:[]},
					{name: "品牌",prop: "brand",width:'230',type:'input'},
					{name: "物料描述",prop: "represent",width:'230',type:'input'},
					{name: "销售数量",prop: "saleNum",width:'230',type:'input',require:true},
					{name: "计量单位",prop: "unit",width:'230',type:'selectfilt',require:true,option:[]},
					{name: "质量状况",prop: "qualityStatus",width:'230',type:'input'},
					// {name: "附件",prop: "attachmentUrl",width:'230',type:'button'}
				],
				rules:{
					name:[
						{ required:true, message:'请选择标的名称',trigger:  ['change','blur']}
					],
					brand:[
						{ validator: function(rule, value, callback){
							if(value.length < 101){}else{return callback(new Error("字数不多于100"));}
						}, trigger: ['change']}
					],
					represent:[
						{ validator: function(rule, value, callback){
							if(value.length < 101){}else{return callback(new Error("字数不多于100"));}
						}, trigger: ['change']}
					],
					saleNum:[
						{ required:true, message:'请输入销售数量',trigger: 'blur'},
            { pattern: /^[0-9]+.[0-9]*$/, message: '请输入大于0数字', trigger: ['blur','change']},
						{ validator: function(rule, value, callback){
							if(value.length > 6){
								return callback(new Error("不大于5位数"));
							}
						}, trigger: 'change'}
					],
					qualityStatus:[
						{ validator: function(rule, value, callback){
							if(value.length < 22){}else{return callback(new Error("字数不多于22"));}
						}, trigger: ['change']}
					],
					unit:[
						{ required:true, message:'请选择计量单位',trigger:  ['change','blur']}
					],
				}
			},
			table2:{
				// 表格操作数组
				operationList: ['上移','下移','删除'],
				// 操作块儿是否显示
				// isoperation: false,
				// 数据数组
				Dataorigin: [],
				// 右侧操作宽度
				operationW: "150",
				// 表头数组
				header: [
					{name: "排序",prop: "sort",width:'100'},
					{name: "图片名称",prop: "fullname",width:'250',type:'button'},
					{name: "大小",prop: "size",width:'80'},
				],
			},
      // 图片
      imagesArr:[],
			// 附件
			fileArr:[],
      // 图片查看
      PreviewPcture:{
        index:'',
        urlarr:[],
        show:false
      },
      // 指定目前上传的是哪个字段或集合
      SpecifiedField:[],
			// 委托企业
			enterprise:[],
			project:[],
			entrust:[],
			contNumber:0,     //自增变量，有用
			// 省
			province:[],
			city:[],
			county:[],

		}
	},
	mounted() {
		// 查询省
		this.address();
		// 查询委托企业
		this.enterpriseFunc(1,0);
		// 查询标的编码、规格、名称
		this.subjectDown();
		// 查询计量单位
		this.queryReUnit();
		// 查询标的清单-标的类别
		this.underlyingType();
	},
	methods: {
		// 保存数据
		submit(formName){
			var _this = this;
			if(!_this.$refs.refTableTwo.refTableTwo()) return false;
			_this.$refs['form1'].validate((valid) => {
				if (valid) {
					_this.msgBox.msgBoxOpen(_this,{
						message:'确认要递交委托需求?',
						// btnText:'受理',
						success(data){   //确定回调
							var url = _this.apis + '/entrust/jp-entrust-infor';
              _this.form.upload = _this.imagesArr;
              _this.form.upload1 = _this.fileArr;
							// console.log(_this.form)
							_this.httpsapi.POST(url,_this.form).then((result) => {
								// console.log(result);
								if(result.code == 200){
									_this.table1.Dataorigin.forEach((item,idnex) => {
										var t = '';
										item.typeCnsNo.forEach((item1,index1) => {
											t += item1 + ',';
										})
										item.type = t.substring(0,t.length -1);
									})
									// console.log(_this.table1.Dataorigin)
                  if(_this.table1.Dataorigin.length > 0){
                    _this.httpsapi.POST(_this.apis + '/entrust/jp-entrust-infor/saveBidding',{
                      id:result.data,
                      biddingList:_this.table1.Dataorigin
                    }).then((result) => {
                      // console.log(data);
                      if(result.code == 200){
                        _this.$message({
                          showClose: true,
                          offset: 400,
                          message: '递交成功',
                          duration: "2000",
                          type: "success",
                        });
                        _this.$router.replace('needs');
                      }
                    }).catch((err) => {});
                  }else{
                      _this.$message({
                        showClose: true,
                        offset: 400,
                        message: '递交失败',
                        duration: "2000",
                        type: "error",
                      });
                  }

								}
							}).catch((err) => {});
						}
					})
				} else {
					return false;
				}
			});
		},
		// 标的清单回调
		tableFuncCellback1(data){
			switch(data[1]) {
				case 'button':
			    	this.detele1(data[0]);
					break;
				case '上传附件':
					this.unUpload(data[0]);
					break;
        case '查看附件':
        	window.open(this.tuurl+data[0].attachmentUrl)
        	break;
				default:
					break;
			}
		},
    // 图片
		tableFuncCellback2(data){
			switch(data[1]) {
			    case '删除':     //删除图片
            this.imagesDetail(data[0]);
			    	break;
          case '上移':
            this.MoveUp(data[0]);
            break;
          case '下移':
            this.MoveDown(data[0]);
            break;
          case 'button':
            this.lookImage(data[0]);
            break;
				default:
					break;
			}
		},
    // 上移
    MoveUp(data){
      if((data.sort-1) == 0 ){
        return false;
      }
      this.table2.Dataorigin = [];
      var moveA = this.imagesArr[data.sort - 1];
      var moveB = this.imagesArr[data.sort - 2];
      this.imagesArr[data.sort - 1] = moveB;
      this.imagesArr[data.sort - 2] = moveA;
      this.table2.Dataorigin = JSON.parse(this.imagesArrF());
    },
    // 下移
    MoveDown(data){
      if(data.sort == this.imagesArr.length){
        return false;
      }
      this.table2.Dataorigin = [];
      var moveA = this.imagesArr[data.sort - 1];
      var moveB = this.imagesArr[data.sort];
      this.imagesArr[data.sort - 1] = moveB;
      this.imagesArr[data.sort] = moveA;
      console.log(this.imagesArr);
      this.table2.Dataorigin = JSON.parse(this.imagesArrF());
    },
    // 删除图片
    imagesDetail(data){
      this.imagesArr.splice((data.sort - 1),1);
      this.table2.Dataorigin = JSON.parse(this.imagesArrF());
    },
    // 上传图片
    uploadImage(){
      if(this.table2.Dataorigin.length < 5){
        this.upload();
        this.SpecifiedField[0] = 'images';
      }
    },
    // 上传附件
    uploadFile(){
      if(this.fileArr.length < 5){
        this.upload();
        this.SpecifiedField[0] = 'file';
      }
    },
    // 排序图片
    imagesArrF(data){
      if(data){
        this.imagesArr.push(data);
      }
      this.imagesArr.forEach((item,index) => {
        item.sort = index+1;
      })
      return JSON.stringify(this.imagesArr);
    },
    // 查看图片
    lookImage(data){
      var arr = [];
      this.table2.Dataorigin.forEach((item,index) => {
        arr.push(this.tuurl + item.url);
        if(item == data){
          this.PreviewPcture.index = index;
        }
      })
      this.PreviewPcture.urlarr = arr;
      this.PreviewPcture.show = true;
      console.log(this.PreviewPcture)
    },
    // 关闭图片弹框
    imagesOnClose(){
      this.PreviewPcture.show = false;
    },
    // 点击查看附件
    CheckFile (data){
      window.open(this.tuurl+data.url)
    },
    // 删除附件
    deleteDelete2(item,index){
    	var _this = this
    	_this.msgBox.msgBoxOpen(_this,{
    		message:'确认要删除'+ item.fullname +'?',
    		success(result){   //确定回调
          _this.fileArr.splice(index,1)
          _this.$message({
            showClose: true,
            offset: 400,
            message: '删除成功',
            duration: "2000",
            type: "success",
          });
    		}
    	})
    },
    // 上传
    upload(){
    	this.$refs.inputFile.dispatchEvent(new MouseEvent('click'))
    },

		// 添加标的清单
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
			this.table1.Dataorigin.push(_tableObj)
		},
		// 标的清单删除
		detele1(data){
			var oindex = this.table1.Dataorigin.findIndex((ele) => {
				return ele.ioId === data.ioId;
			});
			this.table1.Dataorigin.splice(oindex, 1);
			this.$refs.refTableTwo.refTableTwo();
		},
		// 标的清单上传附件
		unUpload(data){
      this.upload();
      this.SpecifiedField[0] = 'underlying';
      this.SpecifiedField[1] = data.ioId;
		},

    // 文件上传
    FileUpload(e){
      console.log(e)
    	var that = this;
      if(that.SpecifiedField[0] == 'images'){
        that.uploading.uploading(e, "5", "jpg/png", that,function(result){
          that.table2.Dataorigin = JSON.parse(that.imagesArrF(result));
        });
      }else if(that.SpecifiedField[0] == 'file'){
        that.uploading.uploading(e, "5", "doc/docx/xls/xlsx/pdf/jpg/png", that,function(result){
          that.fileArr.push(result);
        });
      }else if(that.SpecifiedField[0] == 'underlying'){
        that.uploading.uploading(e, "5", "doc/docx/xls/xlsx/pdf/jpg/png", that,function(result){
          that.table1.Dataorigin.forEach(item => {
            if(item.ioId == that.SpecifiedField[1]){
              item.attachmentUrl = result.url;
              item.unStatus = '1';
            }
          })
        });
      }
      that.$refs.inputFile.value = '';
    },

		// 关闭
		ShutDown(){
			// 返回上一页
			this.$router.go(-1);
		},
		// 查询标的类别
		underlyingType(){
			this.table1.header[1].option = this.$store.state.underlyingType;
		},
		// 查询标的编码、名称、规格
		subjectDown(){
			var _this = this;
			_this.httpsapi.POST(_this.apis + '/entrust/jp-entrust-infor/subjectDown',{}).then((result) => {
				// console.log(result)
				if(result.code == 200){
					var _result = result.data;
					_result.code.forEach((item,index) => {
						this.table1.header[2].option.push({value:item.code,name:item.code})
					})
					_result.name.forEach((item,index) => {
						this.table1.header[3].option.push({value:item.name,name:item.name})
					})
					_result.standards.forEach((item,index) => {
						this.table1.header[4].option.push({value:item.standards,name:item.standards})
					})
				}
			})
		},
		// 计量单位
		queryReUnit(){
			var _this = this;
			_this.httpsapi.POST(_this.apis + '/trade/scene/queryReUnit',{}).then((result) => {
				// console.log(result)
				if(result.code == 200){
					result.data.forEach( (item,index) => {
						this.table1.header[8].option.push({value:item.name,name:item.name});
					})
				}
			})
		},
		// 查询委托企业
		enterpriseFunc(type,id){
			var _this = this;
			var url = this.apis + '/entrust/jp-entrust-infor/getCompanyProjectUser/'+ type +'/'+id;
			_this.httpsapi.POST(url,{}).then((result) => {
				if(result.code == 200){
					if(type == 1){
						this.enterprise = result.data;
					}else if(type == 2){
						this.form.projectId = '';
						this.form.projectName = '';
						this.project = result.data;
					}else if(type == 3){
						console.log(result)
						this.form.entrustId = '';
						this.form.entrustUser = '';
						this.form.entrustUserPhone = '';
						this.entrust = result.data;
					}
				}
			})
		},
		// 监听委托企业
		enterpriseChange(change){
			this.form.enterpriseName = this.enterprise.find(item => {
				return item.enterpriseId === change
			}).enterpriseName;
			this.enterpriseFunc(2,change);
		},
		// 监听委托项目部
		projectChange(change){
			this.form.projectName = this.project.find(item => {
				return item.projectId === change
			}).projectName;
			this.enterpriseFunc(3,change);
		},
		// 监听委托人
		entrustChange(change){
			var o = this.entrust.find(item => {
				// this.form.jpEntrustId = item.id
				return item.entrustId === change;
			});
			this.form.entrustUser = o.entrustUser;
			this.form.entrustUserPhone = o.entrustUserPhone;
		},
		// 获取省
		address(){
			var _this = this;
			var url = this.apis + '/ec/province-city-area/searchProvince';
			_this.httpsapi.POST(url,{}).then((result) => {
				if(result.code == 200){
					this.province = result.data;
				}
			})
		},
		// 监听省获取市
		provinceChange(data){
			var _this = this;
			var url = _this.apis + '/ec/province-city-area/searchCity';
			_this.form.provinceName = _this.province.find(item => {
				return item.provinceCode === data
			}).provinceName;
			_this.httpsapi.POST(url,{provinceCode:data}).then((result) => {
				_this.form.cityId = '';
				if(result.code == 200){
					_this.city = result.data;
				}
			})
		},
		// 监听市获取县/区
		cityChange(data){
			var _this = this;
			var url = this.apis + '/ec/province-city-area/searchArea';
			_this.form.cityName = _this.city.find(item => {
				return item.cityCode === data
			}).cityName;
			_this.httpsapi.POST(url,{cityCode:data}).then((result) => {
				this.form.countyId = '';
				if(result.code == 200){
					this.county = result.data;
				}
			})
		},
		// 监听县/区
		countyChange(data){
			var _this = this;
			_this.form.countyName = _this.county.find(item => {
				return item.areaCode === data
			}).areaName;
		}
	},

}
</script>

<style>
	.FormDataDom .el-form-item__label{
		width: 110px !important;
	}
	.FormDataDom .custom .el-form-item,.FormDataDom .custom2 .el-form-item{
		margin-left: -110px !important;
	}
	.FormDataDom .custom2 .address .el-input__inner{
		width: 217px !important;
		margin-bottom: 0px !important;
	}
	.FormDataDom .custom2 .addrs .el-input__inner{
		width: 680px !important;
		margin-left: 110px;
	}
	.FormDataDom .custom2 .addrs .el-form-item__error{
		left: 110px;
	}
	.FormDataDom .el-textarea__inner{
		height: 185px !important;
	}
  .FormDataDom .buchong .el-form-item__error{
    top: 100% !important;
  }

</style>
<style scoped>
	#needAdd .subtitle{
		font-size: 12px;
		font-weight: 100;
		padding-left: 15px;
		color: #787878;
	}
	#needAdd .table{
		margin: 0 25px 15px 25px;
		padding-bottom: 30px;
		max-width: 100%;
	}
	#needAdd .table .el-row{
		margin-top: 20px;
	}
	#needAdd .table .el-row .el-col{
		color: #2DB7F5;
		cursor: pointer;
		position: relative;
		padding: 15px;
		font-size: 14px;
	}
	#needAdd .elCol i{
		display: none;
	}
	#needAdd .elCol:hover{
		background-color: rgba(45, 183, 245, 0.05);
	}
	#needAdd .elCol:hover i{
		display: inline-block;
		position: absolute;
		top: -5px;
		right: -5px;
		border-radius: 50%;
		width: 16px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		border: 1px solid #E51D27;
		color: #E51D27;
		font-size: 20px;
	}
	#needAdd .el-table td div{
		width: 100%;
	}

</style>

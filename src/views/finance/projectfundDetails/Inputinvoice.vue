<template>
  <div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">
          结算单单号:{{ xiangqings.settlementCode }}
        </div>
        <div class="theTitle el-pull-left" style="float: right">
          <div class="title_right">
            <div class="title_right_text">
              {{ xiangqings.settlementStatus }}
            </div>
          </div>
        </div>
      </div>

      <div class="el-detail el-detail-1">
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>订单单号</span>：</label>
          <div class="tCon">{{ xiangqings.orderCode }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>提货单号</span>：</label>
          <div class="tCon">{{ xiangqings.deliveryCode }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>对账单编号</span>：</label>
          <div class="tCon">{{ xiangqings.accountNum }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>创建时间</span>：</label>
          <div class="tCon">{{ xiangqings.createTime }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>完成日期</span>：</label>
          <div class="tCon">{{ xiangqings.finishTimeStart }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>对账周期</span>：</label>
          <div class="tCon">
            {{ xiangqings.startDate }}至{{ xiangqings.endDate }}
          </div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托单位</span>：</label>
          <div class="tCon">{{ xiangqings.companyName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>委托部门</span>：</label>
          <div class="tCon">{{ xiangqings.projectName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>提货单位</span>：</label>
          <div class="tCon">{{ xiangqings.buyerCompanyName }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>对账状态</span>：</label>
          <div class="tCon">{{ xiangqings.accountStatus }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>业务类型</span>：</label>
          <div class="tCon">{{ xiangqings.settlementType }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>结算金额</span>：</label>
          <div class="tCon">{{ xiangqings.settlementAmount }}</div>
        </div>
        <div class="el-detail-item el-clearfix">
          <label class="el-pull-left"><span>结算金额(大写)</span>：</label>
          <div class="tCon">{{ Jiesuan }}</div>
        </div>
      </div>
    </div>
    <div class="bgBorderTwo">
      <div class="el-title el-clearfix">
        <div class="theTitle el-pull-left">录入发票</div>
        <div class="theTitle el-pull-left" style="float: right">
          <div class="title_right">
            <div class="title_right_text" @click="tianjia">添加</div>
          </div>
        </div>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <div v-for="(item, index) in form.shuju" :key="index" class="baop">
          <div class="title">
            发票({{ index + 1 }})
            <span class="asd" @click="onSubmits(index)" v-if="index != '0'"
              >删除</span
            >
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票抬头" required>
                <el-input v-model="item.title" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light"></div
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="识别号" required>
                <el-input
                  v-model="item.taxpayerNumber"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发票类型">
                <el-input
                  v-model="item.invTypes"
                  :disabled="true"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="发票号"
                required
                :prop="'shuju[' + index + '].invNo'"
                :rules="{
                  required: true,
                  message: '发票号不能为空',
                  trigger: 'blur'
                }"
              >
                <el-input v-model="item.invNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="发票代码"
                required
                :prop="'shuju[' + index + '].invCode'"
                :rules="{
                  required: true,
                  message: '发票代码不能为空',
                  trigger: 'blur'
                }"
              >
                <el-input v-model="item.invCode"></el-input> </el-form-item
            ></el-col> </el-row
          ><el-row>
            <el-col :span="12">
              <el-form-item
                label="金额"
                required
                :prop="'shuju[' + index + '].amount'"
                :rules="{
                  required: true,
                  message: '金额不能为空',
                  trigger: 'blur'
                }"
              >
                <el-input
                  v-model="item.amount"
                  oninput="value=value.replace(/[^0-9.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="税价合计"
                required
                :prop="'shuju[' + index + '].totalTax'"
                :rules="{
                  required: true,
                  message: '税价合计不能为空',
                  trigger: 'blur'
                }"
              >
                <el-input v-model="item.totalTax"></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="发票税率"
                required
                :prop="'shuju[' + index + '].taxRates'"
                :rules="{
                  required: true,
                  message: '发票税率不能为空',
                  trigger: 'blur'
                }"
              >
                <!-- <el-input v-model="item.taxRates"></el-input> -->
                <el-select v-model="item.taxRates" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开票日期">
                <el-date-picker
                  v-model="item.openInvoiceTime"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker></el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="销方名称"
                required
                :prop="'shuju[' + index + '].supplierTaxpayerName'"
                :rules="{
                  required: true,
                  message: '销方名称不能为空',
                  trigger: 'blur'
                }"
              >
                <el-input v-model="item.supplierTaxpayerName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="销方识别号"
                required
                :prop="'shuju[' + index + '].supplierTaxpayerNumber'"
                :rules="{
                  required: true,
                  message: '销方识别号不能为空',
                  trigger: 'blur'
                }"
              >
                <el-input
                  v-model="item.supplierTaxpayerNumber"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注信息">
                <el-input type="textarea" v-model="item.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-button
            type="primary"
            v-if="index != '0'"
            @click="onSubmits(index)"
            >shanchu</el-button
          > -->
        </div>
      </el-form>
      <div class="bgBorderTwo">
        <el-row>
          <el-button type="primary" @click="save">保存</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import zhuanhua from "../../../views/Numberzhuanhua/idnex.js";
export default {
  name: "Inputinvoice",
  data() {
    return {
      form: {
        shuju: [
          {
            title: "",
            invType: "",
            invTypes: "",
            invNo: "",
            invCode: "",
            amount: "",
            totalTax: "",
            taxRates: "",
            taxpayerNumber: "",
            invoicePath: "",
            invoiceName: "",
            remarks: "",
            supplierTaxpayerName: "",
            supplierTaxpayerNumber: "",
            openInvoiceTime: ""
          }
        ]
      },

      options: [
        {
          value: "0.3",
          label: "0.3"
        },
        {
          value: "0.6",
          label: "0.6"
        },
        {
          value: "0.9",
          label: "0.9"
        },
        {
          value: "0.13",
          label: "0.13"
        }
      ],
      xiangqings: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.uuid = this.$route.query.no;
    this.xiangqing();
  },
  methods: {
    tianjia() {
      var than = this;
      var a = {
        title: this.form.shuju[0].title, //发票抬头
        invType: "", //发票类型
        invTypes: this.form.shuju[0].invTypes,
        invNo: "", //发票号
        invCode: "", //发票代码
        amount: "", //金额
        totalTax: "", //税价合计
        taxRates: "", //税率
        taxpayerNumber: this.form.shuju[0].taxpayerNumber, //纳税人识别号
        invoicePath: "", //发票图片地址
        invoiceName: "", //发票文件名称
        remarks: "", //备注
        supplierTaxpayerName: "", //销方名称
        supplierTaxpayerNumber: "", //销方纳税人识别编号
        openInvoiceTime: "" //开票日期
      };
      than.form.shuju.push(a);
      console.log(than.shuju);
    },
    onSubmits(e) {
      var than = this;
      this.form.shuju.splice(e, 1);
    },
    xiangqing() {
      //   /system/re-settlement/searchSettlement/{id}
      var url = this.apis + "/system/jp-billing/searchBilling/" + this.id;
      var obj = {};
      this.httpsapi
        .POST(url, obj)
        .then(response => {
          if (response.data.settlementStatus == "10") {
            response.data.settlementStatus = "待结算";
          } else if (response.data.settlementStatus == "20") {
            response.data.settlementStatus = "结算中";
          } else if (response.data.settlementStatus == "30") {
            response.data.settlementStatus = "结算完成";
          } else if (response.data.settlementStatus == "100") {
            response.data.settlementStatus = "失效作废";
          }

          if (response.data.settlementType == "1") {
            response.data.settlementType = "预付货";
          } else if (response.data.settlementType == "2") {
            response.data.settlementType = "货款支付";
          } else if (response.data.settlementType == "3") {
            response.data.settlementType = "货款退款";
          } else if (response.data.settlementType == "4") {
            response.data.settlementType = "服务费";
          }
          if (response.data.accountStatus == "1") {
            response.data.accountStatus = "余额支付";
          } else if (response.data.accountStatus == "2") {
            response.data.accountStatus = "转账汇款";
          } else if (response.data.accountStatus == "3") {
            response.data.accountStatus = "银联支付";
          }
          //   invoiceType
          if (response.data.invoiceType == "1") {
            response.data.invoiceType = "增值税专用发票";
            this.form.shuju[0].invType = "1";
            this.form.shuju[0].invTypes = "增值税专用发票";
          } else if (response.data.invoiceType == "2") {
            response.data.invoiceType = "增值税普通发票";
            this.form.shuju[0].invType = "2";
            this.form.shuju[0].invTypes = "增值税普通发票";
          } else if (response.data.invoiceType == "3") {
            response.data.invoiceType = "其他";
            this.form.shuju[0].invType = "3";
            this.form.shuju[0].invTypes = "其他";
          }
          this.xiangqings = response.data;
          this.form.shuju[0].title = response.data.title;
          this.form.shuju[0].taxpayerNumber = response.data.taxpayerNumber;
          this.Jiesuan = zhuanhua.smallToBig(response.data.settlementAmount);
          this.invoice();
        })
        .catch(err => {
          //console.log(err);
        });
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          for (var i = 0; i < this.form.shuju.length; i++) {
            var a = new Date(this.form.shuju[i].openInvoiceTime);
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

            this.form.shuju[i].openInvoiceTime =
              b + "-" + c + "-" + d + " " + "00:00:00";
          }

          var as = {};
          as["info"] = this.form.shuju;
          console.log(a);
          // console.log(a);
          // a.info.push(this.form.shuju);
          // /system/jp-billing/insertInvoice/
          var url = this.apis + "/system/jp-billing/insertInvoice/" + this.id;
          this.httpsapi
            .POST(url, as)
            .then(response => {
              this.$message({
                showClose: true,
                offset: 400,
                message: response.message,
                type: "error"
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-title {
  margin: 15px 0;
}
.theTitle {
  height: 42px;
  font-size: 20px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
  line-height: 30px;
}
.theBtn .el-button {
  width: 84px;
  height: 32px;
  padding: 0;
  background: #fa9912;
  border: 1px solid #fa9912 !important;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}

.el-detail-item {
  line-height: 25px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 25px;
  margin: 12px 0;
}
.el-detail-item label {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}
.el-detail-item .tCon {
  margin-left: 135px;
  word-break: break-all;
  word-wrap: break-word;
}
.el-detail-item label span {
  width: 120px;
  text-align: justify;
  text-align-last: justify;
  display: inline-block;
}
.el-detail-2 {
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #cfcfcf;
}

.Cord-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 25px;
  line-height: 40px;
  font-weight: bold;
  font-size: 14px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  color: #000000;
}
.Cord-header .el-button {
  margin-top: 5px;
  min-width: 88px;
}
.table {
  margin: 15px;
  padding-top: 15px;
  padding-bottom: 30px;
  max-width: 100%;
}

.el-b {
  padding: 15px 0;
  text-align: center;
}
.title_right {
  width: 74px;
  height: 32px;
  background: #2db7f5;
  border-radius: 4px;
}
.title_right_text {
  width: 100%;
  height: 19px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #ffffff;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
.baop {
  border: 1px solid #2fb8f5;
  padding: 10px;
  margin-top: 10px;
}
.title {
  background: #f5f5f5;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-indent: 25px;
}
/deep/.el-date-editor.el-input {
  width: 100% !important;
}
/deep/.el-form-item__label {
  width: 120px !important;
}

/deep/ .el-form-item__content {
  margin-left: 120px !important;
}

/deep/.el-select {
  width: 100% !important;
}

.asd {
  display: block;
  float: right;
  margin-right: 10px;
}
</style>

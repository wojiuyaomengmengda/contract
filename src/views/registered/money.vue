<template>
    <div>
        <el-row class="tt-a title">
            对公账号: {{subbranch}} {{cardNo}}
        </el-row>
        <el-row class="tt-a m-t-20">
            <i class="el-icon-success icon"></i>
        </el-row>
        <el-row class="tt-a m-t-20 fw-b fs-14">
            打款已受理！预计
            <span style="color:#F56C6C">{{foresee}}</span>
            前到账
        </el-row>
        <el-row class="tt-a m-t-20 fw-b fs-14">
            <el-form label-position="top" label-width="80px" :model="form" style="width: 400px;margin:0 auto;text-align:left">
                <el-form-item label="您收到的打款金额">
                    <el-input v-model="form.money" type="number">
                        <svg-icon icon-class="money" slot="prefix" />
                    </el-input>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row style="width: 700px;margin: 0 auto">
            <el-col style="color: #999;font-size: 14px">
                我们会向贵单位的对公银行账户提交一笔1元以下的打款申请，回填打款金额即可认证。
                <el-button type="text" @click="again">重新申请打款</el-button>
            </el-col>
            <el-col class="m-t-20 lh-20">
                友情提示：
            </el-col>
            <el-col class="lh-30">
                1. 请在银行流水明细中查看打款金额，正确输入才能通过认证;
            </el-col>
            <el-col class="lh-30">
                2. 如超过72小时，您的银行卡内没有查询到汇款金额，可能银行退票，请及时联系客服人员
            </el-col>
            <el-col class="lh-30">
                3. 受银行结算时间影响，打款到账时间5分钟-72小时不等，请耐心等待;
            </el-col>
            <el-col class="lh-30">
                4. 由于银行返回打款信息有延迟，如遇实际到账无法输入确认金额的情况，建议1天后重试;
            </el-col>
        </el-row>

        <el-row class="tt-a">
            <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
        </el-row>
    </div>
</template>

<script>
import { 
  QueryCompanyVerificationFlowId, 
  InitiatePaymentCertification,
  QueryBankInformation,
  QueryCompanyInfo,
  QueryPaymentProgress,
  VerificationPaymentAmount
} from '@/api/certification'
export default {
  name: 'qiye',
  data() {
    return {
        subbranch: '',
        cardNo: '',
        foresee: '',
        form: {
            money: 0
        }
    }
  },
  methods: {
    // 下一步按钮 --> 核实付款金额
    next() {
      const data = {
        companyId: this.$store.state.userId,
        flowId: this.flowId,
        amount: this.form.money,
      }
      VerificationPaymentAmount(data).then(res => {
          if(res.code == '0') {
              this.$message.success(res.msg)
              this.$emit('next', 4);
          }
      })
    },
    // 初始化
    init() {
      // 1.查询流程id
      this.queryCompanyVerificationFlowId()
    },
    // 查询流程id
    queryCompanyVerificationFlowId() {
      const data = {
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        currId: this.$store.state.user.currId,
      }
      QueryCompanyVerificationFlowId(data).then(res => {
         if(res.code == '0') {
           this.flowId = res.data.flowId
           //2. 【WEB-API】查询打款进度
           this.queryPaymentProgress()
         }
      })
    },
    //2. 【WEB-API】查询打款进度
    queryPaymentProgress() {
        const data = {
            flowId: this. flowId
        }
        QueryPaymentProgress(data).then(res => {
            console.log(res)
            if(res.code == '0') {
                this.foresee = res.data.foresee
                this.subbranch = res.data.subbranch
                this.cardNo = res.data.cardNo
            }
        })
    },
    //3. 重新申请打款--> 返回上一级填写打款金额
    again() {
        console.log('aa')
        this.$emit('next', 2)
    },
    //
  },
  created() {
      this.init()
  }
}
</script>

<style lang="scss" scoped>
    .icon {
        font-size: 74px!important;
        color: #67C23A;
    }
    .title {
        width: 80%;
        margin: 0 auto;
        padding: 15px;
        background: #ccc;
        color: #675e5e;
    }
    .fw-b {
        font-weight: bold
    }
    .fs-14 {
        font-size: 18px;
        color: #999;
    }
    .lh-20 {
        line-height: 20px;
    }
    .lh-30 {
        line-height: 30px;
    }
</style>
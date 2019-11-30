<template>
    <div>
        <el-row class="tt-a m-10">
            <!-- 认证信息: 杭州天谷信息科技有限公司(913301087458306077) -->
            {{commpany}}
            <!-- <el-button type="text" @click="edit">编辑</el-button> -->
        </el-row>
        <el-form ref="form" :rules="rules" label-position="left" :model="form" label-width="160px" style="width: 600px;margin:20px auto">
            <el-form-item label="开户名">
              <el-input v-model="form.bankName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="银行账户" prop="bankCard">
              <el-input v-model="form.bankCard"></el-input>
            </el-form-item>
            <el-form-item label="开户银行" prop="bank">
              <el-autocomplete
                style="width: 100%"
                v-model="form.bank" 
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入开户银行"
                @select="handleSelect">
              </el-autocomplete>
            </el-form-item>
        </el-form>

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
  QueryCompanyInfo
} from '@/api/certification'
import { mapGetters } from 'vuex'
export default {
  name: 'qiye',
  data() {
    return {
      form: {   // 表单信息
        bankName: '',
        bank: '',
        bankCard: ''
      },
      commpany: '',  // 公司信息
      bank: {        //用户选择的银行信息
        bank: "",
        bankName: "",
        city: "",
        cnapsCode: "",
        province: ""
      },
      rules: {
        bank: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        bankCard: [
          { required: true, message: '请输入银行账户', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'verificationStatus',
      'userId',
      'currId',
      'roleId'
    ])
  },
  methods: {
    next() {
      // this.$emit('next', 3);
      this.$refs.form.validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.initiatePaymentCertification()
        } else {
          console.log('error submit!!');
          return false;
        }
      })
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
           
         }
      })
    },
    // 获取企业信息
    queryCompanyInfo() {
      console.log(this.$store);
      const { userId, currId, roleId } = this
      const data = {
        userId,
        currId,
        roleId
      }
      QueryCompanyInfo(data).then(res => {
        console.log(res);
        if (res.code == '0') {
          const { companyName, corporateRepresentative, organizationCode } = res.data
          this.commpany = companyName + `(${organizationCode})`
          this.form.bankName = companyName
          
          let params = {
            organizationCode,
            companyName
          }
          this.$store.dispatch('certification/companyName', params)
        }
      })
    },
    init() {
      // 1.查询公司信息
      this.queryCompanyInfo()
      // 2.查询流程id
      this.queryCompanyVerificationFlowId()
    },
    // 发起随机金额打款
    initiatePaymentCertification() {
      const params = {
        companyId: this.$store.state.userId,     //当前登录的企业账号
        flowId: this.flowId,        //认证流程id
        bank: this.bank.bank,          //对公账号开户行总行
        province: this.bank.province,      //对公账号开户行所再省份名称
        city: this.bank.city,          //对公账号开户行所再城市
        subbranch: this.bank.bankName,     // 对公账号开户行支行名称
        cardNo: this.form.bank,        //银行卡信息
        cnapsCode: this.bank.cnapsCode      //联行号
      }
      InitiatePaymentCertification(params).then(res => {
        console.log(res)
        if(res.code == '0') {
          this.$emit('next', 3);
        }
      })
    },
    handleSelect(item) {
      console.log(item);
      this.bank = item;
    },
    // 查询打款银行账号信息
    querySearchAsync(queryString, cb) {
      const params = {
        flowId: this.flowId,
        keyWord: queryString
      }
      QueryBankInformation(params).then(res => {
        if(res.code == '0') {
          console.log(res)
          if(res.data) {
            res.data.list.map( v => {
              v.value = v.bankName
            })
            cb(res.data.list)
          } else {
            // cb('无数据')
          }
        }
      })
      console.log(queryString)
    },
  },
  created() {
    this.init()
  },

}
</script>

<style lang="scss" scoped>
  .m-10 {
    margin: 10px 0;
  }
</style>
<template>
    <div>
        <el-form ref="form" label-position="left" :rules="rules" :model="form" label-width="160px" style="width: 600px;margin:20px auto">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="IDcard">
              <el-input v-model="form.IDcard"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
        </el-form>

      <el-row class="tt-a">
        <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
      </el-row>

      <el-dialog title="经办人身份验证" :visible.sync="dialogVisible" width="30%">
        <el-input v-model="code" placeholder="请输入手机验证码"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="phoneSend">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import { PersonChargeVerifySmsCode, SponsorRealNameRecognition, PersonChargeVerification } from '@/api/certification'
export default {
  name: 'qiye',
  data() {
    return {
      form: {
        name: '',
        phone: '',
        IDcard: ''
      },
      dialogVisible: false,
      code: '',
      rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' }, 
          ],
          IDcard: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }, 
          ]
        }
    }
  },
  methods: {
    next() {
      const params = {
        personChargeId: this.$store.state.certification.personChargeId,
        accountId: this.$store.state.certification.accountId,
        personChargeName: this.form.name,
        personChargeIdNumber: this.form.IDcard,
        personChargePhone: this.form.phone
      }
      PersonChargeVerification(params).then(res => {
          console.log(res)
          if (res.code == '0') {
            this.flowId = res.data.flowId
            this.dialogVisible = true
          }
      })
    },
    // 输入手机验证码确定
    phoneSend() {
      if(!this.code) {
        return this.$message.error('请输入验证码');
      }
      const params = {
        personChargeId: this.$store.state.certification.personChargeId,
        flowId: this.flowId,
        personChargePhone: this.form.phone,
        verifyCode: this.code
      }
      console.log(params)
      PersonChargeVerifySmsCode(params).then(res => {
        console.log(res)
        if(res.code == '0') {
          this.$message.success('电子合同经办人身份证验证成功')
          // this.$emit('next', 2)
          // 进行企业实名认证校验
          this.sponsorRealNameRecognition()
        }
      })
    },
    // 手机验证码认证成功之后进行企业实名认证校验
    sponsorRealNameRecognition() {
      const data = {
        orgId: this.$store.state.certification.orgId,
        agentAccountId: this.$store.state.certification.accountId,
      }
      // 企业实名认证校验
      SponsorRealNameRecognition(data).then(res => {
        if(res.code == '0') {
          this.$message.success('认证成功')
          this.$emit('next', 2)
        }
      })
    }
  },
  created() {
    console.log(this.$store.state.certification.personChargeId)
    if(!this.$store.state.certification.personChargeId){
      this.$emit('next', 0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
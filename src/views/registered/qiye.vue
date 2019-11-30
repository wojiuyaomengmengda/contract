<template>
    <div>
      <el-form ref="form" label-position="left" :rules="rules" :model="form" label-width="160px" style="width: 600px;margin:20px auto">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="IDcard">
          <el-input v-model="form.IDcard"></el-input>
        </el-form-item>

        <el-row class="tt-a m-b-20">
          <el-tag type="info">组织机构信息</el-tag>
        </el-row>

        <el-form-item label="组织名称">
          <el-input v-model="form.OrganizationName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="组织代码">
          <el-input v-model="form.OrganizationCode" :disabled="true"></el-input>
        </el-form-item>

        <el-row class="tt-a m-b-20">
          <el-tag type="info">法定代表人信息</el-tag>
        </el-row>

        <el-form-item label="法定代表人名称">
          <el-input v-model="form.representativeName" :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <el-row class="tt-a">
        <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
      </el-row>
    </div>
</template>

<script>
import { QueryCompanyInfo, CompanyVerification } from '@/api/certification'
import { mapGetters } from 'vuex'
export default {
  name: 'qiye',
  computed: {
    ...mapGetters([
      'verificationStatus',
      'userId',
      'currId',
      'roleId'
    ])
  },
  data() {
    return {
      form: {
        name: '',
        IDcard: '',
        OrganizationName: '',
        OrganizationCode: '',
        representativeName: '',
      },

      rules: {
          name: [
            { required: true, message: '请输入经办人姓名', trigger: 'blur' },
          ],
          IDcard: [
            { required: true, message: '请输入经办人身份证号码', trigger: 'blur' }
          ],
        }
    }
  },
  created() {
    this.queryCompanyInfo()
    console.log(this.$store)
  },
  methods: {
    next() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('xoxoxo')
          const data = {
            personChargeName: this.form.name,
            personChargeIdNumber: this.form.IDcard,
            companyId: this.userId
          }
          CompanyVerification(data).then(res => {
              console.log(res)
            if(res.code == '0') {
              this.$store.dispatch('certification/companyVerification',res.data)
              this.$message.success('认证成功');
              this.$emit('next', 1);
            }
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 获取企业信息
    queryCompanyInfo() {
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
          this.form.OrganizationName = companyName
          this.form.representativeName = corporateRepresentative
          this.form.OrganizationCode = organizationCode
          let params = {
            organizationCode,
            companyName
          }
          this.$store.dispatch('certification/companyName', params)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
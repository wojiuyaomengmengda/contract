<template>
  <div>
          <el-form :model="signUp" label-width="200px" :rules="rules" ref="ruleForm">
              <el-form-item label="登录账号" prop="account">
                  <el-input v-model="signUp.account" autocomplete="off" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="password">
                  <el-input v-model="signUp.password" autocomplete="off" style="width: 400px" show-password></el-input>
              </el-form-item>
              <!-- <el-form-item label="手机号">
                  <el-input v-model="signUp.tel" autocomplete="off" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item prop="verifyCode" style="width: 600px" label="验证码">
                  <el-input
                      clearable
                      type="text"
                      v-model="signUp.verifyCode"
                      auto-complete="off"
                      placeholder="验证码"
                      style="width: 200px"
                  ></el-input>
                  <el-button class="btncode" type="primary" :disabled="disabled">{{find}}</el-button>
              </el-form-item> -->
              <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="signUp.companyName" autocomplete="off" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码" prop="organizationCode">
                  <el-input v-model="signUp.organizationCode" autocomplete="off" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="法人代表姓名" prop="corporateRepresentative">
                  <el-input v-model="signUp.corporateRepresentative" autocomplete="off" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名" prop="contractName">
                  <el-input v-model="signUp.contractName" autocomplete="off" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话" prop="contractPhone">
                  <el-input v-model.number="signUp.contractPhone" autocomplete="off" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="联系人邮箱" prop="contractEmail">
                  <el-input v-model="signUp.contractEmail" autocomplete="off" style="width: 400px"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer tt-a">
              <el-button type="primary" @click="send">确 定</el-button>
          </div>
  </div>
</template>
<script>
    import { enterpriseRegister } from '@/api/login'
  export default {
    prop: {
      showSU: {
        type: Boolean,
        default: false
      }
    },
    data() {
         // 设置手机号的验证规则
        const checkPhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入联系方式'))
            } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                if (reg.test(value)) {
                callback()
                } else {
                return callback(new Error('请输入正确的电话'))
                }
            }
        }
      return {
        showSU: false,
        signUp: {
            account: '',
            password: '',
            // tel: '',
            // verifyCode: '',
            companyName: '',
            organizationCode: '',
            corporateRepresentative: '',
            contractPhone: '',
            contractEmail: '',
            contractName: '',
        },
        dialogFormVisible: true, // 注册弹框
        find: "获取验证码",
        disabled: false,
        rules: {
            account: [
                {required: true, message: '请输入登录账号', trigger: 'blur'}
            ],
            password: [
                {required: true, message: '请输入登录密码', trigger: 'blur'},
                {min: 6, message: '长度需要大于6', trigger: 'blur'}
            ],
            companyName: [
                {required: true, message: '请输入公司名称', trigger: 'blur'}
            ],
            organizationCode: [
                {required: true, message: '请输入统一社会信用代码', trigger: 'blur'}
            ],
            corporateRepresentative: [
                {required: true, message: '请输入法人代表姓名', trigger: 'blur'}
            ],
            contractName: [
                {required: true, message: '联系人姓名', trigger: 'blur'}
            ],
            contractPhone: [
                {required: true, message: '联系人电话', trigger: 'blur'},
                {required: true,validator: checkPhone, message: '请输入正确的联系人电话', trigger: 'blur'}
            ],
            contractEmail: [
                {required: true, message: '联系人邮箱', trigger: 'blur'},
                {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
            ],
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      send() {
            // return console.log(this.signUp);
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    // return console.log(this.signUp)
                    enterpriseRegister(this.signUp).then( res => {
                        console.log(res);
                        if(res.code == '0') {
                            this.$message.success('注册成功,请登录');
                            this.$emit('success')
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
      }
    }
  }
</script>

<style lang="scss">
    .btncode {
        margin-left: 16px;
        float: right;
    }
    .login-wrap {
        width: 352px;
        border-radius: 5px;
        /* padding: 20px; */
        padding: 32px 20px 20px 20px;
        z-index: 3;
        margin-left: -165px;
        position: absolute;
        top: 16%;
        left: 50%;
        background: rgba(216, 220, 229, 0.5);
    }
    .login-wrap:hover {
        background-color: #4c4c4d;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
    button.btn {
        width: 100%;
        font-weight: 600;
    }
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .loginform {
        width: 352px;
        padding: 35px 35px 15px 35px;
    }

    .btncode {
        float: right;
    }
    form {
        margin-top: 25px;
    }

    form .el-form-item {
        margin-bottom: 15px;
    }
    .el-form-item {
        margin-bottom: 25px !important;
    }

    h3 {
        text-align: center;
        color: #ebedef;
        margin-top: 0px;
        margin-bottom: 5px;
    }

    h3 span {
        color: #20a0ff;
    }
</style>
<template>
  <div class="bg">
    <div class="landscape"></div>
    <div class="filter"></div>
    <canvas id="cas"></canvas>

    <div class="login-wrap">
        <h3>系统登录</h3>
            <el-form ref="form" :model="form" :rules="rules2" label-width="0px">
                <el-form-item prop="username">
                    <el-input placeholder="用户名" v-model="form.username" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" clearable v-model="form.password" show-password @keyup.enter.native="handleSubmit2()"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-row type="flex" justify="space-between">
                        <el-button type="text" @click.native.prevent="registered">注册</el-button>
                        <a href style="color:#eee">忘记密码</a>
                    </el-row>
                </el-form-item>
                <el-form-item v-if="ifValidation">
                    <slide-verify :l="42"
                        :r="10"
                        :w="310"
                        :h="155"
                        @success="onSuccess"
                        @fail="onFail"
                        @refresh="onRefresh"
                        :slider-text="text"
                        >
                    </slide-verify>
                </el-form-item>
                <el-form-item>
                    <el-button
                            type="primary"
                            @click.native.prevent="handleSubmit2()"
                            v-loading="loading"
                            class="btn"
                    >登录
                    </el-button>
                </el-form-item>
            </el-form>
    </div>

    <el-dialog center title="注册" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="800px">
        <signUp @success="success"></signUp>
    </el-dialog>
  </div>
</template>

<script>
import signUp from '../signUp/index'
import  beijin  from "./background";
import store from '@/store'
import { login } from '@/api/login'
export default {
  name: '',
  data () {
    return {
        text: '向右滑',
        loading: false,
        checked: '',
        form: {
            username: '',
            password: ''
        },
        find: '',
        rules2: {
            username: [{required: true, message: "请输入账号", trigger: "blur"}],
            password: [{required: true, message: "请输入密码", trigger: "blur"}],
            verifyCode: [
                {required: false, message: "请输入验证码", trigger: "blur"}
            ]
        },
        ifValidation: false,  // 是否开启验证
        redirect: undefined,
        dialogFormVisible: false,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  computed: {
  },
  methods: {
    init() {
    },
    // 登录
    handleSubmit2() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.onSuccess();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    onSuccess(){
        this.$refs.form.validate(valid => {
            if (valid) {
                this.loading = true
                console.log(this.form);
                const params = {
                    mobile: this.form.username,
                    password: Base64.encode(this.form.password)
                }
                login(params).then( res => {
                    console.log(res);
                    if (res.code == '0') {
                        store.dispatch('user/setUserInfo',res.data);
                        console.log(this.$store)
                        this.$message.success('登录成功');
                        this.$router.replace({ name: 'Dashboard'});
                    }
                })
            } else {
                console.log('error submit!!')
                return false
            }
            this.loading = false;
        })
        // this.$message.success('验证成功，正在跳转!');
    },
    // 验证失败
    onFail(){
        this.$message.error('验证失败!');
    },
    // 验证刷新
    onRefresh(){
        this.msg = '';
    },
    // 注册
    registered() {
        this.dialogFormVisible = true;
        // this.$router.push({ path: '/signUp' })
    },
    success() {
        this.dialogFormVisible = false;
    },
  },
  components: { signUp },
  computed: {},
  mounted(){
    beijin.canvas()
  },
  created(){
    console.log(this)
    this.init()
  }
}

</script>
<style lang='scss' scoped>
  .bg {
    position: relative;
    overflow: hidden;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    background: #000;
    background-position: -20% 10%;
    background-size: contain;
    background: linear-gradient(to bottom, #000000 0%, #5788fe 100%);
  }
  .landscape {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/xkbg.png');
    background-size: 1000px 250px;
    background-repeat: repeat-x;
    background-position: center bottom;
  }
   .filter {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        animation: colorChange 30s ease-in-out infinite;
        animation-fill-mode: both;
        mix-blend-mode: overlay;
    }

    @keyframes colorChange {
        0%,
        100% {
            opacity: 0;
        }
        50% {
            opacity: 0.9;
        }
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
<template>
    <div>
      <div v-if="state == '1'">
        <el-row class="tt-a m-t-20">
            <i class="el-icon-success icon"></i>
        </el-row>
        <el-row class="tt-a m-t-20 fw-b" style="font-size: 20px">
          认证成功!
        </el-row>
      </div>
      <div v-else>
        <el-row class="tt-a m-t-20">
            <i class="el-icon-error err"></i>
        </el-row>
        <el-row class="tt-a m-t-20 fw-b" style="font-size: 20px">
          认证失败!
        </el-row>
      </div>

      <!-- <div style="margin-left: 40%;font-size: 18px;line-height: 28px" class="m-t-20">
        <div>
          <span class="fw-b">企业名称:</span>
          <span>xxxxxxxxxxx公司</span>
        </div>
        <div>
          <span class="fw-b">统一信用代码:</span>
          <span>xxxxxxxxxxxxxxxxxxx</span>
        </div>
        <div>
          <span class="fw-b">法人代表:</span>
          <span>小红</span>
        </div>
        <div>
          <span class="fw-b">经办人:</span>
          <span>小明</span>
        </div>
        <div>
          <span class="fw-b">手机号:</span>
          <span>189****6598</span>
        </div>
      </div> -->

      <el-row class="tt-a">
          <el-button style="margin-top: 12px;" type="primary" @click="login">重新登录</el-button>
      </el-row>
    </div>
</template>

<script>

export default {
  name: 'success',
  data() {
    return {
      state: 1
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('user/logout')
      this.$router.replace(`/`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon {
    font-size: 74px!important;
    color: #67C23A;
  }
  .err {
    font-size: 74px!important;
    color: red;
  }
</style>
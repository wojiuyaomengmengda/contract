<template>
  <div class="registered">
      <!-- 认证页面 -->
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="企业认证"></el-step>
        <el-step title="经办个人认证"></el-step>
        <el-step title="填写打款信息"></el-step>
        <el-step title="回填金额"></el-step>
        <el-step title="认证通过"></el-step>
      </el-steps>

      <router-view @next="next"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'verificationStatus'
    ])
  },
  name: 'registered',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      active: 0
    }
  },
  methods: {
    next(e) {
      this.active = Number(e);
    }
  },
  created() {
    console.log(this.$route.query.id)
    this.active = this.$route.query.id ? Number(this.$route.query.id)  : this.verificationStatus;
  },
  watch: {
    'active': function(newData, oldData) {
      console.log(newData)
      let _this = this
      switch (newData) {
        case 0: 
          _this.$router.replace({ name: 'qiye', query: { id: 0 } })
          break;
        case 1:
          _this.$router.replace({ path: '/geren', query: { id: 1 } })
          break;
        case 2:
          _this.$router.replace({ path: '/moneyInfo', query: { id: 2 } })
          break;
        case 3:
          _this.$router.replace({ path: '/money', query: { id: 3 } })
          break;
        case 4:
          _this.$router.replace({ path: '/success', query: { id: 4 } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .registered {
    margin: 0 auto;
    padding-top: 20px;
  }
</style>

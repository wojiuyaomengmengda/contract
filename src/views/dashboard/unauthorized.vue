<template>
    <div class="unauthorized">
        <div class="title">
            <div class="fs-24">您还未对企业进行认证，认证后才可使用合同功能</div>
            <el-row class="tt-a m-t-20">
                <el-button type="primary" @click="renZheng">点击进行认证</el-button>
            </el-row>
        </div>
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
    name: 'unauthorized',
    data() {
        return {}
    },
    methods: {
        renZheng() {
            console.log('un', 'this.verificationStatus', this.verificationStatus)
            //0= 未认证(默认); 1= 经办人认证通过,未填写打款信息; 2= 打款信息以填写，未回填; 3=认证通过;
            if(this.verificationStatus == '0') {
                this.$router.push({ path:'/registered', query: {id: 0} });
            } else if (this.verificationStatus == '1') {
                this.$router.push({ path:'/registered', query: {id: 2} });
            } else if (this.verificationStatus == '2') {
                this.$router.push({ path:'/registered', query: {id: 3} });
            } else {
                this.$router.push({ path:'/registered', query: {id: 0} });
            }
        }
    }
}
</script>

<style lang="scss" scope>
    .unauthorized {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        .title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .fs-24 {
        font-size: 18px;
    }
</style>
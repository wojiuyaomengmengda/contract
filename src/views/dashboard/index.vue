<template>
  <!-- <div class="dashboard-container"> -->
    <component :is="currentRole" />
  <!-- </div> -->
</template>

<script>
import { mapGetters } from 'vuex'
import home from './home'
import unauthorized from './unauthorized'

export default {
  name: 'Dashboard',
  components: { home, unauthorized },
  computed: {
    ...mapGetters([
      'verificationStatus'
    ])
  },
  data() {
    return {
      currentRole: 'unauthorized'
    }
  },
  created() {
    console.log(this.$store)
    this.currentRole = this.verificationStatus == '3' ? 'home' : 'unauthorized'
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.listView {
  float: left; 
  padding: 33px 56px;
  margin-right:42px;
  .view {
    font-size: 20px; 
    padding-left: -10px;
    color:#999;
    position:relative
  }
}
</style>

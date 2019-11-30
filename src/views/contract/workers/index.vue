<template>
    <div class="padding-page ps-a workers">
        <!-- 班组合同 -->
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="待签订合同" name="first"></el-tab-pane>
            <el-tab-pane label="已签订合同" name="second"></el-tab-pane>
        </el-tabs>

        <div class="content">
            <component :is="currentRole" /> 
        </div>
    </div>
</template>

<script>
    import signed from './page/signed'
    import completed from './page/completed'
    export default {
        name: 'workers',
        components: { signed, completed },
        data() {
            return {
                currentRole: 'signed',
                activeName: 'first'
            }
        },
        methods: {
        },
        watch: {
            activeName: function(val) {
                if (val == 'first') {
                    this.currentRole = 'signed';
                    this.$router.push({ path: '/workers' })
                } else {
                    this.currentRole = 'completed';
                    this.$router.push({ path: '/workers' })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        position: relative;
        height: calc(100% - 60px);
    }
</style>
<template>
    <div>
         <!-- 合同预览 -->
        <cDetails v-if="detailsShow" @cancel="cancel"></cDetails>
    </div>
</template>
           
<script>
import cDetails from "./details";
export default{
    components: { cDetails },
    data () {
        return {
            detailsShow: true
        };
    },
    methods: {
        cancel() {
            this.detailsShow = false;
        }
    }
}
</script>
<style scoped>
            
</style>
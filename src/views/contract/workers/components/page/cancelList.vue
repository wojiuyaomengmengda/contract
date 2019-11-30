<template>
    <!-- 待签订合同 -->
    <div class="subcontractList padding-page ps-a workers">

        <el-table :data="tableData" class="m-t-20" style="width: 100%" height="74%">
            <el-table-column
                prop="time"
                label="驳回日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="project"
                label="项目"
                width="180">
            </el-table-column>
            <el-table-column
                prop="number"
                label="合同编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="leader"
                label="班组长"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="text" @click="showDetails">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="m-t-20 ta-c tt-a">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import cDetails from "../../../components/details";
export default {
    components: { cDetails },
    data() {
        return {
            tableData: [
                {
                    time: '2019-11-11 11:11', //取消日期
                    project: '项目A', //项目
                    number: '11111', //合同编号
                    leader: '张三', // 班组
                    detailsShow: false
                }
            ],
            currentPage4: 4,
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 查看详情
        showDetails() {
            console.log('查看详情');
            this.detailsShow = true;
        },
        // 合同取消
        cancel() {
            this.detailsShow = false;
        }
    }
}
</script>
<style lang="scss">
    .subcontractList {
        background: #fff;
        z-index: 12;
    }
    .body_header {
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1px solid #d8dce5;
        .list {
            min-width: 200px;
            height: 50px;
            line-height: 50px;
            margin-right: 50px;
            font-size: 18px;
        }
    }
    .pagination {
        width: 100%;
    }
</style>
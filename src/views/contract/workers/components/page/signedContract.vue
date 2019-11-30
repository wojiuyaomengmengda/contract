<template>
    <!-- 待签订合同 -->
    <div class="signedContract padding-page ps-a workers">
        <div class="body_header">
            <el-button type="text">xxx项目</el-button>
            <div>
                <el-button type="primary" @click="cancelList">查看已驳回合同</el-button>
            </div>
        </div>

        <el-table :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange" height="74%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
                prop="number"
                label="合同编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="80">
            </el-table-column>
            <el-table-column
                prop="time"
                width="100"
                label="发起时间">
            </el-table-column>
            <el-table-column
                width="80"
                label="状态">
            </el-table-column>
            <el-table-column
                width="100"
                label="合同生效日">
            </el-table-column>
            <el-table-column
                width="100"
                label="合同终止日">
            </el-table-column>
            <el-table-column
                width="100"
                label="工作地点">
            </el-table-column>
            <el-table-column
                width="80"
                label="工种">
            </el-table-column>
            <el-table-column
                width="100"
                label="职责">
            </el-table-column>
            <el-table-column
                width="80"
                label="报酬付款日">
            </el-table-column>
            <el-table-column
                width="120"
                label="工时制度">
            </el-table-column>
            <el-table-column
                width="100"
                label="基本工资">
            </el-table-column>
            <el-table-column
                width="100"
                label="绩效结算">
            </el-table-column>
            <el-table-column
                label="补充事项">
            </el-table-column>
            <el-table-column
                width="100"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="showDetails">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="m-t-20 d-flex ju-sb">
            <div>
                <el-button type="primary" size="mini">签署</el-button>
                <el-button type="danger" size="mini">驳回</el-button>
            </div>
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

        <router-view />
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
                    number: '365616161616', //合同编号
                    name: '姓名', //姓名
                    originator: '发起人', //发起人
                    salary: '1000', //日基本工资
                    performance: '1', //绩效计量方式
                    state: '1', //状态
                    note: '', //备注
                    startTime: '2019-11-11 11:11', //发起日期
                    endTime: '2019-11-11 11:11', //截止日期
                }
            ],
            stateList: [
                {label: '合同已过期', color: '#F56C6C'},
                {label: '公司已驳回', color: '#409EFF'},
                {label: '工人未签署', color: '#909399'},
                {label: '工人已签署', color: '#67C23A'}
            ],
            performanceList: ['无绩效', '按包工计量', '按点工计量'],
            multipleSelection : [],  // 存放表格多选数据
            currentPage4: 4,
        }
    },
    methods: {
        // 表格多选触发
        handleSelectionChange(val) {
            // console.log(val);
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 查看已驳回合同
        cancelList() {
            this.$router.push({ name: 'workersCancelList' })
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
    .signedContract {
        background: #fff;
        z-index: 12;
    }
    .body_header {
        display: flex; justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 1px solid #d8dce5;
    }
    .pagination {
        width: 100%;
    }
</style>
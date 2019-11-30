<template>
    <!-- 待签订合同 -->
    <div class="signedContract padding-page ps-a workers">
        <div class="body_header">
            <el-button type="text">xxx项目</el-button>
            <div>
                <el-button type="primary">查看已驳回合同</el-button>
            </div>
        </div>

        <el-table :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange" height="80%">
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
                prop="originator"
                width="80"
                label="发起人">
            </el-table-column>
            <el-table-column
                prop="salary"
                label="日基本工资">
            </el-table-column>
            <el-table-column
                prop="performance"
                label="绩效计量方式">
                <template slot-scope="scope">
                    {{performanceList[scope.row.performance]}}
                </template>
            </el-table-column>
            <el-table-column
                prop="state"
                label="状态">
                <template slot-scope="scope">
                    <span :style="{color: stateList[scope.row.state].color}">
                        {{stateList[scope.row.state].label}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                label="备注">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="发起日期">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="截止日期">
            </el-table-column>
            <el-table-column
                width="180"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text">驳回</el-button>
                    <el-button type="text">签署</el-button>
                    <el-button type="text">预览</el-button>
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
    </div>
</template>
<script>
export default {
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
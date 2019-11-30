<template>
    <!-- 待签订合同 -->
    <div class="subcontractList padding-page ps-a workers">
        <div class="body_header">
            <el-tag class="list">项目: xxxxxxxxxxxxxxxxxxxxxxx</el-tag>
            <el-tag type="success" class="list">工人: 潘洋</el-tag>
            <el-tag type="info" class="list">已签订合同总数: 5</el-tag>
        </div>

        <el-table :data="tableData" class="m-t-20" style="width: 100%" height="80%">
            <el-table-column
                prop="number"
                label="合同编号"
                width="180">
            </el-table-column>
            <el-table-column
                label="状态"
                width="80">
                <template slot-scope="scope">
                    <span :style="{color: stateList[scope.row.state].color}">
                        {{stateList[scope.row.state].label}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="team"
                width="80"
                label="班组">
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
                prop="note"
                label="备注">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="生效日期">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="失效日期">
            </el-table-column>
            <el-table-column
                width="180"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text">查看合同文本</el-button>
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
export default {
    data() {
        return {
            tableData: [
                {
                    number: '365616161616', //合同编号
                    state: '1', //状态
                    team: '张三', // 班组
                    salary: '1000', //日基本工资
                    performance: '1', //绩效计量方式
                    note: '', //备注
                    startTime: '2019-11-11 11:11', //生效日期
                    endTime: '2019-11-11 11:11', //失效日期
                }
            ],
            stateList: [
                {label: '未生效', color: '#F56C6C'},
                {label: '生效中', color: '#409EFF'},
                {label: '已作废', color: '#67C23A'},
                {label: '已过期', color: '#909399'}
            ],
            performanceList: ['无绩效', '按包工计量', '按点工计量'],
            currentPage4: 4,
        }
    },
    methods: {
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
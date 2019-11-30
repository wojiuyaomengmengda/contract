<template>
    <!-- 查看已签订合同 -->
    <div class="subcontractList padding-page ps-a workers">
        <div class="body_header">
            <el-tag class="list">项目: xxxxxxxxxxxxxxxxxxxxxxx</el-tag>
            <el-tag type="success" class="list">班组: 6个</el-tag>
            <el-tag type="info" class="list">已签订合同总数: 400</el-tag>
        </div>

        <el-table :data="tableData" class="m-t-20" style="width: 100%"  @selection-change="handleSelectionChange" height="74%">
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
            <el-table-column label="签约历史">
                 <template slot-scope="scope">
                    <el-button type="text" @click="historyList()">查看历史合同</el-button>
                </template>
            </el-table-column>
            <el-table-column
                width="180"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="showDetails">查看合同文本</el-button>
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

        <router-view />

         <!-- 合同预览 -->
        <cDetails v-if="detailsShow" @cancel="cancel"></cDetails>
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
            detailsShow: false
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
        // 查看历史合同
        historyList() {
            console.log('查看历史合同');
            this.$router.push({ name: 'teamHistoryList' });
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
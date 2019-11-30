<template>
    <!-- 查看已签订合同 -->
    <div class="subcontractList padding-page ps-a workers">
        <div class="body_header">
            <el-tag class="list">项目: xxxxxxxxxxxxxxxxxxxxxxx</el-tag>
            <el-tag type="success" class="list">班组: 6个</el-tag>
            <el-tag type="info" class="list">已签订合同总数: 400</el-tag>
        </div>

        <el-row type="flex" class="m-t-20">
            <div>
                工人
                <el-input style="width: 200px" placeholder="请输入项目名称" v-model="search.name"></el-input>
            </div>
            <div class="m-l-20">
                班组
                <el-select v-model="search.class" placeholder="请选择">
                    <el-option value="0" label="班组1"></el-option>
                    <el-option value="1" label="班组2"></el-option>
                </el-select>
            </div>
            <el-button class="m-l-20">搜索</el-button>
        </el-row>

        <el-table :data="tableData" class="m-t-20" style="width: 100%"  @selection-change="handleSelectionChange" height="66%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
                prop="id"
                label="合同编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="80">
            </el-table-column>
            <el-table-column
                prop="class"
                width="80"
                label="班组">
            </el-table-column>
            <el-table-column
                prop="number"
                label="已签合同数">
            </el-table-column>
            <el-table-column
                width="180"
                label="合同列表">
                <template slot-scope="scope">
                    <el-button type="text" @click="contractList">查看合同列表</el-button>
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                {
                    id: '365616161616', //合同编号
                    name: '姓名', //姓名
                    class: '班组', //班组
                    number: '1000', //已签合同数
                }
            ],
            search: {
                name: '',
                class: ''
            },
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
        // // 查看历史合同
        // historyList() {
        //     console.log('查看历史合同');
        //     this.$router.push({ name: 'workersHistoryList' });
        // },
        // 查看合同列表
        contractList() {
            console.log('查看历史合同');
            this.$router.push({ name: 'workersContractList' });
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
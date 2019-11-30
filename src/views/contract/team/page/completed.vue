<template>
    <!-- 已签署合同 -->
    <div class="ps-a workers">

        <div class="content">
            <div class="ovf-hd p-14">
                <div class="listView bg-EBFCFA">
                    <span class="fs-35">1</span>
                    <br>
                    <span class="view">在建项目数量
                    </span>
                </div>
                <div class="listView bg-EBF5FC">
                    <span class="fs-35">15</span>
                    <br>
                    <span class="view">班组数量
                    </span>
                </div>
                <div class="listView bg-FCFBEB">
                    <span class="fs-35">762</span>
                    <br>
                    <span class="view">生效中合同总数
                    </span>
                </div>

                <div class="listView bg-FCFBEB">
                    <span class="fs-35">763</span>
                    <br>
                    <span class="view">已签订合同总数
                    </span>
                </div>
            </div>

            <el-table :data="tableData" height="74%">
                <el-table-column
                    prop="state"
                    label="项目状态"
                    width="360"
                    >
                </el-table-column>
                <el-table-column
                    prop="projectName"
                    label="项目"
                    width="360"
                    >
                </el-table-column>
                <el-table-column
                    prop="managerName"
                    label="项目经理"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="number"
                    width="180"
                    label="已签订合同班组">
                </el-table-column>
                <el-table-column
                    label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="subcontractList(scope.row)">查看合同列表</el-button>
                        </template>
                </el-table-column>
            </el-table>

            <el-pagination
                class="m-t-20 tt-a pagination"
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
        name: 'workers',
        data() {
            return {
                currentPage4: 4,
                activeName: 'first',
                tableData: [
                    { 
                        state: '在建',
                        managerName: '张三', 
                        projectName: '王小虎', 
                        number: '33' 
                    }, 
                    { 
                        state: '已完工',
                        managerName: '张三', 
                        projectName: '王小虎', 
                        number: '33' 
                    }, 
                ]
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 查看待签订合同
            signedContract(row) {
                console.log('123');
                this.$router.push({name:'teamSignedContract'});
            },
            // 查看已签订合同
            subcontractList(row) {
                this.$router.push({name:'teamSubcontractList'});
            }
        },
    }
</script>

<style lang="scss" scoped>
    .workers {
        overflow: auto;
    }
    .listView {
        float: left; 
        padding: 23px 56px;
        margin-right:42px;
        .view {
            font-size: 20px; 
            padding-left: -10px;
            color:#999;
            position:relative
        }
    }
    // /deep/.el-tabs__content {
    //     height: calc(100% - 50px);
    //     overflow: auto;
    // }
    .pagination {
        width: 100%;
    }
    .content {
        position: relative;
        height: calc(100% - 60px);
    }
</style>
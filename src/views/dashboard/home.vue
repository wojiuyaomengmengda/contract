<template>
  <!-- 首页（已认证） -->
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row :gutter="20">
      <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>班组合同</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">发起内包班组合同</el-button>
            </div>
            <div class="text item">
              <div class="listView bg-EBFCFA">
                <span class="fs-35">{{subContractorTotal.inProgress}}</span>
                <br>
                <div class="view">进行中</div>
              </div>
              <div class="listView bg-EBF5FC">
                <span class="fs-35">{{subContractorTotal.waitingForMeSign}}</span>
                <br>
                <div class="view">待我签订</div>
              </div>
              <div class="listView bg-FCFBEB">
                <span class="fs-35">{{subContractorTotal.takeEffect}}</span>
                <br>
                <div class="view">生效中</div>
              </div>
            </div>
          </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="m-t-20">
      <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>工人合同</span>
            </div>
            <div class="text item">
              <div class="listView bg-EBFCFA">
                <span class="fs-35">{{workerTotal.inProgress}}</span>
                <br>
                <div class="view">进行中</div>
              </div>
              <div class="listView bg-EBF5FC">
                <span class="fs-35">{{workerTotal.waitingForMeSign}}</span>
                <br>
                <div class="view">待我签订</div>
              </div>
              <div class="listView bg-FCFBEB">
                <span class="fs-35">{{workerTotal.takeEffect}}</span>
                <br>
                <div class="view">生效中</div>
              </div>
            </div>
          </el-card>
      </el-col>
    </el-row>


    <el-dialog title="发起内包班组合同" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="项目" :label-width="formLabelWidth">
          <el-select v-model="form.project" placeholder="请选择" class="w-400">
            <el-option label="项目一" value="shanghai"></el-option>
            <el-option label="项目二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班组长" :label-width="formLabelWidth">
          <el-select v-model="form.leader" placeholder="请选择" class="w-400">
            <el-option v-for="(item, index) in selectList" :key="index" :label="item.label" :value="item.value">
                <div>
                  {{item.label}} {{item.phone}} 
                  <span :style="{color: item.state == '1' ? '#409EFF' : 'red'}">
                    {{item.state == '1' ? '已认证' : '未认证'}}
                  </span>
                </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/"
            accept=".pdf,.PDF"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">支持上传合同文件格式: PDF</div>
          </el-upload>
        </el-form-item> 
      </el-form>
      <div slot="footer" class="dialog-footer tt-a">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="signed">发起签署</el-button>
      </div>
    </el-dialog>
    
    <cdetails v-if="detailsShow" @cancel="cancel"></cdetails>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cdetails from './component/details'
import { 
  QueryIndexDataSourceTotal
 } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  components: { cdetails },
   computed: {
    ...mapGetters([
      'userId',
      'currId',
      'roleId'
    ])
  },
  data() {
    return {
      detailsShow: false,
      fileList: [],
      dialogFormVisible: false,
      form: {
        project: '',
        leader: ''
      },
      formLabelWidth: '120px',
      selectList: [
        { label: '张三', value: '0', phone: '1241512621616', state: '0' },
        { label: '张三', value: '1', phone: '1241512621616', state: '1' },
        { label: '张三', value: '2', phone: '1241512621616', state: '0' },
        { label: '张三', value: '3', phone: '1241512621616', state: '0' },
        { label: '张三', value: '4', phone: '1241512621616', state: '0' },
      ],
      workerTotal: { inProgress: 0,takeEffect: 0, waitingForMeSign: 0 },
      subContractorTotal: { inProgress: 0,takeEffect: 0, waitingForMeSign: 0}
    }
  },
  methods: {
    // 手动上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 发起签署
    signed() {
      this.detailsShow = true;
      this.dialogFormVisible = false;
    },
    cancel() {
      this.detailsShow = false;
    },
    init() {
      const { userId, currId, roleId } = this
      const params = {
        userId,
        roleId,
        currId
      }
      QueryIndexDataSourceTotal(params).then(res => {
        if(res.code == '0') {
          console.log(res.data)
          this.workerTotal = res.data.workerTotal
          this.subContractorTotal = res.data.subContractorTotal
        }
      })
    }
  },
  created() {
    this.init()
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
.text {
  display: flex;
  .listView {
    flex: 1;
    margin-right:42px;
    padding-left: 20px;
    padding: 20px 20px;
    box-sizing: border-box;
    // padding: 33px 56px;
    .view {
      font-size: 20px; 
      padding-left: -10px;
      color:#999;
      position:relative
    }
  }
}

.boxList {
  .title {
    padding: 15px;
    font-size: 18px;
    border-bottom: 1px solid red;
    width: 50%;
  }
}

.w-400 {
  width: 400px;
}
</style>

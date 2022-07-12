<template>
  <div class="app-container">
    <div id="app" slot="body">
      <!-- 窗口顶部搜索 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.deviceName"
            placeholder="设备名称"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-col>
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.deviceCode"
            placeholder="设备编号"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-col>
        <el-col :span="4">
          <el-input v-model.trim="state.queryDatas.appId" placeholder="AppId" class="filter-item" clearable  />
        </el-col>
        <el-col :span="4">
          <el-select v-model="state.queryDatas.deviceCategoryId" clearable placeholder="设备类型">
            <el-option
              v-for="item in state.categories"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button
            v-waves
            class="filter-item"
            plain
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="4" style="text-align: right; margin-top: 15px">
          <el-button
            v-waves
            class="filter-item"
            style="margin-left: 10px"
            plain
            icon="el-icon-plus"
            @click="handleCreate"
          >新增</el-button>
        </el-col>
      </el-row>
      <!-- 表格数据 -->
      <el-table
        :data="state.tableData.rows"
        style="width: 100%"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column prop="deviceId" label="#" width="80" show-overflow-tooltip />
        <el-table-column prop="deviceName" label="设备名称" show-overflow-tooltip>
          <template #default="scope">
            <el-button
              v-waves
              type="text"
              @click="HandleEdit(scope.row.deviceId)"
            >{{ scope.row.deviceName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="deviceCode" label="设备编号" show-overflow-tooltip >
          <template #default="scope">
            <el-button
              v-waves
              type="text"
              @click="HandleEdit(scope.row.deviceId)"
            >{{ scope.row.deviceCode }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="appId" label="应用名称" show-overflow-tooltip>
          <template #default="scope">
            <el-button
              v-waves
              type="text"
              @click="
                router.push({
                  path: '/app',
                  query: { appId: scope.row.appId },
                })
              "
            >{{ getApplicationName(scope.row.appId) }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="appId" label="appId" show-overflow-tooltip>
          <template #default="scope">
            <el-button
              v-waves
              type="text"
              @click="
                router.push({
                  path: '/app',
                  query: { appId: scope.row.appId },
                })
              "
            >{{ scope.row.appId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="设备轨迹" show-overflow-tooltip>
          <template #default="scope">
            <el-button
              v-waves
              type="text"
              @click="
                state.deviceTrackVisible = true,
                state.selectedDdeviceId = scope.row.deviceId
              "
            >轨迹</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="deviceCategoryDescription" label="设备类型" show-overflow-tooltip />
        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip />
      </el-table>
      <div style="text-align: right; margin-top: 15px">
        <el-pagination
          :current-page="state.tableData.pagination.pageNum"
          :pager-count="5"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="state.tableData.pagination.pageSize"
          :page-count="state.tableData.pagination.totalPage"
          background
          layout="sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 右侧展示 -->
      <el-drawer
        ref="drawer"
        :title="'设备信息 / ' + (state.drawerType == 1 ? '新增' : state.form.deviceName)"
        :before-close="handleClose"
        v-model="state.drawer"
        :destroy-on-close="true"
        custom-class="drawer"
        :close-on-press-escape="true"
      >
        <div class="drawer__content">
          <el-tabs v-model="state.activeTab" :stretch="true">
            <el-tab-pane label="基本信息" name="first">
              <el-form ref="form" :model="state.form">
                <el-form-item
                  prop="deviceName"
                  label="设备名称"
                  :label-width="state.formLabelWidth"
                  :rules="[
                    {
                      required: true,
                      message: '请输入设备名称',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input v-model="state.form.deviceName" autocomplete="off" />
                </el-form-item>

                <el-form-item
                  prop="deviceCode"
                  label="设备编号"
                  :label-width="state.formLabelWidth"
                  :rules="[
                    {
                      required: true,
                      message: '请输入设备编号',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input v-model="state.form.deviceCode" autocomplete="off" />
                </el-form-item>

                <el-form-item
                  prop="appId"
                  label="Application"
                  :label-width="state.formLabelWidth"
                  :rules="[
                    {
                      required: true,
                      message: '请选择应用名称',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select v-model="state.form.appId" placeholder="请选择应用名称">
                    <el-option v-for="application in state.applications" :label="application.name" :value="application.appId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="state.form.appId.length > 0"
                  prop="appId"
                  label="AppId"
                  :label-width="state.formLabelWidth"
                >
                  <el-input v-model="state.form.appId" readonly disabled></el-input>
                </el-form-item>
                <el-form-item
                  prop="deviceCategoryId"
                  label="设备类型"
                  :label-width="state.formLabelWidth"
                  :rules="[
                    {
                      required: true,
                      message: '请选择设备类型',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select
                    v-model="state.form.deviceCategoryId"
                    placeholder="设备类型"
                    :disabled="state.drawerType == 1 ? false : true"
                  >
                    <div v-for="cate in state.categories" :key="cate.id" :item="cate">
                      <el-option :label="cate.description" :value="cate.id" />
                    </div>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <div class="buttonclass">
                    <el-button
                      v-waves
                      class="subButton"
                      type="primary"
                      :loading="state.drawerLoading"
                      @click="submitForm"
                    >{{ state.drawerLoading ? "提交中 ..." : "确 定" }}</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="高级配置" :disabled="state.drawerType == 1 ? true : false">
              <el-form ref="advancedForm" :model="state.advancedForm" size="mini" label-suffix=":">
                <el-form-item>
                  <div class="buttonclass">
                    <el-button
                      v-waves
                      type="danger"
                      size="large"
                      @click="state.uploadDialog = true"
                    >上 传</el-button>
                    <el-button
                      v-waves
                      type="primary"
                      size="large"
                      @click="submitAdvancedForm"
                    >保存配置信息</el-button>
                  </div>
                </el-form-item>
                <el-form-item
                  v-for="item in state.configModels"
                  :key="item.id"
                  :item="item"
                  :label="item.configName"
                  :label-width="state.formLabelWidth"
                  :rules="[
                    {
                      required: item.isRequired == 20,
                      message: '必需字段',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input v-model="item.configModelValue" autocomplete="off" />
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
      <el-dialog title="请选择上传命令" v-model="state.uploadDialog" width="30%">
        <el-cascader v-model="state.advancedForm.templateId" :options="state.templates" filterable>
          <template #default="{ node, data }">
            <span>{{ data.label }}</span>
            <span v-if="!node.isLeaf">({{ data.children.length }})</span>
          </template>
        </el-cascader>
        <span slot="footer" class="dialog-footer">
          <el-button @click="state.uploadDialog = false">取 消</el-button>
          <el-button v-waves type="primary" @click="uploadDeviceConfigs">确 定</el-button>
        </span>
      </el-dialog>

      <!--轨迹地图-->
      <el-dialog title="轨迹地图" v-model="state.deviceTrackVisible" width="80%" height="80%">
        <div height="50%">
          <!-- <TencentMap :device-id="state.selectedDdeviceId" /> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="state.deviceTrackVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>// @ts-nocheck

import {
  getDeviceListApi,
  getDeviceInfoApi,
  addDeviceApi,
  UpdateDeviceApi,
  getDeviceCategoryListApi,
  getDeviceConfigModelListApi,
  getDeviceConfigsApi,
  getTaskTemplateListApi,
  updateDeviceConfigsApi,
  uploadDeviceConfigsApi,
  getApplicationlistApi,
} from '/@/api/index'
// import TencentMap from '/@/components/TencentMap.vue'
import { reactive, onMounted, getCurrentInstance, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRoute, useRouter } from "vue-router"
const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const state = reactive({
  selectedDdeviceId: 2,
  deviceTrackVisible: false,
  tableData: {
    pagination: {
      pageNum: 1,
      pageSize: 10,
      totalPage: 0
    },
    rows: []
  },
  queryDatas: {
    deviceName: '',
    deviceCode: '',
    appId: '',
    deviceCategoryId: ''
  },
  drawer: false,
  drawerLoading: false,
  form: {
    deviceId: null,
    deviceName: '',
    deviceCode: '',
    appId: '',
    ctime: '',
    deviceCategoryId: ''
  },
  formLabelWidth: '150px',
  drawerType: 1, // 1：新增, 2：修改
  categories: [],
  configList: [],
  configModels: [],
  activeTab: 'first',
  advancedForm: {
    templateId: [] // 使用级联选择器的第二个值 templateId[1]
  },
  templateList: [],
  templates: [],
  uploadDialog: false,
  applications: [],
})
onMounted(() => {
  getCategories()
  getTaskTemplateList();
  getDatas();
  getApplicationlist();
})
function handleSizeChange(val) {
  state.tableData.pagination.pageSize = val
  getDatas()
}
function handleCurrentChange(val) {
  state.tableData.pagination.pageNum = val
  getDatas()
}
// 搜索
function handleFilter() {
  state.tableData.pagination.pageNum = 1
  getDatas()
}
// App列表
function getDatas() {
  getDeviceListApi({
    deviceName: state.queryDatas.deviceName,
    deviceCode: state.queryDatas.deviceCode,
    appId: state.queryDatas.appId,
    deviceCategoryId: state.queryDatas.deviceCategoryId,
    pageNum: state.tableData.pagination.pageNum,
    pageSize: state.tableData.pagination.pageSize
  })
    .then((res) => {
      if (res && res.code === 200) {
        state.tableData.rows = res.items
        state.tableData.pagination.totalPage = res.totalPage
      } else {
        ElMessage.error(res.code + ': ' + res.message)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 点击新增
function handleCreate() {
  state.drawerType = 1
  state.drawer = true
}
// 点击修改
function HandleEdit(id) {
  getDeviceInfoApi({
    id: id
  })
    .then((res) => {
      if (res && res.code === 200) {
        state.drawerType = 2
        state.drawer = true

        nextTick(() => {
          state.form.deviceId = res.deviceId
          state.form.deviceName = res.deviceName
          state.form.deviceCode = res.deviceCode
          state.form.appId = res.appId
          state.form.ctime = res.ctime
          state.form.deviceCategoryId = res.deviceCategoryId
          getDeviceConfigs()
        })
      } else {
        ElMessage.error(res.code + ': ' + res.message)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// before close
function handleClose(done) {
  if (state.drawerLoading) {
    return
  }
  if (proxy.$refs['form'] !== undefined) {
    proxy.$refs['form'].resetFields()
  }
  if (proxy.$refs['advancedForm'] !== undefined) {
    proxy.$refs['advancedForm'].resetFields()
  }
  state.drawerLoading = false
  state.configList = []
  state.configModels = []
  state.activeTab = 'first'
  state.drawer = false
  // 更新列表
  getDatas()
}
// 提交
function submitForm() {
  // TODO 表单校验
  proxy.$refs['form'].validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('确定要提交表单吗？').then((_) => {
        state.drawerLoading = true
        // drawerType 1：新增, 2：修改
        if (state.drawerType == 1) {
          addDevice()
        } else if (state.drawerType == 2) {
          UpdateDevice()
        }
        state.drawerLoading = false
      })
    } else {
      console.log('error submit!!')
      return
    }
  })
}
// 增加
function addDevice() {
  addDeviceApi({
    deviceName: state.form.deviceName,
    deviceCode: state.form.deviceCode,
    appId: state.form.appId,
    deviceCategoryId: state.form.deviceCategoryId
  }).then((res) => {
    if (res && res.code === 200) {
      ElMessage.success('success')
      state.drawerLoading = false
      handleClose()
    } else {
      ElMessage.error(res.code + ': ' + res.message)
    }
  })
}
// 修改
function UpdateDevice() {
  UpdateDeviceApi({
    id: state.form.deviceId,
    deviceName: state.form.deviceName,
    deviceCode: state.form.deviceCode,
    appId: state.form.appId,
    deviceCategoryId: state.form.deviceCategoryId
  })
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage.success('success')
        handleClose()
      } else {
        ElMessage.error(res.code + ': ' + res.message)
      }
    })
    .catch((err) => {
      ElMessage.error('error')
      state.drawerLoading = false
    })
}
// 获取设备分类列表
function getCategories() {
  getDeviceCategoryListApi({
    status: 20
  }).then((res) => {
    if (res && res.code == 200) {
      state.categories = []
      for (var i = 0; i < res.items.length; i++) {
        state.categories.push(res.items[i])
      }
    } else {
      ElMessage.error(res.code + ': ' + res.message)
    }
  })
}
// 获取设备的属性值
function getDeviceConfigs() {
  state.configList = []
  state.configModels = []
  getDeviceConfigsApi({
    deviceId: state.form.deviceId
  }).then((res) => {
    if (res && res.code == 200) {
      if (res.items && res.items.length > 0) {
        state.configList = res.items
      }
      setTimeout(getDeviceConfigModelList, 100)
    } else {
      ElMessage.error(res.code + ': ' + res.message)
    }
  })
}
// 获取设备的属性列表
function getDeviceConfigModelList() {
  getDeviceConfigModelListApi({
    configId: state.form.deviceCategoryId
  })
    .then((res) => {
      if (res && res.code == 200) {
        state.configModels = []
        for (var i = 0; i < res.items.length; i++) {
          var item = res.items[i]
          item.configModelValue = getModelValue(res.items[i].id)
          state.configModels.push(item)
        }
      } else {
        ElMessage.error(res.code + ': ' + res.message)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 匹配赋值 configs => model
function getModelValue(modelId) {
  for (var i = 0; i < state.configList.length; i++) {
    if (modelId == state.configList[i].configModelId) {
      return state.configList[i].configModelValue || ''
    }
  }
  return ''
}
// 保存并上传 设备属性
function submitAdvancedForm() {
  proxy.$refs['advancedForm'].validate((valid) => {
    if (valid) {
      updateDeviceConfigsApi({
        deviceId: state.form.deviceId,
        // templateId: state.advancedForm.templateId[1],
        // appId: state.form.appId,
        configs: state.configModels
      })
        .then((res) => {
          if (res && res.code == 200) {
            ElMessage.success('保存设备属性成功')
          } else {
            ElMessage.error(res.code + ': ' + res.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
}
// 获取任务模板
function getTaskTemplateList() {
  getTaskTemplateListApi({})
    .then((res) => {
      if (res && res.code === 200) {
        if (res.items && res.items.length > 0) {
          state.templateList = []
          for (var i = 0; i < res.items.length; i++) {
            state.templateList.push(res.items[i])
          }
          getTemplates()
        }
      } else {
        ElMessage.error(res.code + ': ' + res.message)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 模板级联选择器
function getTemplates() {
  state.templates = []
  // 一级列表
  for (var i = 0; i < state.templateList.length; i++) {
    var children = {
      label: state.templateList[i].commandDesc,
      value: 0,
      children: []
    }
    if (
      JSON.stringify(state.templates).indexOf(JSON.stringify(children)) ===
      -1
    ) {
      state.templates.push(children)
    }
  }
  // 二级列表
  for (var x = 0; x < state.templateList.length; x++) {
    for (var y = 0; y < state.templates.length; y++) {
      if (state.templateList[x].commandDesc === state.templates[y].label) {
        state.templates[y].children.push({
          label: state.templateList[x].subCommandDesc,
          value: state.templateList[x].id
        })
      }
      break
    }
  }
}
function uploadDeviceConfigs() {
  state.uploadDialog = false
  uploadDeviceConfigsApi({
    deviceId: state.form.deviceId,
    templateId: state.advancedForm.templateId[1],
    appId: state.form.appId
  }).then((res) => {
    state.advancedForm.templateId = []
    if (res && res.code == 200) {
      ElMessage.success('上传成功')
    } else {
      ElMessage.error(res.code + ': ' + res.message)
    }
  }).catch(err => {
  })
}
function getApplicationlist() {
  getApplicationlistApi({
    orgId: parseInt(window.localStorage.getItem("oid") || ""),
    pageNum: 1,
    pageSize: 1000,
  })
    .then((res) => {
      if (res && res.code === 200) {
        state.applications = res.items || [];
      } else {
        ElMessage.error(res.code + ": " + res.message);
      }
    })
    .catch((err) => { });
}
function getApplicationName(appId) {
  for (var i=0; i<state.applications.length; i++) {
    if (appId == state.applications[i].appId) {
      return state.applications[i].name
    }
  }
  return ""
}
// 表格样式
function cellStyle() {
  return "padding:3px;"
}
function headerCellStyle() {
  return "padding:3px;"
}
</script>

<style lang="scss" scoped>
#app {
  .buttonclass {
    padding: 10px;
    text-align: right;
  }

  .subButton {
    width: 30%;
  }
}
</style>

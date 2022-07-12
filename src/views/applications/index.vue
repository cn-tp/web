<template>
  <div class="app-container">
    <div id="app" slot="body">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.name"
            placeholder="应用名称"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-col>
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.appId"
            placeholder="应用ID"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
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
        <el-table-column prop="id" label="#" width="80" show-overflow-tooltip />
        <el-table-column prop="appId" label="AppId" show-overflow-tooltip>
          <template #default="scope">
            <el-button v-waves type="text" @click="HandleEdit(scope.row)">
              {{
                scope.row.appId
              }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="应用名称" show-overflow-tooltip>
          <template #default="scope">
            <el-button type="text" @click="HandleEdit(scope.row)">
              {{
                scope.row.name
              }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="deviceProfileName" label="设备配置名称" show-overflow-tooltip>
          <template #default="scope">
            <el-button
              type="text"
              @click="
                $router.push({
                  path: '/profile/profileList',
                  query: { deviceProfileId: scope.row.deviceProfileId },
                })
              "
            >{{ scope.row.deviceProfileName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
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
      <!-- App右侧展示 -->
      <el-drawer
        :title="'Applications / ' + (state.drawerType == 1 ? '新增' : state.form.name)"
        :before-close="handleClose"
        v-model="state.drawer"
        :destroy-on-close="true"
        custom-class="drawer"
        ref="drawer"
        :close-on-press-escape="true"
      >
        <div class="drawer__content">
          <el-tabs v-model="state.activeTab" :stretch="true">
            <el-tab-pane label="基本信息" name="first">
              <el-form ref="form" :model="state.form">
                <el-form-item
                  prop="appId"
                  label="AppId"
                  :label-width="state.formLabelWidth"
                  :rules="[
                    { required: true, message: '请输入AppId', trigger: 'blur' },
                  ]"
                  v-if="state.drawerType == 2"
                >
                  <el-input
                    v-model="state.form.appId"
                    autocomplete="off"
                    :disabled="state.drawerType == 2 ? true : false"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  prop="name"
                  label="应用名称"
                  :label-width="state.formLabelWidth"
                  :rules="[
                    {
                      required: true,
                      message: '请输入应用名称',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input v-model="state.form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="description" label="描述" :label-width="state.formLabelWidth">
                  <el-input
                    v-model="state.form.description"
                    autocomplete="off"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="无"
                    maxlength="50"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item prop="networkId" label="Network" :label-width="state.formLabelWidth">
                  <el-select v-model="state.form.networkId" placeholder clearable >
                    <el-option
                      v-for="networkConfig in state.networkConfigList"
                      :key="networkConfig.id"
                      :label="networkConfig.networkName"
                      :value="networkConfig.networkId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="state.form.networkId.length > 0"
                  prop="networkId"
                  label="NetworkId"
                  :label-width="state.formLabelWidth"
                >
                  <el-input v-model="state.form.networkId" readonly disabled></el-input>
                </el-form-item>
                <el-form-item
                  prop="deviceProfileId"
                  label="设备配置"
                  :label-width="state.formLabelWidth"
                >
                  <el-cascader
                    v-model="state.form.deviceProfileId"
                    :options="state.options"
                    filterable
                  >
                    <template #default="{ node, data }">
                      <span>{{ data.label }}</span>
                      <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                    </template>
                  </el-cascader>
                </el-form-item>
                <el-form-item prop="codecType" label="解码类型" :label-width="state.formLabelWidth">
                  <el-input v-model="state.form.codecType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="buttonclass">
                    <el-button
                      class="subButton"
                      v-waves
                      type="primary"
                      @click="submitForm"
                      :loading="state.drawerLoading"
                    >{{ state.drawerLoading ? "提交中 ..." : "确 定" }}</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="高级配置" :disabled="state.drawerType == 1 ? true : false">
              <el-form ref="advancedForm" :model="state.advancedForm" size="mini">
                <el-form-item label="转发类型" prop="hookType">
                  <el-select v-model="state.advancedForm.hookType" clearable placeholder="请选择转发类型">
                    <el-option
                      v-for="item in state.hookTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="转发·主机地址" prop="hookHost">
                  <el-input
                    v-model="state.advancedForm.hookHost"
                    placeholder="(tcp://host:port || http://host:port/api)"
                  ></el-input>
                </el-form-item>
                <el-form-item label="用户名(MQTT)" prop="hookUser">
                  <el-input v-model="state.advancedForm.hookUser" placeholder></el-input>
                </el-form-item>
                <el-form-item label="密码(MQTT)" prop="hookPass">
                  <el-input v-model="state.advancedForm.hookPass" placeholder></el-input>
                </el-form-item>
                <el-form-item label="TOPIC(MQTT)" prop="hookTopic">
                  <el-input v-model="state.advancedForm.hookTopic" placeholder></el-input>
                </el-form-item>
                <el-form-item label="应用配置" prop="status">
                  <el-radio-group v-model="state.advancedForm.status">
                    <el-radio :label="10">未启用</el-radio>
                    <el-radio :label="20">已启用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <div class="buttonclass">
                    <el-button
                      class="subButton"
                      v-waves
                      type="primary"
                      @click="submitAdvanceForm"
                    >确 定</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script setup>// @ts-nocheck
import {
  getApplicationlistApi,
  getApplicationInfoApi,
  getDeviceProfileListApi,
  addApplicationApi,
  UpdateApplicationApi,
  getDeviceVendorListApi,
  getHookConfigsApi,
  updateHookConfigsApi,
  getNetworkConfigListApi,
} from "/@/api/index";
import { reactive, onMounted, getCurrentInstance, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRoute } from "vue-router"
const { proxy } = getCurrentInstance()
const route = useRoute()
const state = reactive({
  tableData: {
    pagination: {
      pageNum: 1,
      pageSize: 10,
      totalPage: 0,
    },
    rows: [],
  },
  queryDatas: {
    name: "",
    appId: "",
  },
  drawer: false,
  drawerLoading: false,
  form: {
    id: null,
    appId: "",
    name: "",
    description: "",
    codecType: "",
    deviceProfileId: [],
    networkId: "",
  },
  formLabelWidth: "100px",
  drawerType: 1, // 1：新增, 2：修改
  profiles: [],
  rules: {
    name: [{ required: true, message: "请输入App名称", trigger: "blur" }],
    appId: [{ required: true, message: "请输入appId", trigger: "blur" }],
  },
  appId: route.query.appId || "",
  options: [],
  vendors: [],
  activeTab: "first",
  hookTypes: [
    { id: 1, name: "HTTP" },
    { id: 2, name: "MQTT" },
  ],
  advancedForm: {
    appId: "",
    hookType: "",
    hookHost: "",
    hookUser: "",
    hookPass: "",
    hookTopic: "",
    status: 10,
    ctime: "",
    mtime: "",
  },
  networkConfigList: [],
})
onMounted(() => {
  getVendors()
  toAppInfo();
  getNetworkConfigList();
})
function handleSizeChange(val) {
  state.tableData.pagination.pageSize = val;
  getDatas();
}
function handleCurrentChange(val) {
  state.tableData.pagination.pageNum = val;
  getDatas();
}
// 搜索
function handleFilter() {
  state.tableData.pagination.pageNum = 1;
  getDatas();
}
// App列表
function getDatas() {
  getApplicationlistApi({
    orgId: parseInt(window.localStorage.getItem("oid") || ""),
    name: state.queryDatas.name,
    appId: state.queryDatas.appId,
    pageNum: state.tableData.pagination.pageNum,
    pageSize: state.tableData.pagination.pageSize,
  })
    .then((res) => {
      if (res && res.code === 200) {
        state.tableData.rows = res.items;
        state.tableData.pagination.totalPage = res.totalPage;
      } else {
        ElMessage.error(res.code + ": " + res.message);
      }
    })
    .catch((err) => { });
}
// 设备配置列表
function getDeviceProfileList() {
  getDeviceProfileListApi({})
    .then((res) => {
      if (res && res.code === 200) {
        if (res.items && res.items.length > 0) {
          state.profiles = [];
          for (let i = 0; i < res.items.length; i++) {
            state.profiles.push(res.items[i]);
          }
          getOptions();
        }
      } else {
        ElMessage.error(res.code + ": " + res.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
// 供应商列表
function getVendors() {
  getDeviceVendorListApi({})
    .then((res) => {
      if (res && res.code === 200) {
        if (res.items && res.items.length > 0) {
          state.vendors = [];
          for (let i = 0; i < res.items.length; i++) {
            state.vendors.push(res.items[i]);
          }
          getDeviceProfileList();
        }
      } else {
        ElMessage.error(res.code + ": " + res.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
// 点击新增
function handleCreate() {
  // if (proxy.$refs["form"] !== undefined) {
  //   proxy.$refs["form"].resetFields();
  // }
  // console.log(state.form.deviceProfileId);
  state.drawerType = 1;
  state.drawer = true;
}
// 点击修改
function HandleEdit(row) {
  getApplicationInfoApi({
    id: row.id,
  })
    .then((res) => {
      if (res && res.code === 200) {
        state.drawerType = 2;
        state.drawer = true;
        nextTick(() => {
          state.form.id = res.id;
          state.form.appId = res.appId;
          state.form.name = res.name;
          state.form.description = res.description;
          state.form.codecType = res.codecType;
          state.form.networkId = res.networkId;
          var vendorId = null;
          for (var i = 0; i < state.profiles.length; i++) {
            if (
              res.deviceProfileId &&
              res.deviceProfileId == state.profiles[i].id
            ) {
              vendorId = state.profiles[i].vendorId;
            }
          }
          state.form.deviceProfileId = [vendorId, res.deviceProfileId];
          // 获取转发配置
          getHookConfigs();
        });
      } else {
        ElMessage.error(res.code + ": " + res.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function getHookConfigs() {
  getHookConfigsApi({
    appId: state.form.appId,
  })
    .then((res) => {
      if (res && res.code == 200) {
        state.advancedForm.appId = state.form.appId;
        state.advancedForm.hookType = res.hookType;
        state.advancedForm.hookHost = res.hookHost;
        state.advancedForm.hookUser = res.hookUser;
        state.advancedForm.hookPass = res.hookPass;
        state.advancedForm.hookTopic = res.hookTopic;
        state.advancedForm.status = res.status ? res.status : 10;
        state.advancedForm.ctime = res.ctime;
        state.advancedForm.mtime = res.mtime;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
// before close
function handleClose(done) {
  if (state.drawerLoading) {
    return;
  }
  // clear form
  if (proxy.$refs["form"] !== undefined) {
    proxy.$refs["form"].resetFields();
  }
  if (proxy.$refs["advancedForm"] !== undefined) {
    proxy.$refs["advancedForm"].resetFields();
  }
  state.drawerLoading = false;
  state.drawer = false;
  state.activeTab = "first";
  // 更新列表
  getDatas();
}
// 提交
function submitForm() {
  // TODO 表单校验
  proxy.$refs["form"].validate((valid) => {
    if (valid) {
      ElMessageBox.confirm("确定要提交表单吗？").then((_) => {
        state.drawerLoading = true;
        // drawerType 1：新增, 2：修改, 3: 查看
        if (state.drawerType == 1) {
          addApplication();
        } else if (state.drawerType == 2) {
          UpdateApplication();
        }
        state.drawerLoading = false;
      });
    } else {
      console.log("error submit!!");
      return;
    }
  });
}
// 增加
function addApplication() {
  addApplicationApi({
    name: state.form.name,
    appId: state.form.appId,
    description: state.form.description,
    codecType: state.form.codecType,
    deviceProfileId: state.form.deviceProfileId[1],
    networkId: state.form.networkId,
    orgId: parseInt(window.localStorage.getItem("oid") || ""),
  }).then((res) => {
    if (res && res.code === 200) {
      ElMessage.success("success");
      state.drawerLoading = false;
      handleClose();
    } else {
      ElMessage.error(res.code + ": " + res.message);
    }
  });
}
// 修改
function UpdateApplication() {
  UpdateApplicationApi({
    id: state.form.id,
    appId: state.form.appId,
    name: state.form.name,
    description: state.form.description,
    networkId: state.form.networkId,
    codecType: state.form.codecType,
    deviceProfileId: state.form.deviceProfileId[1],
    status: 20, // TODO 状态控制
  })
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage.success("success");
        handleClose();
      } else {
        ElMessage.error(res.code + ": " + res.message);
      }
    })
    .catch((err) => {
      ElMessage.error("error");
      state.drawerLoading = false;
      console.log(err);
    });
}
function toAppInfo() {
  if (state.appId != "") {
    state.queryDatas.appId = state.appId;
    handleFilter();
  } else {
    getDatas();
  }
}
function getOptions() {
  state.options = [];
  for (var x = 0; x < state.vendors.length; x++) {
    var children = [];
    for (var y = 0; y < state.profiles.length; y++) {
      if (state.vendors[x].id == state.profiles[y].vendorId) {
        children.push({
          label: state.profiles[y].profileName,
          value: state.profiles[y].id,
        });
      }
    }
    state.options.push({
      label: state.vendors[x].name,
      value: state.vendors[x].id,
      children: children,
    });
  }
}
function submitAdvanceForm() {
  let params = {
    appId: state.form.appId,
    hookType: state.advancedForm.hookType,
    hookHost: state.advancedForm.hookHost,
    hookUser: state.advancedForm.hookUser,
    hookPass: state.advancedForm.hookPass,
    hookTopic: state.advancedForm.hookTopic,
    status: state.advancedForm.status,
  };
  updateHookConfigsApi(params)
    .then((res) => {
      if (res && res.code == 200) {
        ElMessage.success("保存成功");
      } else {
        ElMessage.error(res.code + ": " + res.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function getNetworkConfigList() {
  getNetworkConfigListApi({
    pageNum: 1,
    pageSize: 1000,
  }).then(res => {
    if (res && res.code == 200) {
      state.networkConfigList = res.items;
    } else {
      ElMessage.error(res.code + ": " + res.message);
    }
  })
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
  .ReposistoryCorner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
}
</style>
<style>
.drawer__content {
  padding: 20px;
}
</style>

<template>
  <div class="app-container">
    <div id="app" slot="body">
      <!-- 窗口顶部搜索 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.networkId"
            placeholder="NetworkID"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-col>
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.networkName"
            placeholder="网络名称"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-col>
        <el-col :span="4">
          <el-select v-model="state.queryDatas.networkType" placeholder="网络类型" clearable>
            <el-option
              v-for="networkType in state.networkTypes"
              :key="networkType.value"
              :label="networkType.label"
              :value="networkType.value"
            ></el-option>
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
        <el-table-column prop="id" label="#" width="80" show-overflow-tooltip />
        <el-table-column prop="networkId" label="NetworkID" show-overflow-tooltip>
          <template #default="scope">
            <el-button v-waves type="text" @click="HandleEdit(scope.row.id)">
              {{
                scope.row.networkId
              }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="networkName" label="网络名称" show-overflow-tooltip>
          <template #default="scope">
            <el-button v-waves type="text" @click="HandleEdit(scope.row.id)">
              {{
                scope.row.networkName
              }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="networkType" label="网络类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="host" label="HOST" show-overflow-tooltip></el-table-column>
        <el-table-column prop="port" label="PORT" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              v-if="scope.row.status == 10"
              v-waves
              size="mini"
              type="success"
              @click="HandleStartup(scope.row)"
            >启动</el-button>
            <el-button
              v-else-if="scope.row.status == 20"
              v-waves
              size="mini"
              type="danger"
              @click="HandleShutdown(scope.row)"
            >停止</el-button>
          </template>
        </el-table-column>
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
        :title="
          (state.drawerType == 1 ? '新增' : '修改') + '网络配置'
        "
        :before-close="handleClose"
        v-model="state.drawer"
        :destroy-on-close="true"
        custom-class="drawer"
        ref="drawer"
        :close-on-press-escape="true"
      >
        <div class="drawer__content">
          <el-form ref="form" :model="state.form" :rules="state.rules">
            <el-form-item
              prop="networkId"
              label="NetworkID"
              :label-width="state.formLabelWidth"
              v-if="state.drawerType == 2"
            >
              <el-input disabled v-model="state.form.networkId"></el-input>
            </el-form-item>
            <el-form-item prop="networkName" label="网络名称" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.networkName"></el-input>
            </el-form-item>
            <el-form-item prop="networkType" label="网络类型" :label-width="state.formLabelWidth">
              <el-select
                :disabled="state.drawerType == 1 ? false : true"
                v-model="state.form.networkType"
                placeholder
              >
                <el-option
                  v-for="networkType in state.networkTypes"
                  :key="networkType.value"
                  :label="networkType.label"
                  :value="networkType.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="host" label="HOST" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.host"></el-input>
            </el-form-item>
            <el-form-item prop="port" label="Port" :label-width="state.formLabelWidth">
              <el-input-number v-model="state.form.port" :min="0" />
            </el-form-item>
            <el-form-item prop="username" label="用户名" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.password"></el-input>
            </el-form-item>
            <el-form-item prop="clientId" label="ClientID" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.clientId"></el-input>
            </el-form-item>
            <el-form-item prop="ssl" label="开启 SSL" :label-width="state.formLabelWidth">
              <el-radio-group v-model="state.form.ssl">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
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
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script setup>// @ts-nocheck

import {
  getNetworkConfigListApi,
  getNetworkConfigInfoApi,
  addNetworkConfigApi,
  UpdateNetworkConfigApi,
  StartupNetworkApi,
  ShutdownNetworkApi,
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
    networkId: "",
    networkName: "",
    networkType: "",
  },
  drawer: false,
  drawerLoading: false,
  form: {
    id: null,
    networkId: "",
    networkName: "",
    networkType: "",
    host: "",
    port: 0,
    username: "",
    password: "",
    clientId: "",
    status: 10,
    ssl: false,
  },
  rules: {
    // networkId: [{ required: true, message: "请输入NetworkID", trigger: "blur" }],
    networkName: [{ required: true, message: "请输入网络名称", trigger: "blur" }],
    networkType: [{ required: true, message: "请输入网络类型", trigger: "blur" }],
  },
  formLabelWidth: "120px",
  drawerType: 1, // 1：新增, 2：修改
  networkTypes: [
    {
      label: "HTTP",
      value: "HTTP"
    },
    {
      label: "MQTT",
      value: "MQTT"
    },
    {
      label: "TCP",
      value: "TCP"
    },
  ]
})
onMounted(() => {
  getDatas();
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
  getNetworkConfigListApi({
    networkId: state.queryDatas.networkId,
    networkName: state.queryDatas.networkName,
    networkType: state.queryDatas.networkType,
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
    .catch((err) => {
      console.log(err);
    });
}
// 点击新增
function handleCreate() {
  state.drawerType = 1;
  state.drawer = true;
}
// 点击修改
function HandleEdit(id) {
  getNetworkConfigInfoApi({
    id: id,
  })
    .then((res) => {
      if (res && res.code === 200) {
        state.drawerType = 2;
        state.drawer = true;

        nextTick(() => {
          state.form.id = res.id;
          state.form.networkId = res.networkId;
          state.form.networkName = res.networkName;
          state.form.networkType = res.networkType;
          state.form.host = res.host;
          state.form.port = res.port;
          state.form.username = res.username;
          state.form.password = res.password;
          state.form.clientId = res.clientId;
          state.form.ssl = res.ssl;
          state.form.status = res.status;
        });
      } else {
        ElMessage.error(res.code + ": " + res.message);
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
  if (proxy.$refs["form"] !== undefined) {
    proxy.$refs["form"].resetFields();
  }
  state.drawerLoading = false;
  state.drawer = false;
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
        // drawerType 1：新增, 2：修改
        if (state.drawerType == 1) {
          addData();
        } else if (state.drawerType == 2) {
          UpdateData();
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
function addData() {
  addNetworkConfigApi(state.form).then((res) => {
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
function UpdateData() {
  UpdateNetworkConfigApi(state.form)
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
    });
}
function HandleStartup(row) {
  ElMessageBox.confirm('确认启动网络 ' + row.networkName + '?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    showClose: false
  }).then(() => {
    startupNetwork(row)
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消启动'
    });
  });
}
function startupNetwork(row) {
  StartupNetworkApi({
    id: row.id
  }).then(res => {
    if (res && res.code == 200) {
      ElMessage.success("success");
      getDatas()
    } else {
      ElMessage.error(res.code + ": " + res.message);
    }
  })
}
function HandleShutdown(row) {
  ElMessageBox.confirm('确认停止网络 ' + row.networkName + '?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    showClose: false
  }).then(() => {
    shutdownNetwork(row)
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消停止'
    });
  });
}
function shutdownNetwork(row) {
  ShutdownNetworkApi({
    id: row.id
  }).then(res => {
    if (res && res.code == 200) {
      ElMessage.success("success");
      getDatas()
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
}
</style>

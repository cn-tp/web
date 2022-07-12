<template>
  <div class="app-container">
    <div id="app" slot="body">
      <!-- 窗口顶部搜索 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.no"
            placeholder="编号"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-col>
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.name"
            placeholder="名称"
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
        <el-table-column prop="name" label="供应商名称" show-overflow-tooltip>
          <template #default="scope">
            <el-button v-waves type="text" @click="HandleEdit(scope.row.id)">
              {{
                scope.row.name
              }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="no" label="编号" show-overflow-tooltip></el-table-column>
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
          '供应商 / ' + (state.drawerType == 1 ? '新增' : state.form.name)
        "
        :before-close="handleClose"
        v-model="state.drawer"
        :destroy-on-close="true"
        custom-class="drawer"
        ref="drawer"
        :close-on-press-escape="true"
      >
        <div class="drawer__content">
          <el-form ref="form" :model="state.form">
            <el-form-item prop="no" label="供应商编号" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.no" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item prop="name" label="名称" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.name" autocomplete="off"></el-input>
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
  getDeviceVendorListApi,
  getDeviceVendorInfoApi,
  addDeviceVendorApi,
  UpdateDeviceVendorApi,
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
    no: "",
    name: "",
  },
  drawer: false,
  drawerLoading: false,
  form: {
    id: null,
    no: "",
    name: "",
  },
  formLabelWidth: "120px",
  drawerType: 1, // 1：新增, 2：修改
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
  getDeviceVendorListApi({
    no: state.queryDatas.no,
    name: state.queryDatas.name,
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
  getDeviceVendorInfoApi({
    id: id,
  })
    .then((res) => {
      if (res && res.code === 200) {
        state.drawerType = 2;
        state.drawer = true;

        nextTick(() => {
          state.form.id = res.id;
          state.form.no = res.no;
          state.form.name = res.name;
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
          addDeviceVendor();
        } else if (state.drawerType == 2) {
          UpdateDeviceVendor();
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
function addDeviceVendor() {
  addDeviceVendorApi({
    no: state.form.no,
    name: state.form.name,
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
function UpdateDeviceVendor() {
  UpdateDeviceVendorApi({
    id: state.form.id,
    no: state.form.no,
    name: state.form.name,
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
    });
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
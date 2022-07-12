<template>
  <div class="app-container">
    <div id="app" slot="body">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.profileName"
            placeholder="名称"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-col>
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.protocol"
            placeholder="协议"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-col>
        <el-col :span="4">
          <el-select v-model="state.queryDatas.vendorId" clearable placeholder="供应商">
            <el-option
              v-for="item in state.vendors"
              :key="item.id"
              :label="item.name"
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
        <el-table-column prop="id" label="#" width="80" show-overflow-tooltip />
        <el-table-column prop="profileName" label="设备配置名称" show-overflow-tooltip>
          <template #default="scope">
            <el-button v-waves type="text" @click="HandleEdit(scope.row.id)">
              {{
                scope.row.profileName
              }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="protocol" label="协议" show-overflow-tooltip></el-table-column>
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
      <!-- 右侧展示 -->
      <el-drawer
        :title="
          '设备配置信息 / ' + (state.drawerType == 1 ? '新增' : state.form.profileName)
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
            <el-form-item
              prop="profileName"
              label="设备配置名称"
              :label-width="state.formLabelWidth"
              :rules="[
                {
                  required: true,
                  message: '请输入设备配置名称',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input v-model="state.form.profileName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="描述" :label-width="state.formLabelWidth">
              <el-input
                v-model="state.form.description"
                autocomplete="off"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入配置描述"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="protocol"
              label="协议"
              :label-width="state.formLabelWidth"
              :rules="[
                { required: true, message: '请输入设备协议', trigger: 'blur' },
              ]"
            >
              <el-input v-model="state.form.protocol" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item prop="productId" label="产品Id" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.productId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="vendorId" label="供应商" :label-width="state.formLabelWidth">
              <el-select v-model="state.form.vendorId" placeholder="选择此类设备的供应商">
                <div v-for="vendor in state.vendors" :key="vendor.id" :item="vendor">
                  <el-option :label="vendor.name" :value="vendor.id"></el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="deviceCodecId"
              label="deviceCodecId"
              :label-width="state.formLabelWidth"
              v-show="false"
            >
              <el-input v-model="state.form.deviceCodecId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="encodeHandler" label="编码" :label-width="state.formLabelWidth">
              <el-input
                v-model="state.form.encodeHandler"
                autocomplete="off"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入编码方法"
              ></el-input>
            </el-form-item>
            <el-form-item prop="decodeHandler" label="解码" :label-width="state.formLabelWidth">
              <el-input
                v-model="state.form.decodeHandler"
                autocomplete="off"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入解码方法"
              ></el-input>
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
  getDeviceProfileListApi,
  getDeviceProfileInfoApi,
  addDeviceProfileApi,
  UpdateDeviceProfileApi,
  getDeviceVendorListApi,
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
    profileName: "",
    protocol: "",
    vendorId: "",
  },
  drawer: false,
  drawerLoading: false,
  form: {
    id: null,
    profileName: "",
    protocol: "",
    vendorId: null,
    productId: "",
    description: "",
    deviceCodecId: null,
    encodeHandler: "",
    decodeHandler: "",
  },
  formLabelWidth: "120px",
  drawerType: 1, // 1：新增, 2：修改
  vendors: [],
  deviceProfileId: route.query.deviceProfileId || null,
})
onMounted(() => {
  getDatas();
  getVendors();
  toProfileInfo();
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
  getDeviceProfileListApi({
    profileName: state.queryDatas.profileName,
    protocol: state.queryDatas.protocol,
    vendorId: state.queryDatas.vendorId,
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
  state.drawerType = 1;
  state.drawer = true;
}
// 点击修改
function HandleEdit(id) {
  getDeviceProfileInfoApi({
    id: id,
  })
    .then((res) => {
      if (res && res.code === 200) {
        state.drawerType = 2;
        state.drawer = true;

        nextTick(() => {
          state.form.id = res.id;
          state.form.profileName = res.profileName;
          state.form.protocol = res.protocol;
          state.form.vendorId = res.vendorId;
          state.form.productId = res.productId;
          state.form.description = res.description;
          state.form.deviceCodecId = res.deviceCodecId;
          state.form.encodeHandler = res.encodeHandler;
          state.form.decodeHandler = res.decodeHandler;
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
          addDeviceProfile();
        } else if (state.drawerType == 2) {
          UpdateDeviceProfile();
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
function addDeviceProfile() {
  addDeviceProfileApi({
    profileName: state.form.profileName,
    protocol: state.form.protocol,
    vendorId: state.form.vendorId,
    productId: state.form.productId,
    description: state.form.description,
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
function UpdateDeviceProfile() {
  UpdateDeviceProfileApi({
    id: state.form.id,
    profileName: state.form.profileName,
    protocol: state.form.protocol,
    vendorId: state.form.vendorId,
    productId: state.form.productId,
    description: state.form.description,
    deviceCodecId: state.form.deviceCodecId,
    encodeHandler: state.form.encodeHandler,
    decodeHandler: state.form.decodeHandler,
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
function toProfileInfo() {
  if (state.deviceProfileId != null) {
    HandleEdit(state.deviceProfileId);
  }
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
<template>
  <div class="app-container">
    <div id="app" slot="body">
      <!-- 窗口顶部搜索 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            v-model.trim="state.queryDatas.clientId"
            placeholder="appId"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-col>
        <el-col :span="4">
          <el-cascader v-model="state.queryDatas.commands" :options="state.commands" filterable>
            <template #default="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
          </el-cascader>
        </el-col>
        <el-col :span="4">
          <el-select v-model="state.queryDatas.status" placeholder="任务状态">
            <div v-for="status in state.taskStatusDict" :key="status.itemId" :item="status">
              <el-option :label="status.itemName" :value="status.itemId"></el-option>
            </div>
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
        <el-table-column prop="clientId" label="AppId" show-overflow-tooltip></el-table-column>
        <el-table-column prop="command" label="任务类型" show-overflow-tooltip>
          <template #default="scope">{{ getDictName(scope.row.command, state.commandList) }}</template>
        </el-table-column>
        <el-table-column prop="subCommand" label="执行子命令" show-overflow-tooltip>
          <template #default="scope">{{ getDictName(scope.row.subCommand, state.subCommandList) }}</template>
        </el-table-column>
        <el-table-column prop="status" label="任务状态" show-overflow-tooltip>
          <template #default="scope">{{ getDictName(scope.row.status, state.taskStatusDict) }}</template>
        </el-table-column>
        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mtime" label="更新时间" show-overflow-tooltip></el-table-column>
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
        :title="'任务详情 / ' + (state.drawerType == 1 ? '新增' : state.form.id)"
        :before-close="handleClose"
        v-model="state.drawer"
        :destroy-on-close="true"
        custom-class="drawer"
        ref="drawer"
        :close-on-press-escape="true"
      >
        <div class="drawer__content">
          <el-form ref="form" :model="state.form"></el-form>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script setup>// @ts-nocheck

import {
  getTaskListApi,
  getTaskInfoApi,
  addTaskApi,
  getDictDataApi,
  getTaskTemplateListApi,
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
      pageSize: 20,
      totalPage: 0,
    },
    rows: [],
  },
  queryDatas: {
    clientId: "",
    commands: [],
    status: null,
  },
  drawer: false,
  drawerLoading: false,
  form: {
    id: null,
    clientId: "",
    command: null,
    subCommand: null,
    payload: "",
    status: null,
    ctime: "",
    mtime: "",
  },
  formLabelWidth: "120px",
  drawerType: 1, // 1：新增, 2：查看
  taskStatusDict: [],
  commandList: [],
  subCommandList: [],
  commands: [],
})

onMounted(() => {
  getDictData(4, 20);
  getTaskTemplateList();
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
  getTaskListApi({
    clientId: state.queryDatas.clientId,
    command: state.queryDatas.command,
    subCommand: state.queryDatas.subCommand,
    status: state.queryDatas.status,
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
// 点击查看
function HandleEdit(id) {
  getTaskInfoApi({
    id: id,
  })
    .then((res) => {
      if (res && res.code === 200) {
        state.drawerType = 2;
        state.drawer = true;

        nextTick(() => {
          state.form.id = res.id;
          state.form.clientId = res.clientId;
          state.form.command = res.command;
          state.form.subCommand = res.subCommand;
          state.form.payload = res.payload;
          state.form.status = res.status;
          state.form.ctime = res.ctime;
          state.form.mtime = res.mtime;
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
        // drawerType 1：新增
        if (state.drawerType == 1) {
          addTask();
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
function addTask() {
  addTaskApi({
    clientId: state.form.clientId,
    command: state.form.command,
    subCommand: state.form.subCommand,
    payLoad: state.form.payload,
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
function getDictData(groupId, status) {
  getDictDataApi({ groupId: groupId, status: status }).then((res) => {
    if (res && res.code == 200) {
      if (res.items && res.items.length > 0) {
        switch (groupId) {
          case 4:
            state.taskStatusDict = res.items;
          default:
            return;
        }
      }
    }
  })
}
function getDictName(itemId, dict) {
  if (itemId && dict.length > 0) {
    for (var i = 0; i < dict.length; i++) {
      if (itemId == dict[i].itemId) {
        return dict[i].itemName;
      }
    }
  } else {
    return "";
  }
}
// 获取任务模板
function getTaskTemplateList() {
  getTaskTemplateListApi({})
    .then((res) => {
      if (res && res.code === 200) {
        if (res.items && res.items.length > 0) {
          state.templateList = [];
          for (var i = 0; i < res.items.length; i++) {
            state.templateList.push(res.items[i]);
          }
          getTemplates();
        }
      } else {
        ElMessage.error(res.code + ": " + res.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
// 任务命令级联选择器
function getTemplates() {
  // 级联选择器
  state.commands = [];
  // command dict
  state.commandList = [];
  // subCommand dict
  state.subCommandList = [];

  for (var i = 0; i < state.templateList.length; i++) {
    var children = {
      label: state.templateList[i].commandDesc,
      value: state.templateList[i].command,
      children: [],
    };
    var command = {
      itemId: state.templateList[i].command,
      itemName: state.templateList[i].commandDesc,
    };
    var subCommand = {
      itemId: state.templateList[i].subCommand,
      itemName: state.templateList[i].subCommandDesc,
    };
    // 一级列表
    if (
      JSON.stringify(state.commands).indexOf(JSON.stringify(children)) ===
      -1
    ) {
      state.commands.push(children);
    }
    // 二级列表
    for (var y = 0; y < state.commands.length; y++) {
      if (state.templateList[i].command === state.commands[y].value) {
        state.commands[y].children.push({
          label: state.templateList[i].subCommandDesc,
          value: state.templateList[i].subCommand,
        });
      }
      break;
    }
    if (
      JSON.stringify(state.commandList).indexOf(JSON.stringify(command)) ===
      -1
    ) {
      state.commandList.push(command);
    }
    state.subCommandList.push(subCommand);
  }
  console.log(state.commands)
}
// 表格样式
function cellStyle() {
  return "padding:3px;"
}
function headerCellStyle() {
  return "padding:3px;"
}
</script>
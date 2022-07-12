
import { get, post, put, del } from '/@/utils/request';
const baseUrl = "/oss"

// 数据字典
export const getDictDataApi = (p: object) => get(baseUrl + '/dict', p)

// 获取apps列表
export const getApplicationlistApi = (p: object) => get(baseUrl + '/application', p)
// 获取app信息
export const getApplicationInfoApi = (p: object) => get(baseUrl + '/application/' + p.id, p)
// 新增app
export const addApplicationApi = (p: object) => post(baseUrl + '/application', p)
// 修改app信息
export const UpdateApplicationApi = (p: object) => put(baseUrl + '/application/' + p.id, p)

// 获取设备轨迹
export const GetDeviceTrack = (p: object) => get(baseUrl + '/device/tracks', p)

// 获取设备配置列表
export const getDeviceProfileListApi = (p: object) => get(baseUrl + '/profile', p)
// 新增设备配置
export const addDeviceProfileApi = (p: object) => post(baseUrl + '/profile', p)
// 查看设备配置
export const getDeviceProfileInfoApi = (p: object) => get(baseUrl + '/profile/' + p.id, p)
// 修改配置(与编解码)
export const UpdateDeviceProfileApi = (p: object) => put(baseUrl + '/profile/' + p.id, p)

// 修改配置代码
export const UpdateDeviceCodecApi = (p: object) => put(baseUrl + '/codec/' + p.id, p)

// 获取设备列表
export const getDeviceListApi = (p: object) => get(baseUrl + '/device', p)
// 新增设备
export const addDeviceApi = (p: object) => post(baseUrl + '/device', p)
// 查看设备
export const getDeviceInfoApi = (p: object) => get(baseUrl + '/device/' + p.id, p)
// 修改设备信息
export const UpdateDeviceApi = (p: object) => put(baseUrl + '/device/' + p.id, p)

// 获取供应商列表
export const getDeviceVendorListApi = (p: object) => get(baseUrl + '/vendor', p)
// 新增供应商
export const addDeviceVendorApi = (p: object) => post(baseUrl + '/vendor', p)
// 查看供应商信息
export const getDeviceVendorInfoApi = (p: object) => get(baseUrl + '/vendor/' + p.id, p)
// 修改供应商信息
export const UpdateDeviceVendorApi = (p: object) => put(baseUrl + '/vendor/' + p.id, p)

// 获取任务列表
export const getTaskListApi = (p: object) => get(baseUrl + '/task', p)
// 新增任务
export const addTaskApi = (p: object) => post(baseUrl + '/task', p)
// 获取任务详情
export const getTaskInfoApi = (p: object) => get(baseUrl + '/task/' + p.id, p)

// 获取设备分类列表
export const getDeviceCategoryListApi = (p: object) => get(baseUrl + '/category', p)

// 获取设备的属性Model列表
export const getDeviceConfigModelListApi = (p: object) => get(baseUrl + '/model/config/'+ p.configId, p)

// 获取设备的属性值
export const getDeviceConfigsApi = (p: object) => get(baseUrl + '/configs/device/'+ p.deviceId, p)
// 更新或新增设备属性
export const updateDeviceConfigsApi = (p: object) => put(baseUrl + '/configs/device/' + p.deviceId, p)
// 上传设备命令
export const uploadDeviceConfigsApi = (p: object) => post(baseUrl + '/configs/upload', p)

// 获取任务模板列表
export const getTaskTemplateListApi = (p: object) => get(baseUrl + '/template', p)

// 获取应用的转发配置
export const getHookConfigsApi = (p: object) => get(baseUrl + '/hook/' + p.appId, p)

// 更新应用的转发配置
export const updateHookConfigsApi = (p: object) => post(baseUrl + '/hook', p)

// 获取网络配置列表
export const getNetworkConfigListApi = (p: object) => get(baseUrl + '/networkConfig', p)
// 新增网络配置
export const addNetworkConfigApi = (p: object) => post(baseUrl + '/networkConfig', p)
// 查看网络配置信息
export const getNetworkConfigInfoApi = (p: object) => get(baseUrl + '/networkConfig/' + p.id, p)
// 修改网络配置信息
export const UpdateNetworkConfigApi = (p: object) => put(baseUrl + '/networkConfig/' + p.id, p)
// 创建网络
export const StartupNetworkApi = (p: object) => post(baseUrl + '/networkConfig/' + p.id + '/startup', p)
// 断开网络
export const ShutdownNetworkApi = (p: object) => post(baseUrl + '/networkConfig/' + p.id + '/shutdown', p)

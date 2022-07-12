import { getJson } from '/@/utils/request';
const baseUrl = '/map'

// 地图
export const getMapApi = (p: object) => getJson(baseUrl + '', p)
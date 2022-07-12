import { get, post } from '/@/utils/request';

export const getDeviceListApi = (p: object) => get("/repository/device", p);
export const getDeviceInfoApi = (p: object) => post("/repository/device", p);
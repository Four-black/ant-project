import { request } from '@umijs/max';

// 后端服务地址
const BACKEND_URL = 'http://localhost:8080';

/** 获取班级列表 GET /api/courseInfo/all */
export async function queryClassList() {
  return request<{
    code: string;
    msg: string;
    data: any[];
  }>(`${BACKEND_URL}/api/courseInfo/all`, {
    method: 'GET',
    skipErrorHandler: true,
  });
}

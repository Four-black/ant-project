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

/** 获取课程详情 GET /api/courseInfo/get/${id} */
export async function getCourseDetail(id: string | number) {
  return request<{
    code: string | number;
    msg: string;
    data: any;
  }>(`${BACKEND_URL}/api/courseInfo/get/${id}`, {
    method: 'GET',
  });
}

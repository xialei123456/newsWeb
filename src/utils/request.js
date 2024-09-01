// axios 的配置文件，写法相对固定

import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'; // 引入 element-plus 中的消息提示组件 (vue3弃用了原element-ui)
import store from '../store'; 
// 使用 vuex 实例进行全局 token 及其他信息管理和存储
import { getToken } from '@/utils/auth'; 
// auth 文件里使用 js-cookie 库定义了获取、管理 token 等方法

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // API 的 base_url
  timeout: 15000 // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 如果有 token，则在每个请求的 header 中携带 token
      config.headers['Authorization'] = getToken(); 
    }
    return config; 
  },
  error => {
    // 请求错误的处理
    console.log(error); // 仅用于调试
    return Promise.reject(error); 
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    // 当响应状态码不是 200 时进行处理
    const res = response.data; 
    if (res.code !== 200) {
      // 使用 element-plus 提供的 ElMessage 组件来显示错误信息
      ElMessage({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      });

      // 处理 401 未登录错误
      if (res.code === 401) {
        ElMessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload(); // 为了重新实例化 vue-router 对象，避免 bug
          });
        });
      }
      return Promise.reject('error'); 
    } else {
      return response.data; 
    }
  },
  error => {
    // 使用 element-plus 提供的 ElMessage 组件来显示错误信息
    console.log('err' + error); // 仅用于调试
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    });
    return Promise.reject(error); 
  }
);

export default service;

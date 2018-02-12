import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
// axios 配置
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = process.env.BASE_API;


//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});


//返回状态判断
axios.interceptors.response.use((res) => {
  // if(!res.data.success){
  //   // _.toast(res.data.msg);
  //   return Promise.reject(res);
  // }
  if (res.data.status === '401') {
    Message({
      message: res.data.msg,
      type: 'warning',
      duration: 1000
    })
    return;
  }
  if (res.data.status === '1') {
    Message({
      message: res.data.msg,
      type: 'warning',
      duration: 1000
    })
    return;
  }
  if (res.data.status === '2') {
    // check 当前未登录
    return;
  }

  return res;
}, (error) => {
  Message({
    message: error,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error);
});

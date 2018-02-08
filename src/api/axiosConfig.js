import axios from 'axios'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios.defaults.baseURL = 'http://192.168.2.182:3000/';
// axios.defaults.baseURL = window.location.protocol+'//api.fazhineng.com/robot/';
axios.defaults.baseURL = '';
// axios.defaults.baseURL = 'http://h5-test.fazhineng.com/robot/';
// axios.defaults.baseURL = 'http://api.fazhineng.com/robot/';


//POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});


//返回状态判断
axios.interceptors.response.use((res) =>{
  // if(!res.data.success){
  //   // _.toast(res.data.msg);
  //   return Promise.reject(res);
  // }
  if(res.data.status==='401'){
    alert(res.data.msg)
    return;
  }

  return res;
}, (error) => {
  _.toast("网络异常", 'fail');
  return Promise.reject(error);
});
